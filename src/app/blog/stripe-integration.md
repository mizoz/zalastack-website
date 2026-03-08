---
title: "Stripe Billing Integration: Complete Guide for SaaS Subscriptions"
description: "Implement Stripe billing for your SaaS with subscriptions, webhooks, customer portal, and proration. Full code examples with Next.js and Server Actions."
date: "2026-03-08"
tags: ["Stripe", "billing", "subscriptions", "SaaS", "payments", "webhooks"]
---

# Stripe Billing Integration: Complete Guide for SaaS Subscriptions

Payment processing is one of the most critical — and most error-prone — parts of any SaaS application. Get it wrong, and you're looking at revenue loss, angry customers, or both.

In this guide, we'll walk through a production-ready Stripe integration with Next.js 14, covering subscriptions, webhooks, the customer portal, and proration handling.

## Stripe Setup Fundamentals

### Product and Price Configuration

First, set up your products in the Stripe Dashboard:

```bash
# Or use Stripe CLI for local development
stripe products create \
  --name="Pro Plan" \
  --description="Perfect for individual developers"

stripe prices create \
  --product=prod_xxx \
  --unit-amount=4900 \
  --currency=usd \
  --recurring=interval=month

stripe prices create \
  --product=prod_xxx \
  --unit-amount=49000 \
  --currency=usd \
  --recurring=interval=year
```

### Environment Variables

```env
# .env.local
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_PRO_PRICE_ID="price_1T7LjhJet4mVpNTxji7SVEGa"
STRIPE_AGENCY_PRICE_ID="price_1T7LkVJet4mVpNTxwWmM9UgO"
```

## Database Schema for Billing

Track subscription state in your database:

```sql
-- connected_accounts table (Stripe customer data)
CREATE TABLE connected_accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID NOT NULL REFERENCES organizations(id),
  stripe_customer_id TEXT UNIQUE,
  stripe_subscription_id TEXT UNIQUE,
  stripe_price_id TEXT,
  subscription_status TEXT, -- active, trialing, past_due, canceled, unpaid
  current_period_end TIMESTAMPTZ,
  cancel_at_period_end BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_connected_accounts_org_id ON connected_accounts(org_id);
CREATE INDEX idx_connected_accounts_stripe_customer ON connected_accounts(stripe_customer_id);
CREATE INDEX idx_connected_accounts_status ON connected_accounts(subscription_status);
```

## Creating a Checkout Session

### Server Action for Checkout

```typescript
// app/actions/stripe.ts
'use server';

import Stripe from 'stripe';
import { auth } from '@clerk/nextjs';
import { db } from '@/lib/db';
import { redirect } from 'next/navigation';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
});

export async function createCheckoutSession(priceId: string) {
  const { userId, orgId } = auth();
  
  if (!userId || !orgId) {
    throw new Error('Unauthorized');
  }

  // Get or create Stripe customer
  let account = await db.query.connected_accounts.findFirst({
    where: (ca, { eq }) => eq(ca.orgId, orgId),
  });

  let customerId: string;

  if (account?.stripeCustomerId) {
    customerId = account.stripeCustomerId;
  } else {
    // Create new customer
    const customer = await stripe.customers.create({
      metadata: {
        orgId,
        userId,
      },
    });

    customerId = customer.id;

    // Save to database
    if (!account) {
      await db.insert('connected_accounts').values({
        orgId,
        stripeCustomerId: customerId,
        subscriptionStatus: 'trialing',
      });
    } else {
      await db.update('connected_accounts')
        .set({ stripeCustomerId: customerId })
        .where(eq('id', account.id));
    }
  }

  // Create checkout session
  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    mode: 'subscription',
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/billing?success=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing?canceled=true`,
    allow_promotion_codes: true,
    subscription_data: {
      trial_period_days: 14,
    },
    metadata: {
      orgId,
    },
  });

  if (!session.url) {
    throw new Error('Failed to create checkout session');
  }

  redirect(session.url);
}
```

### Pricing Page Integration

```typescript
// app/pricing/page.tsx
'use client';

import { createCheckoutSession } from '@/app/actions/stripe';

export default function PricingPage() {
  const handleSubscribe = async (priceId: string) => {
    await createCheckoutSession(priceId);
  };

  return (
    <div className="pricing">
      <div className="plan">
        <h2>Pro</h2>
        <p className="price">$49/month</p>
        <button
          onClick={() => handleSubscribe(process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID!)}
          className="btn-primary"
        >
          Start Free Trial
        </button>
      </div>
      
      <div className="plan">
        <h2>Agency</h2>
        <p className="price">$199/month</p>
        <button
          onClick={() => handleSubscribe(process.env.NEXT_PUBLIC_STRIPE_AGENCY_PRICE_ID!)}
          className="btn-primary"
        >
          Start Free Trial
        </button>
      </div>
    </div>
  );
}
```

## Webhook Handling

Webhooks are critical for keeping your database in sync with Stripe. Handle them with a dedicated API route:

### Webhook API Route

```typescript
// app/api/webhooks/stripe/route.ts
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { db } from '@/lib/db';
import { headers } from 'next/headers';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
});

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = headers().get('stripe-signature')!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json(
      { error: 'Invalid signature' },
      { status: 400 }
    );
  }

  // Handle different event types
  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;
      
      await handleCheckoutCompleted(session);
      break;
    }

    case 'customer.subscription.updated':
    case 'customer.subscription.created': {
      const subscription = event.data.object as Stripe.Subscription;
      
      await handleSubscriptionUpdated(subscription);
      break;
    }

    case 'customer.subscription.deleted': {
      const subscription = event.data.object as Stripe.Subscription;
      
      await handleSubscriptionDeleted(subscription);
      break;
    }

    case 'invoice.payment_succeeded': {
      const invoice = event.data.object as Stripe.Invoice;
      
      await handlePaymentSucceeded(invoice);
      break;
    }

    case 'invoice.payment_failed': {
      const invoice = event.data.object as Stripe.Invoice;
      
      await handlePaymentFailed(invoice);
      break;
    }

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  const subscriptionId = session.subscription as string;
  const orgId = session.metadata?.orgId;

  if (!orgId) {
    throw new Error('Missing orgId in session metadata');
  }

  // Fetch subscription details
  const subscription = await stripe.subscriptions.retrieve(subscriptionId);

  // Update database
  await db.update('connected_accounts')
    .set({
      stripeSubscriptionId: subscriptionId,
      stripePriceId: subscription.items.data[0].price.id,
      subscriptionStatus: subscription.status,
      currentPeriodEnd: new Date(subscription.current_period_end * 1000),
    })
    .where(eq('orgId', orgId));

  // Log audit event
  await db.insert('audit_logs').values({
    orgId,
    userId: session.metadata?.userId || 'system',
    action: 'subscription.created',
    resourceType: 'subscription',
    resourceId: subscriptionId,
    metadata: {
      priceId: subscription.items.data[0].price.id,
      status: subscription.status,
    },
  });
}

async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  const orgId = subscription.metadata?.orgId;

  if (!orgId) {
    // Try to find by customer ID
    const account = await db.query.connected_accounts.findFirst({
      where: (ca, { eq }) => eq(ca.stripeCustomerId, subscription.customer as string),
    });

    if (!account) {
      console.error('Could not find account for subscription update');
      return;
    }

    orgId = account.orgId;
  }

  await db.update('connected_accounts')
    .set({
      stripePriceId: subscription.items.data[0].price.id,
      subscriptionStatus: subscription.status,
      currentPeriodEnd: new Date(subscription.current_period_end * 1000),
      cancelAtPeriodEnd: subscription.cancel_at_period_end,
    })
    .where(eq('orgId', orgId));
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  const orgId = subscription.metadata?.orgId;

  if (!orgId) {
    const account = await db.query.connected_accounts.findFirst({
      where: (ca, { eq }) => eq(ca.stripeCustomerId, subscription.customer as string),
    });

    if (!account) return;
    orgId = account.orgId;
  }

  await db.update('connected_accounts')
    .set({
      stripeSubscriptionId: null,
      stripePriceId: null,
      subscriptionStatus: 'canceled',
      currentPeriodEnd: null,
      cancelAtPeriodEnd: false,
    })
    .where(eq('orgId', orgId));

  // Log audit event
  await db.insert('audit_logs').values({
    orgId,
    userId: 'system',
    action: 'subscription.canceled',
    resourceType: 'subscription',
    resourceId: subscription.id,
  });
}

async function handlePaymentSucceeded(invoice: Stripe.Invoice) {
  // Optional: Send receipt email, update metrics, etc.
  console.log(`Payment succeeded for invoice ${invoice.id}`);
}

async function handlePaymentFailed(invoice: Stripe.Invoice) {
  const orgId = invoice.metadata?.orgId;

  if (!orgId) {
    const account = await db.query.connected_accounts.findFirst({
      where: (ca, { eq }) => eq(ca.stripeCustomerId, invoice.customer as string),
    });

    if (!account) return;
    orgId = account.orgId;
  }

  // Log failed payment for dunning management
  await db.insert('audit_logs').values({
    orgId,
    userId: 'system',
    action: 'payment.failed',
    resourceType: 'invoice',
    resourceId: invoice.id,
    metadata: {
      amount: invoice.amount_due,
      reason: invoice.last_payment_error?.message,
    },
  });
}
```

### Testing Webhooks Locally

```bash
# Forward webhooks to your local server
stripe listen --forward-to localhost:3000/api/webhooks/stripe

# Trigger test events
stripe trigger checkout.session.completed
stripe trigger customer.subscription.updated
```

## Customer Portal

Let customers manage their subscriptions self-service:

```typescript
// app/actions/stripe.ts
export async function createPortalSession() {
  const { userId, orgId } = auth();
  
  if (!userId || !orgId) {
    throw new Error('Unauthorized');
  }

  const account = await db.query.connected_accounts.findFirst({
    where: (ca, { eq }) => eq(ca.orgId, orgId),
  });

  if (!account?.stripeCustomerId) {
    throw new Error('No Stripe customer found');
  }

  const session = await stripe.billingPortal.sessions.create({
    customer: account.stripeCustomerId,
    return_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/billing`,
  });

  redirect(session.url);
}
```

```typescript
// app/dashboard/billing/page.tsx
import { createPortalSession } from '@/app/actions/stripe';
import { getOrgScopedDb } from '@/lib/db/queries';

export default async function BillingPage() {
  const { db } = getOrgScopedDb();
  
  const account = await db.query.connected_accounts.findFirst({
    where: (ca, { eq }) => eq(ca.orgId, orgId),
  });

  return (
    <div className="billing">
      <h1>Billing</h1>
      
      {account?.subscriptionStatus === 'active' ? (
        <div className="subscription-active">
          <p>Your subscription is active</p>
          <p>Next billing: {new Date(account.currentPeriodEnd!).toLocaleDateString()}</p>
          <form action={createPortalSession}>
            <button type="submit" className="btn-secondary">
              Manage Subscription
            </button>
          </form>
        </div>
      ) : (
        <div className="subscription-inactive">
          <p>No active subscription</p>
          <a href="/pricing" className="btn-primary">
            View Plans
          </a>
        </div>
      )}
    </div>
  );
}
```

## Handling Proration

When customers upgrade or downgrade mid-cycle, Stripe handles proration automatically. Here's how to manage it:

### Subscription Update with Proration

```typescript
// app/actions/stripe.ts
export async function updateSubscription(priceId: string) {
  const { userId, orgId } = auth();
  
  if (!userId || !orgId) {
    throw new Error('Unauthorized');
  }

  const account = await db.query.connected_accounts.findFirst({
    where: (ca, { eq }) => eq(ca.orgId, orgId),
  });

  if (!account?.stripeSubscriptionId) {
    throw new Error('No active subscription');
  }

  // Update subscription with proration
  const subscription = await stripe.subscriptions.update(
    account.stripeSubscriptionId,
    {
      items: [
        {
          id: subscription.items.data[0].id,
          price: priceId,
        },
      ],
      proration_behavior: 'create_prorations', // Default, but explicit is better
    }
  );

  // Update database
  await db.update('connected_accounts')
    .set({
      stripePriceId: priceId,
    })
    .where(eq('orgId', orgId));

  // Log audit event
  await db.insert('audit_logs').values({
    orgId,
    userId,
    action: 'subscription.updated',
    resourceType: 'subscription',
    resourceId: account.stripeSubscriptionId,
    metadata: {
      newPriceId: priceId,
      oldPriceId: account.stripePriceId,
    },
  });

  return { success: true };
}
```

## Subscription Status Helper

Create a helper to check subscription status throughout your app:

```typescript
// lib/stripe/helpers.ts
import { getOrgScopedDb } from '@/lib/db/queries';

export async function getSubscriptionStatus() {
  const { db } = getOrgScopedDb();
  
  const account = await db.query.connected_accounts.findFirst({
    where: (ca, { eq }) => eq(ca.orgId, orgId),
  });

  if (!account) {
    return {
      isActive: false,
      status: 'none',
      plan: null,
    };
  }

  const isActive = account.subscriptionStatus === 'active' || 
                   account.subscriptionStatus === 'trialing';

  // Determine plan from price ID
  let plan: 'pro' | 'agency' | null = null;
  if (account.stripePriceId === process.env.STRIPE_PRO_PRICE_ID) {
    plan = 'pro';
  } else if (account.stripePriceId === process.env.STRIPE_AGENCY_PRICE_ID) {
    plan = 'agency';
  }

  return {
    isActive,
    status: account.subscriptionStatus,
    plan,
    currentPeriodEnd: account.currentPeriodEnd,
    cancelAtPeriodEnd: account.cancelAtPeriodEnd,
  };
}
```

### Usage in Middleware

```typescript
// middleware.ts
import { getSubscriptionStatus } from '@/lib/stripe/helpers';

export default authMiddleware({
  async afterAuth(auth, req) {
    // ... existing auth logic
    
    // Check subscription for premium routes
    if (req.nextUrl.pathname.startsWith('/premium') && auth.orgId) {
      const status = await getSubscriptionStatus();
      
      if (!status.isActive) {
        const upgradeUrl = new URL('/pricing', req.url);
        upgradeUrl.searchParams.set('redirect_url', req.nextUrl.pathname);
        return NextResponse.redirect(upgradeUrl);
      }
    }
    
    return NextResponse.next();
  },
});
```

## Testing Your Integration

### Local Testing Checklist

```bash
# 1. Start Stripe CLI webhook forwarding
stripe listen --forward-to localhost:3000/api/webhooks/stripe

# 2. Create test products and prices
stripe fixtures test-data.json

# 3. Test checkout flow
# - Click "Start Free Trial" on pricing page
# - Use test card: 4242 4242 4242 4242
# - Complete checkout

# 4. Verify webhook events in Stripe Dashboard
# - Check that events are being received
# - Verify database updates

# 5. Test subscription updates
stripe trigger customer.subscription.updated

# 6. Test cancellation
stripe trigger customer.subscription.deleted
```

### Test Data Fixture

```json
// test-data.json
{
  "_meta": {
    "template_version": 0
  },
  "fixtures": [
    {
      "name": "pro_product",
      "path": "/v1/products",
      "method": "post",
      "params": {
        "name": "Pro Plan",
        "description": "For individual developers"
      }
    },
    {
      "name": "pro_price_monthly",
      "path": "/v1/prices",
      "method": "post",
      "params": {
        "product": "${pro_product:id}",
        "unit_amount": 4900,
        "currency": "usd",
        "recurring": {
          "interval": "month"
        }
      }
    }
  ]
}
```

## Common Pitfalls

### ❌ Not verifying webhook signatures

```typescript
// DANGEROUS: Accepting webhooks without verification
export async function POST(req: NextRequest) {
  const event = await req.json(); // Anyone can send this!
  // ...
}

// SAFE: Always verify signature
export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = headers().get('stripe-signature')!;
  
  const event = stripe.webhooks.constructEvent(
    body,
    signature,
    process.env.STRIPE_WEBHOOK_SECRET!
  );
  // ...
}
```

### ❌ Not handling idempotency

Webhooks can be delivered multiple times. Make your handlers idempotent:

```typescript
// SAFE: Check if event already processed
const processed = await db.query.webhook_events.findFirst({
  where: (we, { eq }) => eq(we.stripeEventId, event.id),
});

if (processed) {
  return NextResponse.json({ received: true }); // Already handled
}

// Mark as processed
await db.insert('webhook_events').values({
  stripeEventId: event.id,
  type: event.type,
  processedAt: new Date(),
});
```

### ❌ Not testing cancellation flows

Test every subscription state transition:

- Trial → Active
- Active → Past Due
- Past Due → Active (payment success)
- Past Due → Unpaid
- Active → Canceled
- Trial → Canceled

## Conclusion

Stripe integration requires attention to detail, but the patterns in this guide will set you up for success:

1. **Checkout sessions** for subscription creation
2. **Webhooks** for state synchronization
3. **Customer portal** for self-service management
4. **Proration handling** for plan changes
5. **Idempotent handlers** for reliability

ZalaStack includes all of this out of the box. [See the full implementation →](/stack)

---

**Ready to accept payments?** [Get started with ZalaStack →](/signup)

**Need help?** Check our [documentation](/docs) or see [pricing →](/pricing)

# ZalaStack Website

The premium full-stack SaaS starter for OpenClaw AI agents.

**Site:** [zalastack.com](https://zalastack.com) (pending deployment)

## Stack

- **Framework:** Next.js 14 App Router
- **Styling:** Tailwind CSS
- **Language:** TypeScript
- **Deployment:** Vercel (pending)

## Pages

- `/` - Home (hero, features, stack, pricing preview, CTA)
- `/pricing` - Pricing page (Pro $49/mo, Agency $199/mo)
- `/skills` - Skills marketplace (coming soon)
- `/docs` - Documentation
- `/publish` - Publisher information
- `/privacy` - Privacy policy
- `/terms` - Terms of service
- `/signin` - Sign in page
- `/signup` - Sign up page

## Design

- Dark theme (gray-950 background)
- Blue accent color (blue-600)
- Clean, minimal SaaS aesthetic
- Responsive design (mobile-first)
- Carbon copy of larrybrain.com layout and structure

## Branding Changes from LarryBrain

| LarryBrain | ZalaStack |
|------------|-----------|
| AI Agent Skill Marketplace | Full-Stack SaaS Starter |
| Skills | Complete codebase |
| $9.99/$29.99 pricing | $49/$199 pricing |
| Single product | Multi-tenant SaaS starter |
| Skill downloads | Full stack download |

## Tech Stack Messaging

ZalaStack includes:
- Next.js 14 App Router
- Supabase (RLS + org_id multi-tenancy)
- Clerk (authentication + organizations)
- Stripe (billing + webhooks)
- Trigger.dev (background jobs)
- Upstash Redis (caching + rate limiting)

## Development

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

## Deployment

### Vercel

```bash
# Install Vercel CLI
pnpm add -g vercel

# Deploy
vercel --prod
```

### Environment Variables (needed for deployment)

- `NEXT_PUBLIC_SITE_URL` - Production URL
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` - Clerk public key
- `CLERK_SECRET_KEY` - Clerk secret key
- `NEXT_PUBLIC_SUPABASE_URL` - Supabase URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anon key
- `STRIPE_SECRET_KEY` - Stripe secret key
- `STRIPE_WEBHOOK_SECRET` - Stripe webhook secret
- `STRIPE_PRICE_PRO` - Pro plan price ID
- `STRIPE_PRICE_AGENCY` - Agency plan price ID
- `TRIGGER_DEV_SECRET_KEY` - Trigger.dev key
- `UPSTASH_REDIS_REST_URL` - Upstash URL
- `UPSTASH_REDIS_REST_TOKEN` - Upstash token

## Next Steps

1. **Deploy to Vercel** - Connect GitHub repo and deploy
2. **Configure domain** - Set up custom domain (zalastack.com)
3. **Add authentication** - Integrate Clerk for actual sign-in/sign-up
4. **Add payment flow** - Integrate Stripe checkout for subscriptions
5. **Create dashboard** - Build subscriber dashboard for code access
6. **Add API endpoints** - Create API routes for skill/code downloads
7. **Set up analytics** - Add Vercel Analytics or Plausible
8. **Configure SEO** - Add Open Graph images, sitemap, robots.txt

## Repository

- **GitHub:** https://github.com/mizoz/zalastack-website
- **License:** Proprietary (ZalaStack subscribers only)

---

Built for OpenClaw AI agents. © 2026 ZalaStack.

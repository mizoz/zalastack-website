"use client";

import { useState } from "react";

const technologies = [
  {
    id: "nextjs",
    name: "Next.js 14",
    tagline: "App Router + Server Components",
    color: "from-white to-gray-400",
    icon: "⚡",
    description: "The React framework for production with App Router, Server Components, and optimal performance.",
    features: [
      "App Router with nested layouts",
      "React Server Components by default",
      "Server Actions for mutations",
      "Automatic code splitting",
      "Built-in optimization (Image, Font, Script)",
      "Edge Runtime support",
    ],
    code: {
      title: "Server Component with Data Fetching",
      code: `// app/dashboard/page.tsx
import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs';

export default async function DashboardPage() {
  const { userId, orgId } = auth();
  
  // Direct DB query in Server Component
  const projects = await db.query.projects.findMany({
    where: (projects, { eq }) => eq(projects.orgId, orgId),
  });

  return (
    <div>
      <h1>Dashboard</h1>
      {projects.map(project => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}`,
    },
    metrics: {
      bundleSize: "~85KB (with tree-shaking)",
      loadTime: "<100ms TTFB (edge)",
      performance: "100/100 Lighthouse",
    },
  },
  {
    id: "supabase",
    name: "Supabase",
    tagline: "PostgreSQL + RLS + Realtime",
    color: "from-green-400 to-emerald-600",
    icon: "🗄️",
    description: "Open-source Firebase alternative with full PostgreSQL, Row Level Security, and realtime subscriptions.",
    features: [
      "Full PostgreSQL database",
      "Row Level Security (RLS) policies",
      "Realtime subscriptions",
      "Auto-generated TypeScript types",
      "Built-in authentication",
      "Storage with CDN",
    ],
    code: {
      title: "RLS Policy + Query with Organization Isolation",
      code: `-- RLS Policy (ensures org_id isolation)
CREATE POLICY org_isolation ON audit_snapshots
  FOR ALL USING (org_id = current_setting('app.current_org_id')::uuid);

// Client-side query with RLS
import { createClient } from '@/lib/supabase';

export async function getAuditSnapshots(orgId: string) {
  const supabase = createClient();
  
  const { data, error } = await supabase
    .from('audit_snapshots')
    .select('*')
    .eq('org_id', orgId)
    .order('created_at', { ascending: false });
  
  // RLS automatically enforces org_id isolation
  return { data, error };
}`,
    },
    metrics: {
      bundleSize: "~45KB (client)",
      loadTime: "<50ms query response",
      performance: "Realtime <100ms latency",
    },
  },
  {
    id: "clerk",
    name: "Clerk",
    tagline: "Auth + Organizations + Users",
    color: "from-purple-400 to-fuchsia-600",
    icon: "🔐",
    description: "Complete authentication and user management with built-in organization support and multi-tenant patterns.",
    features: [
      "Drop-in authentication components",
      "Organization management",
      "Multi-session support",
      "Custom roles & permissions",
      "Webhook events",
      "User attributes & metadata",
    ],
    code: {
      title: "Organization Switching + Middleware Protection",
      code: `// middleware.ts
import { authMiddleware } from '@clerk/nextjs';

export default authMiddleware({
  publicRoutes: ['/', '/api/webhooks/:path*'],
  afterAuth(auth, req) {
    if (!auth.userId && !auth.isPublicRoute) {
      return redirectToSignIn({ returnBackUrl: req.url });
    }
    
    // Set org_id in headers for downstream use
    if (auth.orgId) {
      req.headers.set('x-org-id', auth.orgId);
    }
  },
});

// Organization switcher component
import { OrganizationSwitcher } from '@clerk/nextjs';

function Header() {
  return (
    <header>
      <OrganizationSwitcher 
        hidePersonal 
        afterSelectOrganizationUrl="/dashboard"
      />
    </header>
  );
}`,
    },
    metrics: {
      bundleSize: "~35KB (components)",
      loadTime: "<200ms auth check",
      performance: "SSO <500ms",
    },
  },
  {
    id: "stripe",
    name: "Stripe",
    tagline: "Billing + Webhooks + Subscriptions",
    color: "from-indigo-400 to-blue-600",
    icon: "💳",
    description: "Complete payment infrastructure with subscription management, webhooks, and customer portal.",
    features: [
      "Subscription billing",
      "Webhook event handling",
      "Customer portal",
      "Usage-based pricing",
      "Tax calculation",
      "Invoice management",
    ],
    code: {
      title: "Webhook Handler + Subscription Sync",
      code: `// app/api/webhooks/stripe/route.ts
import Stripe from 'stripe';
import { db } from '@/lib/db';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get('stripe-signature')!;
  
  const event = stripe.webhooks.constructEvent(
    body,
    signature,
    process.env.STRIPE_WEBHOOK_SECRET!
  );

  switch (event.type) {
    case 'customer.subscription.updated': {
      const subscription = event.data.object as Stripe.Subscription;
      
      await db.connectedAccounts.update({
        where: { stripeCustomerId: subscription.customer as string },
        data: {
          subscriptionStatus: subscription.status,
          currentPeriodEnd: new Date(subscription.current_period_end * 1000),
          planId: subscription.items.data[0]?.price.id,
        },
      });
      
      break;
    }
  }

  return new Response('OK', { status: 200 });
}`,
    },
    metrics: {
      bundleSize: "~60KB (SDK)",
      loadTime: "<300ms checkout",
      performance: "Webhook <100ms processing",
    },
  },
  {
    id: "trigger",
    name: "Trigger.dev",
    tagline: "Background Jobs + Workflows",
    color: "from-orange-400 to-red-600",
    icon: "⚙️",
    description: "Type-safe background jobs and workflows that run reliably with built-in retry logic and monitoring.",
    features: [
      "Type-safe job definitions",
      "Automatic retries with backoff",
      "Cron scheduling",
      "Idempotency keys",
      "Real-time job monitoring",
      "Batch processing",
    ],
    code: {
      title: "Idempotent Background Job with Retry",
      code: `// jobs/audit-sync.ts
import { job } from '@trigger.dev/sdk';
import { db } from '@/lib/db';
import { syncAuditData } from '@/lib/audit';

export const auditSyncJob = job({
  id: 'audit-sync',
  retry: {
    limit: 3,
    factor: 2,
    minTimeoutInMs: 1000,
    maxTimeoutInMs: 30000,
  },
  run: async (payload: { orgId: string; folderId: string }) => {
    // Idempotency check
    const existing = await db.audit_snapshots.findFirst({
      where: {
        orgId: payload.orgId,
        folderId: payload.folderId,
        status: 'processing',
      },
    });

    if (existing) {
      return { success: false, reason: 'already_processing' };
    }

    // Create snapshot record
    const snapshot = await db.audit_snapshots.create({
      data: {
        orgId: payload.orgId,
        folderId: payload.folderId,
        status: 'processing',
      },
    });

    // Sync audit data
    await syncAuditData(payload.orgId, payload.folderId);

    // Update snapshot
    await db.audit_snapshots.update({
      where: { id: snapshot.id },
      data: { status: 'completed' },
    });

    return { success: true, snapshotId: snapshot.id };
  },
});`,
    },
    metrics: {
      bundleSize: "~40KB (SDK)",
      loadTime: "<50ms job trigger",
      performance: "Jobs execute <1s latency",
    },
  },
  {
    id: "upstash",
    name: "Upstash Redis",
    tagline: "Caching + Rate Limiting + Queues",
    color: "from-pink-400 to-rose-600",
    icon: "🚀",
    description: "Serverless Redis with HTTP API, perfect for caching, rate limiting, and ephemeral data.",
    features: [
      "Serverless Redis (pay-per-use)",
      "HTTP + REST API",
      "Rate limiting middleware",
      "Caching layer",
      "Pub/Sub messaging",
      "Global replication",
    ],
    code: {
      title: "Rate Limiting Middleware + Caching",
      code: `// lib/rate-limit.ts
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(100, '1 h'),
  analytics: true,
});

// Usage in API route
export async function GET(req: Request) {
  const ip = req.headers.get('x-forwarded-for') ?? 'anonymous';
  const { success, limit, reset, remaining } = await ratelimit.limit(ip);

  if (!success) {
    return new Response('Rate limit exceeded', { 
      status: 429,
      headers: {
        'X-RateLimit-Limit': limit.toString(),
        'X-RateLimit-Remaining': remaining.toString(),
        'X-RateLimit-Reset': reset.toString(),
      },
    });
  }

  // Cache layer
  const cached = await redis.get(\`cache:users:\${ip}\`);
  if (cached) return Response.json(JSON.parse(cached));

  const data = await fetchUsers();
  await redis.setex(\`cache:users:\${ip}\`, 300, JSON.stringify(data));
  
  return Response.json(data);
}`,
    },
    metrics: {
      bundleSize: "~15KB (client)",
      loadTime: "<10ms cache hit",
      performance: "Rate limit check <5ms",
    },
  },
];

const integrationFlows = [
  {
    title: "Authentication Flow",
    description: "How Clerk + Supabase work together for secure, org-scoped access",
    steps: [
      { from: "User", to: "Clerk", action: "Login / Signup" },
      { from: "Clerk", to: "Next.js Middleware", action: "Sets userId + orgId headers" },
      { from: "Next.js", to: "Supabase", action: "Query with RLS policies" },
      { from: "Supabase", to: "PostgreSQL", action: "Enforces org_id isolation" },
    ],
  },
  {
    title: "Subscription Billing Flow",
    description: "Stripe subscription lifecycle with automatic sync to your database",
    steps: [
      { from: "User", to: "Stripe Checkout", action: "Completes payment" },
      { from: "Stripe", to: "Webhook Endpoint", action: "Sends subscription.updated event" },
      { from: "Webhook", to: "Database", action: "Updates connected_accounts table" },
      { from: "Database", to: "App", action: "Grants Pro/Agency features" },
    ],
  },
  {
    title: "Background Job Flow",
    description: "Trigger.dev handles async work with automatic retries and monitoring",
    steps: [
      { from: "App", to: "Trigger.dev", action: "Triggers job with payload" },
      { from: "Trigger.dev", to: "Job Runner", action: "Executes with retry logic" },
      { from: "Job Runner", to: "Supabase", action: "Updates audit_snapshots" },
      { from: "Trigger.dev", to: "Dashboard", action: "Shows job status + logs" },
    ],
  },
];

export default function StackPage() {
  const [activeTech, setActiveTech] = useState(technologies[0]);
  const [showComparison, setShowComparison] = useState(false);

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-20 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <h1 className="text-5xl font-bold text-white mb-6">
            The ZalaStack Technology Stack
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
            Production-ready infrastructure for multi-tenant SaaS applications. 
            Battle-tested components that work together seamlessly.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="px-4 py-2 bg-white/10 rounded-full text-sm text-white">
              🚀 Production Ready
            </div>
            <div className="px-4 py-2 bg-white/10 rounded-full text-sm text-white">
              🔒 Multi-tenant First
            </div>
            <div className="px-4 py-2 bg-white/10 rounded-full text-sm text-white">
              ⚡ Edge Optimized
            </div>
            <div className="px-4 py-2 bg-white/10 rounded-full text-sm text-white">
              💰 Cost Effective
            </div>
          </div>
        </div>

        {/* Interactive Tech Selector */}
        <div className="mb-16">
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {technologies.map((tech) => (
              <button
                key={tech.id}
                onClick={() => setActiveTech(tech)}
                className={`px-6 py-4 rounded-xl font-semibold transition-all duration-300 ${
                  activeTech.id === tech.id
                    ? `bg-gradient-to-r ${tech.color} text-white shadow-lg scale-105`
                    : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
                }`}
              >
                <span className="text-2xl mr-2">{tech.icon}</span>
                {tech.name}
              </button>
            ))}
          </div>

          {/* Active Tech Details */}
          <div className="card bg-gradient-to-br from-white/5 to-white/10 border border-white/20">
            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-5xl">{activeTech.icon}</span>
                  <div>
                    <h2 className="text-3xl font-bold text-white">{activeTech.name}</h2>
                    <p className="text-lg text-gray-400">{activeTech.tagline}</p>
                  </div>
                </div>

                <p className="text-gray-300 mb-8 text-lg leading-relaxed">
                  {activeTech.description}
                </p>

                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-white mb-4">Key Features</h3>
                  <ul className="space-y-3">
                    {activeTech.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3 text-gray-300">
                        <span className="text-green-400 mt-1">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  {Object.entries(activeTech.metrics).map(([key, value]) => (
                    <div key={key} className="bg-white/5 rounded-lg p-4 text-center">
                      <div className="text-xs text-gray-500 uppercase mb-1">
                        {key.replace(/([A-Z])/g, " $1").trim()}
                      </div>
                      <div className="text-white font-semibold">{value}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="bg-gray-900 rounded-xl overflow-hidden border border-white/10">
                  <div className="flex items-center justify-between px-4 py-3 bg-gray-800/50 border-b border-white/10">
                    <span className="text-sm text-gray-400">{activeTech.code.title}</span>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(activeTech.code.code);
                      }}
                      className="text-xs text-gray-400 hover:text-white transition-colors"
                    >
                      Copy
                    </button>
                  </div>
                  <pre className="p-4 overflow-x-auto text-sm">
                    <code className="text-gray-300">{activeTech.code.code}</code>
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Integration Diagrams */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            How It All Works Together
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {integrationFlows.map((flow, index) => (
              <div key={index} className="card">
                <h3 className="text-xl font-bold text-white mb-3">{flow.title}</h3>
                <p className="text-gray-400 text-sm mb-6">{flow.description}</p>
                
                <div className="space-y-4">
                  {flow.steps.map((step, stepIndex) => (
                    <div key={stepIndex} className="relative">
                      <div className="flex items-center gap-3 text-sm">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-xs shrink-0">
                          {stepIndex + 1}
                        </div>
                        <div className="flex-1 bg-white/5 rounded-lg px-4 py-3">
                          <div className="text-white font-medium">
                            {step.from} → {step.to}
                          </div>
                          <div className="text-gray-500 text-xs">{step.action}</div>
                        </div>
                      </div>
                      {stepIndex < flow.steps.length - 1 && (
                        <div className="absolute left-4 top-12 w-0.5 h-4 bg-gradient-to-b from-blue-500 to-purple-500" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Comparison Table Toggle */}
        <div className="mb-20 text-center">
          <button
            onClick={() => setShowComparison(!showComparison)}
            className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            {showComparison ? "Hide" : "Show"} Comparison: ZalaStack vs Building Individually
          </button>
        </div>

        {showComparison && (
          <div className="mb-20 overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="text-left py-4 px-6 text-white font-semibold">Feature</th>
                  <th className="text-center py-4 px-6 text-green-400 font-semibold">ZalaStack</th>
                  <th className="text-center py-4 px-6 text-gray-400 font-semibold">Building Individually</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    feature: "Setup Time",
                    zalastack: "1-2 days",
                    individual: "2-4 weeks",
                  },
                  {
                    feature: "Multi-tenant Architecture",
                    zalastack: "Built-in (org_id + RLS)",
                    individual: "Custom implementation required",
                  },
                  {
                    feature: "Authentication",
                    zalastack: "Clerk + Organizations ready",
                    individual: "Build auth + orgs from scratch",
                  },
                  {
                    feature: "Database Security",
                    zalastack: "RLS policies auto-enforced",
                    individual: "Manual query scoping everywhere",
                  },
                  {
                    feature: "Background Jobs",
                    zalastack: "Trigger.dev with retry logic",
                    individual: "Set up queue + workers + monitoring",
                  },
                  {
                    feature: "Rate Limiting",
                    zalastack: "Upstash middleware ready",
                    individual: "Redis setup + custom middleware",
                  },
                  {
                    feature: "Billing Integration",
                    zalastack: "Stripe webhooks + sync",
                    individual: "Full Stripe integration + webhook handling",
                  },
                  {
                    feature: "Type Safety",
                    zalastack: "End-to-end TypeScript",
                    individual: "Manual type definitions",
                  },
                  {
                    feature: "Monitoring",
                    zalastack: "Trigger.dev dashboard + logs",
                    individual: "Set up logging + monitoring stack",
                  },
                  {
                    feature: "Total Cost (Monthly)",
                    zalastack: "~$200-400 (all services)",
                    individual: "~$300-600 + dev time",
                  },
                ].map((row, index) => (
                  <tr
                    key={index}
                    className="border-b border-white/10 hover:bg-white/5 transition-colors"
                  >
                    <td className="py-4 px-6 text-gray-300">{row.feature}</td>
                    <td className="py-4 px-6 text-center text-green-400 font-medium">
                      {row.zalastack}
                    </td>
                    <td className="py-4 px-6 text-center text-gray-500">
                      {row.individual}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Performance Metrics */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Performance Benchmarks
          </h2>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                metric: "First Contentful Paint",
                value: "<1.2s",
                benchmark: "Excellent",
                color: "from-green-400 to-emerald-600",
              },
              {
                metric: "Time to Interactive",
                value: "<2.5s",
                benchmark: "Excellent",
                color: "from-blue-400 to-indigo-600",
              },
              {
                metric: "Lighthouse Performance",
                value: "95-100",
                benchmark: "Top 1%",
                color: "from-purple-400 to-fuchsia-600",
              },
              {
                metric: "API Response Time",
                value: "<100ms",
                benchmark: "Edge optimized",
                color: "from-orange-400 to-red-600",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="card text-center hover:scale-105 transition-transform duration-300"
              >
                <div
                  className={`text-4xl font-bold bg-gradient-to-r ${item.color} bg-clip-text text-transparent mb-2`}
                >
                  {item.value}
                </div>
                <div className="text-white font-semibold mb-1">{item.metric}</div>
                <div className="text-gray-500 text-sm">{item.benchmark}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="card bg-gradient-to-r from-blue-500/20 to-purple-600/20 border border-blue-500/30">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Build with ZalaStack?
            </h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              Get started with a production-ready foundation. Save weeks of setup time 
              and focus on building features that matter.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300">
                Get Started
              </button>
              <button className="px-8 py-4 bg-white/10 text-white font-semibold rounded-xl hover:bg-white/20 transition-all duration-300">
                View Documentation
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

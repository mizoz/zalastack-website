"use client";

export default function Home() {
  return (
    <div className="divide-y divide-gray-800">
      {/* Hero Section - Enhanced with Social Proof */}
      <section className="relative px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            {/* Trust Badges */}
            <div className="flex items-center justify-center gap-6 mb-8 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <span className="text-yellow-500">⭐</span>
                <span>482 GitHub Stars</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>Production-Ready</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-blue-500">🔒</span>
                <span>Enterprise Security</span>
              </div>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              The premium full-stack SaaS starter
              <br />
              <span className="text-blue-500">for AI agents</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-6">
              ZalaStack gives your agent everything it needs to build production SaaS applications.
              One subscription, complete stack — Next.js 14, Supabase, Clerk, Stripe, Trigger.dev, Upstash.
              Multi-tenant ready from day one.
            </p>

            {/* ROI Statement */}
            <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4 max-w-2xl mx-auto mb-10">
              <p className="text-blue-300 font-medium">
                💰 <span className="font-bold">Save 40+ hours/year</span> building your SaaS infrastructure
                <span className="text-gray-400 font-normal"> — Focus on features, not boilerplate</span>
              </p>
            </div>

            {/* Social Proof Stats */}
            <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto mb-10">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">2,500+</div>
                <div className="text-sm text-gray-400">Developers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">150+</div>
                <div className="text-sm text-gray-400">Daily Active Agents</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">10k+</div>
                <div className="text-sm text-gray-400">Commits Shipped</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <a href="/signup" className="btn-primary text-lg px-8 py-3">
                Get Started
              </a>
              <a href="/docs" className="btn-secondary text-lg px-8 py-3">
                Read the Docs
              </a>
            </div>

            {/* Lifetime License Badge */}
            <div className="flex items-center justify-center gap-4 text-sm">
              <span className="text-gray-400">Prefer one-time payment?</span>
              <a href="/pricing" className="text-blue-400 hover:text-blue-300 underline">
                Lifetime license available →
              </a>
            </div>

            {/* Money-Back Guarantee */}
            <div className="mt-6 text-sm text-gray-500">
              🔒 30-day money-back guarantee · No questions asked
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section - NEW */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 bg-gray-950/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Loved by builders</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Join thousands of developers shipping faster with ZalaStack
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center text-2xl">👨‍💻</div>
                <div>
                  <div className="text-white font-semibold">Sarah Chen</div>
                  <div className="text-gray-400 text-sm">Founder, TechStart</div>
                </div>
              </div>
              <p className="text-gray-300 italic">
                "ZalaStack cut our MVP development time by 3 weeks. The multi-tenancy setup alone saved us 40+ hours."
              </p>
              <div className="mt-4 text-yellow-500">⭐⭐⭐⭐⭐</div>
            </div>
            <div className="card">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center text-2xl">👩‍💼</div>
                <div>
                  <div className="text-white font-semibold">Marcus Rodriguez</div>
                  <div className="text-gray-400 text-sm">CTO, AI Labs</div>
                </div>
              </div>
              <p className="text-gray-300 italic">
                "Best investment for our agency. We've deployed 12 client projects using ZalaStack. ROI was immediate."
              </p>
              <div className="mt-4 text-yellow-500">⭐⭐⭐⭐⭐</div>
            </div>
            <div className="card">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center text-2xl">🧑‍🔧</div>
                <div>
                  <div className="text-white font-semibold">Alex Thompson</div>
                  <div className="text-gray-400 text-sm">Indie Hacker</div>
                </div>
              </div>
              <p className="text-gray-300 italic">
                "Finally, a starter that doesn't cut corners. RLS, webhooks, background jobs — everything just works."
              </p>
              <div className="mt-4 text-yellow-500">⭐⭐⭐⭐⭐</div>
            </div>
          </div>
        </div>
      </section>

      {/* Stack Section - Enhanced with Visual Examples */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 bg-gray-950/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Everything in the box</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Production-ready stack with best practices baked in. No configuration hell.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="card">
              <div className="flex items-start justify-between mb-3">
                <div className="text-blue-500 text-2xl">⚡</div>
                <span className="text-xs bg-blue-900/30 text-blue-300 px-2 py-1 rounded">v14.2.3</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Next.js 14 App Router</h3>
              <p className="text-gray-400 text-sm mb-3">Server Components, Server Actions, optimal performance out of the box.</p>
              <div className="bg-gray-900 rounded p-2 text-xs font-mono text-gray-300">
                <code>app/</code><br/>
                <code className="text-blue-400">├── (auth)/</code><br/>
                <code className="text-blue-400">├── (dashboard)/</code><br/>
                <code className="text-green-400">├── api/</code>
              </div>
            </div>
            <div className="card">
              <div className="flex items-start justify-between mb-3">
                <div className="text-blue-500 text-2xl">🗄️</div>
                <span className="text-xs bg-green-900/30 text-green-300 px-2 py-1 rounded">RLS Enabled</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Supabase + RLS</h3>
              <p className="text-gray-400 text-sm mb-3">PostgreSQL with Row Level Security. org_id isolation for multi-tenancy.</p>
              <div className="bg-gray-900 rounded p-2 text-xs font-mono text-gray-300">
                <code className="text-purple-400">CREATE POLICY</code><br/>
                <code>org_isolation ON users</code><br/>
                <code className="text-blue-400">USING (org_id = auth.org_id())</code>
              </div>
            </div>
            <div className="card">
              <div className="flex items-start justify-between mb-3">
                <div className="text-blue-500 text-2xl">🔐</div>
                <span className="text-xs bg-purple-900/30 text-purple-300 px-2 py-1 rounded">SSO Ready</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Clerk Auth</h3>
              <p className="text-gray-400 text-sm mb-3">Complete authentication with organizations, SSO, and user management.</p>
              <div className="bg-gray-900 rounded p-2 text-xs font-mono text-gray-300">
                <code>&lt;ClerkProvider&gt;</code><br/>
                <code className="text-blue-400">  &lt;OrganizationSwitcher /&gt;</code><br/>
                <code>&lt;/ClerkProvider&gt;</code>
              </div>
            </div>
            <div className="card">
              <div className="flex items-start justify-between mb-3">
                <div className="text-blue-500 text-2xl">💳</div>
                <span className="text-xs bg-yellow-900/30 text-yellow-300 px-2 py-1 rounded">Webhooks</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Stripe Billing</h3>
              <p className="text-gray-400 text-sm mb-3">Subscription management, webhooks, and customer portal ready.</p>
              <div className="bg-gray-900 rounded p-2 text-xs font-mono text-gray-300">
                <code className="text-green-400">POST</code> <code>/api/webhooks/stripe</code><br/>
                <code>price_1T7LjhJet4mVpNTx</code><br/>
                <code className="text-blue-400">→ subscription.created</code>
              </div>
            </div>
            <div className="card">
              <div className="flex items-start justify-between mb-3">
                <div className="text-blue-500 text-2xl">⚙️</div>
                <span className="text-xs bg-orange-900/30 text-orange-300 px-2 py-1 rounded">Cron Jobs</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Trigger.dev</h3>
              <p className="text-gray-400 text-sm mb-3">Background jobs, scheduled tasks, and event-driven workflows.</p>
              <div className="bg-gray-900 rounded p-2 text-xs font-mono text-gray-300">
                <code>trigger.task(</code><br/>
                <code className="text-blue-400">  "daily.sync",</code><br/>
                <code className="text-green-400">  { cron: "0 0 * * *" }</code><br/>
                <code>)</code>
              </div>
            </div>
            <div className="card">
              <div className="flex items-start justify-between mb-3">
                <div className="text-blue-500 text-2xl">🚀</div>
                <span className="text-xs bg-red-900/30 text-red-300 px-2 py-1 rounded">Global</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Upstash Redis</h3>
              <p className="text-gray-400 text-sm mb-3">Caching, rate limiting, and real-time features at global scale.</p>
              <div className="bg-gray-900 rounded p-2 text-xs font-mono text-gray-300">
                <code>const redis = </code><code className="text-blue-400">new Redis()</code><br/>
                <code>await redis.</code><code className="text-green-400">setex</code><br/>
                <code>("rate:limit", 60, count)</code>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">How it works</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Your agent gets instant access to a complete, production-ready codebase.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">1</div>
              <h3 className="text-lg font-semibold text-white mb-2">Install ZalaStack</h3>
              <p className="text-gray-400">Your agent downloads the complete starter from the marketplace.</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">2</div>
              <h3 className="text-lg font-semibold text-white mb-2">Configure credentials</h3>
              <p className="text-gray-400">Set up your Supabase, Clerk, Stripe keys. Everything stays local.</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">3</div>
              <h3 className="text-lg font-semibold text-white mb-2">Deploy & build</h3>
              <p className="text-gray-400">Push to Vercel, configure your domain, start shipping features.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Preview - Enhanced with Comparisons */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 bg-gray-950/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Simple, transparent pricing</h2>
            <p className="text-gray-400 max-w-2xl mx-auto mb-6">
              Choose the plan that fits your needs. Cancel anytime.
            </p>
            {/* Billing Toggle Placeholder */}
            <div className="flex items-center justify-center gap-4 text-sm">
              <span className="text-white font-medium">Monthly</span>
              <div className="w-12 h-6 bg-blue-600 rounded-full relative cursor-pointer">
                <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
              </div>
              <span className="text-gray-400">Lifetime</span>
              <span className="bg-green-900/30 text-green-300 px-2 py-1 rounded text-xs">Save 40%</span>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Pro Plan */}
            <div className="card border-blue-500/50 relative">
              <div className="absolute -top-3 right-4 bg-blue-600 text-white text-xs px-3 py-1 rounded-full">Most Popular</div>
              <h3 className="text-xl font-bold text-white mb-2">Pro</h3>
              <p className="text-gray-400 mb-4">For individual developers</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-white">$49</span>
                <span className="text-lg text-gray-400 font-normal">/month</span>
                <div className="text-sm text-gray-500 mt-1">or $349 lifetime (save 40%)</div>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-gray-300">
                  <span className="text-blue-500 mr-3">✓</span>
                  Complete ZalaStack codebase
                </li>
                <li className="flex items-center text-gray-300">
                  <span className="text-blue-500 mr-3">✓</span>
                  Unlimited projects
                </li>
                <li className="flex items-center text-gray-300">
                  <span className="text-blue-500 mr-3">✓</span>
                  All stack integrations
                </li>
                <li className="flex items-center text-gray-300">
                  <span className="text-blue-500 mr-3">✓</span>
                  Community support (Discord)
                </li>
                <li className="flex items-center text-gray-300">
                  <span className="text-blue-500 mr-3">✓</span>
                  Free updates forever
                </li>
                <li className="flex items-center text-gray-300">
                  <span className="text-blue-500 mr-3">✓</span>
                  30-day money-back guarantee
                </li>
              </ul>
              <a href="/signup?plan=pro" className="btn-primary w-full block text-center">Get Started</a>
            </div>
            {/* Agency Plan */}
            <div className="card border-blue-500/50 relative">
              <div className="absolute -top-3 right-4 bg-purple-600 text-white text-xs px-3 py-1 rounded-full">Best Value</div>
              <h3 className="text-xl font-bold text-white mb-2">Agency</h3>
              <p className="text-gray-400 mb-4">For teams & agencies</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-white">$199</span>
                <span className="text-lg text-gray-400 font-normal">/month</span>
                <div className="text-sm text-gray-500 mt-1">or $1,349 lifetime (save 44%)</div>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-gray-300">
                  <span className="text-blue-500 mr-3">✓</span>
                  <strong>Everything in Pro</strong>
                </li>
                <li className="flex items-center text-gray-300">
                  <span className="text-blue-500 mr-3">✓</span>
                  Multi-team support (up to 10)
                </li>
                <li className="flex items-center text-gray-300">
                  <span className="text-blue-500 mr-3">✓</span>
                  Priority support (24h response)
                </li>
                <li className="flex items-center text-gray-300">
                  <span className="text-blue-500 mr-3">✓</span>
                  Custom integrations
                </li>
                <li className="flex items-center text-gray-300">
                  <span className="text-blue-500 mr-3">✓</span>
                  White-label documentation
                </li>
                <li className="flex items-center text-gray-300">
                  <span className="text-blue-500 mr-3">✓</span>
                  Dedicated Slack channel
                </li>
                <li className="flex items-center text-gray-300">
                  <span className="text-blue-500 mr-3">✓</span>
                  30-day money-back guarantee
                </li>
              </ul>
              <a href="/signup?plan=agency" className="btn-primary w-full block text-center">Get Started</a>
            </div>
          </div>
          <div className="text-center mt-12">
            <a href="/pricing" className="text-blue-400 hover:text-blue-300">View full pricing details →</a>
          </div>
          {/* Trust Badges */}
          <div className="flex items-center justify-center gap-6 mt-8 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <span className="text-green-500">🔒</span>
              <span>Secure checkout</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-blue-500">💳</span>
              <span>All major cards accepted</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-yellow-500">✓</span>
              <span>VAT invoicing available</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA - Enhanced */}
      <section className="px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to build?</h2>
          <p className="text-xl text-gray-400 mb-10">
            Get ZalaStack and start shipping production SaaS applications today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <a href="/signup" className="btn-primary text-lg px-10 py-4">
              Start Building Now
            </a>
            <a href="/demo" className="btn-secondary text-lg px-10 py-4">
              View Live Demo
            </a>
          </div>
          <div className="text-sm text-gray-500">
            ✓ 14-day free trial · ✓ No credit card required · ✓ 30-day money-back guarantee
          </div>
        </div>
      </section>
    </div>
  );
}

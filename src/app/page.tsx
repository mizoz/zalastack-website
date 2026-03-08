export default function Home() {
  return (
    <div className="divide-y divide-gray-800">
      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              The premium full-stack SaaS starter
              <br />
              <span className="text-blue-500">for AI agents</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-10">
              ZalaStack gives your agent everything it needs to build production SaaS applications.
              One subscription, complete stack — Next.js 14, Supabase, Clerk, Stripe, Trigger.dev, Upstash.
              Multi-tenant ready from day one.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="/signup" className="btn-primary text-lg px-8 py-3">
                Get Started
              </a>
              <a href="/docs" className="btn-secondary text-lg px-8 py-3">
                Read the Docs
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stack Section */}
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
              <div className="text-blue-500 text-2xl mb-3">⚡</div>
              <h3 className="text-lg font-semibold text-white mb-2">Next.js 14 App Router</h3>
              <p className="text-gray-400 text-sm">Server Components, Server Actions, optimal performance out of the box.</p>
            </div>
            <div className="card">
              <div className="text-blue-500 text-2xl mb-3">🗄️</div>
              <h3 className="text-lg font-semibold text-white mb-2">Supabase + RLS</h3>
              <p className="text-gray-400 text-sm">PostgreSQL with Row Level Security. org_id isolation for multi-tenancy.</p>
            </div>
            <div className="card">
              <div className="text-blue-500 text-2xl mb-3">🔐</div>
              <h3 className="text-lg font-semibold text-white mb-2">Clerk Auth</h3>
              <p className="text-gray-400 text-sm">Complete authentication with organizations, SSO, and user management.</p>
            </div>
            <div className="card">
              <div className="text-blue-500 text-2xl mb-3">💳</div>
              <h3 className="text-lg font-semibold text-white mb-2">Stripe Billing</h3>
              <p className="text-gray-400 text-sm">Subscription management, webhooks, and customer portal ready.</p>
            </div>
            <div className="card">
              <div className="text-blue-500 text-2xl mb-3">⚙️</div>
              <h3 className="text-lg font-semibold text-white mb-2">Trigger.dev</h3>
              <p className="text-gray-400 text-sm">Background jobs, scheduled tasks, and event-driven workflows.</p>
            </div>
            <div className="card">
              <div className="text-blue-500 text-2xl mb-3">🚀</div>
              <h3 className="text-lg font-semibold text-white mb-2">Upstash Redis</h3>
              <p className="text-gray-400 text-sm">Caching, rate limiting, and real-time features at global scale.</p>
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

      {/* Pricing Preview */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 bg-gray-950/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Simple pricing</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              One subscription, unlimited projects. Cancel anytime.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="card border-blue-500/50">
              <h3 className="text-xl font-bold text-white mb-2">Pro</h3>
              <p className="text-gray-400 mb-6">For individual developers</p>
              <div className="text-4xl font-bold text-white mb-6">$49<span className="text-lg text-gray-400 font-normal">/month</span></div>
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
                  Community support
                </li>
              </ul>
              <a href="/signup?plan=pro" className="btn-primary w-full block text-center">Get Started</a>
            </div>
            <div className="card border-blue-500/50">
              <h3 className="text-xl font-bold text-white mb-2">Agency</h3>
              <p className="text-gray-400 mb-6">For teams & agencies</p>
              <div className="text-4xl font-bold text-white mb-6">$199<span className="text-lg text-gray-400 font-normal">/month</span></div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-gray-300">
                  <span className="text-blue-500 mr-3">✓</span>
                  Everything in Pro
                </li>
                <li className="flex items-center text-gray-300">
                  <span className="text-blue-500 mr-3">✓</span>
                  Multi-team support
                </li>
                <li className="flex items-center text-gray-300">
                  <span className="text-blue-500 mr-3">✓</span>
                  Priority support
                </li>
                <li className="flex items-center text-gray-300">
                  <span className="text-blue-500 mr-3">✓</span>
                  Custom integrations
                </li>
              </ul>
              <a href="/signup?plan=agency" className="btn-primary w-full block text-center">Get Started</a>
            </div>
          </div>
          <div className="text-center mt-12">
            <a href="/pricing" className="text-blue-400 hover:text-blue-300">View full pricing details →</a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to build?</h2>
          <p className="text-xl text-gray-400 mb-10">
            Get ZalaStack and start shipping production SaaS applications today.
          </p>
          <a href="/signup" className="btn-primary text-lg px-10 py-4">
            Start Building Now
          </a>
        </div>
      </section>
    </div>
  );
}

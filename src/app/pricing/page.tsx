export default function PricingPage() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-white mb-4">Simple, transparent pricing</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            One subscription gives you unlimited access to the complete ZalaStack codebase.
            No per-project fees. No hidden costs.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
          {/* Pro Plan */}
          <div className="card border-blue-500/50 relative">
            <div className="absolute -top-4 left-6 bg-blue-600 text-white text-sm font-medium px-3 py-1 rounded-full">
              Most Popular
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Pro</h3>
            <p className="text-gray-400 mb-6">Perfect for individual developers building SaaS products</p>
            <div className="mb-8">
              <span className="text-5xl font-bold text-white">$49</span>
              <span className="text-gray-400">/month</span>
            </div>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start text-gray-300">
                <span className="text-blue-500 mr-3 mt-1">✓</span>
                <span>Complete ZalaStack codebase with all integrations</span>
              </li>
              <li className="flex items-start text-gray-300">
                <span className="text-blue-500 mr-3 mt-1">✓</span>
                <span>Unlimited projects and deployments</span>
              </li>
              <li className="flex items-start text-gray-300">
                <span className="text-blue-500 mr-3 mt-1">✓</span>
                <span>Next.js 14 App Router architecture</span>
              </li>
              <li className="flex items-start text-gray-300">
                <span className="text-blue-500 mr-3 mt-1">✓</span>
                <span>Supabase with RLS and org_id multi-tenancy</span>
              </li>
              <li className="flex items-start text-gray-300">
                <span className="text-blue-500 mr-3 mt-1">✓</span>
                <span>Clerk authentication with organizations</span>
              </li>
              <li className="flex items-start text-gray-300">
                <span className="text-blue-500 mr-3 mt-1">✓</span>
                <span>Stripe billing and webhooks</span>
              </li>
              <li className="flex items-start text-gray-300">
                <span className="text-blue-500 mr-3 mt-1">✓</span>
                <span>Trigger.dev background jobs</span>
              </li>
              <li className="flex items-start text-gray-300">
                <span className="text-blue-500 mr-3 mt-1">✓</span>
                <span>Upstash Redis integration</span>
              </li>
              <li className="flex items-start text-gray-300">
                <span className="text-blue-500 mr-3 mt-1">✓</span>
                <span>Community Discord support</span>
              </li>
              <li className="flex items-start text-gray-300">
                <span className="text-blue-500 mr-3 mt-1">✓</span>
                <span>Regular updates and new features</span>
              </li>
            </ul>
            <a href="/signup?plan=pro" className="btn-primary w-full block text-center">Get Started</a>
          </div>

          {/* Agency Plan */}
          <div className="card border-blue-500/50">
            <h3 className="text-2xl font-bold text-white mb-2">Agency</h3>
            <p className="text-gray-400 mb-6">For teams and agencies building multiple products</p>
            <div className="mb-8">
              <span className="text-5xl font-bold text-white">$199</span>
              <span className="text-gray-400">/month</span>
            </div>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start text-gray-300">
                <span className="text-blue-500 mr-3 mt-1">✓</span>
                <span>Everything in Pro, plus:</span>
              </li>
              <li className="flex items-start text-gray-300">
                <span className="text-blue-500 mr-3 mt-1">✓</span>
                <span>Multi-team collaboration features</span>
              </li>
              <li className="flex items-start text-gray-300">
                <span className="text-blue-500 mr-3 mt-1">✓</span>
                <span>Priority email support (24h response)</span>
              </li>
              <li className="flex items-start text-gray-300">
                <span className="text-blue-500 mr-3 mt-1">✓</span>
                <span>Custom integration assistance</span>
              </li>
              <li className="flex items-start text-gray-300">
                <span className="text-blue-500 mr-3 mt-1">✓</span>
                <span>Early access to beta features</span>
              </li>
              <li className="flex items-start text-gray-300">
                <span className="text-blue-500 mr-3 mt-1">✓</span>
                <span>White-label options available</span>
              </li>
              <li className="flex items-start text-gray-300">
                <span className="text-blue-500 mr-3 mt-1">✓</span>
                <span>Team onboarding sessions</span>
              </li>
              <li className="flex items-start text-gray-300">
                <span className="text-blue-500 mr-3 mt-1">✓</span>
                <span>Custom documentation and guides</span>
              </li>
            </ul>
            <a href="/signup?plan=agency" className="btn-primary w-full block text-center">Get Started</a>
          </div>
        </div>

        {/* FAQ */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-white text-center mb-8">Frequently asked questions</h2>
          <div className="space-y-6">
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-2">What do I get with my subscription?</h3>
              <p className="text-gray-400">
                You get complete access to the ZalaStack codebase — a production-ready Next.js 14 application
                with Supabase, Clerk, Stripe, Trigger.dev, and Upstash fully integrated. Everything is yours
                to use in unlimited projects.
              </p>
            </div>
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-2">Can I use this for client work?</h3>
              <p className="text-gray-400">
                Absolutely! The Agency plan is specifically designed for agencies and consultants. You can
                use ZalaStack to build products for your clients without any restrictions.
              </p>
            </div>
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-2">What happens if I cancel?</h3>
              <p className="text-gray-400">
                You retain access to the codebase you've already downloaded. You won't receive future updates
                or new features, but your existing projects continue to work. No code bombs or expiring licenses.
              </p>
            </div>
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-2">Do you offer refunds?</h3>
              <p className="text-gray-400">
                ZalaStack is downloadable digital content. We don't offer refunds, but you can cancel your
                subscription at any time from your dashboard. No questions asked.
              </p>
            </div>
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-2">Is this multi-tenant ready?</h3>
              <p className="text-gray-400">
                Yes! ZalaStack is built with multi-tenancy as a first-class concern. The database schema
                includes org_id isolation, Row Level Security policies, and organization management via Clerk.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

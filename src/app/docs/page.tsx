export default function DocsPage() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-20">
      <div className="max-w-5xl mx-auto">
        <div className="mb-16">
          <h1 className="text-4xl font-bold text-white mb-4">Documentation</h1>
          <p className="text-xl text-gray-400">
            Everything you need to know about using ZalaStack with your projects.
            Built for developers, designed for production.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="card">
            <h2 className="text-xl font-bold text-white mb-3">Getting Started</h2>
            <p className="text-gray-400 mb-4">
              Set up ZalaStack in minutes. Clone, configure, deploy.
            </p>
            <ul className="space-y-2 text-sm">
              <li><a href="#prerequisites" className="text-blue-400 hover:text-blue-300">Prerequisites</a></li>
              <li><a href="#installation" className="text-blue-400 hover:text-blue-300">Installation</a></li>
              <li><a href="#configuration" className="text-blue-400 hover:text-blue-300">Configuration</a></li>
              <li><a href="#deployment" className="text-blue-400 hover:text-blue-300">Deployment</a></li>
            </ul>
          </div>

          <div className="card">
            <h2 className="text-xl font-bold text-white mb-3">Core Concepts</h2>
            <p className="text-gray-400 mb-4">
              Understand the architecture and key patterns.
            </p>
            <ul className="space-y-2 text-sm">
              <li><a href="#architecture" className="text-blue-400 hover:text-blue-300">Architecture Overview</a></li>
              <li><a href="#multi-tenancy" className="text-blue-400 hover:text-blue-300">Multi-tenancy with org_id</a></li>
              <li><a href="#authentication" className="text-blue-400 hover:text-blue-300">Authentication & Authorization</a></li>
              <li><a href="#database" className="text-blue-400 hover:text-blue-300">Database Schema</a></li>
            </ul>
          </div>

          <div className="card">
            <h2 className="text-xl font-bold text-white mb-3">Integrations</h2>
            <p className="text-gray-400 mb-4">
              Deep dives into each service integration.
            </p>
            <ul className="space-y-2 text-sm">
              <li><a href="#supabase" className="text-blue-400 hover:text-blue-300">Supabase (RLS + org_id)</a></li>
              <li><a href="#clerk" className="text-blue-400 hover:text-blue-300">Clerk (proxy.ts)</a></li>
              <li><a href="#stripe" className="text-blue-400 hover:text-blue-300">Stripe (webhooks + billing)</a></li>
              <li><a href="#trigger" className="text-blue-400 hover:text-blue-300">Trigger.dev (background jobs)</a></li>
              <li><a href="#upstash" className="text-blue-400 hover:text-blue-300">Upstash Redis (caching)</a></li>
            </ul>
          </div>

          <div className="card">
            <h2 className="text-xl font-bold text-white mb-3">Advanced</h2>
            <p className="text-gray-400 mb-4">
              Production patterns and best practices.
            </p>
            <ul className="space-y-2 text-sm">
              <li><a href="#security" className="text-blue-400 hover:text-blue-300">Security Review</a></li>
              <li><a href="#audit-logging" className="text-blue-400 hover:text-blue-300">Audit Logging</a></li>
              <li><a href="#monitoring" className="text-blue-400 hover:text-blue-300">Monitoring & Alerts</a></li>
              <li><a href="#scaling" className="text-blue-400 hover:text-blue-300">Scaling Strategies</a></li>
            </ul>
          </div>
        </div>

        {/* Sample content section */}
        <div className="prose prose-invert max-w-none">
          <h2 id="prerequisites" className="text-2xl font-bold text-white mb-6">Prerequisites</h2>
          <div className="card mb-8">
            <p className="text-gray-300 mb-4">Before you begin, ensure you have:</p>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-center">
                <span className="text-blue-500 mr-3">•</span>
                Node.js 18+ and pnpm installed
              </li>
              <li className="flex items-center">
                <span className="text-blue-500 mr-3">•</span>
                Supabase account and project
              </li>
              <li className="flex items-center">
                <span className="text-blue-500 mr-3">•</span>
                Clerk application configured
              </li>
              <li className="flex items-center">
                <span className="text-blue-500 mr-3">•</span>
                Stripe account with products created
              </li>
              <li className="flex items-center">
                <span className="text-blue-500 mr-3">•</span>
                Trigger.dev and Upstash accounts
              </li>
            </ul>
          </div>

          <h2 id="installation" className="text-2xl font-bold text-white mb-6">Installation</h2>
          <div className="card mb-8">
            <p className="text-gray-300 mb-4">Clone and install dependencies:</p>
            <pre className="bg-gray-950 p-4 rounded-lg overflow-x-auto text-sm">
              <code className="text-gray-300">
{`git clone https://github.com/mizoz/zalastack.git
cd zalastack
pnpm install`}
              </code>
            </pre>
          </div>

          <h2 id="configuration" className="text-2xl font-bold text-white mb-6">Configuration</h2>
          <div className="card mb-8">
            <p className="text-gray-300 mb-4">Copy the example environment file and configure:</p>
            <pre className="bg-gray-950 p-4 rounded-lg overflow-x-auto text-sm">
              <code className="text-gray-300">
{`cp .env.example .env.local

# Edit .env.local with your credentials:
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key
CLERK_SECRET_KEY=your_clerk_secret
STRIPE_SECRET_KEY=your_stripe_secret
STRIPE_WEBHOOK_SECRET=your_webhook_secret
TRIGGER_DEV_SECRET_KEY=your_trigger_key
UPSTASH_REDIS_REST_URL=your_upstash_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_token`}
              </code>
            </pre>
          </div>

          <h2 id="security" className="text-2xl font-bold text-white mb-6">Security Model</h2>
          <div className="card mb-8">
            <h3 className="text-lg font-semibold text-white mb-3">What ZalaStack provides</h3>
            <ul className="space-y-2 text-gray-400 mb-6">
              <li>• Row Level Security policies on all tables</li>
              <li>• Organization-scoped data access (org_id isolation)</li>
              <li>• Secure authentication via Clerk</li>
              <li>• Encrypted environment variables</li>
              <li>• Input validation and sanitization</li>
            </ul>
            
            <h3 className="text-lg font-semibold text-white mb-3">What ZalaStack never does</h3>
            <ul className="space-y-2 text-gray-400">
              <li>• Never stores your API keys or credentials</li>
              <li>• Never phones home or collects telemetry</li>
              <li>• Never executes untrusted code</li>
              <li>• Never bypasses RLS policies</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

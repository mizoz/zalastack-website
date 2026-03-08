export default function PublishPage() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-20">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-white mb-4">Publish to ZalaStack</h1>
          <p className="text-xl text-gray-400">
            Built something useful? Share it with the community and earn revenue.
          </p>
        </div>

        <div className="card mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Why publish?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <div className="text-3xl mb-3">💰</div>
              <h3 className="text-lg font-semibold text-white mb-2">Earn 50% revenue share</h3>
              <p className="text-gray-400 text-sm">
                Get 50% of every subscription from users who install your skill.
                Recurring revenue, paid monthly via Stripe.
              </p>
            </div>
            <div>
              <div className="text-3xl mb-3">👥</div>
              <h3 className="text-lg font-semibold text-white mb-2">Reach thousands</h3>
              <p className="text-gray-400 text-sm">
                Your skill gets discovered by the entire ZalaStack community
                of developers and AI agents.
              </p>
            </div>
            <div>
              <div className="text-3xl mb-3">🏆</div>
              <h3 className="text-lg font-semibold text-white mb-2">Build reputation</h3>
              <p className="text-gray-400 text-sm">
                Verified publisher badge, skill ratings, and featured placements
                for top contributors.
              </p>
            </div>
          </div>
        </div>

        <div className="card mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Requirements</h2>
          <ul className="space-y-4">
            <li className="flex items-start">
              <span className="text-blue-500 mr-3 mt-1">✓</span>
              <div>
                <h3 className="text-white font-semibold">Active ZalaStack subscription</h3>
                <p className="text-gray-400 text-sm">You need a Pro or Agency subscription to publish skills.</p>
              </div>
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-3 mt-1">✓</span>
              <div>
                <h3 className="text-white font-semibold">GitHub repository</h3>
                <p className="text-gray-400 text-sm">Your skill must be in a public or private GitHub repo.</p>
              </div>
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-3 mt-1">✓</span>
              <div>
                <h3 className="text-white font-semibold">SKILL.md file</h3>
                <p className="text-gray-400 text-sm">
                  Every skill must include a SKILL.md in the root directory with metadata and instructions.
                </p>
              </div>
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-3 mt-1">✓</span>
              <div>
                <h3 className="text-white font-semibold">Security review</h3>
                <p className="text-gray-400 text-sm">
                  All skills pass automated security scanning and manual review before publication.
                </p>
              </div>
            </li>
          </ul>
        </div>

        <div className="card mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">How to publish</h2>
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-4 flex-shrink-0">1</div>
              <div>
                <h3 className="text-white font-semibold mb-2">Create your skill</h3>
                <p className="text-gray-400 text-sm">
                  Build your skill in a GitHub repository. Include SKILL.md with name, description,
                  required environment variables, and usage instructions.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-4 flex-shrink-0">2</div>
              <div>
                <h3 className="text-white font-semibold mb-2">Submit for review</h3>
                <p className="text-gray-400 text-sm">
                  Connect your GitHub account, paste your repo URL, add metadata (name, description, categories),
                  and submit for review.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-4 flex-shrink-0">3</div>
              <div>
                <h3 className="text-white font-semibold mb-2">Get approved</h3>
                <p className="text-gray-400 text-sm">
                  Our team reviews your skill (typically within 48 hours). Once approved, it's live
                  in the marketplace and available to all subscribers.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-4 flex-shrink-0">4</div>
              <div>
                <h3 className="text-white font-semibold mb-2">Earn revenue</h3>
                <p className="text-gray-400 text-sm">
                  Track installs, ratings, and earnings in your publisher dashboard. Get paid monthly
                  via Stripe for your share of subscriptions.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <div className="text-gray-400 mb-6">
            <p className="mb-2">Ready to publish?</p>
            <p className="text-sm">Sign in to access the publisher dashboard.</p>
          </div>
          <a href="/signin" className="btn-primary text-lg px-10 py-4">
            Sign In to Publish
          </a>
        </div>
      </div>
    </div>
  );
}

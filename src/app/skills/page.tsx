export default function SkillsPage() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-white mb-4">Skills Marketplace</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Browse and install skills to extend your ZalaStack agent's capabilities.
          </p>
        </div>

        <div className="text-center py-20">
          <div className="text-6xl mb-6">🚧</div>
          <h2 className="text-2xl font-bold text-white mb-4">Coming Soon</h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            The ZalaStack skills marketplace is under construction. Soon you'll be able to browse,
            install, and manage skills that extend your agent's capabilities with pre-built integrations,
            automation workflows, and specialized tools.
          </p>
        </div>

        <div className="mt-16 grid md:grid-cols-3 gap-6">
          <div className="card text-center">
            <div className="text-3xl mb-4">📦</div>
            <h3 className="text-lg font-semibold text-white mb-2">Pre-built Integrations</h3>
            <p className="text-gray-400 text-sm">
              Ready-to-use integrations for popular services and APIs.
            </p>
          </div>
          <div className="card text-center">
            <div className="text-3xl mb-4">⚡</div>
            <h3 className="text-lg font-semibold text-white mb-2">Automation Workflows</h3>
            <p className="text-gray-400 text-sm">
              Trigger.dev-powered workflows for common automation scenarios.
            </p>
          </div>
          <div className="card text-center">
            <div className="text-3xl mb-4">🛠️</div>
            <h3 className="text-lg font-semibold text-white mb-2">Developer Tools</h3>
            <p className="text-gray-400 text-sm">
              Specialized tools for debugging, monitoring, and optimization.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

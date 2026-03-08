export default function PrivacyPage() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-20">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">Privacy Policy</h1>
        
        <div className="prose prose-invert max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">What We Collect</h2>
            <div className="card">
              <ul className="space-y-3 text-gray-300">
                <li>• Your email address (for account creation and login)</li>
                <li>• Your GitHub username (when you link your GitHub account)</li>
                <li>• Basic usage data (skills installed, page visits)</li>
                <li>• Payment information (handled securely by Stripe)</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">What We Don't Collect</h2>
            <div className="card">
              <ul className="space-y-3 text-gray-300">
                <li>• Your API keys stay local on your machine — we never see or store them</li>
                <li>• We do not read, store, or analyze the content of your agent conversations</li>
                <li>• We do not collect payment card details (handled by Stripe)</li>
                <li>• We do not track your browsing activity outside ZalaStack</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">How We Use Your Data</h2>
            <div className="card">
              <p className="text-gray-300 mb-4">
                We use the data we collect solely to:
              </p>
              <ul className="space-y-2 text-gray-400">
                <li>• Provide and maintain the ZalaStack service</li>
                <li>• Process your subscription payments</li>
                <li>• Send you important service updates and announcements</li>
                <li>• Improve our products and documentation</li>
                <li>• Respond to your support requests</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Cookies</h2>
            <div className="card">
              <p className="text-gray-300">
                We use cookies strictly for authentication and session management. 
                No advertising or tracking cookies. You can disable cookies in your 
                browser settings, but this may affect your ability to use certain features.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Data Sharing</h2>
            <div className="card">
              <p className="text-gray-300 mb-4">
                We do not sell, rent, or share your personal data with third parties, except:
              </p>
              <ul className="space-y-2 text-gray-400">
                <li>• With Stripe for payment processing</li>
                <li>• With GitHub when you choose to link your account</li>
                <li>• When required by law or to protect our rights</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Data Retention</h2>
            <div className="card">
              <p className="text-gray-300">
                We retain your data for as long as your account is active. You can request 
                deletion of your data at any time by contacting support. We'll delete your 
                data within 30 days, except where we're required to retain it for legal or 
                financial purposes.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Security</h2>
            <div className="card">
              <p className="text-gray-300">
                We implement industry-standard security measures to protect your data, 
                including encryption in transit and at rest, secure authentication via Clerk, 
                and regular security audits. However, no internet transmission is 100% secure.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Your Rights</h2>
            <div className="card">
              <p className="text-gray-300 mb-4">
                Depending on your location, you may have the right to:
              </p>
              <ul className="space-y-2 text-gray-400">
                <li>• Access the personal data we hold about you</li>
                <li>• Correct inaccurate data</li>
                <li>• Request deletion of your data</li>
                <li>• Export your data in a portable format</li>
                <li>• Opt out of marketing communications</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Changes to This Policy</h2>
            <div className="card">
              <p className="text-gray-300">
                We may update this privacy policy from time to time. We'll notify you of 
                significant changes via email or by posting a notice on our website. Your 
                continued use of ZalaStack after changes constitutes acceptance of the updated policy.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Contact</h2>
            <div className="card">
              <p className="text-gray-300">
                Questions about privacy? Email us at{' '}
                <a href="mailto:support@zalastack.com" className="text-blue-400 hover:text-blue-300">
                  support@zalastack.com
                </a>
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default function TermsPage() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-20">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">Terms of Service</h1>
        
        <div className="prose prose-invert max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Subscription</h2>
            <div className="card">
              <p className="text-gray-300 mb-4">
                ZalaStack Pro costs $49/month. ZalaStack Agency costs $199/month. 
                Your subscription renews automatically each billing cycle unless cancelled. 
                You may cancel at any time from your dashboard or Stripe portal.
              </p>
              <p className="text-gray-400 text-sm">
                Prices are in USD and exclude applicable taxes. We reserve the right to 
                change pricing with 30 days notice.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Refunds</h2>
            <div className="card">
              <p className="text-gray-300">
                ZalaStack is downloadable digital content (source code). All payments are 
                non-refundable. When you cancel, you retain access until the end of your 
                current billing period. Downloaded code remains yours to use indefinitely.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">License</h2>
            <div className="card">
              <p className="text-gray-300 mb-4">
                Your subscription grants you a non-exclusive, non-transferable license to:
              </p>
              <ul className="space-y-2 text-gray-400 mb-4">
                <li>• Use the ZalaStack codebase in unlimited projects</li>
                <li>• Modify and customize the code for your needs</li>
                <li>• Deploy applications built with ZalaStack</li>
                <li>• Use ZalaStack for commercial client work</li>
              </ul>
              <p className="text-gray-300 mb-4">
                You may NOT:
              </p>
              <ul className="space-y-2 text-gray-400">
                <li>• Resell or redistribute the ZalaStack codebase as-is</li>
                <li>• Share your account credentials or API keys</li>
                <li>• Reverse-engineer or attempt to access the source code without a subscription</li>
                <li>• Use ZalaStack for illegal or harmful purposes</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Acceptable Use</h2>
            <div className="card">
              <p className="text-gray-300 mb-4">
                You agree not to:
              </p>
              <ul className="space-y-2 text-gray-400">
                <li>• Reverse-engineer, scrape, or redistribute ZalaStack content</li>
                <li>• Share your account credentials or API keys with others</li>
                <li>• Use ZalaStack for illegal activities or to violate others' rights</li>
                <li>• Attempt to circumvent rate limits, access controls, or payment</li>
                <li>• Interfere with or disrupt ZalaStack's servers or networks</li>
                <li>• Use automated systems to access ZalaStack without permission</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Third-Party Services</h2>
            <div className="card">
              <p className="text-gray-300">
                ZalaStack integrates with third-party services (Supabase, Clerk, Stripe, 
                Trigger.dev, Upstash). You are responsible for:
              </p>
              <ul className="space-y-2 text-gray-400 mt-4">
                <li>• Maintaining your own accounts with these services</li>
                <li>• Complying with their terms of service</li>
                <li>• Paying any fees they charge (separate from ZalaStack)</li>
                <li>• Securing your API keys and credentials</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Disclaimer of Warranties</h2>
            <div className="card">
              <p className="text-gray-300">
                ZalaStack is provided "as is" without warranties of any kind, express or 
                implied. We do not warrant that ZalaStack will be uninterrupted, error-free, 
                or secure. You use ZalaStack at your own risk.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Limitation of Liability</h2>
            <div className="card">
              <p className="text-gray-300">
                To the maximum extent permitted by law, ZalaStack shall not be liable for 
                any indirect, incidental, special, consequential, or punitive damages, 
                including loss of profits, data, or business opportunities. Our total 
                liability shall not exceed the amount you paid in the 12 months preceding 
                the claim.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Termination</h2>
            <div className="card">
              <p className="text-gray-300">
                We reserve the right to suspend or terminate your account for violations 
                of these terms, abuse of the platform, or any activity that harms ZalaStack 
                or its users. We'll provide notice when possible, but may terminate immediately 
                for severe violations.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Governing Law</h2>
            <div className="card">
              <p className="text-gray-300">
                These terms are governed by the laws of Alberta, Canada, without regard to 
                conflict of law principles. Any disputes shall be resolved in the courts of 
                Calgary, Alberta.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Changes to Terms</h2>
            <div className="card">
              <p className="text-gray-300">
                We may update these terms from time to time. We'll notify you of significant 
                changes via email or by posting a notice on our website. Your continued use 
                of ZalaStack after changes constitutes acceptance of the updated terms.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Contact</h2>
            <div className="card">
              <p className="text-gray-300">
                Questions about these terms? Email us at{' '}
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

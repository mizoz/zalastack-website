import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ZalaStack - Full-Stack SaaS Starter for AI Agents",
  description: "The premium full-stack SaaS starter for OpenClaw AI agents. Next.js 14, Supabase, Clerk, Stripe, Trigger.dev, Upstash. Multi-tenant ready.",
  keywords: ["SaaS starter", "Next.js", "Supabase", "Clerk", "Stripe", "AI agents", "OpenClaw"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="border-b border-gray-800 bg-gray-950/50 backdrop-blur-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-8">
                <a href="/" className="text-xl font-bold text-white">ZalaStack</a>
                <div className="hidden md:flex items-center space-x-6">
                  <a href="/stack" className="nav-link">Tech Stack</a>
                  <a href="/skills" className="nav-link">Marketplace</a>
                  <a href="/pricing" className="nav-link">Pricing</a>
                  <a href="/publish" className="nav-link">Publish</a>
                </div>
              </div>
              <div className="flex items-center space-x-6">
                <div className="hidden md:flex items-center space-x-6">
                  <a href="/docs" className="nav-link">Documentation</a>
                  <a href="https://github.com/mizoz/zalastack" className="nav-link">GitHub</a>
                </div>
                <a href="/signin" className="btn-secondary text-sm">Sign In</a>
                <a href="/signup" className="btn-primary text-sm">Get Started</a>
              </div>
            </div>
          </div>
        </nav>
        <main className="min-h-screen">
          {children}
        </main>
        <footer className="border-t border-gray-800 bg-gray-950 mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-sm font-semibold text-white mb-4">Product</h3>
                <ul className="space-y-3">
                  <li><a href="/stack" className="text-gray-400 hover:text-white text-sm">Tech Stack</a></li>
                  <li><a href="/skills" className="text-gray-400 hover:text-white text-sm">Marketplace</a></li>
                  <li><a href="/pricing" className="text-gray-400 hover:text-white text-sm">Pricing</a></li>
                  <li><a href="/publish" className="text-gray-400 hover:text-white text-sm">Publish a Stack</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white mb-4">Resources</h3>
                <ul className="space-y-3">
                  <li><a href="/docs" className="text-gray-400 hover:text-white text-sm">Documentation</a></li>
                  <li><a href="/docs#setup" className="text-gray-400 hover:text-white text-sm">Setup Guide</a></li>
                  <li><a href="/docs#security" className="text-gray-400 hover:text-white text-sm">Security</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white mb-4">Legal</h3>
                <ul className="space-y-3">
                  <li><a href="/privacy" className="text-gray-400 hover:text-white text-sm">Privacy</a></li>
                  <li><a href="/terms" className="text-gray-400 hover:text-white text-sm">Terms</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white mb-4">Connect</h3>
                <ul className="space-y-3">
                  <li><a href="https://github.com/mizoz/zalastack" className="text-gray-400 hover:text-white text-sm">GitHub</a></li>
                  <li><a href="https://twitter.com/zalastack" className="text-gray-400 hover:text-white text-sm">Twitter</a></li>
                  <li><a href="mailto:support@zalastack.com" className="text-gray-400 hover:text-white text-sm">Support</a></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-8 pt-8">
              <p className="text-gray-500 text-sm">© 2026 ZalaStack. All rights reserved. Built for OpenClaw agents.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}

"use client";

import { useState } from "react";

export default function PricingPage() {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "annual">("monthly");
  const [teamSize, setTeamSize] = useState(1);

  const plans = {
    pro: {
      name: "Pro",
      description: "Perfect for individual developers building SaaS products",
      monthlyPrice: 49,
      annualPrice: 35, // ~40% off
      lifetimePrice: 349,
      badge: "Most Popular",
      features: [
        "Complete ZalaStack codebase with all integrations",
        "Unlimited projects and deployments",
        "Next.js 14 App Router architecture",
        "Supabase with RLS and org_id multi-tenancy",
        "Clerk authentication with organizations",
        "Stripe billing and webhooks",
        "Trigger.dev background jobs",
        "Upstash Redis integration",
        "Community Discord support",
        "Regular updates and new features",
      ],
      ctaColor: "bg-blue-600 hover:bg-blue-700",
      isPopular: true,
    },
    agency: {
      name: "Agency",
      description: "For teams and agencies building multiple products",
      monthlyPrice: 199,
      annualPrice: 149, // ~40% off
      lifetimePrice: 1349,
      badge: null,
      features: [
        "Everything in Pro, plus:",
        "Multi-team collaboration features",
        "Priority email support (24h response)",
        "Custom integration assistance",
        "Early access to beta features",
        "White-label options available",
        "Team onboarding sessions",
        "Custom documentation and guides",
        "Dedicated Slack channel",
        "Monthly strategy calls",
      ],
      ctaColor: "bg-purple-600 hover:bg-purple-700",
      isPopular: false,
    },
  };

  const calculateSavings = (monthly: number, annual: number) => {
    return Math.round(((monthly * 12 - annual * 12) / (monthly * 12)) * 100);
  };

  const calculateTeamCost = (price: number) => {
    return price * teamSize;
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-white mb-4">
            Simple, transparent pricing
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
            One subscription gives you unlimited access to the complete ZalaStack
            codebase. No per-project fees. No hidden costs.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mb-4">
            <button
              onClick={() => setBillingPeriod("monthly")}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                billingPeriod === "monthly"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-800 text-gray-400 hover:text-white"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingPeriod("annual")}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                billingPeriod === "annual"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-800 text-gray-400 hover:text-white"
              }`}
            >
              Annual
            </button>
          </div>
          {billingPeriod === "annual" && (
            <div className="inline-flex items-center gap-2 bg-green-900/30 text-green-400 px-4 py-2 rounded-full text-sm font-medium">
              <span>💰</span>
              <span>Save {calculateSavings(plans.pro.monthlyPrice, plans.pro.annualPrice)}% with annual billing</span>
            </div>
          )}
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
          {/* Pro Plan */}
          <div className="card border-blue-500/50 relative overflow-hidden">
            {plans.pro.isPopular && (
              <div className="absolute -top-4 left-6 bg-blue-600 text-white text-sm font-medium px-3 py-1 rounded-full z-10">
                ⭐ Most Popular
              </div>
            )}
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-bl-full -mr-8 -mt-8" />
            
            <div className="relative">
              <h3 className="text-2xl font-bold text-white mb-2">{plans.pro.name}</h3>
              <p className="text-gray-400 mb-6">{plans.pro.description}</p>
              
              <div className="mb-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-bold text-white">
                    ${billingPeriod === "monthly" ? plans.pro.monthlyPrice : plans.pro.annualPrice}
                  </span>
                  <span className="text-gray-400">
                    /{billingPeriod === "monthly" ? "month" : "month"}
                  </span>
                </div>
                {billingPeriod === "annual" && (
                  <p className="text-sm text-gray-500 mt-1">
                    Billed ${plans.pro.annualPrice * 12} yearly (save ${(plans.pro.monthlyPrice - plans.pro.annualPrice) * 12}/year)
                  </p>
                )}
              </div>

              {/* Team Size Calculator */}
              <div className="mb-6 p-4 bg-gray-800/50 rounded-lg">
                <label className="block text-sm text-gray-400 mb-2">
                  Team size: <span className="text-white font-medium">{teamSize}</span> {teamSize === 1 ? 'seat' : 'seats'}
                </label>
                <input
                  type="range"
                  min="1"
                  max="20"
                  value={teamSize}
                  onChange={(e) => setTeamSize(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>1</span>
                  <span>10</span>
                  <span>20</span>
                </div>
                <div className="mt-3 pt-3 border-t border-gray-700">
                  <p className="text-sm text-gray-400">
                    Total: <span className="text-white font-bold text-lg">
                      ${calculateTeamCost(billingPeriod === "monthly" ? plans.pro.monthlyPrice : plans.pro.annualPrice)}
                    </span>{" "}
                    <span className="text-gray-500">/{billingPeriod === "monthly" ? "month" : "month"}</span>
                  </p>
                  <p className="text-xs text-gray-500">
                    (${billingPeriod === "monthly" ? plans.pro.monthlyPrice : plans.pro.annualPrice} per seat)
                  </p>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {plans.pro.features.map((feature, index) => (
                  <li key={index} className="flex items-start text-gray-300">
                    <span className="text-blue-500 mr-3 mt-1 flex-shrink-0">✓</span>
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href="/signup?plan=pro"
                className={`btn-primary w-full block text-center ${plans.pro.ctaColor}`}
              >
                Get Started with Pro
              </a>

              {/* Lifetime License */}
              <div className="mt-4 p-4 bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-lg border border-blue-500/30">
                <p className="text-sm text-gray-400 mb-2">💎 Lifetime License</p>
                <p className="text-2xl font-bold text-white mb-2">${plans.pro.lifetimePrice}</p>
                <p className="text-xs text-gray-500 mb-3">One-time payment. Forever access.</p>
                <a
                  href="/signup?plan=pro-lifetime"
                  className="block text-center text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors"
                >
                  Buy Lifetime →
                </a>
              </div>
            </div>
          </div>

          {/* Agency Plan */}
          <div className="card border-purple-500/50 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-bl-full -mr-8 -mt-8" />
            
            <div className="relative">
              <h3 className="text-2xl font-bold text-white mb-2">{plans.agency.name}</h3>
              <p className="text-gray-400 mb-6">{plans.agency.description}</p>
              
              <div className="mb-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-bold text-white">
                    ${billingPeriod === "monthly" ? plans.agency.monthlyPrice : plans.agency.annualPrice}
                  </span>
                  <span className="text-gray-400">
                    /{billingPeriod === "monthly" ? "month" : "month"}
                  </span>
                </div>
                {billingPeriod === "annual" && (
                  <p className="text-sm text-gray-500 mt-1">
                    Billed ${plans.agency.annualPrice * 12} yearly (save ${(plans.agency.monthlyPrice - plans.agency.annualPrice) * 12}/year)
                  </p>
                )}
              </div>

              {/* Team Size Calculator */}
              <div className="mb-6 p-4 bg-gray-800/50 rounded-lg">
                <label className="block text-sm text-gray-400 mb-2">
                  Team size: <span className="text-white font-medium">{teamSize}</span> {teamSize === 1 ? 'seat' : 'seats'}
                </label>
                <input
                  type="range"
                  min="1"
                  max="20"
                  value={teamSize}
                  onChange={(e) => setTeamSize(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-600"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>1</span>
                  <span>10</span>
                  <span>20</span>
                </div>
                <div className="mt-3 pt-3 border-t border-gray-700">
                  <p className="text-sm text-gray-400">
                    Total: <span className="text-white font-bold text-lg">
                      ${calculateTeamCost(billingPeriod === "monthly" ? plans.agency.monthlyPrice : plans.agency.annualPrice)}
                    </span>{" "}
                    <span className="text-gray-500">/{billingPeriod === "monthly" ? "month" : "month"}</span>
                  </p>
                  <p className="text-xs text-gray-500">
                    (${billingPeriod === "monthly" ? plans.agency.monthlyPrice : plans.agency.annualPrice} per seat)
                  </p>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {plans.agency.features.map((feature, index) => (
                  <li key={index} className="flex items-start text-gray-300">
                    <span className="text-purple-500 mr-3 mt-1 flex-shrink-0">✓</span>
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href="/signup?plan=agency"
                className={`btn-primary w-full block text-center ${plans.agency.ctaColor}`}
              >
                Get Started with Agency
              </a>

              {/* Lifetime License */}
              <div className="mt-4 p-4 bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-lg border border-purple-500/30">
                <p className="text-sm text-gray-400 mb-2">💎 Lifetime License</p>
                <p className="text-2xl font-bold text-white mb-2">${plans.agency.lifetimePrice}</p>
                <p className="text-xs text-gray-500 mb-3">One-time payment. Forever access.</p>
                <a
                  href="/signup?plan=agency-lifetime"
                  className="block text-center text-sm font-medium text-purple-400 hover:text-purple-300 transition-colors"
                >
                  Buy Lifetime →
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex flex-col items-center p-4 bg-gray-800/30 rounded-lg">
              <div className="text-2xl mb-2">🔒</div>
              <p className="text-sm text-gray-400 text-center">Secure Checkout</p>
              <p className="text-xs text-gray-500 text-center">256-bit SSL encryption</p>
            </div>
            <div className="flex flex-col items-center p-4 bg-gray-800/30 rounded-lg">
              <div className="text-2xl mb-2">📄</div>
              <p className="text-sm text-gray-400 text-center">VAT Invoicing</p>
              <p className="text-xs text-gray-500 text-center">Automatic receipts</p>
            </div>
            <div className="flex flex-col items-center p-4 bg-gray-800/30 rounded-lg">
              <div className="text-2xl mb-2">🎯</div>
              <p className="text-sm text-gray-400 text-center">14-Day Trial</p>
              <p className="text-xs text-gray-500 text-center">Full access, no CC</p>
            </div>
            <div className="flex flex-col items-center p-4 bg-gray-800/30 rounded-lg">
              <div className="text-2xl mb-2">♾️</div>
              <p className="text-sm text-gray-400 text-center">Unlimited Projects</p>
              <p className="text-xs text-gray-500 text-center">No restrictions</p>
            </div>
          </div>
        </div>

        {/* Feature Comparison Table */}
        <div className="max-w-6xl mx-auto mb-16">
          <h2 className="text-2xl font-bold text-white text-center mb-8">
            Compare features
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="py-4 px-6 text-gray-400 font-medium">Feature</th>
                  <th className="py-4 px-6 text-white font-bold text-center">Pro</th>
                  <th className="py-4 px-6 text-white font-bold text-center">Agency</th>
                </tr>
              </thead>
              <tbody className="text-gray-300">
                <tr className="border-b border-gray-800">
                  <td className="py-4 px-6">Complete ZalaStack codebase</td>
                  <td className="py-4 px-6 text-center text-green-500">✓</td>
                  <td className="py-4 px-6 text-center text-green-500">✓</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="py-4 px-6">Unlimited projects</td>
                  <td className="py-4 px-6 text-center text-green-500">✓</td>
                  <td className="py-4 px-6 text-center text-green-500">✓</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="py-4 px-6">Next.js 14 App Router</td>
                  <td className="py-4 px-6 text-center text-green-500">✓</td>
                  <td className="py-4 px-6 text-center text-green-500">✓</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="py-4 px-6">Supabase + RLS + org_id</td>
                  <td className="py-4 px-6 text-center text-green-500">✓</td>
                  <td className="py-4 px-6 text-center text-green-500">✓</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="py-4 px-6">Clerk authentication</td>
                  <td className="py-4 px-6 text-center text-green-500">✓</td>
                  <td className="py-4 px-6 text-center text-green-500">✓</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="py-4 px-6">Stripe billing integration</td>
                  <td className="py-4 px-6 text-center text-green-500">✓</td>
                  <td className="py-4 px-6 text-center text-green-500">✓</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="py-4 px-6">Trigger.dev background jobs</td>
                  <td className="py-4 px-6 text-center text-green-500">✓</td>
                  <td className="py-4 px-6 text-center text-green-500">✓</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="py-4 px-6">Upstash Redis</td>
                  <td className="py-4 px-6 text-center text-green-500">✓</td>
                  <td className="py-4 px-6 text-center text-green-500">✓</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="py-4 px-6">Community Discord support</td>
                  <td className="py-4 px-6 text-center text-green-500">✓</td>
                  <td className="py-4 px-6 text-center text-green-500">✓</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="py-4 px-6">Regular updates</td>
                  <td className="py-4 px-6 text-center text-green-500">✓</td>
                  <td className="py-4 px-6 text-center text-green-500">✓</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="py-4 px-6">Multi-team collaboration</td>
                  <td className="py-4 px-6 text-center text-gray-600">—</td>
                  <td className="py-4 px-6 text-center text-green-500">✓</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="py-4 px-6">Priority email support (24h)</td>
                  <td className="py-4 px-6 text-center text-gray-600">—</td>
                  <td className="py-4 px-6 text-center text-green-500">✓</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="py-4 px-6">Custom integration assistance</td>
                  <td className="py-4 px-6 text-center text-gray-600">—</td>
                  <td className="py-4 px-6 text-center text-green-500">✓</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="py-4 px-6">Early access to beta features</td>
                  <td className="py-4 px-6 text-center text-gray-600">—</td>
                  <td className="py-4 px-6 text-center text-green-500">✓</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="py-4 px-6">White-label options</td>
                  <td className="py-4 px-6 text-center text-gray-600">—</td>
                  <td className="py-4 px-6 text-center text-green-500">✓</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="py-4 px-6">Team onboarding sessions</td>
                  <td className="py-4 px-6 text-center text-gray-600">—</td>
                  <td className="py-4 px-6 text-center text-green-500">✓</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="py-4 px-6">Custom documentation</td>
                  <td className="py-4 px-6 text-center text-gray-600">—</td>
                  <td className="py-4 px-6 text-center text-green-500">✓</td>
                </tr>
                <tr>
                  <td className="py-4 px-6">Dedicated Slack channel</td>
                  <td className="py-4 px-6 text-center text-gray-600">—</td>
                  <td className="py-4 px-6 text-center text-green-500">✓</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-white text-center mb-8">
            Frequently asked questions
          </h2>
          <div className="space-y-6">
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-2">
                What do I get with my subscription?
              </h3>
              <p className="text-gray-400">
                You get complete access to the ZalaStack codebase — a production-ready
                Next.js 14 application with Supabase, Clerk, Stripe, Trigger.dev, and
                Upstash fully integrated. Everything is yours to use in unlimited projects.
              </p>
            </div>
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-2">
                Can I use this for client work?
              </h3>
              <p className="text-gray-400">
                Absolutely! The Agency plan is specifically designed for agencies and
                consultants. You can use ZalaStack to build products for your clients
                without any restrictions.
              </p>
            </div>
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-2">
                What happens if I cancel?
              </h3>
              <p className="text-gray-400">
                You retain access to the codebase you've already downloaded. You won't
                receive future updates or new features, but your existing projects
                continue to work. No code bombs or expiring licenses.
              </p>
            </div>
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-2">
                Do you offer refunds?
              </h3>
              <p className="text-gray-400">
                ZalaStack is downloadable digital content. We don't offer refunds, but
                you can cancel your subscription at any time from your dashboard. No
                questions asked.
              </p>
            </div>
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-2">
                Is this multi-tenant ready?
              </h3>
              <p className="text-gray-400">
                Yes! ZalaStack is built with multi-tenancy as a first-class concern.
                The database schema includes org_id isolation, Row Level Security
                policies, and organization management via Clerk.
              </p>
            </div>
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-2">
                What's the difference between monthly and annual?
              </h3>
              <p className="text-gray-400">
                Annual billing gives you a 40% discount compared to monthly. You're
                billed once per year instead of monthly, and you save significant money
                over time. You can switch between plans anytime from your dashboard.
              </p>
            </div>
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-2">
                What is the lifetime license?
              </h3>
              <p className="text-gray-400">
                Lifetime license is a one-time payment that gives you permanent access
                to the current version of ZalaStack and all updates for life. No
                recurring payments. Perfect if you want to lock in access forever.
              </p>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center mt-16">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to build faster?
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            Join hundreds of developers shipping with ZalaStack
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/signup?plan=pro"
              className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-all text-lg"
            >
              Start with Pro - $49/mo
            </a>
            <a
              href="/signup?plan=agency"
              className="px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg transition-all text-lg"
            >
              Start with Agency - $199/mo
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

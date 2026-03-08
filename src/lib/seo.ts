import { Metadata } from 'next';

// Base metadata for the site
export const siteMetadata: Metadata = {
  title: {
    default: 'ZalaStack - The Premium Full-Stack SaaS Starter for AI Agents',
    template: '%s | ZalaStack',
  },
  description: 'Production-ready SaaS starter with Next.js 14, Supabase, Clerk, Stripe, Trigger.dev, and Upstash. Multi-tenant ready from day one.',
  keywords: [
    'SaaS starter',
    'Next.js 14',
    'Supabase',
    'Clerk',
    'Stripe',
    'Trigger.dev',
    'Upstash',
    'Multi-tenant',
    'AI agent backend',
    'SaaS boilerplate',
  ],
  authors: [{ name: 'ZalaStack', url: 'https://zalastack.com' }],
  creator: 'ZalaStack',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://zalastack.com',
    title: 'ZalaStack - The Premium Full-Stack SaaS Starter for AI Agents',
    description: 'Production-ready SaaS starter with Next.js 14, Supabase, Clerk, Stripe, Trigger.dev, and Upstash. Multi-tenant ready from day one.',
    siteName: 'ZalaStack',
    images: [
      {
        url: 'https://zalastack.com/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'ZalaStack - Premium Full-Stack SaaS Starter',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ZalaStack - The Premium Full-Stack SaaS Starter for AI Agents',
    description: 'Production-ready SaaS starter with Next.js 14, Supabase, Clerk, Stripe, Trigger.dev, and Upstash.',
    creator: '@zalastack',
    images: ['https://zalastack.com/opengraph-image.png'],
  },
  verification: {
    google: 'your-google-site-verification-code',
    yandex: 'your-yandex-verification-code',
  },
  instagram: 'https://instagram.com/zalastack',
  github: 'https://github.com/mizoz/zalastack-website',
};

// Organization structured data
export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'ZalaStack',
  url: 'https://zalastack.com',
  logo: 'https://zalastack.com/logo.png',
  description: 'Production-ready SaaS starter for AI agents',
  sameAs: [
    'https://github.com/mizoz/zalastack-website',
  ],
};

// Product structured data for Pro plan
export const proPlanSchema = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'ZalaStack Pro',
  description: 'Complete SaaS starter for individual developers',
  brand: {
    '@type': 'Brand',
    name: 'ZalaStack',
  },
  offers: {
    '@type': 'Offer',
    price: '49',
    priceCurrency: 'USD',
    priceType: 'Subscription',
    availability: 'https://schema.org/InStock',
    url: 'https://zalastack.com/pricing',
  },
};

// FAQ structured data
export const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What do I get with my ZalaStack subscription?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'You get complete access to the ZalaStack codebase — a production-ready Next.js 14 application with Supabase, Clerk, Stripe, Trigger.dev, and Upstash fully integrated. Everything is yours to use in unlimited projects.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I use this for client work?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Absolutely! The Agency plan is specifically designed for agencies and consultants. You can use ZalaStack to build products for your clients without any restrictions.',
      },
    },
    {
      '@type': 'Question',
      name: 'What happens if I cancel?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'You retain access to the codebase you have already downloaded. You won’t receive future updates or new features, but your existing projects continue to work. No code bombs or expiring licenses.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is this multi-tenant ready?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes! ZalaStack is built with multi-tenancy as a first-class concern. The database schema includes org_id isolation, Row Level Security policies, and organization management via Clerk.',
      },
    },
  ],
};

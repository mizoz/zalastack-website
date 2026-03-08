import { siteMetadata, organizationSchema, proPlanSchema } from '@/lib/seo';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Basic meta tags */}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Title */}
        <title>{siteMetadata.title.default}</title>
        <meta name="description" content={siteMetadata.description} />
        <meta name="keywords" content={siteMetadata.keywords.join(', ')} />
        
        {/* Author */}
        <meta name="author" content={siteMetadata.authors[0].name} />
        <meta name="creator" content={siteMetadata.creator} />
        
        {/* Open Graph */}
        <meta property="og:title" content={siteMetadata.openGraph.title} />
        <meta property="og:description" content={siteMetadata.openGraph.description} />
        <meta property="og:type" content={siteMetadata.openGraph.type} />
        <meta property="og:locale" content={siteMetadata.openGraph.locale} />
        <meta property="og:site_name" content={siteMetadata.openGraph.siteName} />
        <meta property="og:image" content={siteMetadata.openGraph.images[0].url} />
        <meta property="og:image:width" content={siteMetadata.openGraph.images[0].width.toString()} />
        <meta property="og:image:height" content={siteMetadata.openGraph.images[0].height.toString()} />
        <meta property="og:image:alt" content={siteMetadata.openGraph.images[0].alt} />
        
        {/* Twitter */}
        <meta name="twitter:card" content={siteMetadata.twitter.card} />
        <meta name="twitter:title" content={siteMetadata.twitter.title} />
        <meta name="twitter:description" content={siteMetadata.twitter.description} />
        <meta name="twitter:creator" content={siteMetadata.twitter.creator} />
        <meta name="twitter:image" content={siteMetadata.twitter.images[0]} />
        
        {/* Verification */}
        <meta name="google-site-verification" content={siteMetadata.verification?.google || ''} />
        <meta name="yandex-verification" content={siteMetadata.verification?.yandex || ''} />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://zalastack.com" />
        
        {/* Social Links */}
        <meta name="instagram" content={siteMetadata.instagram} />
        <meta name="github" content={siteMetadata.github} />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon-16x16.png" sizes="16x16" type="image/png" />
        <link rel="icon" href="/favicon-32x32.png" sizes="32x32" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* Preconnect */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(proPlanSchema) }}
        />
      </head>
      <body className="font-sans antialiased bg-gray-900 text-gray-100">
        {children}
      </body>
    </html>
  );
}

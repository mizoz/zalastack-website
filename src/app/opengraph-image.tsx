import { Metadata } from 'next';
import { siteMetadata } from '@/lib/seo';

export default function OpenGraphImage() {
  return (
    <div style={{
      width: '100%',
      height: '100%',
      background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '1200px',
        textAlign: 'center'
      }}>
        <div style={{
          fontSize: '64px',
          marginBottom: '30px'
        }}>
          🦞
        </div>
        <h1 style={{
          fontSize: '72px',
          color: '#ffffff',
          margin: '0 0 20px 0',
          fontWeight: '800',
          lineHeight: '1.1'
        }}>
          ZalaStack
        </h1>
        <p style={{
          fontSize: '48px',
          color: '#60a5fa',
          margin: '0 0 40px 0',
          fontWeight: '600'
        }}>
          The Premium Full-Stack SaaS Starter
        </p>
        <p style={{
          fontSize: '32px',
          color: '#d1d5db',
          margin: '0',
          lineHeight: '1.4',
          maxWidth: '800px',
          margin: '0 auto',
          display: 'block'
        }}>
          Production-ready Next.js 14, Supabase, Clerk, Stripe, Trigger.dev, Upstash
        </p>
        <div style={{
          marginTop: '60px',
          display: 'flex',
          justifyContent: 'center',
          gap: '20px'
        }}>
          <div style={{
            background: '#1e293b',
            padding: '16px 32px',
            borderRadius: '12px',
            border: '1px solid #3b82f6'
          }}>
            <div style={{ fontSize: '18px', color: '#60a5fa' }}>Pro</div>
            <div style={{ fontSize: '48px', color: '#ffffff', fontWeight: 'bold' }}>$49</div>
            <div style={{ fontSize: '16px', color: '#9ca3af' }}>/month</div>
          </div>
          <div style={{
            background: '#1e293b',
            padding: '16px 32px',
            borderRadius: '12px',
            border: '1px solid #8b5cf6'
          }}>
            <div style={{ fontSize: '18px', color: '#a855f7' }}>Agency</div>
            <div style={{ fontSize: '48px', color: '#ffffff', fontWeight: 'bold' }}>$199</div>
            <div style={{ fontSize: '16px', color: '#9ca3af' }}>/month</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Set image dimensions
export const runtime = 'edge';
export const alt = 'ZalaStack - The Premium Full-Stack SaaS Starter for AI Agents';
export const contentType = 'image/png';
export const size = { width: 1200, height: 630 };

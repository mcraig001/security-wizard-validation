'use client';

import Link from 'next/link';
import { useState } from 'react';

const FEATURES = {
  free: [
    'AI-powered security recommendation',
    'Amazon product links with pricing',
    'Setup difficulty rating',
    'Email delivery of your recommendation',
  ],
  premium: [
    'Everything in Free',
    'Monthly security check-ins & updates',
    'Priority email support from security advisors',
    'New product alerts when better options emerge',
    'Seasonal safety tips (holidays, storms, travel)',
    'Family sharing — add up to 3 family members',
    'PDF download of your full security plan',
  ],
};

export default function PremiumPage() {
  const [loading, setLoading] = useState<'monthly' | 'annual' | null>(null);

  async function handleCheckout(plan: 'monthly' | 'annual') {
    setLoading(plan);
    try {
      const res = await fetch('/api/checkout/safenest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan }),
      });
      const { url, error } = await res.json();
      if (error) throw new Error(error);
      window.location.href = url;
    } catch {
      alert('Something went wrong. Please try again.');
      setLoading(null);
    }
  }

  return (
    <main style={{ maxWidth: '800px', margin: '0 auto', padding: '48px 24px' }}>
      {/* Hero */}
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <div style={{ display: 'inline-block', background: '#fef3c7', color: '#92400e', padding: '4px 14px', borderRadius: '20px', fontSize: '13px', fontWeight: 700, marginBottom: '16px' }}>
          ⭐ SafeNest Premium
        </div>
        <h1 style={{ fontSize: '36px', fontWeight: 800, color: '#1e3a5f', lineHeight: 1.2, marginBottom: '12px' }}>
          Stay One Step Ahead of Threats
        </h1>
        <p style={{ fontSize: '18px', color: '#6b7280', maxWidth: '520px', margin: '0 auto' }}>
          Monthly guidance, updated recommendations, and direct advisor access — so your home stays protected as life changes.
        </p>
      </div>

      {/* Pricing cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '48px' }}>
        {/* Monthly */}
        <div style={{ border: '2px solid #e5e7eb', borderRadius: '16px', padding: '32px', background: 'white' }}>
          <p style={{ fontWeight: 700, fontSize: '18px', color: '#1e3a5f', marginBottom: '4px' }}>Monthly</p>
          <div style={{ marginBottom: '20px' }}>
            <span style={{ fontSize: '42px', fontWeight: 800, color: '#1e3a5f' }}>$9</span>
            <span style={{ color: '#6b7280' }}>/month</span>
          </div>
          <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '24px' }}>Cancel any time. No commitment.</p>
          <button
            onClick={() => handleCheckout('monthly')}
            disabled={loading !== null}
            style={{
              width: '100%',
              background: loading === 'monthly' ? '#9ca3af' : '#1e3a5f',
              color: 'white',
              border: 'none',
              padding: '14px',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: 600,
              cursor: loading !== null ? 'not-allowed' : 'pointer',
            }}
          >
            {loading === 'monthly' ? 'Loading...' : 'Get Premium Monthly'}
          </button>
        </div>

        {/* Annual */}
        <div style={{ border: '2px solid #1e3a5f', borderRadius: '16px', padding: '32px', background: '#eff6ff', position: 'relative' }}>
          <div style={{ position: 'absolute', top: '-14px', left: '50%', transform: 'translateX(-50%)', background: '#1e3a5f', color: 'white', padding: '4px 16px', borderRadius: '20px', fontSize: '13px', fontWeight: 700, whiteSpace: 'nowrap' }}>
            BEST VALUE — Save 27%
          </div>
          <p style={{ fontWeight: 700, fontSize: '18px', color: '#1e3a5f', marginBottom: '4px' }}>Annual</p>
          <div style={{ marginBottom: '4px' }}>
            <span style={{ fontSize: '42px', fontWeight: 800, color: '#1e3a5f' }}>$79</span>
            <span style={{ color: '#6b7280' }}>/year</span>
          </div>
          <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '24px' }}>That&apos;s just $6.58/month. One-time charge.</p>
          <button
            onClick={() => handleCheckout('annual')}
            disabled={loading !== null}
            style={{
              width: '100%',
              background: loading === 'annual' ? '#9ca3af' : '#f97316',
              color: 'white',
              border: 'none',
              padding: '14px',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: 600,
              cursor: loading !== null ? 'not-allowed' : 'pointer',
            }}
          >
            {loading === 'annual' ? 'Loading...' : 'Get Premium Annual'}
          </button>
        </div>
      </div>

      {/* Feature comparison */}
      <div style={{ border: '1px solid #e5e7eb', borderRadius: '16px', overflow: 'hidden', marginBottom: '48px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', background: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
          <div style={{ padding: '16px 24px', fontWeight: 700, color: '#6b7280', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Free</div>
          <div style={{ padding: '16px 24px', fontWeight: 700, color: '#1e3a5f', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.05em', borderLeft: '1px solid #e5e7eb' }}>⭐ Premium</div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
          <div style={{ padding: '24px' }}>
            {FEATURES.free.map((f, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: '12px', fontSize: '15px', color: '#374151' }}>
                <span style={{ color: '#10b981', marginTop: '2px' }}>✓</span>
                {f}
              </div>
            ))}
          </div>
          <div style={{ padding: '24px', borderLeft: '1px solid #e5e7eb', background: '#f0f9ff' }}>
            {FEATURES.premium.map((f, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: '12px', fontSize: '15px', color: '#374151' }}>
                <span style={{ color: '#f97316', marginTop: '2px' }}>⭐</span>
                {f}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonial / trust */}
      <div style={{ textAlign: 'center', padding: '32px', background: '#f9fafb', borderRadius: '12px', marginBottom: '32px' }}>
        <p style={{ fontSize: '20px', color: '#374151', fontStyle: 'italic', lineHeight: 1.5, marginBottom: '12px' }}>
          &quot;My mom lives alone and I live across the country. SafeNest gave me peace of mind knowing her home is actually protected.&quot;
        </p>
        <p style={{ fontSize: '14px', color: '#9ca3af' }}>— Sarah T., SafeNest Premium member</p>
      </div>

      <p style={{ textAlign: 'center', fontSize: '13px', color: '#9ca3af' }}>
        Questions? Email us at <a href="mailto:support@safenestguide.com" style={{ color: '#1e3a5f' }}>support@safenestguide.com</a>
        {' · '}
        <Link href="/terms" style={{ color: '#9ca3af' }}>Terms</Link>
        {' · '}
        <Link href="/privacy" style={{ color: '#9ca3af' }}>Privacy</Link>
      </p>
    </main>
  );
}

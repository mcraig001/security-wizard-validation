import Link from 'next/link';

export const metadata = {
  title: 'Welcome to SafeNest Premium!',
};

export default function PremiumSuccessPage() {
  return (
    <main style={{ maxWidth: '560px', margin: '80px auto', padding: '0 24px', textAlign: 'center' }}>
      <div style={{ fontSize: '64px', marginBottom: '24px' }}>🎉</div>
      <h1 style={{ fontSize: '32px', fontWeight: 800, color: '#1e3a5f', marginBottom: '12px' }}>
        Welcome to SafeNest Premium!
      </h1>
      <p style={{ fontSize: '18px', color: '#6b7280', lineHeight: 1.6, marginBottom: '32px' }}>
        Your subscription is active. You&apos;ll receive your first monthly security check-in within 24 hours.
        Check your inbox for a confirmation email.
      </p>
      <Link
        href="/"
        style={{
          background: '#1e3a5f',
          color: 'white',
          padding: '14px 32px',
          borderRadius: '8px',
          textDecoration: 'none',
          fontWeight: 600,
          fontSize: '16px',
        }}
      >
        Back to Home
      </Link>
    </main>
  );
}

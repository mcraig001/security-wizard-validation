export const metadata = {
  title: 'Privacy Policy | SafeNest',
};

export default function PrivacyPage() {
  return (
    <main style={{ maxWidth: '720px', margin: '0 auto', padding: '48px 24px' }}>
      <h1 style={{ fontSize: '32px', fontWeight: 800, color: '#1e3a5f', marginBottom: '8px' }}>Privacy Policy</h1>
      <p style={{ color: '#9ca3af', fontSize: '14px', marginBottom: '40px' }}>Last updated: April 2025</p>

      <div style={{ lineHeight: 1.8, color: '#374151', fontSize: '16px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#1e3a5f', marginTop: '32px', marginBottom: '8px' }}>Who We Are</h2>
        <p>SafeNest is operated by Auriflow Digital LLC, a Wyoming company. We provide personalized home security recommendations for adults 65+ and their families.</p>

        <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#1e3a5f', marginTop: '32px', marginBottom: '8px' }}>What We Collect</h2>
        <p>When you use our recommendation quiz, we collect:</p>
        <ul style={{ paddingLeft: '24px', marginTop: '8px' }}>
          <li>Your home size, technology comfort level, and monitoring budget (to generate your recommendation)</li>
          <li>Your email address (if you choose to receive your recommendation by email)</li>
          <li>Source of visit (e.g., direct, Reddit, Facebook) for analytics</li>
        </ul>
        <p style={{ marginTop: '12px' }}>If you subscribe to SafeNest Premium, we collect payment information processed securely by Stripe. We never see or store your full card number.</p>

        <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#1e3a5f', marginTop: '32px', marginBottom: '8px' }}>How We Use Your Data</h2>
        <ul style={{ paddingLeft: '24px' }}>
          <li>To generate and deliver your personalized security recommendation</li>
          <li>To send monthly security tips and product updates (Premium subscribers)</li>
          <li>To improve our recommendation engine</li>
          <li>We never sell your data to third parties</li>
        </ul>

        <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#1e3a5f', marginTop: '32px', marginBottom: '8px' }}>Affiliate Disclosure</h2>
        <p>SafeNest participates in the Amazon Associates Program. When you click a product link and make a purchase on Amazon, we earn a small commission at no additional cost to you. This never influences our recommendations — we only recommend products we believe are genuinely good for our audience.</p>

        <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#1e3a5f', marginTop: '32px', marginBottom: '8px' }}>Cookies</h2>
        <p>We use minimal, session-only cookies necessary to operate the site. We do not use tracking cookies or third-party advertising cookies.</p>

        <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#1e3a5f', marginTop: '32px', marginBottom: '8px' }}>Your Rights</h2>
        <p>You may request deletion of your data at any time by emailing <a href="mailto:support@safenestguide.com" style={{ color: '#1e3a5f' }}>support@safenestguide.com</a>. We will process your request within 30 days.</p>

        <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#1e3a5f', marginTop: '32px', marginBottom: '8px' }}>Contact</h2>
        <p>Auriflow Digital LLC · Wyoming<br />
        Email: <a href="mailto:support@safenestguide.com" style={{ color: '#1e3a5f' }}>support@safenestguide.com</a></p>
      </div>
    </main>
  );
}

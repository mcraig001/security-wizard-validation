import Link from 'next/link';
import { notFound } from 'next/navigation';
import { supabaseAdmin } from '@/lib/supabase';

export const revalidate = 3600;

interface Post {
  id: string;
  title: string;
  slug: string;
  content: string | null;
  meta_description: string | null;
  affiliate_links: { text: string; url: string; product: string }[] | null;
  created_at: string;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { data } = await supabaseAdmin
    .from('safenest_content')
    .select('title, meta_description')
    .eq('slug', slug)
    .eq('published', true)
    .single();

  if (!data) return { title: 'Not Found' };

  return {
    title: `${data.title} | SafeNest`,
    description: data.meta_description ?? undefined,
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  let post: Post | null = null;
  try {
    const { data } = await supabaseAdmin
      .from('safenest_content')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .single();
    post = data;
  } catch {
    // table not yet created
  }

  if (!post) notFound();

  const affiliateLinks = post.affiliate_links ?? [];

  return (
    <main style={{ maxWidth: '720px', margin: '0 auto', padding: '48px 24px' }}>
      <Link href="/blog" style={{ color: '#6b7280', fontSize: '14px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px', marginBottom: '24px' }}>
        ← Back to Security Tips
      </Link>

      <article>
        <header style={{ marginBottom: '32px' }}>
          <h1 style={{ fontSize: '32px', fontWeight: 800, color: '#1e3a5f', lineHeight: 1.2, marginBottom: '12px' }}>
            {post.title}
          </h1>
          {post.meta_description && (
            <p style={{ fontSize: '18px', color: '#6b7280', lineHeight: 1.5, marginBottom: '12px' }}>
              {post.meta_description}
            </p>
          )}
          <p style={{ fontSize: '13px', color: '#9ca3af' }}>
            {new Date(post.created_at).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}
          </p>
        </header>

        {post.content && (
          <div
            style={{ lineHeight: 1.8, color: '#374151', fontSize: '17px' }}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        )}

        {affiliateLinks.length > 0 && (
          <div style={{ marginTop: '40px', padding: '24px', background: '#f9fafb', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#1e3a5f', marginBottom: '16px' }}>
              Recommended Products
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {affiliateLinks.map((link, i) => (
                <a
                  key={i}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 16px',
                    background: 'white',
                    borderRadius: '8px',
                    border: '1px solid #e5e7eb',
                    textDecoration: 'none',
                    color: '#1e3a5f',
                    fontWeight: 600,
                  }}
                >
                  <span>{link.product || link.text}</span>
                  <span style={{ color: '#f97316', fontSize: '14px' }}>View on Amazon →</span>
                </a>
              ))}
            </div>
            <p style={{ fontSize: '12px', color: '#9ca3af', marginTop: '12px' }}>
              SafeNest earns a small commission on Amazon purchases at no extra cost to you.
            </p>
          </div>
        )}
      </article>

      <div
        style={{
          marginTop: '48px',
          padding: '24px',
          background: '#eff6ff',
          borderRadius: '12px',
          border: '1px solid #bfdbfe',
          textAlign: 'center',
        }}
      >
        <p style={{ fontWeight: 700, color: '#1e3a5f', marginBottom: '8px' }}>
          Want a personalized security recommendation?
        </p>
        <p style={{ color: '#6b7280', fontSize: '15px', marginBottom: '16px' }}>
          Answer 3 questions and get your custom setup in 60 seconds — free.
        </p>
        <Link
          href="/"
          style={{
            background: '#1e3a5f',
            color: 'white',
            padding: '12px 24px',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: 600,
            fontSize: '15px',
          }}
        >
          Take the Free Quiz →
        </Link>
      </div>
    </main>
  );
}

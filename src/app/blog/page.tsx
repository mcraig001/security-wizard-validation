import Link from 'next/link';
import { supabaseAdmin } from '@/lib/supabase';

export const revalidate = 3600;

export const metadata = {
  title: 'Home Security Tips for Seniors | SafeNest Blog',
  description: 'Expert advice on home security for adults 65+ and their families. Product reviews, setup guides, and safety tips.',
};

interface Post {
  id: string;
  title: string;
  slug: string;
  meta_description: string | null;
  created_at: string;
}

export default async function BlogPage() {
  let posts: Post[] = [];

  try {
    const { data } = await supabaseAdmin
      .from('safenest_content')
      .select('id, title, slug, meta_description, created_at')
      .eq('published', true)
      .order('created_at', { ascending: false })
      .limit(50);
    posts = data ?? [];
  } catch {
    // table may not exist yet — show placeholder
  }

  return (
    <main style={{ maxWidth: '720px', margin: '0 auto', padding: '48px 24px' }}>
      <h1 style={{ fontSize: '32px', fontWeight: 800, color: '#1e3a5f', marginBottom: '8px' }}>
        Home Security Tips
      </h1>
      <p style={{ color: '#6b7280', marginBottom: '40px', fontSize: '18px' }}>
        Expert advice for seniors and their families — written in plain English.
      </p>

      {posts.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '64px 0' }}>
          <p style={{ fontSize: '48px', marginBottom: '16px' }}>📝</p>
          <p style={{ color: '#6b7280', fontSize: '18px', marginBottom: '24px' }}>
            Our first security guides are on the way. Check back soon.
          </p>
          <Link
            href="/"
            style={{
              background: '#1e3a5f',
              color: 'white',
              padding: '14px 28px',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: 600,
            }}
          >
            Get Your Free Recommendation →
          </Link>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <article
                style={{
                  border: '1px solid #e5e7eb',
                  borderRadius: '12px',
                  padding: '24px',
                  background: 'white',
                  transition: 'box-shadow 0.2s',
                }}
              >
                <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#1e3a5f', marginBottom: '8px' }}>
                  {post.title}
                </h2>
                {post.meta_description && (
                  <p style={{ color: '#6b7280', fontSize: '15px', marginBottom: '12px', lineHeight: 1.5 }}>
                    {post.meta_description}
                  </p>
                )}
                <span style={{ fontSize: '13px', color: '#9ca3af' }}>
                  {new Date(post.created_at).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
              </article>
            </Link>
          ))}
        </div>
      )}

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
          Not sure what security setup is right for you?
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
          Take the 60-Second Quiz →
        </Link>
      </div>
    </main>
  );
}

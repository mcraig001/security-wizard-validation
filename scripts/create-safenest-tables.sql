-- SafeNest migration — run once in Supabase SQL editor
-- https://supabase.com/dashboard/project/rmaokwylstpvmaaycuiu/sql/new

CREATE TABLE IF NOT EXISTS recommendations (
  id uuid default gen_random_uuid() primary key,
  home_size text,
  tech_comfort text,
  budget text,
  tier text,
  products_json jsonb,
  email text,
  source text,
  created_at timestamptz default now()
);

CREATE TABLE IF NOT EXISTS safenest_content (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  slug text unique not null,
  content text,
  meta_description text,
  affiliate_links jsonb,
  published boolean default true,
  created_at timestamptz default now()
);

-- Enable RLS (allow service role full access, anon read-only on content)
ALTER TABLE recommendations ENABLE ROW LEVEL SECURITY;
ALTER TABLE safenest_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role full access" ON recommendations
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role full access" ON safenest_content
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Published content is public" ON safenest_content
  FOR SELECT USING (published = true);

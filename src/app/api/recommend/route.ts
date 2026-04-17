import { generateText, Output } from 'ai';
import { createAnthropic } from '@ai-sdk/anthropic';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { supabaseAdmin } from '@/lib/supabase';

type Product = {
  name: string;
  reason: string;
  amazon_search: string;
  price_range: string;
  category: 'camera' | 'doorbell' | 'sensor' | 'monitor' | 'hub';
};

const anthropic = createAnthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const RecommendationSchema = z.object({
  tier: z.enum(['Basic', 'Standard', 'Premium']),
  headline: z.string(),
  products: z.array(
    z.object({
      name: z.string(),
      reason: z.string(),
      amazon_search: z.string(),
      price_range: z.string(),
      category: z.enum(['camera', 'doorbell', 'sensor', 'monitor', 'hub']),
    })
  ).length(3),
  setup_difficulty: z.enum(['Easy', 'Moderate']),
  monthly_monitoring: z.enum(['$0', 'Under $20', '$20-$50']),
  pro_tip: z.string(),
});

type Recommendation = z.infer<typeof RecommendationSchema>;

const SIZE_MAP: Record<string, string> = {
  apartment: 'an apartment',
  small_house: 'a small house (1-2 bedrooms)',
  large_house: 'a large house (3+ bedrooms)',
};
const TECH_MAP: Record<string, string> = {
  not_comfortable: 'not comfortable with technology',
  somewhat_comfortable: 'somewhat comfortable with technology',
  very_comfortable: 'very comfortable with technology',
};
const BUDGET_MAP: Record<string, string> = {
  none: '$0/month (no monthly monitoring)',
  under_20: 'under $20/month for monitoring',
  '20_to_50': '$20-50/month for monitoring',
};

export async function POST(req: NextRequest) {
  try {
    const { home_size, tech_comfort, budget, source } = await req.json();

    if (!home_size || !tech_comfort || !budget) {
      return NextResponse.json({ error: 'Missing answers' }, { status: 400 });
    }

    const { output: recommendation } = await generateText({
      model: anthropic('claude-haiku-4-5-20251001'),
      output: Output.object({ schema: RecommendationSchema }),
      system:
        'You are a home security advisor specializing in setups for adults 65+ and their families. You recommend specific, real products available on Amazon. You are concise, clear, and avoid jargon.',
      prompt: `Recommend a home security setup for:
- Home size: ${SIZE_MAP[home_size] ?? home_size}
- Technology comfort: ${TECH_MAP[tech_comfort] ?? tech_comfort}
- Monthly monitoring budget: ${BUDGET_MAP[budget] ?? budget}

Return exactly 3 products. Each product needs a specific Amazon search term.`,
    });

    if (!recommendation) {
      return NextResponse.json({ error: 'No recommendation generated' }, { status: 500 });
    }

    // Attach affiliate URLs
    const enriched: Recommendation & { products: Array<Recommendation['products'][0] & { affiliate_url: string }> } = {
      ...recommendation,
      products: recommendation.products.map((p: Product) => ({
        ...p,
        affiliate_url: `https://www.amazon.com/s?k=${encodeURIComponent(p.amazon_search)}&tag=safehome00c-20`,
      })),
    };

    // Log to Supabase (fire-and-forget, non-blocking)
    supabaseAdmin
      .from('recommendations')
      .insert({
        home_size,
        tech_comfort,
        budget,
        tier: enriched.tier,
        products_json: enriched.products,
        source: source ?? 'direct',
      })
      .then(({ error }) => {
        if (error) console.error('recommendations log error:', error.message);
      });

    return NextResponse.json(enriched);
  } catch (err) {
    console.error('recommend error:', err);
    return NextResponse.json({ error: 'Failed to generate recommendation' }, { status: 500 });
  }
}

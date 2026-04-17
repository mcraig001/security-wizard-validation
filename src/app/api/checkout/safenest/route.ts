import Stripe from 'stripe';
import { NextRequest, NextResponse } from 'next/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const PRICES = {
  monthly: 'price_1TN46S2M4Z6WomA4yfAtBA0x',
  annual: 'price_1TN46S2M4Z6WomA40yyQOGyl',
};

export async function POST(req: NextRequest) {
  try {
    const { plan = 'monthly', email } = await req.json();
    const priceId = PRICES[plan as keyof typeof PRICES] ?? PRICES.monthly;

    const origin = req.headers.get('origin') ?? 'https://security-wizard-validation.vercel.app';

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      line_items: [{ price: priceId, quantity: 1 }],
      ...(email ? { customer_email: email } : {}),
      success_url: `${origin}/premium/success`,
      cancel_url: `${origin}/premium`,
      allow_promotion_codes: true,
      subscription_data: {
        metadata: { venture: 'safenest' },
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error('checkout error:', err);
    return NextResponse.json({ error: 'Checkout failed' }, { status: 500 });
  }
}

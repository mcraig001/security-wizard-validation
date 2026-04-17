import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { Resend } from 'resend';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function POST(req: NextRequest) {
  try {
    const { email, recommendation_id, home_size, tech_comfort, budget, recommendation, source } =
      await req.json();

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }

    const validSources = ['reddit', 'facebook', 'x', 'direct'];
    const cleanSource = validSources.includes(source) ? source : 'direct';

    // Save to validation_leads (non-blocking)
    supabaseAdmin
      .from('validation_leads')
      .insert({
        email: email.trim().toLowerCase(),
        home_size: home_size ?? null,
        tech_comfort: tech_comfort ?? null,
        budget: budget ?? null,
        source: cleanSource,
      })
      .then(({ error }) => {
        if (error) console.error('validation_leads insert:', error.message);
      });

    // Update recommendations table with email (non-blocking)
    if (recommendation_id) {
      supabaseAdmin
        .from('recommendations')
        .update({ email: email.trim().toLowerCase() })
        .eq('id', recommendation_id)
        .then(({ error }) => {
          if (error) console.error('recommendations update:', error.message);
        });
    }

    // Send recommendation email via Resend
    if (resend && recommendation) {
      const products = recommendation.products ?? [];
      const productRows = products
        .map(
          (p: { name: string; price_range: string; reason: string; affiliate_url: string }) =>
            `<tr>
              <td style="padding:12px;border-bottom:1px solid #e5e7eb;">
                <strong>${p.name}</strong><br>
                <span style="color:#6b7280;font-size:14px;">${p.reason}</span>
              </td>
              <td style="padding:12px;border-bottom:1px solid #e5e7eb;white-space:nowrap;color:#6b7280;">${p.price_range}</td>
              <td style="padding:12px;border-bottom:1px solid #e5e7eb;">
                <a href="${p.affiliate_url}" style="color:#2563eb;font-weight:600;text-decoration:none;" target="_blank">View on Amazon →</a>
              </td>
            </tr>`
        )
        .join('');

      await resend.emails.send({
        from: 'SafeNest <mike@safeathomeguides.com>',
        to: email.trim(),
        subject: 'Your SafeNest Security Recommendation',
        html: `
<!DOCTYPE html>
<html>
<body style="font-family:system-ui,sans-serif;color:#111827;max-width:600px;margin:0 auto;padding:20px;">
  <div style="background:#1e3a5f;padding:24px;border-radius:12px 12px 0 0;">
    <h1 style="color:white;margin:0;font-size:22px;">Your SafeNest Security Recommendation</h1>
    <p style="color:#bfdbfe;margin:8px 0 0;">${recommendation.headline ?? ''}</p>
  </div>

  <div style="background:#f9fafb;padding:20px;border:1px solid #e5e7eb;border-top:none;">
    <div style="display:inline-block;background:#1e3a5f;color:white;padding:4px 12px;border-radius:20px;font-size:14px;font-weight:600;margin-bottom:16px;">
      ${recommendation.tier ?? ''} Setup
    </div>

    <table style="width:100%;border-collapse:collapse;background:white;border-radius:8px;overflow:hidden;border:1px solid #e5e7eb;">
      <thead>
        <tr style="background:#f3f4f6;">
          <th style="text-align:left;padding:12px;font-size:13px;color:#6b7280;">Product</th>
          <th style="text-align:left;padding:12px;font-size:13px;color:#6b7280;">Price</th>
          <th style="text-align:left;padding:12px;font-size:13px;color:#6b7280;">Link</th>
        </tr>
      </thead>
      <tbody>${productRows}</tbody>
    </table>

    <div style="margin-top:16px;padding:14px;background:#eff6ff;border-radius:8px;border:1px solid #bfdbfe;">
      <strong>Setup:</strong> ${recommendation.setup_difficulty ?? ''} &nbsp;·&nbsp;
      <strong>Monthly monitoring:</strong> ${recommendation.monthly_monitoring ?? ''}
    </div>

    ${
      recommendation.pro_tip
        ? `<div style="margin-top:12px;padding:14px;background:#f0fdf4;border-radius:8px;border:1px solid #bbf7d0;">
        <strong>Pro tip:</strong> ${recommendation.pro_tip}
      </div>`
        : ''
    }

    <p style="margin-top:20px;font-size:13px;color:#9ca3af;border-top:1px solid #e5e7eb;padding-top:16px;">
      SafeNest earns a small commission on Amazon purchases at no extra cost to you.<br>
      Questions? Reply to this email.<br><br>
      <a href="#" style="color:#9ca3af;">Unsubscribe</a> · Auriflow Digital LLC · Wyoming
    </p>
  </div>
</body>
</html>`,
      });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('subscribe error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

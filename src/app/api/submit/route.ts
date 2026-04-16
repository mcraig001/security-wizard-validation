import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, home_size, tech_comfort, budget, source } = body;

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const validSources = ["reddit", "facebook", "x", "direct"];
    const cleanSource = validSources.includes(source) ? source : "direct";

    const { error } = await supabase.from("validation_leads").insert({
      email: email.trim().toLowerCase(),
      home_size: home_size || null,
      tech_comfort: tech_comfort || null,
      budget: budget || null,
      source: cleanSource,
    });

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json({ error: "Database error" }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Submit error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { PRINTS, SIZE_TIERS, getSkuForTier } from "@/lib/catalog";

export async function POST(req: NextRequest) {
  try {
    const { slug, tierId, orientation, locale } = await req.json();
    const safeLocale = ["en", "it", "fr", "es"].includes(locale) ? locale : "en";

    const print = PRINTS.find((p) => p.slug === slug);
    const tier = SIZE_TIERS.find((t) => t.id === tierId);
    if (!print || !tier) {
      return NextResponse.json({ error: "Prodotto o formato non valido." }, { status: 400 });
    }

    const prodigiSku = getSkuForTier(tierId, orientation);
    if (!prodigiSku) {
      return NextResponse.json({ error: "Formato non disponibile per questa foto." }, { status: 400 });
    }

    const origin = req.headers.get("origin") || process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "eur",
            unit_amount: Math.round(tier.price * 100),
            product_data: {
              name: `${print.title} — ${tier.label} (${tier.cmLabel})`,
              images: [`${origin}${print.imageSrc}`],
            },
          },
          quantity: 1,
        },
      ],
      // Necessario per calcolare correttamente la spedizione e passare
      // l'indirizzo del cliente all'ordine Prodigi dopo il pagamento.
      shipping_address_collection: {
        allowed_countries: ["IT", "DE", "FR", "ES", "GB", "US", "CA", "AU", "NL", "BE", "AT", "CH"],
      },
      metadata: {
        printSlug: print.slug,
        tierId: tier.id,
        orientation,
        prodigiSku,
      },
      success_url: `${origin}/${safeLocale}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/${safeLocale}/checkout/cancel`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Errore creazione sessione Stripe:", err);
    return NextResponse.json({ error: "Errore interno. Riprova." }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getStripe } from "@/lib/stripe";
import { createProdigiOrder } from "@/lib/prodigi";
import { PRINTS, getPrintAssetUrl } from "@/lib/catalog";
import { sendOrderFailureAlert } from "@/lib/notify";

// IMPORTANTE: questo endpoint deve ricevere il body "raw" (non parsato),
// perché la firma webhook di Stripe si verifica sui byte esatti inviati.
export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!signature || !webhookSecret) {
    return NextResponse.json({ error: "Webhook non configurato." }, { status: 400 });
  }

  const stripe = getStripe();
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error("Firma webhook non valida:", err);
    return NextResponse.json({ error: "Firma non valida." }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    try {
      const fullSession = await stripe.checkout.sessions.retrieve(session.id, {
        expand: ["customer_details"],
      });

      const { printSlug, prodigiSku, tierId } = fullSession.metadata || {};
      const print = PRINTS.find((p) => p.slug === printSlug);
      const shipping = fullSession.collected_information?.shipping_details;
      const customer = fullSession.customer_details;

      if (!print || !prodigiSku || !tierId || !shipping?.address || !customer) {
        const msg = "Dati mancanti per creare l'ordine Prodigi (foto, SKU o indirizzo assenti).";
        console.error(msg, { printSlug, prodigiSku });
        await sendOrderFailureAlert({
          stripeSessionId: session.id,
          customerEmail: customer?.email || undefined,
          printSlug,
          prodigiSku,
          errorMessage: msg,
        });
        return NextResponse.json({ received: true, warning: "Dati incompleti, verificare manualmente." });
      }

      await createProdigiOrder({
        sku: prodigiSku,
        assetUrl: getPrintAssetUrl(print, tierId),
        idempotencyKey: session.id,
        recipient: {
          name: shipping.name || customer.name || "Cliente",
          email: customer.email || undefined,
          address: {
            line1: shipping.address.line1 || "",
            line2: shipping.address.line2 || undefined,
            postalOrZipCode: shipping.address.postal_code || "",
            countryCode: shipping.address.country || "",
            townOrCity: shipping.address.city || "",
            stateOrCounty: shipping.address.state || undefined,
          },
        },
      });
    } catch (err) {
      // Il cliente ha già pagato ma l'ordine di stampa non è stato creato:
      // notifica immediata via email, oltre al log.
      const errorMessage = err instanceof Error ? err.message : String(err);
      console.error("Errore creazione ordine Prodigi:", errorMessage);

      const fullSession = await stripe.checkout.sessions.retrieve(session.id).catch(() => null);
      await sendOrderFailureAlert({
        stripeSessionId: session.id,
        customerEmail: fullSession?.customer_details?.email || undefined,
        printSlug: fullSession?.metadata?.printSlug,
        prodigiSku: fullSession?.metadata?.prodigiSku,
        errorMessage,
      });

      return NextResponse.json({ received: true, error: "Errore creazione ordine Prodigi." });
    }
  }

  return NextResponse.json({ received: true });
}

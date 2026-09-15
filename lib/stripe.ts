import Stripe from "stripe";

let _stripe: Stripe | null = null;

// Inizializzazione "pigra": il client Stripe viene creato solo alla prima
// chiamata reale, non al caricamento del modulo. Così un build su Vercel
// non fallisce se la chiave non è ancora stata impostata — l'errore
// comparirà solo se qualcuno prova davvero a fare un pagamento senza chiave.
export function getStripe(): Stripe {
  if (!_stripe) {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) {
      throw new Error(
        "STRIPE_SECRET_KEY non impostata. Aggiungila nelle Environment Variables di Vercel."
      );
    }
    _stripe = new Stripe(key, {
      apiVersion: "2026-08-26.dahlia",
    });
  }
  return _stripe;
}

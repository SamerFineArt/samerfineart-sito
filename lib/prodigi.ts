// Client minimale per la Prodigi Print API v4.0.
// Docs: https://www.prodigi.com/print-api/docs/reference/
//
// AMBIENTE: Prodigi offre un ambiente Sandbox separato per i test, che non
// genera costi né stampe/spedizioni reali (usa una API key DIVERSA da
// quella live, generata nella stessa Prodigi Dashboard scegliendo Sandbox
// invece di Live). Imposta PRODIGI_ENV=sandbox su Vercel mentre fai test,
// e passa a PRODIGI_ENV=live (o rimuovi la variabile) solo quando sei
// pronto a ricevere ordini veri.

const PRODIGI_BASE_URL =
  process.env.PRODIGI_ENV === "live"
    ? "https://api.prodigi.com/v4.0"
    : "https://api.sandbox.prodigi.com/v4.0";

type CreateProdigiOrderInput = {
  sku: string;
  assetUrl: string; // URL pubblico dell'immagine ad alta risoluzione
  recipient: {
    name: string;
    email?: string;
    address: {
      line1: string;
      line2?: string;
      postalOrZipCode: string;
      countryCode: string; // ISO 2 lettere, es. "IT"
      townOrCity: string;
      stateOrCounty?: string;
    };
  };
  idempotencyKey: string; // usiamo l'id della sessione Stripe
};

export async function createProdigiOrder(input: CreateProdigiOrderInput) {
  const apiKey = process.env.PRODIGI_API_KEY;
  if (!apiKey) {
    throw new Error("PRODIGI_API_KEY non impostata.");
  }

  const res = await fetch(`${PRODIGI_BASE_URL}/Orders`, {
    method: "POST",
    headers: {
      "X-API-Key": apiKey,
      "Content-Type": "application/json",
      "Idempotency-Key": input.idempotencyKey,
    },
    body: JSON.stringify({
      merchantReference: input.idempotencyKey,
      shippingMethod: "Standard",
      recipient: input.recipient,
      items: [
        {
          sku: input.sku,
          copies: 1,
          sizing: "fitPrintArea", // preserva l'intero file incluso il bordo/passe-partout, senza ritagliare
          assets: [{ printArea: "default", url: input.assetUrl }],
        },
      ],
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Prodigi API error (${res.status}): ${body}`);
  }

  return res.json();
}

// Endpoint /quotes: calcola solo un preventivo per uno SKU + paese di
// destinazione, SENZA creare un ordine reale e SENZA alcun addebito.
// Utile per verificare che API key, SKU e connessione funzionino prima di
// arrivare a testare la creazione ordine vera e propria.
export async function getProdigiQuote(sku: string, countryCode: string) {
  const apiKey = process.env.PRODIGI_API_KEY;
  if (!apiKey) {
    throw new Error("PRODIGI_API_KEY non impostata.");
  }

  const res = await fetch(`${PRODIGI_BASE_URL}/quotes`, {
    method: "POST",
    headers: {
      "X-API-Key": apiKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      shippingMethod: "Standard",
      destinationCountryCode: countryCode,
      items: [{ sku, copies: 1, assets: [{ printArea: "default" }] }],
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Prodigi API error (${res.status}): ${body}`);
  }

  return res.json();
}

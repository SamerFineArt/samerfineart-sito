// Client minimale per la Prodigi Print API v4.0.
// Docs: https://www.prodigi.com/print-api/docs/reference/

const PRODIGI_BASE_URL = "https://api.prodigi.com/v4.0";

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

// Invia una email di allerta quando un ordine Prodigi fallisce dopo un
// pagamento già riuscito -- così non scopri il problema solo perché il
// cliente scrive "non ho ricevuto nulla".
// Usa Resend (https://resend.com), piano gratuito sufficiente per basso volume.

export async function sendOrderFailureAlert(details: {
  stripeSessionId: string;
  customerEmail?: string;
  printSlug?: string;
  prodigiSku?: string;
  errorMessage: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  const alertTo = process.env.ALERT_EMAIL;

  if (!apiKey || !alertTo) {
    console.error(
      "RESEND_API_KEY o ALERT_EMAIL non impostate: impossibile inviare la notifica di errore."
    );
    return;
  }

  try {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Samer Fine Art <onboarding@resend.dev>",
        to: alertTo,
        subject: "⚠️ Ordine pagato ma non creato su Prodigi",
        html: `
          <p><strong>Un cliente ha pagato ma l'ordine di stampa NON è stato creato su Prodigi.</strong></p>
          <p>Serve intervento manuale per evadere l'ordine.</p>
          <ul>
            <li>Stripe Session ID: ${details.stripeSessionId}</li>
            <li>Email cliente: ${details.customerEmail || "non disponibile"}</li>
            <li>Foto: ${details.printSlug || "non disponibile"}</li>
            <li>SKU Prodigi: ${details.prodigiSku || "non disponibile"}</li>
            <li>Errore: ${details.errorMessage}</li>
          </ul>
          <p>Controlla la sessione su Stripe Dashboard per i dettagli completi (indirizzo di spedizione, importo, ecc.).</p>
        `,
      }),
    });
  } catch (err) {
    console.error("Impossibile inviare la notifica di errore:", err);
  }
}

// Invia una notifica push immediata quando un ordine Prodigi fallisce dopo
// un pagamento già riuscito -- così non scopri il problema solo perché il
// cliente scrive "non ho ricevuto nulla".
//
// Usa ntfy.sh (https://ntfy.sh): servizio gratuito, NESSUNA registrazione
// richiesta. Basta scegliere un "topic" (una parola a piacere, univoca e
// difficile da indovinare, es. "samerfineart-alert-x7k2") e installare
// l'app gratuita ntfy su telefono, iscritta a quel topic.

export async function sendOrderFailureAlert(details: {
  stripeSessionId: string;
  customerEmail?: string;
  printSlug?: string;
  prodigiSku?: string;
  errorMessage: string;
}) {
  const topic = process.env.NTFY_TOPIC;

  if (!topic) {
    console.error("NTFY_TOPIC non impostata: impossibile inviare la notifica di errore.");
    return;
  }

  const message = [
    `Cliente: ${details.customerEmail || "email non disponibile"}`,
    `Foto: ${details.printSlug || "non disponibile"}`,
    `SKU Prodigi: ${details.prodigiSku || "non disponibile"}`,
    `Stripe session: ${details.stripeSessionId}`,
    `Errore: ${details.errorMessage}`,
  ].join("\n");

  try {
    await fetch(`https://ntfy.sh/${topic}`, {
      method: "POST",
      headers: {
        Title: "Ordine pagato ma NON creato su Prodigi",
        Priority: "urgent",
        Tags: "warning",
      },
      body: message,
    });
  } catch (err) {
    // Se anche l'invio della notifica fallisce, almeno resta nei log Vercel.
    console.error("Impossibile inviare la notifica di errore:", err);
  }
}

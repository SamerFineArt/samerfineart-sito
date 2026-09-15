// Catalogo centrale: le 4 fasce di formato, mappate agli SKU Prodigi
// confermati per Hahnemühle Photo Rag (HPR) 308gsm.
// Un solo SKU per fascia serve sia orientamento verticale che orizzontale
// (Prodigi gestisce "Portrait/landscape" sullo stesso codice prodotto).

export type SizeTier = {
  id: string;
  label: string;
  description: string;
  cmLabel: string; // misura mostrata al cliente, mai al mm esatto
  prodigiSkuPortrait: string;
  prodigiSkuLandscape: string;
  wholesaleCost: number; // € costo Prodigi, per calcolo margine interno
  price: number; // € prezzo di vendita al cliente
};

export const SIZE_TIERS: SizeTier[] = [
  {
    id: "entry",
    label: "Entry Fine Art Print",
    description: "Formato compatto, ideale per iniziare una collezione.",
    cmLabel: "~20×30 cm",
    prodigiSkuPortrait: "GLOBAL-HPR-8X12",
    prodigiSkuLandscape: "GLOBAL-HPR-8X12",
    wholesaleCost: 6,
    price: 29, // DA CONFERMARE: in attesa di stima spedizione per zona
  },
  {
    id: "standard",
    label: "Standard Wall Art",
    description: "Il formato più versatile per pareti domestiche.",
    cmLabel: "~30×45 cm",
    prodigiSkuPortrait: "GLOBAL-HPR-12X18",
    prodigiSkuLandscape: "GLOBAL-HPR-12X18",
    wholesaleCost: 13,
    price: 49, // DA CONFERMARE: in attesa di stima spedizione per zona
  },
  {
    id: "hero",
    label: "Hero Format",
    description: "Presenza importante, pensato per essere il punto focale della stanza.",
    cmLabel: "~40×60 cm",
    prodigiSkuPortrait: "GLOBAL-HPR-16X24",
    prodigiSkuLandscape: "GLOBAL-HPR-16X24",
    wholesaleCost: 17,
    price: 79, // DA CONFERMARE: in attesa di stima spedizione per zona
  },
  {
    id: "statement",
    label: "Statement Piece",
    description: "Il formato più grande della collezione, per spazi ampi.",
    cmLabel: "~50×70 cm",
    prodigiSkuPortrait: "GLOBAL-HPR-20X28",
    prodigiSkuLandscape: "GLOBAL-HPR-20X28",
    wholesaleCost: 23,
    price: 109, // DA CONFERMARE: in attesa di stima spedizione per zona
  },
];

export type CategoryId = "architecture" | "abstract" | "landscape" | "japan";

export const CATEGORY_IDS: CategoryId[] = ["architecture", "abstract", "landscape", "japan"];

export type Print = {
  slug: string;
  title: string;
  story: string; // breve contesto: dove/perché scattata
  orientation: "portrait" | "landscape";
  categories: CategoryId[];
  imageSrc: string; // anteprima ottimizzata per il sito
  printAssetUrls: {
    entry: string;
    standard: string;
    hero: string;
    statement: string;
  }; // un file con bordo diverso per ciascuna fascia — generato con lo script Python
};

// Testi segnaposto — da rifinire con le tue parole prima del lancio.
export const PRINTS: Print[] = [
  {
    slug: "umeda-sky-yellow",
    title: "Umeda Sky, Osaka",
    categories: ["architecture", "japan"],
    story:
      "Guardando in alto tra le travi gialle dell'Umeda Sky Building — geometria e luce industriale nel cuore di Osaka.",
    orientation: "portrait",
    imageSrc: "/prints/umeda-sky-yellow.jpg",
    printAssetUrls: {
      entry: "DA-SOSTITUIRE-umeda-entry-print.jpg",
      standard: "DA-SOSTITUIRE-umeda-standard-print.jpg",
      hero: "DA-SOSTITUIRE-umeda-hero-print.jpg",
      statement: "DA-SOSTITUIRE-umeda-statement-print.jpg",
    },
  },
  {
    slug: "stairway-to-heaven",
    title: "Stairway to Heaven",
    categories: ["architecture", "japan"],
    story:
      "Una scala mobile che si perde in un tunnel di archi — prospettiva e ripetizione in bianco e nero.",
    orientation: "portrait",
    imageSrc: "/prints/stairway-to-heaven.jpg",
    printAssetUrls: {
      entry: "DA-SOSTITUIRE-stairway-entry-print.jpg",
      standard: "DA-SOSTITUIRE-stairway-standard-print.jpg",
      hero: "DA-SOSTITUIRE-stairway-hero-print.jpg",
      statement: "DA-SOSTITUIRE-stairway-statement-print.jpg",
    },
  },
  {
    slug: "london-more-places",
    title: "London, More Places",
    categories: ["architecture"],
    story:
      "Facciate londinesi che si incrociano contro un cielo scuro — linee architettoniche in bianco e nero.",
    orientation: "landscape",
    imageSrc: "/prints/london-more-places.jpg",
    printAssetUrls: {
      entry: "DA-SOSTITUIRE-london-entry-print.jpg",
      standard: "DA-SOSTITUIRE-london-standard-print.jpg",
      hero: "DA-SOSTITUIRE-london-hero-print.jpg",
      statement: "DA-SOSTITUIRE-london-statement-print.jpg",
    },
  },
];

export function getSkuForTier(tierId: string, orientation: "portrait" | "landscape") {
  const tier = SIZE_TIERS.find((t) => t.id === tierId);
  if (!tier) return null;
  return orientation === "portrait" ? tier.prodigiSkuPortrait : tier.prodigiSkuLandscape;
}

export function getPrintAssetUrl(print: Print, tierId: string): string {
  return print.printAssetUrls[tierId as keyof typeof print.printAssetUrls];
}

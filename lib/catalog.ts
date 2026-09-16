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

export const PRINTS: Print[] = [
  {
    slug: "20-fenchurch-street",
    title: "Glass Tower",
    categories: ["architecture"],
    location: "Londra, Regno Unito",
    orientation: "portrait",
    imageSrc: "/prints/20-fenchurch-street.jpg",
    printAssetUrls: {
      entry: "https://samerfineart-sito-red.vercel.app/print-files/20-fenchurch-street_entry_print.jpg",
      standard: "https://samerfineart-sito-red.vercel.app/print-files/20-fenchurch-street_standard_print.jpg",
      hero: "https://samerfineart-sito-red.vercel.app/print-files/20-fenchurch-street_hero_print.jpg",
      statement: "https://samerfineart-sito-red.vercel.app/print-files/20-fenchurch-street_statement_print.jpg",
    },
  },
  {
    slug: "architectural-symphony",
    title: "Architectural Symphony",
    categories: ["architecture"],
    location: "Londra, Regno Unito",
    orientation: "portrait",
    imageSrc: "/prints/architectural-symphony.jpg",
    printAssetUrls: {
      entry: "https://samerfineart-sito-red.vercel.app/print-files/architectural-symphony_entry_print.jpg",
      standard: "https://samerfineart-sito-red.vercel.app/print-files/architectural-symphony_standard_print.jpg",
      hero: "https://samerfineart-sito-red.vercel.app/print-files/architectural-symphony_hero_print.jpg",
      statement: "https://samerfineart-sito-red.vercel.app/print-files/architectural-symphony_statement_print.jpg",
    },
  },
  {
    slug: "bamboo-astratto-2",
    title: "Arashiyama Abstract",
    categories: ["abstract", "japan"],
    location: "Kyoto, Giappone",
    orientation: "landscape",
    imageSrc: "/prints/Bamboo%20astratto%202.jpg",
    printAssetUrls: {
      entry: "https://samerfineart-sito-red.vercel.app/print-files/Bamboo%20astratto%202_entry_print.jpg",
      standard: "https://samerfineart-sito-red.vercel.app/print-files/Bamboo%20astratto%202_standard_print.jpg",
      hero: "https://samerfineart-sito-red.vercel.app/print-files/Bamboo%20astratto%202_hero_print.jpg",
      statement: "https://samerfineart-sito-red.vercel.app/print-files/Bamboo%20astratto%202_statement_print.jpg",
    },
  },
  {
    slug: "bamboo-astratto",
    title: "Bamboo Abstract",
    categories: ["abstract", "japan"],
    location: "Kyoto, Giappone",
    orientation: "landscape",
    imageSrc: "/prints/Bamboo%20astratto.jpg",
    printAssetUrls: {
      entry: "https://samerfineart-sito-red.vercel.app/print-files/Bamboo%20astratto_entry_print.jpg",
      standard: "https://samerfineart-sito-red.vercel.app/print-files/Bamboo%20astratto_standard_print.jpg",
      hero: "https://samerfineart-sito-red.vercel.app/print-files/Bamboo%20astratto_hero_print.jpg",
      statement: "https://samerfineart-sito-red.vercel.app/print-files/Bamboo%20astratto_statement_print.jpg",
    },
  },
  {
    slug: "beacon-in-the-fog-slovenia",
    title: "The Beacon",
    categories: ["landscape"],
    location: "Slovenia",
    orientation: "landscape",
    imageSrc: "/prints/beacon-in-the-fog-slovenia.jpg",
    printAssetUrls: {
      entry: "https://samerfineart-sito-red.vercel.app/print-files/beacon-in-the-fog-slovenia_entry_print.jpg",
      standard: "https://samerfineart-sito-red.vercel.app/print-files/beacon-in-the-fog-slovenia_standard_print.jpg",
      hero: "https://samerfineart-sito-red.vercel.app/print-files/beacon-in-the-fog-slovenia_hero_print.jpg",
      statement: "https://samerfineart-sito-red.vercel.app/print-files/beacon-in-the-fog-slovenia_statement_print.jpg",
    },
  },
  {
    slug: "beaugranelle-b-w-2",
    title: "Beaugranelle B&w 2",
    categories: ["architecture"], // TODO: verifica/correggi le categorie
    location: "TODO: es. Osaka, Giappone",
    orientation: "landscape",
    imageSrc: "/prints/Beaugranelle%20B%26W%202.jpg",
    printAssetUrls: {
      entry: "https://samerfineart-sito-red.vercel.app/print-files/Beaugranelle%20B%26W%202_entry_print.jpg",
      standard: "https://samerfineart-sito-red.vercel.app/print-files/Beaugranelle%20B%26W%202_standard_print.jpg",
      hero: "https://samerfineart-sito-red.vercel.app/print-files/Beaugranelle%20B%26W%202_hero_print.jpg",
      statement: "https://samerfineart-sito-red.vercel.app/print-files/Beaugranelle%20B%26W%202_statement_print.jpg",
    },
  },
  {
    slug: "blue",
    title: "Blue",
    categories: ["architecture"],
    location: "Milano, Italia",
    orientation: "landscape",
    imageSrc: "/prints/Blue.jpg",
    printAssetUrls: {
      entry: "https://samerfineart-sito-red.vercel.app/print-files/Blue_entry_print.jpg",
      standard: "https://samerfineart-sito-red.vercel.app/print-files/Blue_standard_print.jpg",
      hero: "https://samerfineart-sito-red.vercel.app/print-files/Blue_hero_print.jpg",
      statement: "https://samerfineart-sito-red.vercel.app/print-files/Blue_statement_print.jpg",
    },
  },
  {
    slug: "chromatic-passage-london",
    title: "Chromatic Passage",
    categories: ["abstract"],
    location: "Londra, Regno Unito",
    orientation: "landscape",
    imageSrc: "/prints/chromatic-passage-london.jpg",
    printAssetUrls: {
      entry: "https://samerfineart-sito-red.vercel.app/print-files/chromatic-passage-london_entry_print.jpg",
      standard: "https://samerfineart-sito-red.vercel.app/print-files/chromatic-passage-london_standard_print.jpg",
      hero: "https://samerfineart-sito-red.vercel.app/print-files/chromatic-passage-london_hero_print.jpg",
      statement: "https://samerfineart-sito-red.vercel.app/print-files/chromatic-passage-london_statement_print.jpg",
    },
  },
  {
    slug: "church-in-the-fog-slovenia",
    title: "Church in the Fog",
    categories: ["landscape"],
    location: "Slovenia",
    orientation: "landscape",
    imageSrc: "/prints/church-in-the-fog-slovenia.jpg",
    printAssetUrls: {
      entry: "https://samerfineart-sito-red.vercel.app/print-files/church-in-the-fog-slovenia_entry_print.jpg",
      standard: "https://samerfineart-sito-red.vercel.app/print-files/church-in-the-fog-slovenia_standard_print.jpg",
      hero: "https://samerfineart-sito-red.vercel.app/print-files/church-in-the-fog-slovenia_hero_print.jpg",
      statement: "https://samerfineart-sito-red.vercel.app/print-files/church-in-the-fog-slovenia_statement_print.jpg",
    },
  },
  {
    slug: "dna",
    title: "Dna",
    categories: ["abstract"],
    location: "Milano, Italia",
    orientation: "portrait",
    imageSrc: "/prints/dna.jpg",
    printAssetUrls: {
      entry: "https://samerfineart-sito-red.vercel.app/print-files/dna_entry_print.jpg",
      standard: "https://samerfineart-sito-red.vercel.app/print-files/dna_standard_print.jpg",
      hero: "https://samerfineart-sito-red.vercel.app/print-files/dna_hero_print.jpg",
      statement: "https://samerfineart-sito-red.vercel.app/print-files/dna_statement_print.jpg",
    },
  },
  {
    slug: "house-on-lake-bled",
    title: "House on Lake Bled",
    categories: ["landscape"],
    location: "Lago di Bled, Slovenia",
    orientation: "portrait",
    imageSrc: "/prints/house-on-lake-bled.jpg",
    printAssetUrls: {
      entry: "https://samerfineart-sito-red.vercel.app/print-files/house-on-lake-bled_entry_print.jpg",
      standard: "https://samerfineart-sito-red.vercel.app/print-files/house-on-lake-bled_standard_print.jpg",
      hero: "https://samerfineart-sito-red.vercel.app/print-files/house-on-lake-bled_hero_print.jpg",
      statement: "https://samerfineart-sito-red.vercel.app/print-files/house-on-lake-bled_statement_print.jpg",
    },
  },
  {
    slug: "idea",
    title: "Idea",
    categories: ["abstract"],
    location: "Praga, Repubblica Ceca",
    orientation: "portrait",
    imageSrc: "/prints/idea.jpg",
    printAssetUrls: {
      entry: "https://samerfineart-sito-red.vercel.app/print-files/idea_entry_print.jpg",
      standard: "https://samerfineart-sito-red.vercel.app/print-files/idea_standard_print.jpg",
      hero: "https://samerfineart-sito-red.vercel.app/print-files/idea_hero_print.jpg",
      statement: "https://samerfineart-sito-red.vercel.app/print-files/idea_statement_print.jpg",
    },
  },
  {
    slug: "king-cross-tunnel",
    title: "King's Cross",
    categories: ["architecture"],
    location: "Londra, Regno Unito",
    orientation: "landscape",
    imageSrc: "/prints/king-cross-tunnel.jpg",
    printAssetUrls: {
      entry: "https://samerfineart-sito-red.vercel.app/print-files/king-cross-tunnel_entry_print.jpg",
      standard: "https://samerfineart-sito-red.vercel.app/print-files/king-cross-tunnel_standard_print.jpg",
      hero: "https://samerfineart-sito-red.vercel.app/print-files/king-cross-tunnel_hero_print.jpg",
      statement: "https://samerfineart-sito-red.vercel.app/print-files/king-cross-tunnel_statement_print.jpg",
    },
  },
  {
    slug: "linear-motion-paris-underground-1",
    title: "Linear Motion I",
    categories: ["abstract"],
    location: "Parigi, Francia",
    orientation: "portrait",
    imageSrc: "/prints/linear-motion-paris-underground-1.jpg",
    printAssetUrls: {
      entry: "https://samerfineart-sito-red.vercel.app/print-files/linear-motion-paris-underground-1_entry_print.jpg",
      standard: "https://samerfineart-sito-red.vercel.app/print-files/linear-motion-paris-underground-1_standard_print.jpg",
      hero: "https://samerfineart-sito-red.vercel.app/print-files/linear-motion-paris-underground-1_hero_print.jpg",
      statement: "https://samerfineart-sito-red.vercel.app/print-files/linear-motion-paris-underground-1_statement_print.jpg",
    },
  },
  {
    slug: "linear-motion-paris-underground-2",
    title: "Linear Motion II",
    categories: ["abstract"],
    location: "Parigi, Francia",
    orientation: "landscape",
    imageSrc: "/prints/linear-motion-paris-underground-2.jpg",
    printAssetUrls: {
      entry: "https://samerfineart-sito-red.vercel.app/print-files/linear-motion-paris-underground-2_entry_print.jpg",
      standard: "https://samerfineart-sito-red.vercel.app/print-files/linear-motion-paris-underground-2_standard_print.jpg",
      hero: "https://samerfineart-sito-red.vercel.app/print-files/linear-motion-paris-underground-2_hero_print.jpg",
      statement: "https://samerfineart-sito-red.vercel.app/print-files/linear-motion-paris-underground-2_statement_print.jpg",
    },
  },
  {
    slug: "london-steel",
    title: "London Steel",
    categories: ["architecture"],
    location: "Londra, Regno Unito",
    orientation: "landscape",
    imageSrc: "/prints/London%20Steel.jpg",
    printAssetUrls: {
      entry: "https://samerfineart-sito-red.vercel.app/print-files/London%20Steel_entry_print.jpg",
      standard: "https://samerfineart-sito-red.vercel.app/print-files/London%20Steel_standard_print.jpg",
      hero: "https://samerfineart-sito-red.vercel.app/print-files/London%20Steel_hero_print.jpg",
      statement: "https://samerfineart-sito-red.vercel.app/print-files/London%20Steel_statement_print.jpg",
    },
  },
  {
    slug: "london-more-places-1",
    title: "Sharp Architecture B&W",
    categories: ["architecture"],
    location: "Londra, Regno Unito",
    orientation: "landscape",
    imageSrc: "/prints/london-more-places-1.jpg",
    printAssetUrls: {
      entry: "https://samerfineart-sito-red.vercel.app/print-files/london-more-places-1_entry_print.jpg",
      standard: "https://samerfineart-sito-red.vercel.app/print-files/london-more-places-1_standard_print.jpg",
      hero: "https://samerfineart-sito-red.vercel.app/print-files/london-more-places-1_hero_print.jpg",
      statement: "https://samerfineart-sito-red.vercel.app/print-files/london-more-places-1_statement_print.jpg",
    },
  },
  {
    slug: "osaka-nostalgia",
    title: "Osaka's Nostalgia",
    categories: ["architecture", "japan"],
    location: "Osaka, Giappone",
    orientation: "portrait",
    imageSrc: "/prints/Osaka%20Nostalgia.jpg",
    printAssetUrls: {
      entry: "https://samerfineart-sito-red.vercel.app/print-files/Osaka%20Nostalgia_entry_print.jpg",
      standard: "https://samerfineart-sito-red.vercel.app/print-files/Osaka%20Nostalgia_standard_print.jpg",
      hero: "https://samerfineart-sito-red.vercel.app/print-files/Osaka%20Nostalgia_hero_print.jpg",
      statement: "https://samerfineart-sito-red.vercel.app/print-files/Osaka%20Nostalgia_statement_print.jpg",
    },
  },
  {
    slug: "running-notredame",
    title: "Running near Notre-Dame",
    categories: ["architecture"],
    location: "Parigi, Francia",
    orientation: "landscape",
    imageSrc: "/prints/running-notredame.jpg",
    printAssetUrls: {
      entry: "https://samerfineart-sito-red.vercel.app/print-files/running-notredame_entry_print.jpg",
      standard: "https://samerfineart-sito-red.vercel.app/print-files/running-notredame_standard_print.jpg",
      hero: "https://samerfineart-sito-red.vercel.app/print-files/running-notredame_hero_print.jpg",
      statement: "https://samerfineart-sito-red.vercel.app/print-files/running-notredame_statement_print.jpg",
    },
  },
  {
    slug: "sentiero-nebbioso",
    title: "Foggy Path",
    categories: ["landscape"],
    location: "Parma, Italia",
    orientation: "portrait",
    imageSrc: "/prints/sentiero-nebbioso.jpg",
    printAssetUrls: {
      entry: "https://samerfineart-sito-red.vercel.app/print-files/sentiero-nebbioso_entry_print.jpg",
      standard: "https://samerfineart-sito-red.vercel.app/print-files/sentiero-nebbioso_standard_print.jpg",
      hero: "https://samerfineart-sito-red.vercel.app/print-files/sentiero-nebbioso_hero_print.jpg",
      statement: "https://samerfineart-sito-red.vercel.app/print-files/sentiero-nebbioso_statement_print.jpg",
    },
  },
  {
    slug: "sharp-architecture-horizontal",
    title: "Sharp Architecture Horizontal",
    categories: ["architecture"],
    location: "Londra, Regno Unito",
    orientation: "landscape",
    imageSrc: "/prints/sharp-architecture-horizontal.jpg",
    printAssetUrls: {
      entry: "https://samerfineart-sito-red.vercel.app/print-files/sharp-architecture-horizontal_entry_print.jpg",
      standard: "https://samerfineart-sito-red.vercel.app/print-files/sharp-architecture-horizontal_standard_print.jpg",
      hero: "https://samerfineart-sito-red.vercel.app/print-files/sharp-architecture-horizontal_hero_print.jpg",
      statement: "https://samerfineart-sito-red.vercel.app/print-files/sharp-architecture-horizontal_statement_print.jpg",
    },
  },
  {
    slug: "sharp-architecture",
    title: "Sharp Architecture Vertical",
    categories: ["architecture"],
    location: "Londra, Regno Unito",
    orientation: "portrait",
    imageSrc: "/prints/sharp-architecture.jpg",
    printAssetUrls: {
      entry: "https://samerfineart-sito-red.vercel.app/print-files/sharp-architecture_entry_print.jpg",
      standard: "https://samerfineart-sito-red.vercel.app/print-files/sharp-architecture_standard_print.jpg",
      hero: "https://samerfineart-sito-red.vercel.app/print-files/sharp-architecture_hero_print.jpg",
      statement: "https://samerfineart-sito-red.vercel.app/print-files/sharp-architecture_statement_print.jpg",
    },
  },
  {
    slug: "silent-geometry",
    title: "Silent Geometry",
    categories: ["architecture"],
    location: "Londra, Regno Unito",
    orientation: "portrait",
    imageSrc: "/prints/silent-geometry.jpg",
    printAssetUrls: {
      entry: "https://samerfineart-sito-red.vercel.app/print-files/silent-geometry_entry_print.jpg",
      standard: "https://samerfineart-sito-red.vercel.app/print-files/silent-geometry_standard_print.jpg",
      hero: "https://samerfineart-sito-red.vercel.app/print-files/silent-geometry_hero_print.jpg",
      statement: "https://samerfineart-sito-red.vercel.app/print-files/silent-geometry_statement_print.jpg",
    },
  },
  {
    slug: "sinsekai",
    title: "Sinsekai",
    categories: ["architecture", "japan"],
    location: "Osaka, Giappone",
    orientation: "portrait",
    imageSrc: "/prints/Sinsekai.jpg",
    printAssetUrls: {
      entry: "https://samerfineart-sito-red.vercel.app/print-files/Sinsekai_entry_print.jpg",
      standard: "https://samerfineart-sito-red.vercel.app/print-files/Sinsekai_standard_print.jpg",
      hero: "https://samerfineart-sito-red.vercel.app/print-files/Sinsekai_hero_print.jpg",
      statement: "https://samerfineart-sito-red.vercel.app/print-files/Sinsekai_statement_print.jpg",
    },
  },
  {
    slug: "spiral-of-light",
    title: "Spiral of Light",
    categories: ["architecture", "abstract"],
    location: "Londra, Regno Unito",
    orientation: "portrait",
    imageSrc: "/prints/spiral-of-light.jpg",
    printAssetUrls: {
      entry: "https://samerfineart-sito-red.vercel.app/print-files/spiral-of-light_entry_print.jpg",
      standard: "https://samerfineart-sito-red.vercel.app/print-files/spiral-of-light_standard_print.jpg",
      hero: "https://samerfineart-sito-red.vercel.app/print-files/spiral-of-light_hero_print.jpg",
      statement: "https://samerfineart-sito-red.vercel.app/print-files/spiral-of-light_statement_print.jpg",
    },
  },
  {
    slug: "spiral-staircase",
    title: "Spiral Staircase",
    categories: ["architecture"],
    location: "Roma, Italia",
    orientation: "landscape",
    imageSrc: "/prints/spiral-staircase.jpg",
    printAssetUrls: {
      entry: "https://samerfineart-sito-red.vercel.app/print-files/spiral-staircase_entry_print.jpg",
      standard: "https://samerfineart-sito-red.vercel.app/print-files/spiral-staircase_standard_print.jpg",
      hero: "https://samerfineart-sito-red.vercel.app/print-files/spiral-staircase_hero_print.jpg",
      statement: "https://samerfineart-sito-red.vercel.app/print-files/spiral-staircase_statement_print.jpg",
    },
  },
  {
    slug: "starway-to-heaven-2",
    title: "Stairway to Heaven",
    categories: ["architecture", "japan"],
    location: "Osaka, Giappone",
    orientation: "portrait",
    imageSrc: "/prints/Starway%20to%20heaven%202.jpg",
    printAssetUrls: {
      entry: "https://samerfineart-sito-red.vercel.app/print-files/Starway%20to%20heaven%202_entry_print.jpg",
      standard: "https://samerfineart-sito-red.vercel.app/print-files/Starway%20to%20heaven%202_standard_print.jpg",
      hero: "https://samerfineart-sito-red.vercel.app/print-files/Starway%20to%20heaven%202_hero_print.jpg",
      statement: "https://samerfineart-sito-red.vercel.app/print-files/Starway%20to%20heaven%202_statement_print.jpg",
    },
  },
  {
    slug: "stazione-mediopadana",
    title: "Architecture or Abstraction?",
    categories: ["architecture", "abstract"],
    location: "Reggio Emilia, Italia",
    orientation: "portrait",
    imageSrc: "/prints/stazione-mediopadana.jpg",
    printAssetUrls: {
      entry: "https://samerfineart-sito-red.vercel.app/print-files/stazione-mediopadana_entry_print.jpg",
      standard: "https://samerfineart-sito-red.vercel.app/print-files/stazione-mediopadana_standard_print.jpg",
      hero: "https://samerfineart-sito-red.vercel.app/print-files/stazione-mediopadana_hero_print.jpg",
      statement: "https://samerfineart-sito-red.vercel.app/print-files/stazione-mediopadana_statement_print.jpg",
    },
  },
  {
    slug: "stop",
    title: "Stop",
    categories: ["architecture", "abstract"],
    location: "Berlino, Germania",
    orientation: "portrait",
    imageSrc: "/prints/stop.jpg",
    printAssetUrls: {
      entry: "https://samerfineart-sito-red.vercel.app/print-files/stop_entry_print.jpg",
      standard: "https://samerfineart-sito-red.vercel.app/print-files/stop_standard_print.jpg",
      hero: "https://samerfineart-sito-red.vercel.app/print-files/stop_hero_print.jpg",
      statement: "https://samerfineart-sito-red.vercel.app/print-files/stop_statement_print.jpg",
    },
  },
  {
    slug: "the-point",
    title: "The Point",
    categories: ["architecture"],
    location: "Londra, Regno Unito",
    orientation: "portrait",
    imageSrc: "/prints/the-point.jpg",
    printAssetUrls: {
      entry: "https://samerfineart-sito-red.vercel.app/print-files/the-point_entry_print.jpg",
      standard: "https://samerfineart-sito-red.vercel.app/print-files/the-point_standard_print.jpg",
      hero: "https://samerfineart-sito-red.vercel.app/print-files/the-point_hero_print.jpg",
      statement: "https://samerfineart-sito-red.vercel.app/print-files/the-point_statement_print.jpg",
    },
  },
  {
    slug: "thinking-eiffel-tower",
    title: "Thinking in Paris",
    categories: ["architecture"],
    location: "Parigi, Francia",
    orientation: "portrait",
    imageSrc: "/prints/thinking-eiffel-tower.jpg",
    printAssetUrls: {
      entry: "https://samerfineart-sito-red.vercel.app/print-files/thinking-eiffel-tower_entry_print.jpg",
      standard: "https://samerfineart-sito-red.vercel.app/print-files/thinking-eiffel-tower_standard_print.jpg",
      hero: "https://samerfineart-sito-red.vercel.app/print-files/thinking-eiffel-tower_hero_print.jpg",
      statement: "https://samerfineart-sito-red.vercel.app/print-files/thinking-eiffel-tower_statement_print.jpg",
    },
  },
  {
    slug: "tulip-stair",
    title: "Blue Spiral",
    categories: ["architecture", "abstract"],
    location: "Londra, Regno Unito",
    orientation: "portrait",
    imageSrc: "/prints/tulip-stair.jpg",
    printAssetUrls: {
      entry: "https://samerfineart-sito-red.vercel.app/print-files/tulip-stair_entry_print.jpg",
      standard: "https://samerfineart-sito-red.vercel.app/print-files/tulip-stair_standard_print.jpg",
      hero: "https://samerfineart-sito-red.vercel.app/print-files/tulip-stair_hero_print.jpg",
      statement: "https://samerfineart-sito-red.vercel.app/print-files/tulip-stair_statement_print.jpg",
    },
  },
  {
    slug: "umeda-sky-building-blue",
    title: "Blue Window",
    categories: ["architecture", "japan"],
    location: "Osaka, Giappone",
    orientation: "portrait",
    imageSrc: "/prints/Umeda%20Sky%20Building%20Blue.jpg",
    printAssetUrls: {
      entry: "https://samerfineart-sito-red.vercel.app/print-files/Umeda%20Sky%20Building%20Blue_entry_print.jpg",
      standard: "https://samerfineart-sito-red.vercel.app/print-files/Umeda%20Sky%20Building%20Blue_standard_print.jpg",
      hero: "https://samerfineart-sito-red.vercel.app/print-files/Umeda%20Sky%20Building%20Blue_hero_print.jpg",
      statement: "https://samerfineart-sito-red.vercel.app/print-files/Umeda%20Sky%20Building%20Blue_statement_print.jpg",
    },
  },
  {
    slug: "umeda-sky-building-red",
    title: "Red Window",
    categories: ["architecture", "japan"],
    location: "Osaka, Giappone",
    orientation: "landscape",
    imageSrc: "/prints/Umeda%20Sky%20Building%20Red.jpg",
    printAssetUrls: {
      entry: "https://samerfineart-sito-red.vercel.app/print-files/Umeda%20Sky%20Building%20Red_entry_print.jpg",
      standard: "https://samerfineart-sito-red.vercel.app/print-files/Umeda%20Sky%20Building%20Red_standard_print.jpg",
      hero: "https://samerfineart-sito-red.vercel.app/print-files/Umeda%20Sky%20Building%20Red_hero_print.jpg",
      statement: "https://samerfineart-sito-red.vercel.app/print-files/Umeda%20Sky%20Building%20Red_statement_print.jpg",
    },
  },
  {
    slug: "umeda-sky-building-yellow",
    title: "Yellow Window",
    categories: ["architecture", "japan"],
    location: "Osaka, Giappone",
    orientation: "portrait",
    imageSrc: "/prints/Umeda%20Sky%20Building%20Yellow.jpg",
    printAssetUrls: {
      entry: "https://samerfineart-sito-red.vercel.app/print-files/Umeda%20Sky%20Building%20Yellow_entry_print.jpg",
      standard: "https://samerfineart-sito-red.vercel.app/print-files/Umeda%20Sky%20Building%20Yellow_standard_print.jpg",
      hero: "https://samerfineart-sito-red.vercel.app/print-files/Umeda%20Sky%20Building%20Yellow_hero_print.jpg",
      statement: "https://samerfineart-sito-red.vercel.app/print-files/Umeda%20Sky%20Building%20Yellow_statement_print.jpg",
    },
  },
  {
    slug: "umeda-sky-building",
    title: "Reflections in the Sky",
    categories: ["architecture", "japan"],
    location: "Osaka, Giappone",
    orientation: "portrait",
    imageSrc: "/prints/Umeda%20Sky%20Building.jpg",
    printAssetUrls: {
      entry: "https://samerfineart-sito-red.vercel.app/print-files/Umeda%20Sky%20Building_entry_print.jpg",
      standard: "https://samerfineart-sito-red.vercel.app/print-files/Umeda%20Sky%20Building_standard_print.jpg",
      hero: "https://samerfineart-sito-red.vercel.app/print-files/Umeda%20Sky%20Building_hero_print.jpg",
      statement: "https://samerfineart-sito-red.vercel.app/print-files/Umeda%20Sky%20Building_statement_print.jpg",
    },
  },
  {
    slug: "unicredit-milano-city-life-aereo",
    title: "Milan Architecture",
    categories: ["architecture"],
    location: "Milano, Italia",
    orientation: "portrait",
    imageSrc: "/prints/unicredit-milano-city-life-aereo.jpg",
    printAssetUrls: {
      entry: "https://samerfineart-sito-red.vercel.app/print-files/unicredit-milano-city-life-aereo_entry_print.jpg",
      standard: "https://samerfineart-sito-red.vercel.app/print-files/unicredit-milano-city-life-aereo_standard_print.jpg",
      hero: "https://samerfineart-sito-red.vercel.app/print-files/unicredit-milano-city-life-aereo_hero_print.jpg",
      statement: "https://samerfineart-sito-red.vercel.app/print-files/unicredit-milano-city-life-aereo_statement_print.jpg",
    },
  },
  {
    slug: "unicredit-milano-city-life",
    title: "Urban Portal",
    categories: ["architecture"],
    location: "Milano, Italia",
    orientation: "landscape",
    imageSrc: "/prints/unicredit-milano-city-life.jpg",
    printAssetUrls: {
      entry: "https://samerfineart-sito-red.vercel.app/print-files/unicredit-milano-city-life_entry_print.jpg",
      standard: "https://samerfineart-sito-red.vercel.app/print-files/unicredit-milano-city-life_standard_print.jpg",
      hero: "https://samerfineart-sito-red.vercel.app/print-files/unicredit-milano-city-life_hero_print.jpg",
      statement: "https://samerfineart-sito-red.vercel.app/print-files/unicredit-milano-city-life_statement_print.jpg",
    },
  },
  {
    slug: "vecchietta-osaka",
    title: "Retro Osaka",
    categories: ["japan"],
    location: "Osaka, Giappone",
    orientation: "portrait",
    imageSrc: "/prints/Vecchietta%20Osaka.jpg",
    printAssetUrls: {
      entry: "https://samerfineart-sito-red.vercel.app/print-files/Vecchietta%20Osaka_entry_print.jpg",
      standard: "https://samerfineart-sito-red.vercel.app/print-files/Vecchietta%20Osaka_standard_print.jpg",
      hero: "https://samerfineart-sito-red.vercel.app/print-files/Vecchietta%20Osaka_hero_print.jpg",
      statement: "https://samerfineart-sito-red.vercel.app/print-files/Vecchietta%20Osaka_statement_print.jpg",
    },
  },
  {
    slug: "via-lattea-passo-del-cirone",
    title: "Milky Way at Passo del Cirone",
    categories: ["landscape"],
    location: "Parma, Italia",
    orientation: "portrait",
    imageSrc: "/prints/via-lattea-passo-del-cirone.jpg",
    printAssetUrls: {
      entry: "https://samerfineart-sito-red.vercel.app/print-files/via-lattea-passo-del-cirone_entry_print.jpg",
      standard: "https://samerfineart-sito-red.vercel.app/print-files/via-lattea-passo-del-cirone_standard_print.jpg",
      hero: "https://samerfineart-sito-red.vercel.app/print-files/via-lattea-passo-del-cirone_hero_print.jpg",
      statement: "https://samerfineart-sito-red.vercel.app/print-files/via-lattea-passo-del-cirone_statement_print.jpg",
    },
  },
  {
    slug: "vintage-louvre-1",
    title: "Rain Geometry I",
    categories: ["architecture"],
    location: "Parigi, Francia",
    orientation: "portrait",
    imageSrc: "/prints/vintage-louvre-1.jpg",
    printAssetUrls: {
      entry: "https://samerfineart-sito-red.vercel.app/print-files/vintage-louvre-1_entry_print.jpg",
      standard: "https://samerfineart-sito-red.vercel.app/print-files/vintage-louvre-1_standard_print.jpg",
      hero: "https://samerfineart-sito-red.vercel.app/print-files/vintage-louvre-1_hero_print.jpg",
      statement: "https://samerfineart-sito-red.vercel.app/print-files/vintage-louvre-1_statement_print.jpg",
    },
  },
  {
    slug: "vintage-louvre-2",
    title: "Rain Geometry II",
    categories: ["architecture"],
    location: "Parigi, Francia",
    orientation: "portrait",
    imageSrc: "/prints/vintage-louvre-2.jpg",
    printAssetUrls: {
      entry: "https://samerfineart-sito-red.vercel.app/print-files/vintage-louvre-2_entry_print.jpg",
      standard: "https://samerfineart-sito-red.vercel.app/print-files/vintage-louvre-2_standard_print.jpg",
      hero: "https://samerfineart-sito-red.vercel.app/print-files/vintage-louvre-2_hero_print.jpg",
      statement: "https://samerfineart-sito-red.vercel.app/print-files/vintage-louvre-2_statement_print.jpg",
    },
  },
  {
    slug: "vintage-louvre-3",
    title: "Rain Geometry III",
    categories: ["architecture"],
    location: "Parigi, Francia",
    orientation: "portrait",
    imageSrc: "/prints/vintage-louvre-3.jpg",
    printAssetUrls: {
      entry: "https://samerfineart-sito-red.vercel.app/print-files/vintage-louvre-3_entry_print.jpg",
      standard: "https://samerfineart-sito-red.vercel.app/print-files/vintage-louvre-3_standard_print.jpg",
      hero: "https://samerfineart-sito-red.vercel.app/print-files/vintage-louvre-3_hero_print.jpg",
      statement: "https://samerfineart-sito-red.vercel.app/print-files/vintage-louvre-3_statement_print.jpg",
    },
  },
  {
    slug: "walking-in-paris",
    title: "Walking in Paris",
    categories: ["architecture"],
    location: "Parigi, Francia",
    orientation: "portrait",
    imageSrc: "/prints/Walking%20in%20Paris.jpg",
    printAssetUrls: {
      entry: "https://samerfineart-sito-red.vercel.app/print-files/Walking%20in%20Paris_entry_print.jpg",
      standard: "https://samerfineart-sito-red.vercel.app/print-files/Walking%20in%20Paris_standard_print.jpg",
      hero: "https://samerfineart-sito-red.vercel.app/print-files/Walking%20in%20Paris_hero_print.jpg",
      statement: "https://samerfineart-sito-red.vercel.app/print-files/Walking%20in%20Paris_statement_print.jpg",
    },
  },
  {
    slug: "waves",
    title: "Waves",
    categories: ["architecture", "abstract"],
    location: "Reggio Emilia, Italia",
    orientation: "portrait",
    imageSrc: "/prints/waves.jpg",
    printAssetUrls: {
      entry: "https://samerfineart-sito-red.vercel.app/print-files/waves_entry_print.jpg",
      standard: "https://samerfineart-sito-red.vercel.app/print-files/waves_standard_print.jpg",
      hero: "https://samerfineart-sito-red.vercel.app/print-files/waves_hero_print.jpg",
      statement: "https://samerfineart-sito-red.vercel.app/print-files/waves_statement_print.jpg",
    },
  },
  {
    slug: "yellow-pyramid",
    title: "Yellow",
    categories: ["architecture"],
    location: "Londra, Regno Unito",
    orientation: "landscape",
    imageSrc: "/prints/yellow-pyramid.jpg",
    printAssetUrls: {
      entry: "https://samerfineart-sito-red.vercel.app/print-files/yellow-pyramid_entry_print.jpg",
      standard: "https://samerfineart-sito-red.vercel.app/print-files/yellow-pyramid_standard_print.jpg",
      hero: "https://samerfineart-sito-red.vercel.app/print-files/yellow-pyramid_hero_print.jpg",
      statement: "https://samerfineart-sito-red.vercel.app/print-files/yellow-pyramid_statement_print.jpg",
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

import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { PRINTS } from "@/lib/catalog";
import { routing } from "@/i18n/routing";
import ProductPurchasePanel from "./purchase-panel";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    PRINTS.map((p) => ({ locale, slug: p.slug }))
  );
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug } = await params;
  const print = PRINTS.find((p) => p.slug === slug);
  if (!print) notFound();

  const t = await getTranslations("product");

  return (
    <div className="mx-auto max-w-6xl px-6 py-14 grid md:grid-cols-2 gap-12">
      <div
        className={`relative border hairline ${
          print.orientation === "portrait" ? "aspect-[4/5]" : "aspect-[5/4]"
        }`}
      >
        <Image src={print.imageSrc} alt={print.title} fill className="object-cover" priority />
      </div>

      <div>
        <h1 className="display text-3xl mb-3">{print.title}</h1>
        <p className="text-[var(--color-steel)] mb-8 leading-relaxed max-w-md">
          {print.story}
        </p>

        <ProductPurchasePanel slug={print.slug} orientation={print.orientation} />

        <div className="mt-10 pt-8 border-t hairline space-y-4 wall-label max-w-md">
          <p>{t("paperInfo")}</p>
          <p>{t("sizeInfo")}</p>
          <p>{t("shippingInfo")}</p>
        </div>
      </div>
    </div>
  );
}

import { getTranslations } from "next-intl/server";
import ShopGrid from "@/components/shop-grid";

export default async function ShopPage() {
  const t = await getTranslations("shop");

  return (
    <div className="mx-auto max-w-6xl px-6 py-14">
      <h1 className="display text-3xl mb-2">{t("title")}</h1>
      <p className="text-[var(--color-steel)] mb-10 max-w-lg">{t("subtitle")}</p>
      <ShopGrid />
    </div>
  );
}

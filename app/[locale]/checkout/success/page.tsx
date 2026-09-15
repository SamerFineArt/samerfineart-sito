import { getTranslations } from "next-intl/server";

export default async function CheckoutSuccess() {
  const t = await getTranslations("checkout");
  return (
    <div className="mx-auto max-w-2xl px-6 py-24 text-center">
      <h1 className="display text-3xl mb-4">{t("successTitle")}</h1>
      <p className="text-[var(--color-steel)] leading-relaxed">{t("successBody")}</p>
    </div>
  );
}

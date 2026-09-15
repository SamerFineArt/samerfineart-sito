import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function CheckoutCancel() {
  const t = await getTranslations("checkout");
  return (
    <div className="mx-auto max-w-2xl px-6 py-24 text-center">
      <h1 className="display text-3xl mb-4">{t("cancelTitle")}</h1>
      <p className="text-[var(--color-steel)] leading-relaxed mb-8">{t("cancelBody")}</p>
      <Link
        href="/shop"
        className="border hairline px-6 py-3 text-sm hover:bg-[var(--color-accent)] hover:text-[var(--color-ink)] hover:border-[var(--color-accent)] transition-colors inline-block"
      >
        {t("backToShop")}
      </Link>
    </div>
  );
}

"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { SIZE_TIERS } from "@/lib/catalog";

export default function ProductPurchasePanel({
  slug,
  orientation,
}: {
  slug: string;
  orientation: "portrait" | "landscape";
}) {
  const t = useTranslations("product");
  const locale = useLocale();
  const [selectedTierId, setSelectedTierId] = useState(SIZE_TIERS[0].id);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const selectedTier = SIZE_TIERS.find((t) => t.id === selectedTierId)!;

  async function handleCheckout() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, tierId: selectedTierId, orientation, locale }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) {
        throw new Error(data.error || t("genericError"));
      }
      window.location.href = data.url;
    } catch (e) {
      setError(e instanceof Error ? e.message : t("genericError"));
      setLoading(false);
    }
  }

  return (
    <div>
      <p className="text-sm mb-3">{t("size")}</p>
      <div className="grid grid-cols-2 gap-2 mb-6">
        {SIZE_TIERS.map((tier) => (
          <button
            key={tier.id}
            onClick={() => setSelectedTierId(tier.id)}
            className={`text-left border hairline px-4 py-3 transition-colors ${
              tier.id === selectedTierId
                ? "border-[var(--color-accent)] bg-[var(--color-accent)]/10"
                : "hover:border-[var(--color-paper)]/40"
            }`}
          >
            <p className="text-sm">{tier.label}</p>
            <p className="wall-label">{tier.cmLabel}</p>
            <p className="text-sm mt-1">€{tier.price}</p>
          </button>
        ))}
      </div>

      <p className="wall-label mb-6">{t(`sizeDescriptions.${selectedTierId}` as never)}</p>

      <button
        onClick={handleCheckout}
        disabled={loading}
        className="w-full border hairline px-6 py-3 text-sm hover:bg-[var(--color-accent)] hover:text-[var(--color-ink)] hover:border-[var(--color-accent)] transition-colors disabled:opacity-50"
      >
        {loading ? t("loading") : t("buy", { price: selectedTier.price })}
      </button>

      {error && <p className="text-sm text-red-400 mt-3">{error}</p>}
    </div>
  );
}

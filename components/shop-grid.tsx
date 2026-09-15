"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { PRINTS, CATEGORY_IDS, type CategoryId } from "@/lib/catalog";

export default function ShopGrid() {
  const t = useTranslations("shop.categories");
  const tHome = useTranslations("home");
  const [active, setActive] = useState<CategoryId | "all">("all");

  const filtered =
    active === "all" ? PRINTS : PRINTS.filter((p) => p.categories.includes(active));

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-10">
        <button
          onClick={() => setActive("all")}
          className={`text-sm px-4 py-2 border hairline transition-colors ${
            active === "all"
              ? "border-[var(--color-accent)] text-[var(--color-accent)]"
              : "hover:border-[var(--color-paper)]/40"
          }`}
        >
          {t("all")}
        </button>
        {CATEGORY_IDS.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`text-sm px-4 py-2 border hairline transition-colors ${
              active === cat
                ? "border-[var(--color-accent)] text-[var(--color-accent)]"
                : "hover:border-[var(--color-paper)]/40"
            }`}
          >
            {t(cat)}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-12">
        {filtered.map((print) => (
          <Link key={print.slug} href={`/shop/${print.slug}`} className="group block">
            <div
              className={`relative border hairline mb-3 ${
                print.orientation === "portrait" ? "aspect-[4/5]" : "aspect-[5/4]"
              }`}
            >
              <Image
                src={print.imageSrc}
                alt={print.title}
                fill
                className="object-cover transition-opacity group-hover:opacity-90"
              />
            </div>
            <p className="display text-base">{print.title}</p>
            <p className="wall-label mt-1">{tHome("startingFrom", { price: 29 })}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

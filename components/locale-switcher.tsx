"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

const LOCALE_LABELS: Record<string, { flag: string; label: string }> = {
  en: { flag: "🇬🇧", label: "EN" },
  it: { flag: "🇮🇹", label: "IT" },
  fr: { flag: "🇫🇷", label: "FR" },
  es: { flag: "🇪🇸", label: "ES" },
};

export default function LocaleSwitcher({ currentLocale }: { currentLocale: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 text-sm hover:text-[var(--color-accent)] transition-colors"
        aria-label="Change language"
      >
        <span>{LOCALE_LABELS[currentLocale]?.flag}</span>
        <span className="wall-label">{LOCALE_LABELS[currentLocale]?.label}</span>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 border hairline bg-[var(--color-ink)] min-w-[120px] z-10">
          {routing.locales.map((locale) => (
            <button
              key={locale}
              onClick={() => {
                router.replace(pathname, { locale });
                setOpen(false);
              }}
              className={`w-full flex items-center gap-2 px-4 py-2.5 text-sm text-left hover:bg-[var(--color-paper)]/5 transition-colors ${
                locale === currentLocale ? "text-[var(--color-accent)]" : ""
              }`}
            >
              <span>{LOCALE_LABELS[locale].flag}</span>
              <span>{LOCALE_LABELS[locale].label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

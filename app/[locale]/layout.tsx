import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import LocaleSwitcher from "@/components/locale-switcher";
import "./globals.css";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Samer Fine Art — Fine art photographic prints",
    description:
      "Fine art prints on Hahnemühle Photo Rag 308gsm. Worldwide shipping.",
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  const messages = await getMessages();
  const t = await getTranslations({ locale, namespace: "nav" });
  const tFooter = await getTranslations({ locale, namespace: "footer" });

  return (
    <html lang={locale} className="font-fallback">
      <body>
        <NextIntlClientProvider messages={messages}>
          <header className="border-b hairline">
            <div className="mx-auto max-w-6xl px-6 py-5 flex items-center justify-between">
              <Link href="/" className="display text-lg tracking-tight">
                Samer Fine Art
              </Link>
              <nav className="flex items-center gap-6 text-sm">
                <Link href="/shop" className="hover:text-[var(--color-accent)] transition-colors">
                  {t("shop")}
                </Link>
                <Link href="/about" className="hover:text-[var(--color-accent)] transition-colors">
                  {t("about")}
                </Link>
                <LocaleSwitcher currentLocale={locale} />
              </nav>
            </div>
          </header>
          <main>{children}</main>
          <footer className="border-t hairline mt-32">
            <div className="mx-auto max-w-6xl px-6 py-10 flex flex-col md:flex-row justify-between gap-4 wall-label">
              <p>© {new Date().getFullYear()} Samer Fine Art. {tFooter("rights")}</p>
              <nav className="flex gap-4">
                <Link href="/privacy" className="hover:text-[var(--color-accent)] transition-colors">
                  {tFooter("privacy")}
                </Link>
                <Link href="/returns" className="hover:text-[var(--color-accent)] transition-colors">
                  {tFooter("returns")}
                </Link>
              </nav>
              <p>{tFooter("printInfo")}</p>
            </div>
          </footer>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

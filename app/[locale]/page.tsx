import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PRINTS } from "@/lib/catalog";

export default async function Home() {
  const t = await getTranslations("home");
  const hero = PRINTS[0];

  return (
    <>
      <section className="relative">
        <div className="mx-auto max-w-6xl px-6 pt-14 pb-10 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="display text-4xl md:text-5xl leading-[1.05] mb-6 whitespace-pre-line">
              {t("title")}
            </h1>
            <p className="text-[var(--color-steel)] max-w-md mb-8 leading-relaxed">
              {t("subtitle")}
            </p>
            <Link
              href="/shop"
              className="inline-block border hairline px-6 py-3 text-sm hover:bg-[var(--color-accent)] hover:text-[var(--color-ink)] hover:border-[var(--color-accent)] transition-colors"
            >
              {t("cta")}
            </Link>
          </div>
          <div className="aspect-[4/5] relative border hairline">
            <Image
              src={hero.imageSrc}
              alt={hero.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="flex items-baseline justify-between mb-8">
          <h2 className="display text-2xl">{t("latest")}</h2>
          <Link href="/shop" className="text-sm wall-label hover:text-[var(--color-accent)]">
            {t("viewAll")}
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-12">
          {PRINTS.filter((p) => p.featured).slice(0, 6).map((print) => (
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
              <p className="wall-label mt-1">{t("startingFrom", { price: 29 })}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}

import { getTranslations } from "next-intl/server";

export default async function AboutPage() {
  const t = await getTranslations("about");

  return (
    <div className="mx-auto max-w-2xl px-6 py-20">
      <h1 className="display text-3xl mb-6">{t("title")}</h1>
      <p className="text-[var(--color-steel)] leading-relaxed mb-4">{t("body")}</p>
      <p className="wall-label">
        {t("instagram")}{" "}
        <a
          href="https://instagram.com/samerfineart"
          target="_blank"
          rel="noreferrer"
          className="underline hover:text-[var(--color-accent)]"
        >
          @samerfineart
        </a>
        .
      </p>
    </div>
  );
}

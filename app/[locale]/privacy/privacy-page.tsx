import { getTranslations } from "next-intl/server";

type Section = { heading: string; body: string };

export default async function PrivacyPage() {
  const t = await getTranslations("legal.privacy");
  const sections = t.raw("sections") as Section[];

  return (
    <div className="mx-auto max-w-2xl px-6 py-20">
      <h1 className="display text-3xl mb-2">{t("title")}</h1>
      <p className="wall-label mb-10">{t("lastUpdated")}</p>
      <div className="space-y-8">
        {sections.map((section, i) => (
          <div key={i}>
            <h2 className="display text-lg mb-2">{section.heading}</h2>
            <p className="text-[var(--color-steel)] leading-relaxed">{section.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

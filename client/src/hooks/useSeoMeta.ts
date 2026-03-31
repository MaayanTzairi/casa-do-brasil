/**
 * useSeoMeta — Dynamic SEO meta tag injection from CMS
 * Fetches SEO settings for a given page slug and applies them to the document head.
 * Falls back to static defaults if CMS data is not available.
 */

import { useEffect } from "react";
import { trpc } from "@/lib/trpc";
import { useLanguage } from "@/contexts/LanguageContext";

interface SeoDefaults {
  titleHe?: string;
  titleEn?: string;
  descriptionHe?: string;
  descriptionEn?: string;
}

function setMeta(name: string, content: string) {
  let el = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.name = name;
    document.head.appendChild(el);
  }
  el.content = content;
}

function setProperty(property: string, content: string) {
  let el = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("property", property);
    document.head.appendChild(el);
  }
  el.content = content;
}

function setCanonical(url: string) {
  let el = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement("link");
    el.rel = "canonical";
    document.head.appendChild(el);
  }
  el.href = url;
}

function injectSchemaScript(json: string, id: string) {
  // Remove old script if exists
  const old = document.getElementById(id);
  if (old) old.remove();
  try {
    JSON.parse(json); // validate JSON
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = id;
    script.textContent = json;
    document.head.appendChild(script);
  } catch {
    // Invalid JSON — skip
  }
}

export function useSeoMeta(pageSlug: string, defaults: SeoDefaults = {}) {
  const { isHe } = useLanguage();
  const { data: seo } = trpc.cms.getSeoSettings.useQuery(
    { pageSlug },
    { staleTime: 60_000 }
  );

  useEffect(() => {
    const titleHe = seo?.titleHe || defaults.titleHe || "Casa do Brasil | קאסה דו ברזיל — מסעדת בשרים ברזילאית אילת";
    const titleEn = seo?.titleEn || defaults.titleEn || "Casa do Brasil | Brazilian Steakhouse Eilat";
    const descHe = seo?.descriptionHe || defaults.descriptionHe || "מסעדת בשרים ברזילאית מובילה באילת. חוויית שורסקריה אותנטית עם נתחים מובחרים, מוזיקה חיה ואווירה ברזילאית.";
    const descEn = seo?.descriptionEn || defaults.descriptionEn || "Eilat's premier Brazilian steakhouse. Authentic churrascaria experience with premium cuts, live music, and Brazilian atmosphere.";

    const title = isHe ? titleHe : titleEn;
    const description = isHe ? descHe : descEn;
    const keywords = isHe ? (seo?.keywordsHe || "") : (seo?.keywordsEn || "");

    // Page title
    document.title = title;

    // Basic meta
    setMeta("description", description);
    if (keywords) setMeta("keywords", keywords);
    if (seo?.robots) setMeta("robots", seo.robots);

    // Open Graph
    setProperty("og:title", seo?.ogTitle || title);
    setProperty("og:description", seo?.ogDescription || description);
    setProperty("og:type", "website");
    setProperty("og:locale", isHe ? "he_IL" : "en_US");
    setProperty("og:locale:alternate", isHe ? "en_US" : "he_IL");
    if (seo?.ogImageUrl) setProperty("og:image", seo.ogImageUrl);

    // Twitter Card
    setMeta("twitter:title", seo?.ogTitle || title);
    setMeta("twitter:description", seo?.ogDescription || description);
    if (seo?.ogImageUrl) setMeta("twitter:image", seo.ogImageUrl);

    // Canonical
    if (seo?.canonicalUrl) {
      setCanonical(seo.canonicalUrl);
    }

    // Schema JSON-LD
    if (seo?.schemaJson) {
      injectSchemaScript(seo.schemaJson, `schema-${pageSlug}`);
    }

    // Cleanup on unmount
    return () => {
      // Restore default title on unmount
      document.title = "Casa do Brasil | Brazilian Steakhouse Eilat";
    };
  }, [seo, isHe, pageSlug]);
}

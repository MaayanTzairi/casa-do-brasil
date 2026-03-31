/**
 * CASA DO BRASIL — Admin SEO Editor
 * Manage SEO settings per page: title, description, keywords, OG, canonical, robots, schema
 * Bilingual: Hebrew + English side by side
 */

import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Save, Loader2, Search, Globe, ChevronDown, ChevronUp } from "lucide-react";

const PAGES = [
  { slug: "home", labelHe: "עמוד הבית", labelEn: "Home", path: "/" },
  { slug: "menu", labelHe: "תפריט", labelEn: "Menu", path: "/menu" },
  { slug: "story", labelHe: "הסיפור שלנו", labelEn: "Our Story", path: "/story" },
  { slug: "gallery", labelHe: "גלריה", labelEn: "Gallery", path: "/gallery" },
  { slug: "faq", labelHe: "שאלות ותשובות", labelEn: "FAQ", path: "/faq" },
  { slug: "vip", labelHe: "VIP", labelEn: "VIP", path: "/vip" },
  { slug: "blog", labelHe: "בלוג", labelEn: "Blog", path: "/blog" },
];

function SeoPageEditor({ pageSlug, pageLabelHe, pageLabelEn, pagePath }: {
  pageSlug: string;
  pageLabelHe: string;
  pageLabelEn: string;
  pagePath: string;
}) {
  const [expanded, setExpanded] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const { data: seo, isLoading } = trpc.cms.getSeoSettings.useQuery({ pageSlug }, { enabled: expanded });
  const utils = trpc.useUtils();
  const upsert = trpc.cms.upsertSeoSettings.useMutation({
    onSuccess: () => {
      utils.cms.getSeoSettings.invalidate({ pageSlug });
      utils.cms.getAllSeoSettings.invalidate();
      toast.success(`SEO עודכן — ${pageLabelHe}`);
    },
    onError: (e) => toast.error(`שגיאה: ${e.message}`),
  });

  const [form, setForm] = useState<{
    titleHe: string; titleEn: string;
    descriptionHe: string; descriptionEn: string;
    keywordsHe: string; keywordsEn: string;
    ogTitle: string; ogDescription: string; ogImageUrl: string;
    canonicalUrl: string; robots: string; schemaJson: string;
  }>({
    titleHe: "", titleEn: "",
    descriptionHe: "", descriptionEn: "",
    keywordsHe: "", keywordsEn: "",
    ogTitle: "", ogDescription: "", ogImageUrl: "",
    canonicalUrl: "", robots: "index, follow", schemaJson: "",
  });
  const [loaded, setLoaded] = useState(false);

  // Populate form when data loads
  if (seo && !loaded) {
    setLoaded(true);
    setForm({
      titleHe: seo.titleHe ?? "",
      titleEn: seo.titleEn ?? "",
      descriptionHe: seo.descriptionHe ?? "",
      descriptionEn: seo.descriptionEn ?? "",
      keywordsHe: seo.keywordsHe ?? "",
      keywordsEn: seo.keywordsEn ?? "",
      ogTitle: seo.ogTitle ?? "",
      ogDescription: seo.ogDescription ?? "",
      ogImageUrl: seo.ogImageUrl ?? "",
      canonicalUrl: seo.canonicalUrl ?? "",
      robots: seo.robots ?? "index, follow",
      schemaJson: seo.schemaJson ?? "",
    });
  }

  const set = (key: keyof typeof form) => (value: string) =>
    setForm(f => ({ ...f, [key]: value }));

  const handleSave = () => {
    upsert.mutate({ pageSlug, ...form });
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      {/* Page header */}
      <button
        onClick={() => { setExpanded(v => !v); setLoaded(false); }}
        className="w-full flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition-colors text-right"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#8B1A1A]/10 flex items-center justify-center shrink-0">
            <Globe className="w-4 h-4 text-[#8B1A1A]" />
          </div>
          <div className="text-right">
            <p className="text-sm font-bold text-gray-900">{pageLabelHe} — {pageLabelEn}</p>
            <p className="text-xs text-gray-400 font-mono">{pagePath}</p>
          </div>
        </div>
        {expanded
          ? <ChevronUp className="w-4 h-4 text-gray-400 shrink-0" />
          : <ChevronDown className="w-4 h-4 text-gray-400 shrink-0" />}
      </button>

      {expanded && (
        <div className="border-t border-gray-100 p-5 space-y-4" dir="rtl">
          {isLoading && (
            <div className="flex items-center justify-center py-6">
              <Loader2 className="w-5 h-5 animate-spin text-gray-400" />
            </div>
          )}

          {!isLoading && (
            <>
              {/* Title */}
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">כותרת עמוד — עברית</label>
                  <Input dir="rtl" value={form.titleHe} onChange={e => set("titleHe")(e.target.value)} className="text-sm text-right" placeholder="Casa do Brasil | קאסה דו ברזיל" />
                  <span className={`text-[10px] text-right ${form.titleHe.length > 60 ? "text-red-500" : "text-gray-400"}`}>{form.titleHe.length}/60 תווים</span>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Page Title — English</label>
                  <Input dir="ltr" value={form.titleEn} onChange={e => set("titleEn")(e.target.value)} className="text-sm" placeholder="Casa do Brasil | Brazilian Steakhouse Eilat" />
                  <span className={`text-[10px] ${form.titleEn.length > 60 ? "text-red-500" : "text-gray-400"}`}>{form.titleEn.length}/60 chars</span>
                </div>
              </div>

              {/* Description */}
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">תיאור — עברית</label>
                  <Textarea dir="rtl" value={form.descriptionHe} onChange={e => set("descriptionHe")(e.target.value)} rows={2} className="text-sm resize-none text-right" placeholder="מסעדת בשרים ברזילאית..." />
                  <span className={`text-[10px] text-right ${form.descriptionHe.length > 160 ? "text-red-500" : "text-gray-400"}`}>{form.descriptionHe.length}/160 תווים</span>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Description — English</label>
                  <Textarea dir="ltr" value={form.descriptionEn} onChange={e => set("descriptionEn")(e.target.value)} rows={2} className="text-sm resize-none" placeholder="Brazilian steakhouse in Eilat..." />
                  <span className={`text-[10px] ${form.descriptionEn.length > 160 ? "text-red-500" : "text-gray-400"}`}>{form.descriptionEn.length}/160 chars</span>
                </div>
              </div>

              {/* Keywords */}
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">מילות מפתח — עברית</label>
                  <Input dir="rtl" value={form.keywordsHe} onChange={e => set("keywordsHe")(e.target.value)} className="text-sm text-right" placeholder="מסעדה, בשרים, אילת, ברזיל" />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Keywords — English</label>
                  <Input dir="ltr" value={form.keywordsEn} onChange={e => set("keywordsEn")(e.target.value)} className="text-sm" placeholder="restaurant, steakhouse, Eilat, Brazil" />
                </div>
              </div>

              {/* Advanced SEO */}
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => setShowAdvanced(v => !v)}
                  className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors text-sm font-semibold text-gray-700"
                >
                  <div className="flex items-center gap-2">
                    <Search className="w-4 h-4 text-[#B9A167]" />
                    Open Graph, Canonical & Schema
                  </div>
                  {showAdvanced ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                </button>

                {showAdvanced && (
                  <div className="p-4 space-y-3 bg-white">
                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">OG Title</label>
                      <Input dir="ltr" value={form.ogTitle} onChange={e => set("ogTitle")(e.target.value)} className="text-sm" placeholder="Same as page title if empty" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">OG Description</label>
                      <Textarea dir="ltr" value={form.ogDescription} onChange={e => set("ogDescription")(e.target.value)} rows={2} className="text-sm resize-none" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">OG Image URL</label>
                      <Input dir="ltr" value={form.ogImageUrl} onChange={e => set("ogImageUrl")(e.target.value)} className="text-sm font-mono" placeholder="https://..." />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Canonical URL</label>
                      <Input dir="ltr" value={form.canonicalUrl} onChange={e => set("canonicalUrl")(e.target.value)} className="text-sm font-mono" placeholder="https://casadobrasil.co.il/menu" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Robots</label>
                      <Input dir="ltr" value={form.robots} onChange={e => set("robots")(e.target.value)} className="text-sm font-mono" placeholder="index, follow" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Schema JSON-LD</label>
                      <Textarea dir="ltr" value={form.schemaJson} onChange={e => set("schemaJson")(e.target.value)} rows={4} className="text-sm resize-none font-mono" placeholder='{"@context": "https://schema.org", ...}' />
                    </div>
                  </div>
                )}
              </div>

              {/* Save button */}
              <div className="flex justify-start pt-1">
                <Button
                  size="sm"
                  onClick={handleSave}
                  disabled={upsert.isPending}
                  className="bg-[#8B1A1A] hover:bg-[#6d1414] text-white border-0 gap-1.5"
                >
                  {upsert.isPending ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                  שמור הגדרות SEO
                </Button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default function SeoEditor() {
  return (
    <div className="space-y-3" dir="rtl">
      {/* Header */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#8B1A1A]/10 border border-[#8B1A1A]/15 flex items-center justify-center shrink-0">
            <Search className="w-4 h-4 text-[#8B1A1A]/70" />
          </div>
          <div className="text-right">
            <h2 className="text-base font-bold text-gray-900">הגדרות SEO</h2>
            <p className="text-xs text-gray-500 mt-0.5">
              כותרות, תיאורים, Open Graph ו-Schema לכל עמוד — עברית ואנגלית
            </p>
          </div>
        </div>
      </div>

      {/* Tip */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-right">
        <p className="text-xs text-amber-800 font-semibold mb-1">💡 טיפ לאנשי SEO</p>
        <p className="text-xs text-amber-700 leading-relaxed">
          כותרת אידיאלית: עד 60 תווים. תיאור: עד 160 תווים. מילות מפתח: 5-10 מילים רלוונטיות.
          הגדרות OG משפיעות על שיתוף ברשתות חברתיות. Schema JSON-LD משפר תוצאות עשירות בגוגל.
        </p>
      </div>

      {/* Per-page SEO editors */}
      {PAGES.map(page => (
        <SeoPageEditor
          key={page.slug}
          pageSlug={page.slug}
          pageLabelHe={page.labelHe}
          pageLabelEn={page.labelEn}
          pagePath={page.path}
        />
      ))}
    </div>
  );
}

/**
 * CASA DO BRASIL — Admin: Hero Section Editor
 */
import { useEffect, useState } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Save, CheckCircle2, AlertCircle } from "lucide-react";

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="px-5 py-3.5 border-b border-gray-100 bg-gray-50/50">
        <h3 className="text-sm font-semibold text-gray-700">{title}</h3>
      </div>
      <div className="p-5 space-y-5">{children}</div>
    </div>
  );
}

function BilingualField({ label, heValue, enValue, hePlaceholder, enPlaceholder, onHeChange, onEnChange }: {
  label: string; heValue: string; enValue: string;
  hePlaceholder?: string; enPlaceholder?: string;
  onHeChange: (v: string) => void; onEnChange: (v: string) => void;
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{label}</Label>
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 mb-1">
            <span className="text-[10px] font-bold text-[#B9A167] bg-[#B9A167]/10 px-1.5 py-0.5 rounded">עברית</span>
            <span className="text-[10px] text-gray-400">ימין לשמאל</span>
          </div>
          <Input dir="rtl" value={heValue} onChange={e => onHeChange(e.target.value)} placeholder={hePlaceholder}
            className="text-right text-sm border-gray-200 focus:border-[#8B1A1A] focus:ring-[#8B1A1A]/20" />
        </div>
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 mb-1">
            <span className="text-[10px] font-bold text-blue-500 bg-blue-50 px-1.5 py-0.5 rounded">English</span>
            <span className="text-[10px] text-gray-400">left to right</span>
          </div>
          <Input dir="ltr" value={enValue} onChange={e => onEnChange(e.target.value)} placeholder={enPlaceholder}
            className="text-left text-sm border-gray-200 focus:border-blue-400 focus:ring-blue-400/20" />
        </div>
      </div>
    </div>
  );
}

function UrlField({ label, value, placeholder, onChange }: { label: string; value: string; placeholder?: string; onChange: (v: string) => void }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{label}</Label>
      <Input dir="ltr" type="url" value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
        className="text-left text-sm font-mono border-gray-200 focus:border-blue-400 focus:ring-blue-400/20" />
    </div>
  );
}

const DEFAULTS = {
  titleHe: "CASA DO BRASIL", titleEn: "CASA DO BRASIL",
  subtitleHe: "גריל ברזילאי — מוזיקה וצ'וראסקריה", subtitleEn: "Brazilian Grill - Music & Churrascaria",
  reserveBtnHe: "הזמן שולחן", reserveBtnEn: "RESERVE A TABLE",
  reserveBtnUrl: "https://tabitisrael.co.il/online-reservations/create-reservation?step=search&orgId=619bae58c6a7c716a41bdc73",
  menuBtnHe: "לתפריט", menuBtnEn: "EXPLORE MENU",
  menuBtnUrl: "#menu",
  instagramUrl: "https://www.instagram.com", facebookUrl: "https://www.facebook.com", tiktokUrl: "https://www.tiktok.com",
  backgroundImageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663392712778/NSX3yZdWqRV4jGmQcXqBFP/hero-sm_opt_4d593302.webp",
};

export default function HeroEditor() {
  const { data: cms, isLoading } = trpc.cms.getHero.useQuery();
  const utils = trpc.useUtils();
  const updateHero = trpc.cms.updateHero.useMutation({
    onSuccess: () => { utils.cms.getHero.invalidate(); setSaveStatus("success"); setTimeout(() => setSaveStatus("idle"), 3000); },
    onError: () => { setSaveStatus("error"); setTimeout(() => setSaveStatus("idle"), 4000); },
  });
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "success" | "error">("idle");
  const [form, setForm] = useState(DEFAULTS);

  useEffect(() => {
    if (!cms) return;
    setForm({
      titleHe: cms.titleHe || DEFAULTS.titleHe,
      titleEn: cms.titleEn || DEFAULTS.titleEn,
      subtitleHe: cms.subtitleHe || DEFAULTS.subtitleHe,
      subtitleEn: cms.subtitleEn || DEFAULTS.subtitleEn,
      reserveBtnHe: cms.reserveBtnHe || DEFAULTS.reserveBtnHe,
      reserveBtnEn: cms.reserveBtnEn || DEFAULTS.reserveBtnEn,
      reserveBtnUrl: cms.reserveBtnUrl || DEFAULTS.reserveBtnUrl,
      menuBtnHe: cms.menuBtnHe || DEFAULTS.menuBtnHe,
      menuBtnEn: cms.menuBtnEn || DEFAULTS.menuBtnEn,
      menuBtnUrl: cms.menuBtnUrl || DEFAULTS.menuBtnUrl,
      instagramUrl: cms.instagramUrl || DEFAULTS.instagramUrl,
      facebookUrl: cms.facebookUrl || DEFAULTS.facebookUrl,
      tiktokUrl: cms.tiktokUrl || DEFAULTS.tiktokUrl,
      backgroundImageUrl: cms.backgroundImageUrl || DEFAULTS.backgroundImageUrl,
    });
  }, [cms]);

  const set = (key: keyof typeof form) => (v: string) => setForm(p => ({ ...p, [key]: v }));
  const handleSave = () => { setSaveStatus("saving"); updateHero.mutate(form); };

  if (isLoading) return <div className="flex items-center justify-center py-24"><Loader2 className="w-6 h-6 text-gray-300 animate-spin" /></div>;

  return (
    <div className="space-y-5">
      <SectionCard title="כותרות — Titles">
        <BilingualField label="כותרת ראשית" heValue={form.titleHe} enValue={form.titleEn} onHeChange={set("titleHe")} onEnChange={set("titleEn")} />
        <BilingualField label="כותרת משנה" heValue={form.subtitleHe} enValue={form.subtitleEn} onHeChange={set("subtitleHe")} onEnChange={set("subtitleEn")} />
      </SectionCard>

      <SectionCard title="כפתורים — Buttons">
        <BilingualField label="כפתור הזמנה — טקסט" heValue={form.reserveBtnHe} enValue={form.reserveBtnEn} onHeChange={set("reserveBtnHe")} onEnChange={set("reserveBtnEn")} />
        <UrlField label="כפתור הזמנה — URL" value={form.reserveBtnUrl} placeholder="https://..." onChange={set("reserveBtnUrl")} />
        <BilingualField label="כפתור תפריט — טקסט" heValue={form.menuBtnHe} enValue={form.menuBtnEn} onHeChange={set("menuBtnHe")} onEnChange={set("menuBtnEn")} />
        <UrlField label="כפתור תפריט — URL" value={form.menuBtnUrl} placeholder="/menu" onChange={set("menuBtnUrl")} />
      </SectionCard>

      <SectionCard title="רשתות חברתיות — Social Media">
        <UrlField label="Instagram URL" value={form.instagramUrl} placeholder="https://instagram.com/..." onChange={set("instagramUrl")} />
        <UrlField label="Facebook URL" value={form.facebookUrl} placeholder="https://facebook.com/..." onChange={set("facebookUrl")} />
        <UrlField label="TikTok URL" value={form.tiktokUrl} placeholder="https://tiktok.com/@..." onChange={set("tiktokUrl")} />
      </SectionCard>

      <SectionCard title="תמונת רקע — Background Image">
        <UrlField label="URL תמונת רקע" value={form.backgroundImageUrl} placeholder="https://..." onChange={set("backgroundImageUrl")} />
        {form.backgroundImageUrl && (
          <img src={form.backgroundImageUrl} alt="preview" className="w-full h-32 object-cover rounded-lg border border-gray-200 mt-2" />
        )}
      </SectionCard>

      <div className="flex items-center justify-between pt-1">
        <div className="flex items-center gap-2 text-sm">
          {saveStatus === "success" && <span className="flex items-center gap-1.5 text-green-600"><CheckCircle2 className="w-4 h-4" />נשמר בהצלחה!</span>}
          {saveStatus === "error" && <span className="flex items-center gap-1.5 text-red-500"><AlertCircle className="w-4 h-4" />שגיאה בשמירה.</span>}
        </div>
        <Button onClick={handleSave} disabled={saveStatus === "saving"} className="bg-[#8B1A1A] hover:bg-[#6d1414] text-white border-0 px-6">
          {saveStatus === "saving" ? <><Loader2 className="w-4 h-4 ml-2 animate-spin" />שומר...</> : <><Save className="w-4 h-4 ml-2" />שמור שינויים</>}
        </Button>
      </div>
    </div>
  );
}

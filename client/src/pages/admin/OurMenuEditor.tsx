/**
 * CASA DO BRASIL — Admin: Our Menu Section Editor
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

function BilingualField({ label, heValue, enValue, onHeChange, onEnChange }: {
  label: string; heValue: string; enValue: string;
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
          <Input dir="rtl" value={heValue} onChange={e => onHeChange(e.target.value)}
            className="text-right text-sm border-gray-200 focus:border-[#8B1A1A] focus:ring-[#8B1A1A]/20" />
        </div>
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 mb-1">
            <span className="text-[10px] font-bold text-blue-500 bg-blue-50 px-1.5 py-0.5 rounded">English</span>
            <span className="text-[10px] text-gray-400">left to right</span>
          </div>
          <Input dir="ltr" value={enValue} onChange={e => onEnChange(e.target.value)}
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
        className="text-left text-sm font-mono border-gray-200 focus:border-blue-400" />
    </div>
  );
}

const DEFAULTS = {
  labelHe: "התפריט שלנו", labelEn: "OUR MENU",
  headlineLine1He: "טעמים", headlineLine1En: "Flavors",
  headlineLine2He: "מהלב", headlineLine2En: "from the",
  headlineLine3He: "של ברזיל", headlineLine3En: "Heart of Brazil",
  ctaBtnHe: "לתפריט המלא", ctaBtnEn: "VIEW FULL MENU",
  ctaBtnUrl: "/menu",
  card1ImageUrl: "", card1NameHe: "בשרים", card1NameEn: "Meats",
  card1TypeHe: "מנות עיקריות", card1TypeEn: "Main Courses",
  card1BtnHe: "לצפייה", card1BtnEn: "VIEW", card1BtnUrl: "/menu#meats",
  card2ImageUrl: "", card2NameHe: "תוספות", card2NameEn: "Sides",
  card2TypeHe: "מנות צד", card2TypeEn: "Side Dishes",
  card2BtnHe: "לצפייה", card2BtnEn: "VIEW", card2BtnUrl: "/menu#sides",
};

export default function OurMenuEditor() {
  const { data: cms, isLoading } = trpc.cms.getOurMenu.useQuery();
  const utils = trpc.useUtils();
  const updateOurMenu = trpc.cms.updateOurMenu.useMutation({
    onSuccess: () => { utils.cms.getOurMenu.invalidate(); setSaveStatus("success"); setTimeout(() => setSaveStatus("idle"), 3000); },
    onError: () => { setSaveStatus("error"); setTimeout(() => setSaveStatus("idle"), 4000); },
  });
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "success" | "error">("idle");
  const [form, setForm] = useState(DEFAULTS);

  useEffect(() => {
    if (!cms) return;
    setForm({
      labelHe: cms.labelHe || DEFAULTS.labelHe,
      labelEn: cms.labelEn || DEFAULTS.labelEn,
      headlineLine1He: cms.headlineLine1He || DEFAULTS.headlineLine1He,
      headlineLine1En: cms.headlineLine1En || DEFAULTS.headlineLine1En,
      headlineLine2He: cms.headlineLine2He || DEFAULTS.headlineLine2He,
      headlineLine2En: cms.headlineLine2En || DEFAULTS.headlineLine2En,
      headlineLine3He: cms.headlineLine3He || DEFAULTS.headlineLine3He,
      headlineLine3En: cms.headlineLine3En || DEFAULTS.headlineLine3En,
      ctaBtnHe: cms.ctaBtnHe || DEFAULTS.ctaBtnHe,
      ctaBtnEn: cms.ctaBtnEn || DEFAULTS.ctaBtnEn,
      ctaBtnUrl: cms.ctaBtnUrl || DEFAULTS.ctaBtnUrl,
      card1ImageUrl: cms.card1ImageUrl || DEFAULTS.card1ImageUrl,
      card1NameHe: cms.card1NameHe || DEFAULTS.card1NameHe,
      card1NameEn: cms.card1NameEn || DEFAULTS.card1NameEn,
      card1TypeHe: cms.card1TypeHe || DEFAULTS.card1TypeHe,
      card1TypeEn: cms.card1TypeEn || DEFAULTS.card1TypeEn,
      card1BtnHe: cms.card1BtnHe || DEFAULTS.card1BtnHe,
      card1BtnEn: cms.card1BtnEn || DEFAULTS.card1BtnEn,
      card1BtnUrl: cms.card1BtnUrl || DEFAULTS.card1BtnUrl,
      card2ImageUrl: cms.card2ImageUrl || DEFAULTS.card2ImageUrl,
      card2NameHe: cms.card2NameHe || DEFAULTS.card2NameHe,
      card2NameEn: cms.card2NameEn || DEFAULTS.card2NameEn,
      card2TypeHe: cms.card2TypeHe || DEFAULTS.card2TypeHe,
      card2TypeEn: cms.card2TypeEn || DEFAULTS.card2TypeEn,
      card2BtnHe: cms.card2BtnHe || DEFAULTS.card2BtnHe,
      card2BtnEn: cms.card2BtnEn || DEFAULTS.card2BtnEn,
      card2BtnUrl: cms.card2BtnUrl || DEFAULTS.card2BtnUrl,
    });
  }, [cms]);

  const set = (key: keyof typeof form) => (v: string) => setForm(p => ({ ...p, [key]: v }));
  const handleSave = () => { setSaveStatus("saving"); updateOurMenu.mutate(form); };

  if (isLoading) return <div className="flex items-center justify-center py-24"><Loader2 className="w-6 h-6 text-gray-300 animate-spin" /></div>;

  return (
    <div className="space-y-5">
      <SectionCard title="תווית וכותרות — Label & Headlines">
        <BilingualField label="תווית סקשן" heValue={form.labelHe} enValue={form.labelEn} onHeChange={set("labelHe")} onEnChange={set("labelEn")} />
        <BilingualField label="שורה 1" heValue={form.headlineLine1He} enValue={form.headlineLine1En} onHeChange={set("headlineLine1He")} onEnChange={set("headlineLine1En")} />
        <BilingualField label="שורה 2" heValue={form.headlineLine2He} enValue={form.headlineLine2En} onHeChange={set("headlineLine2He")} onEnChange={set("headlineLine2En")} />
        <BilingualField label="שורה 3" heValue={form.headlineLine3He} enValue={form.headlineLine3En} onHeChange={set("headlineLine3He")} onEnChange={set("headlineLine3En")} />
      </SectionCard>

      <SectionCard title="כפתור CTA">
        <BilingualField label="טקסט כפתור" heValue={form.ctaBtnHe} enValue={form.ctaBtnEn} onHeChange={set("ctaBtnHe")} onEnChange={set("ctaBtnEn")} />
        <UrlField label="URL כפתור" value={form.ctaBtnUrl} placeholder="/menu" onChange={set("ctaBtnUrl")} />
      </SectionCard>

      <SectionCard title="כרטיס 1 — Card 1">
        <UrlField label="URL תמונה" value={form.card1ImageUrl} placeholder="https://..." onChange={set("card1ImageUrl")} />
        {form.card1ImageUrl && <img src={form.card1ImageUrl} alt="preview" className="w-full h-28 object-cover rounded-lg border border-gray-200" />}
        <BilingualField label="שם קטגוריה" heValue={form.card1NameHe} enValue={form.card1NameEn} onHeChange={set("card1NameHe")} onEnChange={set("card1NameEn")} />
        <BilingualField label="סוג" heValue={form.card1TypeHe} enValue={form.card1TypeEn} onHeChange={set("card1TypeHe")} onEnChange={set("card1TypeEn")} />
        <BilingualField label="טקסט כפתור" heValue={form.card1BtnHe} enValue={form.card1BtnEn} onHeChange={set("card1BtnHe")} onEnChange={set("card1BtnEn")} />
        <UrlField label="URL כפתור" value={form.card1BtnUrl} placeholder="/menu#meats" onChange={set("card1BtnUrl")} />
      </SectionCard>

      <SectionCard title="כרטיס 2 — Card 2">
        <UrlField label="URL תמונה" value={form.card2ImageUrl} placeholder="https://..." onChange={set("card2ImageUrl")} />
        {form.card2ImageUrl && <img src={form.card2ImageUrl} alt="preview" className="w-full h-28 object-cover rounded-lg border border-gray-200" />}
        <BilingualField label="שם קטגוריה" heValue={form.card2NameHe} enValue={form.card2NameEn} onHeChange={set("card2NameHe")} onEnChange={set("card2NameEn")} />
        <BilingualField label="סוג" heValue={form.card2TypeHe} enValue={form.card2TypeEn} onHeChange={set("card2TypeHe")} onEnChange={set("card2TypeEn")} />
        <BilingualField label="טקסט כפתור" heValue={form.card2BtnHe} enValue={form.card2BtnEn} onHeChange={set("card2BtnHe")} onEnChange={set("card2BtnEn")} />
        <UrlField label="URL כפתור" value={form.card2BtnUrl} placeholder="/menu#sides" onChange={set("card2BtnUrl")} />
      </SectionCard>

      <div className="flex items-center justify-between pt-1">
        <div className="flex items-center gap-2 text-sm">
          {saveStatus === "success" && <span className="flex items-center gap-1.5 text-green-600"><CheckCircle2 className="w-4 h-4" />נשמר בהצלחה!</span>}
          {saveStatus === "error" && <span className="flex items-center gap-1.5 text-red-500"><AlertCircle className="w-4 h-4" />שגיאה בשמירה.</span>}
        </div>
        <Button onClick={handleSave} disabled={saveStatus === "saving"} className="bg-[#8B1A1A] hover:bg-[#6d1414] text-white border-0 px-6">
          {saveStatus === "saving" ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />שומר...</> : <><Save className="w-4 h-4 mr-2" />שמור שינויים</>}
        </Button>
      </div>
    </div>
  );
}

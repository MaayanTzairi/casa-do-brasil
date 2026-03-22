/**
 * CASA DO BRASIL — Admin: Gallery Section Editor (Homepage)
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
  sectionLabelHe: "הגלריה שלנו", sectionLabelEn: "OUR GALLERY",
  headlineLine1He: "רגעים", headlineLine1En: "Moments",
  headlineLine2He: "בלתי", headlineLine2En: "Unforgettable",
  headlineLine3He: "נשכחים", headlineLine3En: "Experiences",
  descriptionHe: "הצצה לעולם של קאסה דו ברזיל", descriptionEn: "A glimpse into the world of Casa do Brasil",
  btnLabelHe: "גלריה מלאה", btnLabelEn: "FULL GALLERY",
  btnUrl: "/gallery",
  image1Url: "", image2Url: "", image3Url: "", image4Url: "", image5Url: "",
};

export default function GallerySectionEditor() {
  const { data: cms, isLoading } = trpc.cms.getOurGallery.useQuery();
  const utils = trpc.useUtils();
  const updateGallery = trpc.cms.updateOurGallery.useMutation({
    onSuccess: () => { utils.cms.getOurGallery.invalidate(); setSaveStatus("success"); setTimeout(() => setSaveStatus("idle"), 3000); },
    onError: () => { setSaveStatus("error"); setTimeout(() => setSaveStatus("idle"), 4000); },
  });
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "success" | "error">("idle");
  const [form, setForm] = useState(DEFAULTS);

  useEffect(() => {
    if (!cms) return;
    setForm({
      sectionLabelHe: cms.sectionLabelHe || DEFAULTS.sectionLabelHe,
      sectionLabelEn: cms.sectionLabelEn || DEFAULTS.sectionLabelEn,
      headlineLine1He: cms.headlineLine1He || DEFAULTS.headlineLine1He,
      headlineLine1En: cms.headlineLine1En || DEFAULTS.headlineLine1En,
      headlineLine2He: cms.headlineLine2He || DEFAULTS.headlineLine2He,
      headlineLine2En: cms.headlineLine2En || DEFAULTS.headlineLine2En,
      headlineLine3He: cms.headlineLine3He || DEFAULTS.headlineLine3He,
      headlineLine3En: cms.headlineLine3En || DEFAULTS.headlineLine3En,
      descriptionHe: cms.descriptionHe || DEFAULTS.descriptionHe,
      descriptionEn: cms.descriptionEn || DEFAULTS.descriptionEn,
      btnLabelHe: cms.btnLabelHe || DEFAULTS.btnLabelHe,
      btnLabelEn: cms.btnLabelEn || DEFAULTS.btnLabelEn,
      btnUrl: cms.btnUrl || DEFAULTS.btnUrl,
      image1Url: cms.image1Url || DEFAULTS.image1Url,
      image2Url: cms.image2Url || DEFAULTS.image2Url,
      image3Url: cms.image3Url || DEFAULTS.image3Url,
      image4Url: cms.image4Url || DEFAULTS.image4Url,
      image5Url: cms.image5Url || DEFAULTS.image5Url,
    });
  }, [cms]);

  const set = (key: keyof typeof form) => (v: string) => setForm(p => ({ ...p, [key]: v }));
  const handleSave = () => { setSaveStatus("saving"); updateGallery.mutate(form); };

  if (isLoading) return <div className="flex items-center justify-center py-24"><Loader2 className="w-6 h-6 text-gray-300 animate-spin" /></div>;

  return (
    <div className="space-y-5">
      <SectionCard title="תווית וכותרות — Label & Headlines">
        <BilingualField label="תווית סקשן" heValue={form.sectionLabelHe} enValue={form.sectionLabelEn} onHeChange={set("sectionLabelHe")} onEnChange={set("sectionLabelEn")} />
        <BilingualField label="שורה 1" heValue={form.headlineLine1He} enValue={form.headlineLine1En} onHeChange={set("headlineLine1He")} onEnChange={set("headlineLine1En")} />
        <BilingualField label="שורה 2" heValue={form.headlineLine2He} enValue={form.headlineLine2En} onHeChange={set("headlineLine2He")} onEnChange={set("headlineLine2En")} />
        <BilingualField label="שורה 3" heValue={form.headlineLine3He} enValue={form.headlineLine3En} onHeChange={set("headlineLine3He")} onEnChange={set("headlineLine3En")} />
      </SectionCard>

      <SectionCard title="תיאור וכפתור — Description & Button">
        <BilingualField label="תיאור" heValue={form.descriptionHe} enValue={form.descriptionEn} onHeChange={set("descriptionHe")} onEnChange={set("descriptionEn")} />
        <BilingualField label="טקסט כפתור" heValue={form.btnLabelHe} enValue={form.btnLabelEn} onHeChange={set("btnLabelHe")} onEnChange={set("btnLabelEn")} />
        <UrlField label="URL כפתור" value={form.btnUrl} placeholder="/gallery" onChange={set("btnUrl")} />
      </SectionCard>

      <SectionCard title="תמונות — Images (5)">
        <div className="grid grid-cols-2 gap-4">
          {([1, 2, 3, 4, 5] as const).map(n => {
            const key = `image${n}Url` as keyof typeof form;
            return (
              <div key={n} className="space-y-2">
                <Label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">תמונה {n}</Label>
                <Input dir="ltr" type="url" value={form[key]} onChange={e => set(key)(e.target.value)}
                  placeholder="https://..." className="text-left text-xs font-mono border-gray-200" />
                {form[key] && <img src={form[key]} alt={`preview ${n}`} className="w-full h-24 object-cover rounded-lg border border-gray-200" />}
              </div>
            );
          })}
        </div>
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

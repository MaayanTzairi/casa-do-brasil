/**
 * CASA DO BRASIL — Admin: Our Story Section Editor
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

function BilingualField({ label, heValue, enValue, hePlaceholder, enPlaceholder, onHeChange, onEnChange, multiline }: {
  label: string; heValue: string; enValue: string;
  hePlaceholder?: string; enPlaceholder?: string;
  onHeChange: (v: string) => void; onEnChange: (v: string) => void;
  multiline?: boolean;
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
          {multiline ? (
            <textarea dir="rtl" value={heValue} onChange={e => onHeChange(e.target.value)} placeholder={hePlaceholder} rows={4}
              className="w-full text-right text-sm border border-gray-200 rounded-md px-3 py-2 focus:outline-none focus:border-[#8B1A1A] resize-none" />
          ) : (
            <Input dir="rtl" value={heValue} onChange={e => onHeChange(e.target.value)} placeholder={hePlaceholder}
              className="text-right text-sm border-gray-200 focus:border-[#8B1A1A] focus:ring-[#8B1A1A]/20" />
          )}
        </div>
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 mb-1">
            <span className="text-[10px] font-bold text-blue-500 bg-blue-50 px-1.5 py-0.5 rounded">English</span>
            <span className="text-[10px] text-gray-400">left to right</span>
          </div>
          {multiline ? (
            <textarea dir="ltr" value={enValue} onChange={e => onEnChange(e.target.value)} placeholder={enPlaceholder} rows={4}
              className="w-full text-left text-sm border border-gray-200 rounded-md px-3 py-2 focus:outline-none focus:border-blue-400 resize-none" />
          ) : (
            <Input dir="ltr" value={enValue} onChange={e => onEnChange(e.target.value)} placeholder={enPlaceholder}
              className="text-left text-sm border-gray-200 focus:border-blue-400 focus:ring-blue-400/20" />
          )}
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
  labelHe: "הסיפור שלנו", labelEn: "OUR STORY",
  headlineLine1He: "בשר.", headlineLine1En: "MEAT.",
  headlineLine2He: "מוזיקה.", headlineLine2En: "MUSIC.",
  headlineLine3He: "ברזיל.", headlineLine3En: "BRASIL.",
  descriptionHe: "קאסה דו ברזיל היא יותר מארוחה — זו חגיגה. פושידו קוהידו אותנטי, שנחתך ליד השולחן על ידי הפאסדורס שלנו, בצירת הקצב, הצבע והנשמה של הקרנבל. כל ביקור הוא חג לכל החושים.",
  descriptionEn: "Casa do Brasil is more than a meal — it is a celebration. Authentic Brazilian churrasco, carved tableside by our passadors, paired with the rhythm, color and soul of carnival. Every visit is a feast for all the senses.",
  ctaBtnHe: "הסיפור של קאזה דו ברזיל", ctaBtnEn: "Casa Do Brasil Story",
  ctaBtnUrl: "/story",
  image1Url: "", image1LabelHe: "CHURRASCO", image1LabelEn: "CHURRASCO",
  image1TitleHe: "אמנות\nהאש", image1TitleEn: "THE ART\nOF FIRE",
  image2Url: "", image2LabelHe: "CARNIVAL", image2LabelEn: "CARNIVAL",
  image2TitleHe: "הנשמה\nשל ברזיל", image2TitleEn: "THE SOUL\nOF BRASIL",
};

export default function OurStoryEditor() {
  const { data: cms, isLoading } = trpc.cms.getOurStory.useQuery();
  const utils = trpc.useUtils();
  const updateOurStory = trpc.cms.updateOurStory.useMutation({
    onSuccess: () => { utils.cms.getOurStory.invalidate(); setSaveStatus("success"); setTimeout(() => setSaveStatus("idle"), 3000); },
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
      descriptionHe: cms.descriptionHe || DEFAULTS.descriptionHe,
      descriptionEn: cms.descriptionEn || DEFAULTS.descriptionEn,
      ctaBtnHe: cms.ctaBtnHe || DEFAULTS.ctaBtnHe,
      ctaBtnEn: cms.ctaBtnEn || DEFAULTS.ctaBtnEn,
      ctaBtnUrl: cms.ctaBtnUrl || DEFAULTS.ctaBtnUrl,
      image1Url: cms.image1Url || DEFAULTS.image1Url,
      image1LabelHe: cms.image1LabelHe || DEFAULTS.image1LabelHe,
      image1LabelEn: cms.image1LabelEn || DEFAULTS.image1LabelEn,
      image1TitleHe: cms.image1TitleHe || DEFAULTS.image1TitleHe,
      image1TitleEn: cms.image1TitleEn || DEFAULTS.image1TitleEn,
      image2Url: cms.image2Url || DEFAULTS.image2Url,
      image2LabelHe: cms.image2LabelHe || DEFAULTS.image2LabelHe,
      image2LabelEn: cms.image2LabelEn || DEFAULTS.image2LabelEn,
      image2TitleHe: cms.image2TitleHe || DEFAULTS.image2TitleHe,
      image2TitleEn: cms.image2TitleEn || DEFAULTS.image2TitleEn,
    });
  }, [cms]);

  const set = (key: keyof typeof form) => (v: string) => setForm(p => ({ ...p, [key]: v }));
  const handleSave = () => { setSaveStatus("saving"); updateOurStory.mutate(form); };

  if (isLoading) return <div className="flex items-center justify-center py-24"><Loader2 className="w-6 h-6 text-gray-300 animate-spin" /></div>;

  return (
    <div className="space-y-5">
      <SectionCard title="תווית וכותרות — Label & Headlines">
        <BilingualField label="תווית סקשן" heValue={form.labelHe} enValue={form.labelEn} onHeChange={set("labelHe")} onEnChange={set("labelEn")} />
        <BilingualField label="שורה 1" heValue={form.headlineLine1He} enValue={form.headlineLine1En} onHeChange={set("headlineLine1He")} onEnChange={set("headlineLine1En")} />
        <BilingualField label="שורה 2" heValue={form.headlineLine2He} enValue={form.headlineLine2En} onHeChange={set("headlineLine2He")} onEnChange={set("headlineLine2En")} />
        <BilingualField label="שורה 3" heValue={form.headlineLine3He} enValue={form.headlineLine3En} onHeChange={set("headlineLine3He")} onEnChange={set("headlineLine3En")} />
      </SectionCard>

      <SectionCard title="תיאור — Description">
        <BilingualField label="פסקת תיאור" heValue={form.descriptionHe} enValue={form.descriptionEn} onHeChange={set("descriptionHe")} onEnChange={set("descriptionEn")} multiline />
      </SectionCard>

      <SectionCard title="כפתור CTA">
        <BilingualField label="טקסט כפתור" heValue={form.ctaBtnHe} enValue={form.ctaBtnEn} onHeChange={set("ctaBtnHe")} onEnChange={set("ctaBtnEn")} />
        <UrlField label="URL כפתור" value={form.ctaBtnUrl} placeholder="/story" onChange={set("ctaBtnUrl")} />
      </SectionCard>

      <SectionCard title="תמונה 1 — Image 1">
        <UrlField label="URL תמונה" value={form.image1Url} placeholder="https://..." onChange={set("image1Url")} />
        {form.image1Url && <img src={form.image1Url} alt="preview" className="w-full h-28 object-cover rounded-lg border border-gray-200" />}
        <BilingualField label="תווית תמונה" heValue={form.image1LabelHe} enValue={form.image1LabelEn} onHeChange={set("image1LabelHe")} onEnChange={set("image1LabelEn")} />
        <BilingualField label="כותרת תמונה" heValue={form.image1TitleHe} enValue={form.image1TitleEn} onHeChange={set("image1TitleHe")} onEnChange={set("image1TitleEn")} />
      </SectionCard>

      <SectionCard title="תמונה 2 — Image 2">
        <UrlField label="URL תמונה" value={form.image2Url} placeholder="https://..." onChange={set("image2Url")} />
        {form.image2Url && <img src={form.image2Url} alt="preview" className="w-full h-28 object-cover rounded-lg border border-gray-200" />}
        <BilingualField label="תווית תמונה" heValue={form.image2LabelHe} enValue={form.image2LabelEn} onHeChange={set("image2LabelHe")} onEnChange={set("image2LabelEn")} />
        <BilingualField label="כותרת תמונה" heValue={form.image2TitleHe} enValue={form.image2TitleEn} onHeChange={set("image2TitleHe")} onEnChange={set("image2TitleEn")} />
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

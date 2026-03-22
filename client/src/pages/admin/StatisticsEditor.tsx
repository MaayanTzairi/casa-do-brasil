/**
 * CASA DO BRASIL — Admin: Statistics Section Editor
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

function SingleField({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{label}</Label>
      <Input dir="ltr" value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
        className="text-left text-sm border-gray-200 focus:border-[#8B1A1A]" />
    </div>
  );
}

const DEFAULTS = {
  customersValue: "50,000+",
  customersSuffixHe: "+", customersSuffixEn: "+",
  customersLabelHe: "לקוחות מרוצים", customersLabelEn: "Happy Customers",
  yearsValue: "15",
  yearsSuffixHe: "שנה", yearsSuffixEn: "Years",
  yearsLabelHe: "שנות ניסיון", yearsLabelEn: "Years of Experience",
  ratingValue: "4.8",
  ratingSymbol: "★",
  ratingCountHe: "מתוך 1,200+ ביקורות", ratingCountEn: "from 1,200+ reviews",
};

export default function StatisticsEditor() {
  const { data: cms, isLoading } = trpc.cms.getStatistics.useQuery();
  const utils = trpc.useUtils();
  const updateStats = trpc.cms.updateStatistics.useMutation({
    onSuccess: () => { utils.cms.getStatistics.invalidate(); setSaveStatus("success"); setTimeout(() => setSaveStatus("idle"), 3000); },
    onError: () => { setSaveStatus("error"); setTimeout(() => setSaveStatus("idle"), 4000); },
  });
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "success" | "error">("idle");
  const [form, setForm] = useState(DEFAULTS);

  useEffect(() => {
    if (!cms) return;
    setForm({
      customersValue: cms.customersValue || DEFAULTS.customersValue,
      customersSuffixHe: cms.customersSuffixHe || DEFAULTS.customersSuffixHe,
      customersSuffixEn: cms.customersSuffixEn || DEFAULTS.customersSuffixEn,
      customersLabelHe: cms.customersLabelHe || DEFAULTS.customersLabelHe,
      customersLabelEn: cms.customersLabelEn || DEFAULTS.customersLabelEn,
      yearsValue: cms.yearsValue || DEFAULTS.yearsValue,
      yearsSuffixHe: cms.yearsSuffixHe || DEFAULTS.yearsSuffixHe,
      yearsSuffixEn: cms.yearsSuffixEn || DEFAULTS.yearsSuffixEn,
      yearsLabelHe: cms.yearsLabelHe || DEFAULTS.yearsLabelHe,
      yearsLabelEn: cms.yearsLabelEn || DEFAULTS.yearsLabelEn,
      ratingValue: cms.ratingValue || DEFAULTS.ratingValue,
      ratingSymbol: cms.ratingSymbol || DEFAULTS.ratingSymbol,
      ratingCountHe: cms.ratingCountHe || DEFAULTS.ratingCountHe,
      ratingCountEn: cms.ratingCountEn || DEFAULTS.ratingCountEn,
    });
  }, [cms]);

  const set = (key: keyof typeof form) => (v: string) => setForm(p => ({ ...p, [key]: v }));
  const handleSave = () => { setSaveStatus("saving"); updateStats.mutate(form); };

  if (isLoading) return <div className="flex items-center justify-center py-24"><Loader2 className="w-6 h-6 text-gray-300 animate-spin" /></div>;

  return (
    <div className="space-y-5">
      <SectionCard title="לקוחות מרוצים — Happy Customers">
        <SingleField label="ערך מספרי" value={form.customersValue} onChange={set("customersValue")} placeholder="50,000+" />
        <BilingualField label="סיומת" heValue={form.customersSuffixHe} enValue={form.customersSuffixEn} onHeChange={set("customersSuffixHe")} onEnChange={set("customersSuffixEn")} />
        <BilingualField label="תווית" heValue={form.customersLabelHe} enValue={form.customersLabelEn} onHeChange={set("customersLabelHe")} onEnChange={set("customersLabelEn")} />
      </SectionCard>

      <SectionCard title="שנות ניסיון — Years of Experience">
        <SingleField label="ערך מספרי" value={form.yearsValue} onChange={set("yearsValue")} placeholder="15" />
        <BilingualField label="סיומת" heValue={form.yearsSuffixHe} enValue={form.yearsSuffixEn} onHeChange={set("yearsSuffixHe")} onEnChange={set("yearsSuffixEn")} />
        <BilingualField label="תווית" heValue={form.yearsLabelHe} enValue={form.yearsLabelEn} onHeChange={set("yearsLabelHe")} onEnChange={set("yearsLabelEn")} />
      </SectionCard>

      <SectionCard title="דירוג — Rating">
        <SingleField label="ערך דירוג" value={form.ratingValue} onChange={set("ratingValue")} placeholder="4.8" />
        <SingleField label="סמל דירוג" value={form.ratingSymbol} onChange={set("ratingSymbol")} placeholder="★" />
        <BilingualField label="מספר ביקורות" heValue={form.ratingCountHe} enValue={form.ratingCountEn} onHeChange={set("ratingCountHe")} onEnChange={set("ratingCountEn")} />
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

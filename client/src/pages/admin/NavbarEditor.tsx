/**
 * CASA DO BRASIL — Admin: Navbar Editor
 * Bilingual form: Hebrew (RTL) on the right, English (LTR) on the left
 */

import { useEffect, useState } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Save, CheckCircle2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

// ── Reusable bilingual field row ─────────────────────────────────────────────

interface BilingualFieldProps {
  label: string;
  heValue: string;
  enValue: string;
  hePlaceholder?: string;
  enPlaceholder?: string;
  onHeChange: (v: string) => void;
  onEnChange: (v: string) => void;
  type?: "text" | "url";
  fullWidth?: boolean;
}

function BilingualField({
  label,
  heValue,
  enValue,
  hePlaceholder,
  enPlaceholder,
  onHeChange,
  onEnChange,
  type = "text",
  fullWidth = false,
}: BilingualFieldProps) {
  return (
    <div className={cn("space-y-1.5", fullWidth ? "col-span-2" : "")}>
      <Label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
        {label}
      </Label>
      <div className="grid grid-cols-2 gap-3">
        {/* Hebrew — RTL */}
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 mb-1">
            <span className="text-[10px] font-bold text-[#B9A167] bg-[#B9A167]/10 px-1.5 py-0.5 rounded">
              עברית
            </span>
            <span className="text-[10px] text-gray-400">ימין לשמאל</span>
          </div>
          <Input
            dir="rtl"
            type={type}
            value={heValue}
            onChange={(e) => onHeChange(e.target.value)}
            placeholder={hePlaceholder}
            className="text-right text-sm border-gray-200 focus:border-[#8B1A1A] focus:ring-[#8B1A1A]/20"
          />
        </div>
        {/* English — LTR */}
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 mb-1">
            <span className="text-[10px] font-bold text-blue-500 bg-blue-50 px-1.5 py-0.5 rounded">
              English
            </span>
            <span className="text-[10px] text-gray-400">left to right</span>
          </div>
          <Input
            dir="ltr"
            type={type}
            value={enValue}
            onChange={(e) => onEnChange(e.target.value)}
            placeholder={enPlaceholder}
            className="text-left text-sm border-gray-200 focus:border-blue-400 focus:ring-blue-400/20"
          />
        </div>
      </div>
    </div>
  );
}

// ── Single URL field ──────────────────────────────────────────────────────────

interface UrlFieldProps {
  label: string;
  value: string;
  placeholder?: string;
  onChange: (v: string) => void;
}

function UrlField({ label, value, placeholder, onChange }: UrlFieldProps) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
        {label}
      </Label>
      <Input
        dir="ltr"
        type="url"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder ?? "https://..."}
        className="text-left text-sm font-mono border-gray-200 focus:border-blue-400 focus:ring-blue-400/20"
      />
    </div>
  );
}

// ── Section Card ──────────────────────────────────────────────────────────────

function SectionCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="px-5 py-3.5 border-b border-gray-100 bg-gray-50/50">
        <h3 className="text-sm font-semibold text-gray-700">{title}</h3>
      </div>
      <div className="p-5 space-y-5">{children}</div>
    </div>
  );
}

// ── Main NavbarEditor ─────────────────────────────────────────────────────────

export default function NavbarEditor() {
  const { data: cms, isLoading } = trpc.cms.getNavbar.useQuery();
  const utils = trpc.useUtils();

  const updateNavbar = trpc.cms.updateNavbar.useMutation({
    onSuccess: () => {
      utils.cms.getNavbar.invalidate();
      setSaveStatus("success");
      setTimeout(() => setSaveStatus("idle"), 3000);
    },
    onError: () => {
      setSaveStatus("error");
      setTimeout(() => setSaveStatus("idle"), 4000);
    },
  });

  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "success" | "error">("idle");

  // Form state
  const [form, setForm] = useState({
    menuHe: "", menuEn: "",
    storyHe: "", storyEn: "",
    galleryHe: "", galleryEn: "",
    faqHe: "", faqEn: "",
    contactHe: "", contactEn: "",
    brandNameHe: "", brandNameEn: "",
    reservationHe: "", reservationEn: "",
    reservationUrl: "",
    menuHref: "",
    storyHref: "",
    galleryHref: "",
    faqHref: "",
    contactHref: "",
  });

  // Sync CMS data into form when loaded
  useEffect(() => {
    if (!cms) return;
    setForm({
      menuHe: cms.menuHe ?? "",
      menuEn: cms.menuEn ?? "",
      storyHe: cms.storyHe ?? "",
      storyEn: cms.storyEn ?? "",
      galleryHe: cms.galleryHe ?? "",
      galleryEn: cms.galleryEn ?? "",
      faqHe: cms.faqHe ?? "",
      faqEn: cms.faqEn ?? "",
      contactHe: cms.contactHe ?? "",
      contactEn: cms.contactEn ?? "",
      brandNameHe: cms.brandNameHe ?? "",
      brandNameEn: cms.brandNameEn ?? "",
      reservationHe: cms.reservationHe ?? "",
      reservationEn: cms.reservationEn ?? "",
      reservationUrl: cms.reservationUrl ?? "",
      menuHref: cms.menuHref ?? "",
      storyHref: cms.storyHref ?? "",
      galleryHref: cms.galleryHref ?? "",
      faqHref: cms.faqHref ?? "",
      contactHref: cms.contactHref ?? "",
    });
  }, [cms]);

  const set = (key: keyof typeof form) => (v: string) =>
    setForm((prev) => ({ ...prev, [key]: v }));

  const handleSave = () => {
    setSaveStatus("saving");
    updateNavbar.mutate(form);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="w-6 h-6 text-gray-300 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* ── Brand name ── */}
      <SectionCard title="שם המותג — Brand Name">
        <BilingualField
          label="שם המותג באמצע הניווט"
          heValue={form.brandNameHe}
          enValue={form.brandNameEn}
          hePlaceholder="קאסה דו ברזיל"
          enPlaceholder="CASA DO BRASIL"
          onHeChange={set("brandNameHe")}
          onEnChange={set("brandNameEn")}
        />
      </SectionCard>

      {/* ── Nav links ── */}
      <SectionCard title="קישורי ניווט — Nav Links">
        <div className="space-y-6">
          {/* MENU */}
          <div className="pb-5 border-b border-gray-100">
            <BilingualField
              label="תפריט — MENU"
              heValue={form.menuHe}
              enValue={form.menuEn}
              hePlaceholder="תפריט"
              enPlaceholder="MENU"
              onHeChange={set("menuHe")}
              onEnChange={set("menuEn")}
            />
            <div className="mt-3">
              <UrlField
                label="קישור — MENU href"
                value={form.menuHref}
                placeholder="#menu"
                onChange={set("menuHref")}
              />
            </div>
          </div>

          {/* STORY */}
          <div className="pb-5 border-b border-gray-100">
            <BilingualField
              label="הסיפור — STORY"
              heValue={form.storyHe}
              enValue={form.storyEn}
              hePlaceholder="הסיפור שלנו"
              enPlaceholder="STORY"
              onHeChange={set("storyHe")}
              onEnChange={set("storyEn")}
            />
            <div className="mt-3">
              <UrlField
                label="קישור — STORY href"
                value={form.storyHref}
                placeholder="/story"
                onChange={set("storyHref")}
              />
            </div>
          </div>

          {/* GALLERY */}
          <div className="pb-5 border-b border-gray-100">
            <BilingualField
              label="גלריה — GALLERY"
              heValue={form.galleryHe}
              enValue={form.galleryEn}
              hePlaceholder="גלריה"
              enPlaceholder="GALLERY"
              onHeChange={set("galleryHe")}
              onEnChange={set("galleryEn")}
            />
            <div className="mt-3">
              <UrlField
                label="קישור — GALLERY href"
                value={form.galleryHref}
                placeholder="/gallery"
                onChange={set("galleryHref")}
              />
            </div>
          </div>

          {/* FAQ */}
          <div className="pb-5 border-b border-gray-100">
            <BilingualField
              label="שאלות ותשובות — FAQ"
              heValue={form.faqHe}
              enValue={form.faqEn}
              hePlaceholder="שאלות ותשובות"
              enPlaceholder="FAQ"
              onHeChange={set("faqHe")}
              onEnChange={set("faqEn")}
            />
            <div className="mt-3">
              <UrlField
                label="קישור — FAQ href"
                value={form.faqHref}
                placeholder="/faq"
                onChange={set("faqHref")}
              />
            </div>
          </div>

          {/* CONTACT */}
          <div>
            <BilingualField
              label="צור קשר — CONTACT"
              heValue={form.contactHe}
              enValue={form.contactEn}
              hePlaceholder="צור קשר"
              enPlaceholder="CONTACT"
              onHeChange={set("contactHe")}
              onEnChange={set("contactEn")}
            />
            <div className="mt-3">
              <UrlField
                label="קישור — CONTACT href"
                value={form.contactHref}
                placeholder="/contact"
                onChange={set("contactHref")}
              />
            </div>
          </div>
        </div>
      </SectionCard>

      {/* ── Reservation button ── */}
      <SectionCard title="כפתור הזמנת מקום — Reservation Button">
        <BilingualField
          label="טקסט הכפתור"
          heValue={form.reservationHe}
          enValue={form.reservationEn}
          hePlaceholder="הזמן שולחן"
          enPlaceholder="RESERVE A TABLE"
          onHeChange={set("reservationHe")}
          onEnChange={set("reservationEn")}
        />
        <UrlField
          label="קישור להזמנה — Reservation URL"
          value={form.reservationUrl}
          placeholder="https://tabitisrael.co.il/..."
          onChange={set("reservationUrl")}
        />
      </SectionCard>

      {/* ── Save button ── */}
      <div className="flex items-center justify-between pt-1">
        <div className="flex items-center gap-2 text-sm">
          {saveStatus === "success" && (
            <span className="flex items-center gap-1.5 text-green-600">
              <CheckCircle2 className="w-4 h-4" />
              נשמר בהצלחה!
            </span>
          )}
          {saveStatus === "error" && (
            <span className="flex items-center gap-1.5 text-red-500">
              <AlertCircle className="w-4 h-4" />
              שגיאה בשמירה. נסה שוב.
            </span>
          )}
        </div>
        <Button
          onClick={handleSave}
          disabled={saveStatus === "saving"}
          className="bg-[#8B1A1A] hover:bg-[#6d1414] text-white border-0 px-6"
        >
          {saveStatus === "saving" ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              שומר...
            </>
          ) : (
            <>
              <Save className="w-4 h-4 mr-2" />
              שמור שינויים
            </>
          )}
        </Button>
      </div>
    </div>
  );
}

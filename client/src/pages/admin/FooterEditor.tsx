/**
 * CASA DO BRASIL — Admin: Footer Editor
 * Bilingual form: Hebrew (RTL) + English (LTR)
 * Logo upload: converts to WebP, max 200KB, stored in S3
 */

import { useEffect, useRef, useState } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Loader2, Save, CheckCircle2, AlertCircle,
  Upload, X, Image as ImageIcon,
} from "lucide-react";

// ── Shared sub-components ─────────────────────────────────────────────────────

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

interface BilingualFieldProps {
  label: string;
  heValue: string;
  enValue: string;
  hePlaceholder?: string;
  enPlaceholder?: string;
  onHeChange: (v: string) => void;
  onEnChange: (v: string) => void;
}

function BilingualField({
  label, heValue, enValue,
  hePlaceholder, enPlaceholder,
  onHeChange, onEnChange,
}: BilingualFieldProps) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
        {label}
      </Label>
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 mb-1">
            <span className="text-[10px] font-bold text-[#B9A167] bg-[#B9A167]/10 px-1.5 py-0.5 rounded">עברית</span>
            <span className="text-[10px] text-gray-400">ימין לשמאל</span>
          </div>
          <Input dir="rtl" value={heValue} onChange={(e) => onHeChange(e.target.value)}
            placeholder={hePlaceholder}
            className="text-right text-sm border-gray-200 focus:border-[#8B1A1A] focus:ring-[#8B1A1A]/20" />
        </div>
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 mb-1">
            <span className="text-[10px] font-bold text-blue-500 bg-blue-50 px-1.5 py-0.5 rounded">English</span>
            <span className="text-[10px] text-gray-400">left to right</span>
          </div>
          <Input dir="ltr" value={enValue} onChange={(e) => onEnChange(e.target.value)}
            placeholder={enPlaceholder}
            className="text-left text-sm border-gray-200 focus:border-blue-400 focus:ring-blue-400/20" />
        </div>
      </div>
    </div>
  );
}

function SingleField({
  label, value, placeholder, onChange, type = "text",
}: {
  label: string; value: string; placeholder?: string;
  onChange: (v: string) => void; type?: string;
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{label}</Label>
      <Input dir="ltr" type={type} value={value} onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="text-left text-sm border-gray-200 focus:border-blue-400 focus:ring-blue-400/20" />
    </div>
  );
}

// ── Logo Upload ───────────────────────────────────────────────────────────────

function LogoUpload({
  currentUrl,
  onUploaded,
}: {
  currentUrl: string;
  onUploaded: (url: string) => void;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  // Show existing URL as preview
  const displayUrl = preview || currentUrl;

  const handleFile = async (file: File) => {
    setUploadError(null);

    // Validate type
    if (!file.type.startsWith("image/")) {
      setUploadError("נא לבחור קובץ תמונה (PNG, JPG, WebP, SVG)");
      return;
    }

    // Validate size — 5MB max before conversion
    if (file.size > 5 * 1024 * 1024) {
      setUploadError("הקובץ גדול מדי — מקסימום 5MB");
      return;
    }

    setUploading(true);
    try {
      // Convert to WebP using Canvas API (browser-side)
      const webpBlob = await convertToWebP(file, 800, 200 * 1024);

      // Upload via tRPC presigned URL endpoint
      const formData = new FormData();
      formData.append("file", webpBlob, "logo.webp");

      const res = await fetch("/api/upload-logo", {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "שגיאה בהעלאה");
      }

      const { url } = await res.json() as { url: string };
      setPreview(url);
      onUploaded(url);
    } catch (err: unknown) {
      setUploadError(err instanceof Error ? err.message : "שגיאה בהעלאה");
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  return (
    <div className="space-y-3">
      <Label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
        לוגו — Logo
      </Label>

      {/* Drop zone */}
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        onClick={() => fileInputRef.current?.click()}
        className="relative border-2 border-dashed border-gray-200 rounded-xl p-6 flex flex-col items-center justify-center gap-3 cursor-pointer hover:border-[#8B1A1A]/40 hover:bg-[#8B1A1A]/2 transition-colors group"
      >
        {displayUrl ? (
          <div className="flex flex-col items-center gap-2">
            <img
              src={displayUrl}
              alt="Logo preview"
              className="max-h-20 max-w-[200px] object-contain rounded"
            />
            <p className="text-xs text-gray-400 group-hover:text-gray-600 transition-colors">
              לחץ להחלפה
            </p>
          </div>
        ) : (
          <>
            <div className="w-12 h-12 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center">
              {uploading ? (
                <Loader2 className="w-5 h-5 text-gray-400 animate-spin" />
              ) : (
                <ImageIcon className="w-5 h-5 text-gray-300" />
              )}
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-gray-600">
                {uploading ? "מעלה..." : "גרור תמונה או לחץ לבחירה"}
              </p>
              <p className="text-xs text-gray-400 mt-0.5">
                PNG, JPG, WebP, SVG — מומר אוטומטית ל-WebP, מקסימום 200KB
              </p>
            </div>
          </>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFile(file);
          }}
        />
      </div>

      {/* Current URL field — editable */}
      <div className="space-y-1">
        <Label className="text-xs text-gray-400">או הכנס URL ישירות</Label>
        <div className="flex gap-2">
          <Input
            dir="ltr"
            type="url"
            value={currentUrl}
            onChange={(e) => onUploaded(e.target.value)}
            placeholder="https://..."
            className="text-left text-xs font-mono border-gray-200 focus:border-blue-400"
          />
          {currentUrl && (
            <Button
              variant="ghost"
              size="icon"
              className="shrink-0 text-gray-400 hover:text-red-500"
              onClick={() => { setPreview(null); onUploaded(""); }}
            >
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>

      {uploadError && (
        <p className="text-xs text-red-500 flex items-center gap-1">
          <AlertCircle className="w-3.5 h-3.5" />
          {uploadError}
        </p>
      )}
    </div>
  );
}

// Convert image to WebP with max dimensions and file size
async function convertToWebP(
  file: File,
  maxDimension: number,
  maxBytes: number
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(url);
      const canvas = document.createElement("canvas");
      let { width, height } = img;
      if (width > maxDimension || height > maxDimension) {
        const ratio = Math.min(maxDimension / width, maxDimension / height);
        width = Math.round(width * ratio);
        height = Math.round(height * ratio);
      }
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (!ctx) { reject(new Error("Canvas not supported")); return; }
      ctx.drawImage(img, 0, 0, width, height);

      // Try quality levels until under maxBytes
      let quality = 0.85;
      const tryEncode = () => {
        canvas.toBlob((blob) => {
          if (!blob) { reject(new Error("Encoding failed")); return; }
          if (blob.size <= maxBytes || quality <= 0.3) {
            resolve(blob);
          } else {
            quality -= 0.1;
            tryEncode();
          }
        }, "image/webp", quality);
      };
      tryEncode();
    };
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error("Failed to load image")); };
    img.src = url;
  });
}

// ── Main FooterEditor ─────────────────────────────────────────────────────────

const FOOTER_DEFAULTS = {
  logoUrl: "",
  findUsLabelHe: "מצאו אותנו",
  findUsLabelEn: "FIND US",
  addressHe: "גולני 3, אילת",
  addressEn: "Golani Brigade 3, Eilat",
  neighborhoodHe: "(סמוך למלון נובה)",
  neighborhoodEn: "(adjacent to the Nova Hotel)",
  phone: "08-6323032",
  hoursLabelHe: "שעות פתיחה",
  hoursLabelEn: "HOURS",
  hoursDaysHe: "ראשון עד שבת",
  hoursDaysEn: "Sunday to Saturday",
  hoursTimeHe: "12:00 – 23:00",
  hoursTimeEn: "12:00 – 23:00",
  copyrightHe: "© 2026 קאסה דו ברזיל. כל הזכויות שמורות.",
  copyrightEn: "© 2026 Casa do Brasil. All rights reserved.",
  privacyLabelHe: "מדיניות פרטיות",
  privacyLabelEn: "Privacy Policy",
  privacyUrl: "",
  accessibilityLabelHe: "הצהרת נגישות",
  accessibilityLabelEn: "Accessibility Statement",
  accessibilityUrl: "",
  instagramUrl: "",
  facebookUrl: "",
  tiktokUrl: "",
};

export default function FooterEditor() {
  const { data: cms, isLoading } = trpc.cms.getFooter.useQuery();
  const utils = trpc.useUtils();

  const updateFooter = trpc.cms.updateFooter.useMutation({
    onSuccess: () => {
      utils.cms.getFooter.invalidate();
      setSaveStatus("success");
      setTimeout(() => setSaveStatus("idle"), 3000);
    },
    onError: () => {
      setSaveStatus("error");
      setTimeout(() => setSaveStatus("idle"), 4000);
    },
  });

  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "success" | "error">("idle");
  const [form, setForm] = useState(FOOTER_DEFAULTS);

  useEffect(() => {
    if (!cms) return;
    setForm({
      logoUrl: cms.logoUrl || FOOTER_DEFAULTS.logoUrl,
      findUsLabelHe: cms.findUsLabelHe || FOOTER_DEFAULTS.findUsLabelHe,
      findUsLabelEn: cms.findUsLabelEn || FOOTER_DEFAULTS.findUsLabelEn,
      addressHe: cms.addressHe || FOOTER_DEFAULTS.addressHe,
      addressEn: cms.addressEn || FOOTER_DEFAULTS.addressEn,
      neighborhoodHe: cms.neighborhoodHe || FOOTER_DEFAULTS.neighborhoodHe,
      neighborhoodEn: cms.neighborhoodEn || FOOTER_DEFAULTS.neighborhoodEn,
      phone: cms.phone || FOOTER_DEFAULTS.phone,
      hoursLabelHe: cms.hoursLabelHe || FOOTER_DEFAULTS.hoursLabelHe,
      hoursLabelEn: cms.hoursLabelEn || FOOTER_DEFAULTS.hoursLabelEn,
      hoursDaysHe: cms.hoursDaysHe || FOOTER_DEFAULTS.hoursDaysHe,
      hoursDaysEn: cms.hoursDaysEn || FOOTER_DEFAULTS.hoursDaysEn,
      hoursTimeHe: cms.hoursTimeHe || FOOTER_DEFAULTS.hoursTimeHe,
      hoursTimeEn: cms.hoursTimeEn || FOOTER_DEFAULTS.hoursTimeEn,
      copyrightHe: cms.copyrightHe || FOOTER_DEFAULTS.copyrightHe,
      copyrightEn: cms.copyrightEn || FOOTER_DEFAULTS.copyrightEn,
      privacyLabelHe: cms.privacyLabelHe || FOOTER_DEFAULTS.privacyLabelHe,
      privacyLabelEn: cms.privacyLabelEn || FOOTER_DEFAULTS.privacyLabelEn,
      privacyUrl: cms.privacyUrl || FOOTER_DEFAULTS.privacyUrl,
      accessibilityLabelHe: cms.accessibilityLabelHe || FOOTER_DEFAULTS.accessibilityLabelHe,
      accessibilityLabelEn: cms.accessibilityLabelEn || FOOTER_DEFAULTS.accessibilityLabelEn,
      accessibilityUrl: cms.accessibilityUrl || FOOTER_DEFAULTS.accessibilityUrl,
      instagramUrl: cms.instagramUrl || FOOTER_DEFAULTS.instagramUrl,
      facebookUrl: cms.facebookUrl || FOOTER_DEFAULTS.facebookUrl,
      tiktokUrl: cms.tiktokUrl || FOOTER_DEFAULTS.tiktokUrl,
    });
  }, [cms]);

  const set = (key: keyof typeof form) => (v: string) =>
    setForm((prev) => ({ ...prev, [key]: v }));

  const handleSave = () => {
    setSaveStatus("saving");
    updateFooter.mutate(form);
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
      {/* ── Logo ── */}
      <SectionCard title="לוגו — Logo">
        <LogoUpload
          currentUrl={form.logoUrl}
          onUploaded={set("logoUrl")}
        />
      </SectionCard>

      {/* ── Find Us ── */}
      <SectionCard title="מצאו אותנו — Find Us">
        <BilingualField
          label="כותרת הסקשן"
          heValue={form.findUsLabelHe}
          enValue={form.findUsLabelEn}
          hePlaceholder="מצאו אותנו"
          enPlaceholder="FIND US"
          onHeChange={set("findUsLabelHe")}
          onEnChange={set("findUsLabelEn")}
        />
        <BilingualField
          label="כתובת"
          heValue={form.addressHe}
          enValue={form.addressEn}
          hePlaceholder="גולני 3, אילת"
          enPlaceholder="Golani Brigade 3, Eilat"
          onHeChange={set("addressHe")}
          onEnChange={set("addressEn")}
        />
        <BilingualField
          label="שכונה / הערה"
          heValue={form.neighborhoodHe}
          enValue={form.neighborhoodEn}
          hePlaceholder="(סמוך למלון נובה)"
          enPlaceholder="(adjacent to the Nova Hotel)"
          onHeChange={set("neighborhoodHe")}
          onEnChange={set("neighborhoodEn")}
        />
        <SingleField
          label="טלפון — Phone"
          value={form.phone}
          placeholder="08-6323032"
          onChange={set("phone")}
          type="tel"
        />
      </SectionCard>

      {/* ── Hours ── */}
      <SectionCard title="שעות פתיחה — Hours">
        <BilingualField
          label="כותרת שעות"
          heValue={form.hoursLabelHe}
          enValue={form.hoursLabelEn}
          hePlaceholder="שעות פתיחה"
          enPlaceholder="HOURS"
          onHeChange={set("hoursLabelHe")}
          onEnChange={set("hoursLabelEn")}
        />
        <BilingualField
          label="ימים"
          heValue={form.hoursDaysHe}
          enValue={form.hoursDaysEn}
          hePlaceholder="ראשון עד שבת"
          enPlaceholder="Sunday to Saturday"
          onHeChange={set("hoursDaysHe")}
          onEnChange={set("hoursDaysEn")}
        />
        <BilingualField
          label="שעות"
          heValue={form.hoursTimeHe}
          enValue={form.hoursTimeEn}
          hePlaceholder="12:00 – 23:00"
          enPlaceholder="12:00 – 23:00"
          onHeChange={set("hoursTimeHe")}
          onEnChange={set("hoursTimeEn")}
        />
      </SectionCard>

      {/* ── Social Media ── */}
      <SectionCard title="רשתות חברתיות — Social Media">
        <SingleField
          label="Instagram URL"
          value={form.instagramUrl}
          placeholder="https://instagram.com/..."
          onChange={set("instagramUrl")}
          type="url"
        />
        <SingleField
          label="Facebook URL"
          value={form.facebookUrl}
          placeholder="https://facebook.com/..."
          onChange={set("facebookUrl")}
          type="url"
        />
        <SingleField
          label="TikTok URL"
          value={form.tiktokUrl}
          placeholder="https://tiktok.com/@..."
          onChange={set("tiktokUrl")}
          type="url"
        />
      </SectionCard>

      {/* ── Copyright & Legal ── */}
      <SectionCard title="זכויות יוצרים וקישורים משפטיים — Copyright & Legal">
        <BilingualField
          label="טקסט זכויות יוצרים"
          heValue={form.copyrightHe}
          enValue={form.copyrightEn}
          hePlaceholder="© 2026 קאסה דו ברזיל. כל הזכויות שמורות."
          enPlaceholder="© 2026 Casa do Brasil. All rights reserved."
          onHeChange={set("copyrightHe")}
          onEnChange={set("copyrightEn")}
        />
        <div className="grid grid-cols-2 gap-4 pt-2 border-t border-gray-100">
          <div className="space-y-3">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">מדיניות פרטיות</p>
            <BilingualField
              label="טקסט הקישור"
              heValue={form.privacyLabelHe}
              enValue={form.privacyLabelEn}
              hePlaceholder="מדיניות פרטיות"
              enPlaceholder="Privacy Policy"
              onHeChange={set("privacyLabelHe")}
              onEnChange={set("privacyLabelEn")}
            />
            <SingleField
              label="URL"
              value={form.privacyUrl}
              placeholder="/privacy"
              onChange={set("privacyUrl")}
              type="url"
            />
          </div>
          <div className="space-y-3">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">הצהרת נגישות</p>
            <BilingualField
              label="טקסט הקישור"
              heValue={form.accessibilityLabelHe}
              enValue={form.accessibilityLabelEn}
              hePlaceholder="הצהרת נגישות"
              enPlaceholder="Accessibility Statement"
              onHeChange={set("accessibilityLabelHe")}
              onEnChange={set("accessibilityLabelEn")}
            />
            <SingleField
              label="URL"
              value={form.accessibilityUrl}
              placeholder="/accessibility"
              onChange={set("accessibilityUrl")}
              type="url"
            />
          </div>
        </div>
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
            <><Loader2 className="w-4 h-4 ml-2 animate-spin" />שומר...</>
          ) : (
            <><Save className="w-4 h-4 ml-2" />שמור שינויים</>
          )}
        </Button>
      </div>
    </div>
  );
}

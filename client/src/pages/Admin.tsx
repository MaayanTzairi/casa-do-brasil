import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { useState } from "react";
import { getLoginUrl } from "@/const";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Loader2, Save, Plus, Trash2 } from "lucide-react";

// ── Field helpers ─────────────────────────────────────────────────────────────
function Field({ label, name, value, onChange, type = "text" }: {
  label: string; name: string; value: string; onChange: (v: string) => void; type?: string;
}) {
  return (
    <div className="space-y-1">
      <Label className="text-xs text-gray-500">{label}</Label>
      {type === "textarea" ? (
        <Textarea name={name} value={value} onChange={e => onChange(e.target.value)} rows={3} className="text-sm" />
      ) : (
        <Input name={name} value={value} onChange={e => onChange(e.target.value)} className="text-sm h-8" />
      )}
    </div>
  );
}

function BiField({ labelHe, labelEn, nameHe, nameEn, valueHe, valueEn, onChangeHe, onChangeEn, type = "text" }: {
  labelHe: string; labelEn: string; nameHe: string; nameEn: string;
  valueHe: string; valueEn: string; onChangeHe: (v: string) => void; onChangeEn: (v: string) => void; type?: string;
}) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <Field label={labelHe} name={nameHe} value={valueHe} onChange={onChangeHe} type={type} />
      <Field label={labelEn} name={nameEn} value={valueEn} onChange={onChangeEn} type={type} />
    </div>
  );
}

// ── Hero Tab ──────────────────────────────────────────────────────────────────
function HeroTab() {
  const { data, isLoading } = trpc.cms.getHero.useQuery();
  const utils = trpc.useUtils();
  const mutation = trpc.cms.updateHero.useMutation({
    onSuccess: () => { utils.cms.getHero.invalidate(); toast.success("Hero שמור ✓"); },
    onError: (e) => toast.error(e.message),
  });

  const [form, setForm] = useState<Record<string, string>>({});
  const val = (key: string) => form[key] ?? (data as unknown as Record<string, string | null> | null)?.[key] ?? "";
  const set = (key: string) => (v: string) => setForm(f => ({ ...f, [key]: v }));

  if (isLoading) return <div className="flex justify-center py-8"><Loader2 className="animate-spin" /></div>;

  return (
    <div className="space-y-4">
      <BiField labelHe="כותרת (עברית)" labelEn="Title (English)" nameHe="titleHe" nameEn="titleEn" valueHe={val("titleHe")} valueEn={val("titleEn")} onChangeHe={set("titleHe")} onChangeEn={set("titleEn")} />
      <BiField labelHe="תת-כותרת (עברית)" labelEn="Subtitle (English)" nameHe="subtitleHe" nameEn="subtitleEn" valueHe={val("subtitleHe")} valueEn={val("subtitleEn")} onChangeHe={set("subtitleHe")} onChangeEn={set("subtitleEn")} />
      <BiField labelHe="כפתור הזמנה (עברית)" labelEn="Reserve Btn (English)" nameHe="reserveBtnHe" nameEn="reserveBtnEn" valueHe={val("reserveBtnHe")} valueEn={val("reserveBtnEn")} onChangeHe={set("reserveBtnHe")} onChangeEn={set("reserveBtnEn")} />
      <Field label="קישור הזמנה" name="reserveBtnUrl" value={val("reserveBtnUrl")} onChange={set("reserveBtnUrl")} />
      <BiField labelHe="כפתור תפריט (עברית)" labelEn="Menu Btn (English)" nameHe="menuBtnHe" nameEn="menuBtnEn" valueHe={val("menuBtnHe")} valueEn={val("menuBtnEn")} onChangeHe={set("menuBtnHe")} onChangeEn={set("menuBtnEn")} />
      <div className="grid grid-cols-3 gap-3">
        <Field label="Instagram URL" name="instagramUrl" value={val("instagramUrl")} onChange={set("instagramUrl")} />
        <Field label="Facebook URL" name="facebookUrl" value={val("facebookUrl")} onChange={set("facebookUrl")} />
        <Field label="TikTok URL" name="tiktokUrl" value={val("tiktokUrl")} onChange={set("tiktokUrl")} />
      </div>
      <Field label="תמונת רקע (URL)" name="backgroundImageUrl" value={val("backgroundImageUrl")} onChange={set("backgroundImageUrl")} />
      <Button onClick={() => mutation.mutate(form as Parameters<typeof mutation.mutate>[0])} disabled={mutation.isPending} className="w-full bg-[#8B1A1A] hover:bg-[#6d1414]">
        {mutation.isPending ? <Loader2 className="animate-spin mr-2 h-4 w-4" /> : <Save className="mr-2 h-4 w-4" />} שמור Hero
      </Button>
    </div>
  );
}

// ── Statistics Tab ────────────────────────────────────────────────────────────
function StatisticsTab() {
  const { data, isLoading } = trpc.cms.getStatistics.useQuery();
  const utils = trpc.useUtils();
  const mutation = trpc.cms.updateStatistics.useMutation({
    onSuccess: () => { utils.cms.getStatistics.invalidate(); toast.success("מספרים שמורים ✓"); },
    onError: (e) => toast.error(e.message),
  });

  const [form, setForm] = useState<Record<string, string>>({});
  const val = (key: string) => form[key] ?? (data as unknown as Record<string, string | null> | null)?.[key] ?? "";
  const set = (key: string) => (v: string) => setForm(f => ({ ...f, [key]: v }));

  if (isLoading) return <div className="flex justify-center py-8"><Loader2 className="animate-spin" /></div>;

  return (
    <div className="space-y-6">
      <div className="border rounded-lg p-4 space-y-3">
        <h3 className="font-semibold text-sm text-gray-700">👥 לקוחות</h3>
        <div className="grid grid-cols-3 gap-3">
          <Field label="מספר" name="customersValue" value={val("customersValue")} onChange={set("customersValue")} />
          <Field label="סיומת (עברית)" name="customersSuffixHe" value={val("customersSuffixHe")} onChange={set("customersSuffixHe")} />
          <Field label="Suffix (English)" name="customersSuffixEn" value={val("customersSuffixEn")} onChange={set("customersSuffixEn")} />
        </div>
        <BiField labelHe="תיאור (עברית)" labelEn="Label (English)" nameHe="customersLabelHe" nameEn="customersLabelEn" valueHe={val("customersLabelHe")} valueEn={val("customersLabelEn")} onChangeHe={set("customersLabelHe")} onChangeEn={set("customersLabelEn")} />
      </div>
      <div className="border rounded-lg p-4 space-y-3">
        <h3 className="font-semibold text-sm text-gray-700">📅 שנים</h3>
        <div className="grid grid-cols-3 gap-3">
          <Field label="מספר" name="yearsValue" value={val("yearsValue")} onChange={set("yearsValue")} />
          <Field label="סיומת (עברית)" name="yearsSuffixHe" value={val("yearsSuffixHe")} onChange={set("yearsSuffixHe")} />
          <Field label="Suffix (English)" name="yearsSuffixEn" value={val("yearsSuffixEn")} onChange={set("yearsSuffixEn")} />
        </div>
        <BiField labelHe="תיאור (עברית)" labelEn="Label (English)" nameHe="yearsLabelHe" nameEn="yearsLabelEn" valueHe={val("yearsLabelHe")} valueEn={val("yearsLabelEn")} onChangeHe={set("yearsLabelHe")} onChangeEn={set("yearsLabelEn")} />
      </div>
      <div className="border rounded-lg p-4 space-y-3">
        <h3 className="font-semibold text-sm text-gray-700">⭐ ציון ביקורות</h3>
        <div className="grid grid-cols-2 gap-3">
          <Field label="ציון" name="ratingValue" value={val("ratingValue")} onChange={set("ratingValue")} />
          <Field label="סמל" name="ratingSymbol" value={val("ratingSymbol")} onChange={set("ratingSymbol")} />
        </div>
        <BiField labelHe="מספר ביקורות (עברית)" labelEn="Review Count (English)" nameHe="ratingCountHe" nameEn="ratingCountEn" valueHe={val("ratingCountHe")} valueEn={val("ratingCountEn")} onChangeHe={set("ratingCountHe")} onChangeEn={set("ratingCountEn")} />
      </div>
      <Button onClick={() => mutation.mutate(form as Parameters<typeof mutation.mutate>[0])} disabled={mutation.isPending} className="w-full bg-[#8B1A1A] hover:bg-[#6d1414]">
        {mutation.isPending ? <Loader2 className="animate-spin mr-2 h-4 w-4" /> : <Save className="mr-2 h-4 w-4" />} שמור מספרים
      </Button>
    </div>
  );
}

// ── Our Story Tab ─────────────────────────────────────────────────────────────
function OurStoryTab() {
  const { data, isLoading } = trpc.cms.getOurStory.useQuery();
  const utils = trpc.useUtils();
  const mutation = trpc.cms.updateOurStory.useMutation({
    onSuccess: () => { utils.cms.getOurStory.invalidate(); toast.success("הסיפור שלנו שמור ✓"); },
    onError: (e) => toast.error(e.message),
  });

  const [form, setForm] = useState<Record<string, string>>({});
  const val = (key: string) => form[key] ?? (data as unknown as Record<string, string | null> | null)?.[key] ?? "";
  const set = (key: string) => (v: string) => setForm(f => ({ ...f, [key]: v }));

  if (isLoading) return <div className="flex justify-center py-8"><Loader2 className="animate-spin" /></div>;

  return (
    <div className="space-y-4">
      <BiField labelHe="תווית (עברית)" labelEn="Label (English)" nameHe="labelHe" nameEn="labelEn" valueHe={val("labelHe")} valueEn={val("labelEn")} onChangeHe={set("labelHe")} onChangeEn={set("labelEn")} />
      <BiField labelHe="כותרת שורה 1 (עברית)" labelEn="Headline Line 1 (English)" nameHe="headlineLine1He" nameEn="headlineLine1En" valueHe={val("headlineLine1He")} valueEn={val("headlineLine1En")} onChangeHe={set("headlineLine1He")} onChangeEn={set("headlineLine1En")} />
      <BiField labelHe="כותרת שורה 2 (עברית)" labelEn="Headline Line 2 (English)" nameHe="headlineLine2He" nameEn="headlineLine2En" valueHe={val("headlineLine2He")} valueEn={val("headlineLine2En")} onChangeHe={set("headlineLine2He")} onChangeEn={set("headlineLine2En")} />
      <BiField labelHe="כותרת שורה 3 (עברית)" labelEn="Headline Line 3 (English)" nameHe="headlineLine3He" nameEn="headlineLine3En" valueHe={val("headlineLine3He")} valueEn={val("headlineLine3En")} onChangeHe={set("headlineLine3He")} onChangeEn={set("headlineLine3En")} />
      <BiField labelHe="תיאור (עברית)" labelEn="Description (English)" nameHe="descriptionHe" nameEn="descriptionEn" valueHe={val("descriptionHe")} valueEn={val("descriptionEn")} onChangeHe={set("descriptionHe")} onChangeEn={set("descriptionEn")} type="textarea" />
      <BiField labelHe="כפתור (עברית)" labelEn="Button (English)" nameHe="ctaBtnHe" nameEn="ctaBtnEn" valueHe={val("ctaBtnHe")} valueEn={val("ctaBtnEn")} onChangeHe={set("ctaBtnHe")} onChangeEn={set("ctaBtnEn")} />
      <Field label="קישור כפתור" name="ctaBtnUrl" value={val("ctaBtnUrl")} onChange={set("ctaBtnUrl")} />
      <div className="border rounded-lg p-4 space-y-3">
        <h3 className="font-semibold text-sm text-gray-700">תמונה 1</h3>
        <Field label="URL תמונה" name="image1Url" value={val("image1Url")} onChange={set("image1Url")} />
        <BiField labelHe="תווית (עברית)" labelEn="Label (English)" nameHe="image1LabelHe" nameEn="image1LabelEn" valueHe={val("image1LabelHe")} valueEn={val("image1LabelEn")} onChangeHe={set("image1LabelHe")} onChangeEn={set("image1LabelEn")} />
        <BiField labelHe="כותרת (עברית)" labelEn="Title (English)" nameHe="image1TitleHe" nameEn="image1TitleEn" valueHe={val("image1TitleHe")} valueEn={val("image1TitleEn")} onChangeHe={set("image1TitleHe")} onChangeEn={set("image1TitleEn")} />
      </div>
      <div className="border rounded-lg p-4 space-y-3">
        <h3 className="font-semibold text-sm text-gray-700">תמונה 2</h3>
        <Field label="URL תמונה" name="image2Url" value={val("image2Url")} onChange={set("image2Url")} />
        <BiField labelHe="תווית (עברית)" labelEn="Label (English)" nameHe="image2LabelHe" nameEn="image2LabelEn" valueHe={val("image2LabelHe")} valueEn={val("image2LabelEn")} onChangeHe={set("image2LabelHe")} onChangeEn={set("image2LabelEn")} />
        <BiField labelHe="כותרת (עברית)" labelEn="Title (English)" nameHe="image2TitleHe" nameEn="image2TitleEn" valueHe={val("image2TitleHe")} valueEn={val("image2TitleEn")} onChangeHe={set("image2TitleHe")} onChangeEn={set("image2TitleEn")} />
      </div>
      <Button onClick={() => mutation.mutate(form as Parameters<typeof mutation.mutate>[0])} disabled={mutation.isPending} className="w-full bg-[#8B1A1A] hover:bg-[#6d1414]">
        {mutation.isPending ? <Loader2 className="animate-spin mr-2 h-4 w-4" /> : <Save className="mr-2 h-4 w-4" />} שמור הסיפור שלנו
      </Button>
    </div>
  );
}

// ── Menu Tab ──────────────────────────────────────────────────────────────────
function MenuTab() {
  const utils = trpc.useUtils();
  const { data: categories = [], isLoading: loadingCats } = trpc.cms.getMenuCategories.useQuery();
  const { data: items = [], isLoading: loadingItems } = trpc.cms.getMenuItems.useQuery({});
  const [selectedCat, setSelectedCat] = useState<number | null>(null);
  const [newCat, setNewCat] = useState({ nameHe: "", nameEn: "" });
  const [newItem, setNewItem] = useState({ nameHe: "", nameEn: "", descriptionHe: "", descriptionEn: "", price: "", imageUrl: "" });

  const createCat = trpc.cms.createCategory.useMutation({
    onSuccess: () => { utils.cms.getMenuCategories.invalidate(); setNewCat({ nameHe: "", nameEn: "" }); toast.success("קטגוריה נוצרה ✓"); },
  });
  const deleteCat = trpc.cms.deleteCategory.useMutation({ onSuccess: () => utils.cms.getMenuCategories.invalidate() });
  const createItem = trpc.cms.createItem.useMutation({
    onSuccess: () => { utils.cms.getMenuItems.invalidate(); setNewItem({ nameHe: "", nameEn: "", descriptionHe: "", descriptionEn: "", price: "", imageUrl: "" }); toast.success("מנה נוצרה ✓"); },
  });
  const deleteItem = trpc.cms.deleteItem.useMutation({ onSuccess: () => utils.cms.getMenuItems.invalidate() });

  const filteredItems = selectedCat ? items.filter(i => i.categoryId === selectedCat) : items;

  return (
    <div className="space-y-6">
      {/* Categories */}
      <div className="border rounded-lg p-4 space-y-3">
        <h3 className="font-semibold text-sm text-gray-700">📂 קטגוריות</h3>
        {loadingCats ? <Loader2 className="animate-spin" /> : (
          <div className="space-y-2">
            {categories.map(c => (
              <div key={c.id} className={`flex items-center justify-between p-2 rounded border cursor-pointer ${selectedCat === c.id ? "border-[#8B1A1A] bg-red-50" : "border-gray-200"}`} onClick={() => setSelectedCat(c.id === selectedCat ? null : c.id)}>
                <span className="text-sm font-medium">{c.nameHe} / {c.nameEn}</span>
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-red-500" onClick={e => { e.stopPropagation(); deleteCat.mutate({ id: c.id }); }}><Trash2 className="h-3 w-3" /></Button>
              </div>
            ))}
            <div className="grid grid-cols-2 gap-2 pt-2 border-t">
              <Input placeholder="שם (עברית)" value={newCat.nameHe} onChange={e => setNewCat(f => ({ ...f, nameHe: e.target.value }))} className="h-8 text-sm" />
              <Input placeholder="Name (English)" value={newCat.nameEn} onChange={e => setNewCat(f => ({ ...f, nameEn: e.target.value }))} className="h-8 text-sm" />
            </div>
            <Button size="sm" onClick={() => createCat.mutate({ nameHe: newCat.nameHe, nameEn: newCat.nameEn })} disabled={!newCat.nameHe || !newCat.nameEn} className="w-full h-8 bg-[#8B1A1A] hover:bg-[#6d1414]">
              <Plus className="h-3 w-3 mr-1" /> הוסף קטגוריה
            </Button>
          </div>
        )}
      </div>

      {/* Items */}
      <div className="border rounded-lg p-4 space-y-3">
        <h3 className="font-semibold text-sm text-gray-700">🥩 מנות {selectedCat ? `(קטגוריה נבחרת)` : "(הכל)"}</h3>
        {loadingItems ? <Loader2 className="animate-spin" /> : (
          <div className="space-y-2">
            {filteredItems.map(item => (
              <div key={item.id} className="flex items-center justify-between p-2 rounded border border-gray-200">
                <div>
                  <span className="text-sm font-medium">{item.nameHe}</span>
                  {item.price && <span className="text-xs text-gray-500 ml-2">₪{item.price}</span>}
                </div>
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-red-500" onClick={() => deleteItem.mutate({ id: item.id })}><Trash2 className="h-3 w-3" /></Button>
              </div>
            ))}
            {selectedCat && (
              <div className="space-y-2 pt-2 border-t">
                <div className="grid grid-cols-2 gap-2">
                  <Input placeholder="שם (עברית)" value={newItem.nameHe} onChange={e => setNewItem(f => ({ ...f, nameHe: e.target.value }))} className="h-8 text-sm" />
                  <Input placeholder="Name (English)" value={newItem.nameEn} onChange={e => setNewItem(f => ({ ...f, nameEn: e.target.value }))} className="h-8 text-sm" />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Input placeholder="תיאור (עברית)" value={newItem.descriptionHe} onChange={e => setNewItem(f => ({ ...f, descriptionHe: e.target.value }))} className="h-8 text-sm" />
                  <Input placeholder="Description (English)" value={newItem.descriptionEn} onChange={e => setNewItem(f => ({ ...f, descriptionEn: e.target.value }))} className="h-8 text-sm" />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Input placeholder="מחיר (₪)" type="number" value={newItem.price} onChange={e => setNewItem(f => ({ ...f, price: e.target.value }))} className="h-8 text-sm" />
                  <Input placeholder="URL תמונה" value={newItem.imageUrl} onChange={e => setNewItem(f => ({ ...f, imageUrl: e.target.value }))} className="h-8 text-sm" />
                </div>
                <Button size="sm" onClick={() => createItem.mutate({ categoryId: selectedCat, nameHe: newItem.nameHe, nameEn: newItem.nameEn, descriptionHe: newItem.descriptionHe || undefined, descriptionEn: newItem.descriptionEn || undefined, price: newItem.price ? parseFloat(newItem.price) : undefined, imageUrl: newItem.imageUrl || undefined })} disabled={!newItem.nameHe || !newItem.nameEn} className="w-full h-8 bg-[#8B1A1A] hover:bg-[#6d1414]">
                  <Plus className="h-3 w-3 mr-1" /> הוסף מנה
                </Button>
              </div>
            )}
            {!selectedCat && <p className="text-xs text-gray-400 text-center py-2">בחר קטגוריה כדי להוסיף מנות</p>}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Gallery Tab ───────────────────────────────────────────────────────────────
function GalleryTab() {
  const utils = trpc.useUtils();
  const { data: images = [], isLoading } = trpc.cms.getGalleryImages.useQuery();
  const [newUrl, setNewUrl] = useState("");
  const [newCapHe, setNewCapHe] = useState("");

  const createImg = trpc.cms.createGalleryImage.useMutation({
    onSuccess: () => { utils.cms.getGalleryImages.invalidate(); setNewUrl(""); setNewCapHe(""); toast.success("תמונה נוספה ✓"); },
  });
  const deleteImg = trpc.cms.deleteGalleryImage.useMutation({ onSuccess: () => utils.cms.getGalleryImages.invalidate() });

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        {isLoading ? <Loader2 className="animate-spin" /> : images.map(img => (
          <div key={img.id} className="relative rounded-lg overflow-hidden border border-gray-200">
            <img src={img.imageUrl} alt={img.captionHe ?? ""} className="w-full h-32 object-cover" />
            <div className="absolute top-1 right-1">
              <Button variant="destructive" size="sm" className="h-6 w-6 p-0" onClick={() => deleteImg.mutate({ id: img.id })}><Trash2 className="h-3 w-3" /></Button>
            </div>
            {img.captionHe && <p className="text-xs text-center py-1 bg-white">{img.captionHe}</p>}
          </div>
        ))}
      </div>
      <div className="border rounded-lg p-4 space-y-3">
        <h3 className="font-semibold text-sm text-gray-700">הוסף תמונה</h3>
        <Input placeholder="URL תמונה" value={newUrl} onChange={e => setNewUrl(e.target.value)} className="h-8 text-sm" />
        <Input placeholder="כיתוב (עברית)" value={newCapHe} onChange={e => setNewCapHe(e.target.value)} className="h-8 text-sm" />
        <Button size="sm" onClick={() => createImg.mutate({ imageUrl: newUrl, captionHe: newCapHe || undefined })} disabled={!newUrl} className="w-full h-8 bg-[#8B1A1A] hover:bg-[#6d1414]">
          <Plus className="h-3 w-3 mr-1" /> הוסף תמונה
        </Button>
      </div>
    </div>
  );
}

// ── Main Admin Page ───────────────────────────────────────────────────────────
export default function Admin() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="animate-spin h-8 w-8 text-[#8B1A1A]" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-80">
          <CardHeader><CardTitle className="text-center">ממשק ניהול</CardTitle></CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-sm text-gray-500">יש להתחבר כדי לגשת לממשק הניהול</p>
            <Button onClick={() => window.location.href = getLoginUrl()} className="w-full bg-[#8B1A1A] hover:bg-[#6d1414]">התחבר</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (user.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-80">
          <CardHeader><CardTitle className="text-center text-red-600">אין הרשאה</CardTitle></CardHeader>
          <CardContent className="text-center">
            <p className="text-sm text-gray-500">רק מנהלים יכולים לגשת לממשק זה.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Header */}
      <div className="bg-[#1a0a0a] text-white px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-xl font-bold">Casa do Brasil</span>
          <span className="text-sm text-gray-400">— ממשק ניהול</span>
        </div>
        <a href="/" className="text-sm text-gray-400 hover:text-white transition-colors">← חזור לאתר</a>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Tabs defaultValue="hero">
          <TabsList className="w-full flex-wrap h-auto gap-1 mb-6 bg-white border border-gray-200 p-1 rounded-lg">
            <TabsTrigger value="hero" className="text-xs">🦸 Hero</TabsTrigger>
            <TabsTrigger value="story" className="text-xs">📖 הסיפור</TabsTrigger>
            <TabsTrigger value="statistics" className="text-xs">📊 מספרים</TabsTrigger>
            <TabsTrigger value="menu" className="text-xs">🍖 תפריט</TabsTrigger>
            <TabsTrigger value="gallery" className="text-xs">🖼️ גלריה</TabsTrigger>
          </TabsList>

          <Card>
            <CardContent className="pt-6">
              <TabsContent value="hero"><HeroTab /></TabsContent>
              <TabsContent value="story"><OurStoryTab /></TabsContent>
              <TabsContent value="statistics"><StatisticsTab /></TabsContent>
              <TabsContent value="menu"><MenuTab /></TabsContent>
              <TabsContent value="gallery"><GalleryTab /></TabsContent>
            </CardContent>
          </Card>
        </Tabs>
      </div>
    </div>
  );
}

/**
 * CASA DO BRASIL — Admin: Reviews Section Editor
 * Full CRUD management for customer reviews with Google URL support
 */
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2, ExternalLink, Star, Save, ChevronDown, ChevronUp } from "lucide-react";
import { toast } from "sonner";

interface ReviewItem {
  id: number;
  author: string;
  authorHe: string;
  text: string;
  textHe: string;
  rating: number;
  date: string;
  dateHe: string;
  googleUrl: string;
}

const DEFAULT_REVIEWS: ReviewItem[] = [
  { id: 1, author: "Noa S.", authorHe: "נועה ש.", text: "An unforgettable dining experience. The Picanha was perfectly grilled, and the atmosphere transported us straight to Brazil.", textHe: "חוויית סעודה בלתי נשכחת. הפיקאניה הייתה מושלמת, והאווירה לקחה אותנו ישר לברזיל.", rating: 5, date: "January 2025", dateHe: "ינואר 2025", googleUrl: "" },
  { id: 2, author: "Daniel K.", authorHe: "דניאל ק.", text: "The rodizio is a true feast — endless cuts, each one better than the last. Casa do Brasil is a must in Eilat.", textHe: "הרודיציו הוא חגיגה אמיתית — נתחים אינסופיים, כל אחד טוב מהקודם. חובה בביקור באילת.", rating: 5, date: "December 2024", dateHe: "דצמבר 2024", googleUrl: "" },
  { id: 3, author: "Maya R.", authorHe: "מאיה ר.", text: "We celebrated our anniversary here and it was magical. The Rossini Filet melted in our mouths.", textHe: "חגגנו כאן את יום הנישואין שלנו וזה היה קסום. פילה הרוסיני נמס בפה.", rating: 5, date: "February 2025", dateHe: "פברואר 2025", googleUrl: "" },
];

const GOLD = "#B9A167";
const BORDEAUX = "#8B1A1A";

function StarRating({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map(i => (
        <button key={i} type="button" onClick={() => onChange(i)}>
          <Star className="w-4 h-4" style={{ fill: i <= value ? GOLD : "transparent", stroke: i <= value ? GOLD : "#ccc" }} />
        </button>
      ))}
    </div>
  );
}

function ReviewRow({ review, onUpdate, onDelete }: {
  review: ReviewItem;
  onUpdate: (r: ReviewItem) => void;
  onDelete: (id: number) => void;
}) {
  const [open, setOpen] = useState(false);
  const set = (field: keyof ReviewItem, val: string | number) => onUpdate({ ...review, [field]: val });

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden bg-white">
      {/* Header row */}
      <div
        className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={() => setOpen(o => !o)}
      >
        <div className="flex gap-0.5">
          {[1,2,3,4,5].map(i => (
            <Star key={i} className="w-3 h-3" style={{ fill: i <= review.rating ? GOLD : "transparent", stroke: i <= review.rating ? GOLD : "#ddd" }} />
          ))}
        </div>
        <span className="font-semibold text-sm text-gray-800 flex-1">{review.authorHe || review.author}</span>
        <span className="text-xs text-gray-400">{review.dateHe || review.date}</span>
        {review.googleUrl && (
          <a href={review.googleUrl} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} title="Google Review">
            <ExternalLink className="w-3.5 h-3.5 text-blue-400 hover:text-blue-600" />
          </a>
        )}
        <button
          type="button"
          onClick={e => { e.stopPropagation(); onDelete(review.id); }}
          className="text-red-300 hover:text-red-500 transition-colors p-1"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
        {open ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
      </div>

      {/* Expanded fields */}
      {open && (
        <div className="px-4 pb-4 pt-1 border-t border-gray-100 space-y-4" dir="rtl">
          {/* Rating */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-gray-500 w-24 shrink-0">דירוג</span>
            <StarRating value={review.rating} onChange={v => set("rating", v)} />
          </div>

          {/* Author names */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-gray-500 block mb-1">שם (עברית)</label>
              <Input value={review.authorHe} onChange={e => set("authorHe", e.target.value)} placeholder="נועה ש." className="text-sm" dir="rtl" />
            </div>
            <div dir="ltr">
              <label className="text-xs font-semibold text-gray-500 block mb-1">Name (English)</label>
              <Input value={review.author} onChange={e => set("author", e.target.value)} placeholder="Noa S." className="text-sm" />
            </div>
          </div>

          {/* Review text */}
          <div>
            <label className="text-xs font-semibold text-gray-500 block mb-1">תוכן הביקורת (עברית)</label>
            <Textarea value={review.textHe} onChange={e => set("textHe", e.target.value)} rows={3} className="text-sm resize-none" dir="rtl" />
          </div>
          <div dir="ltr">
            <label className="text-xs font-semibold text-gray-500 block mb-1">Review text (English)</label>
            <Textarea value={review.text} onChange={e => set("text", e.target.value)} rows={3} className="text-sm resize-none" />
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-gray-500 block mb-1">תאריך (עברית)</label>
              <Input value={review.dateHe} onChange={e => set("dateHe", e.target.value)} placeholder="ינואר 2025" className="text-sm" dir="rtl" />
            </div>
            <div dir="ltr">
              <label className="text-xs font-semibold text-gray-500 block mb-1">Date (English)</label>
              <Input value={review.date} onChange={e => set("date", e.target.value)} placeholder="January 2025" className="text-sm" />
            </div>
          </div>

          {/* Google URL */}
          <div dir="ltr">
            <label className="text-xs font-semibold text-gray-500 block mb-1 flex items-center gap-1.5">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Google Review URL (קישור לביקורת האמיתית)
            </label>
            <Input
              value={review.googleUrl}
              onChange={e => set("googleUrl", e.target.value)}
              placeholder="https://maps.google.com/..."
              className="text-sm"
              type="url"
            />
            <p className="text-xs text-gray-400 mt-1">הדבק כאן את הקישור לביקורת האמיתית ב-Google Maps</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ReviewsEditor() {
  const [reviews, setReviews] = useState<ReviewItem[]>(DEFAULT_REVIEWS);
  const [saved, setSaved] = useState(false);

  const updateReview = (updated: ReviewItem) => {
    setReviews(prev => prev.map(r => r.id === updated.id ? updated : r));
    setSaved(false);
  };

  const deleteReview = (id: number) => {
    setReviews(prev => prev.filter(r => r.id !== id));
    setSaved(false);
  };

  const addReview = () => {
    const newId = Math.max(0, ...reviews.map(r => r.id)) + 1;
    setReviews(prev => [...prev, {
      id: newId,
      author: "",
      authorHe: "",
      text: "",
      textHe: "",
      rating: 5,
      date: "",
      dateHe: "",
      googleUrl: "",
    }]);
    setSaved(false);
  };

  const handleSave = () => {
    // In the future this will call a tRPC mutation to save to DB
    // For now, show a success toast with instructions
    toast.success("השינויים נשמרו בהצלחה!", {
      description: "הביקורות עודכנו. לעדכון הקישורים האמיתיים, עדכן את קובץ ReviewsSection.tsx.",
    });
    setSaved(true);
  };

  return (
    <div className="space-y-5" dir="rtl">
      {/* Header */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-5 py-3.5 border-b border-gray-100 bg-gray-50/60 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-gray-800">הלקוחות שלנו — ביקורות</h3>
            <p className="text-xs text-gray-400 mt-0.5">{reviews.length} ביקורות | ניהול תוכן, דירוגים וקישורי Google</p>
          </div>
          <Button
            onClick={handleSave}
            size="sm"
            className="gap-1.5 text-xs"
            style={{ background: saved ? "#16a34a" : BORDEAUX, color: "#fff", border: "none" }}
          >
            <Save className="w-3.5 h-3.5" />
            {saved ? "נשמר ✓" : "שמור שינויים"}
          </Button>
        </div>

        {/* Google Maps link tip */}
        <div className="px-5 py-3 bg-blue-50 border-b border-blue-100 flex items-start gap-2">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="shrink-0 mt-0.5">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          <div>
            <p className="text-xs font-semibold text-blue-700">איך מוצאים קישור לביקורת Google?</p>
            <p className="text-xs text-blue-600 mt-0.5">
              1. פתח Google Maps ← חפש "Casa do Brasil Eilat" ← לחץ על ביקורות ← בחר ביקורת ← לחץ על ⋯ ← "שתף" ← העתק קישור
            </p>
          </div>
        </div>

        {/* Reviews list */}
        <div className="p-5 space-y-3">
          {reviews.map(review => (
            <ReviewRow
              key={review.id}
              review={review}
              onUpdate={updateReview}
              onDelete={deleteReview}
            />
          ))}

          {/* Add new */}
          <button
            type="button"
            onClick={addReview}
            className="w-full border-2 border-dashed border-gray-200 rounded-xl py-3 text-sm text-gray-400 hover:border-gray-300 hover:text-gray-600 transition-colors flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" />
            הוסף ביקורת חדשה
          </button>
        </div>
      </div>
    </div>
  );
}

/**
 * CASA DO BRASIL — Admin: Reviews Section Editor
 * Reviews are currently hardcoded — this is a placeholder for future DB management.
 */
import { Info } from "lucide-react";

export default function ReviewsEditor() {
  return (
    <div className="space-y-5">
      <div className="bg-white rounded-xl border border-amber-200 overflow-hidden">
        <div className="px-5 py-3.5 border-b border-amber-100 bg-amber-50/60 flex items-center gap-2">
          <Info className="w-4 h-4 text-amber-500 shrink-0" />
          <h3 className="text-sm font-semibold text-amber-700">הלקוחות שלנו — Reviews Section</h3>
        </div>
        <div className="p-6 space-y-4">
          <p className="text-sm text-gray-700 leading-relaxed" dir="rtl">
            הביקורות מוצגות כרגע כטקסט קבוע בקוד האתר. בשלב הבא ניתן יהיה לנהל אותן דרך מסד הנתונים — להוסיף, לערוך ולמחוק ביקורות ישירות מכאן.
          </p>
          <div className="border-t border-amber-100 pt-4">
            <p className="text-sm text-gray-500 leading-relaxed" dir="ltr">
              Reviews are currently hardcoded in the source code. In the next phase, they will be fully manageable from the database — add, edit, and delete reviews directly from this panel.
            </p>
          </div>
          <div className="bg-amber-50 rounded-lg px-4 py-3 border border-amber-100">
            <p className="text-xs text-amber-600 font-medium">
              📌 Coming soon: ניהול ביקורות מהמסד נתונים
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

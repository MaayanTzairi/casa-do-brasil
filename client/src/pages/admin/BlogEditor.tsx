/**
 * CASA DO BRASIL — Admin Blog Editor
 * Full CRUD for blog posts: title, content, excerpt, author, cover image, SEO fields, publish toggle
 * Bilingual: Hebrew + English side by side
 */

import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
  Plus, Pencil, Trash2, Eye, EyeOff, X, Save, Loader2, Globe, Image as ImageIcon, Search, ChevronDown, ChevronUp
} from "lucide-react";
import { useState as useUploadState } from "react";

interface BlogPost {
  id: number;
  slug: string;
  titleHe: string;
  titleEn: string;
  excerptHe?: string | null;
  excerptEn?: string | null;
  contentHe?: string | null;
  contentEn?: string | null;
  coverImageUrl?: string | null;
  authorHe?: string | null;
  authorEn?: string | null;
  seoTitleHe?: string | null;
  seoTitleEn?: string | null;
  seoDescriptionHe?: string | null;
  seoDescriptionEn?: string | null;
  seoKeywordsHe?: string | null;
  seoKeywordsEn?: string | null;
  ogImageUrl?: string | null;
  published: boolean;
  publishedAt?: Date | null;
  sortOrder?: number | null;
}

const EMPTY_POST: Omit<BlogPost, "id"> = {
  slug: "",
  titleHe: "",
  titleEn: "",
  excerptHe: "",
  excerptEn: "",
  contentHe: "",
  contentEn: "",
  coverImageUrl: "",
  authorHe: "",
  authorEn: "",
  seoTitleHe: "",
  seoTitleEn: "",
  seoDescriptionHe: "",
  seoDescriptionEn: "",
  seoKeywordsHe: "",
  seoKeywordsEn: "",
  ogImageUrl: "",
  published: false,
  publishedAt: null,
  sortOrder: 0,
};

function BilingualField({
  labelHe,
  labelEn,
  valueHe,
  valueEn,
  onChangeHe,
  onChangeEn,
  multiline = false,
  rows = 3,
  placeholder,
}: {
  labelHe: string;
  labelEn: string;
  valueHe: string;
  valueEn: string;
  onChangeHe: (v: string) => void;
  onChangeEn: (v: string) => void;
  multiline?: boolean;
  rows?: number;
  placeholder?: string;
}) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="flex flex-col gap-1">
        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">{labelHe}</label>
        {multiline ? (
          <Textarea dir="rtl" value={valueHe} onChange={e => onChangeHe(e.target.value)} rows={rows} className="text-sm resize-none text-right" placeholder={placeholder} />
        ) : (
          <Input dir="rtl" value={valueHe} onChange={e => onChangeHe(e.target.value)} className="text-sm text-right" placeholder={placeholder} />
        )}
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{labelEn}</label>
        {multiline ? (
          <Textarea dir="ltr" value={valueEn} onChange={e => onChangeEn(e.target.value)} rows={rows} className="text-sm resize-none" placeholder={placeholder} />
        ) : (
          <Input dir="ltr" value={valueEn} onChange={e => onChangeEn(e.target.value)} className="text-sm" placeholder={placeholder} />
        )}
      </div>
    </div>
  );
}

function PostForm({
  initial,
  onSave,
  onCancel,
  isSaving,
}: {
  initial: Omit<BlogPost, "id"> & { id?: number };
  onSave: (data: Omit<BlogPost, "id"> & { id?: number }) => void;
  onCancel: () => void;
  isSaving: boolean;
}) {
  const [form, setForm] = useState(initial);
  const [showSeo, setShowSeo] = useState(false);
  const [uploading, setUploading] = useUploadState(false);

  const upload = async (file: File): Promise<string | null> => {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: formData, credentials: "include" });
      if (!res.ok) throw new Error("Upload failed");
      const data = await res.json();
      return data.url as string;
    } catch (e) {
      toast.error("שגיאה בהעלאת תמונה");
      return null;
    } finally {
      setUploading(false);
    }
  };

  const set = (key: keyof typeof form) => (value: any) =>
    setForm(f => ({ ...f, [key]: value }));

  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = await upload(file);
    if (url) setForm(f => ({ ...f, coverImageUrl: url }));
  };

  const handleOgUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = await upload(file);
    if (url) setForm(f => ({ ...f, ogImageUrl: url }));
  };

  // Auto-generate slug from English title
  const generateSlug = () => {
    const slug = form.titleEn
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
    setForm(f => ({ ...f, slug }));
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-5" dir="rtl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button onClick={onCancel} className="text-gray-400 hover:text-gray-700 transition-colors p-1">
            <X className="w-4 h-4" />
          </button>
          <h3 className="text-base font-bold text-gray-900">
            {form.id ? "עריכת פוסט" : "פוסט חדש"}
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setForm(f => ({ ...f, published: !f.published }))}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
              form.published
                ? "bg-green-100 text-green-700 hover:bg-green-200"
                : "bg-gray-100 text-gray-500 hover:bg-gray-200"
            }`}
          >
            {form.published ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
            {form.published ? "מפורסם" : "טיוטה"}
          </button>
          <Button
            size="sm"
            onClick={() => onSave(form)}
            disabled={isSaving || !form.titleHe || !form.titleEn || !form.slug}
            className="bg-[#8B1A1A] hover:bg-[#6d1414] text-white border-0 gap-1.5"
          >
            {isSaving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
            שמור
          </Button>
        </div>
      </div>

      {/* Slug */}
      <div className="flex flex-col gap-1">
        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Slug (URL)</label>
        <div className="flex gap-2">
          <Input
            dir="ltr"
            value={form.slug}
            onChange={e => setForm(f => ({ ...f, slug: e.target.value }))}
            className="text-sm font-mono flex-1"
            placeholder="my-post-slug"
          />
          <Button size="sm" variant="outline" onClick={generateSlug} className="text-xs shrink-0">
            יצור אוטומטי
          </Button>
        </div>
        <p className="text-[10px] text-gray-400">כתובת URL: /blog/{form.slug || "slug"}</p>
      </div>

      {/* Titles */}
      <BilingualField
        labelHe="כותרת — עברית"
        labelEn="Title — English"
        valueHe={form.titleHe}
        valueEn={form.titleEn}
        onChangeHe={set("titleHe")}
        onChangeEn={set("titleEn")}
      />

      {/* Authors */}
      <BilingualField
        labelHe="כותב — עברית"
        labelEn="Author — English"
        valueHe={form.authorHe ?? ""}
        valueEn={form.authorEn ?? ""}
        onChangeHe={set("authorHe")}
        onChangeEn={set("authorEn")}
      />

      {/* Excerpts */}
      <BilingualField
        labelHe="תקציר — עברית"
        labelEn="Excerpt — English"
        valueHe={form.excerptHe ?? ""}
        valueEn={form.excerptEn ?? ""}
        onChangeHe={set("excerptHe")}
        onChangeEn={set("excerptEn")}
        multiline
        rows={2}
      />

      {/* Content */}
      <BilingualField
        labelHe="תוכן — עברית"
        labelEn="Content — English"
        valueHe={form.contentHe ?? ""}
        valueEn={form.contentEn ?? ""}
        onChangeHe={set("contentHe")}
        onChangeEn={set("contentEn")}
        multiline
        rows={8}
      />

      {/* Cover image */}
      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">תמונת כריכה</label>
        <div className="flex gap-2 items-start">
          <div className="flex-1 space-y-2">
            <Input
              dir="ltr"
              value={form.coverImageUrl ?? ""}
              onChange={e => setForm(f => ({ ...f, coverImageUrl: e.target.value }))}
              className="text-sm font-mono"
              placeholder="https://..."
            />
            <label className="flex items-center gap-1.5 text-xs text-[#8B1A1A] cursor-pointer hover:underline">
              <ImageIcon className="w-3.5 h-3.5" />
              {uploading ? "מעלה..." : "העלה תמונה"}
              <input type="file" accept="image/*" className="hidden" onChange={handleCoverUpload} disabled={uploading} />
            </label>
          </div>
          {form.coverImageUrl && (
            <img src={form.coverImageUrl} alt="cover" className="w-20 h-14 object-cover rounded border border-gray-200 shrink-0" />
          )}
        </div>
      </div>

      {/* SEO accordion */}
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <button
          onClick={() => setShowSeo(v => !v)}
          className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors text-sm font-semibold text-gray-700"
        >
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4 text-[#B9A167]" />
            הגדרות SEO לפוסט זה
          </div>
          {showSeo ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
        </button>

        {showSeo && (
          <div className="p-4 space-y-4 bg-white">
            <BilingualField
              labelHe="כותרת SEO — עברית"
              labelEn="SEO Title — English"
              valueHe={form.seoTitleHe ?? ""}
              valueEn={form.seoTitleEn ?? ""}
              onChangeHe={set("seoTitleHe")}
              onChangeEn={set("seoTitleEn")}
            />
            <BilingualField
              labelHe="תיאור SEO — עברית"
              labelEn="SEO Description — English"
              valueHe={form.seoDescriptionHe ?? ""}
              valueEn={form.seoDescriptionEn ?? ""}
              onChangeHe={set("seoDescriptionHe")}
              onChangeEn={set("seoDescriptionEn")}
              multiline
              rows={2}
            />
            <BilingualField
              labelHe="מילות מפתח — עברית"
              labelEn="Keywords — English"
              valueHe={form.seoKeywordsHe ?? ""}
              valueEn={form.seoKeywordsEn ?? ""}
              onChangeHe={set("seoKeywordsHe")}
              onChangeEn={set("seoKeywordsEn")}
              placeholder="מילה1, מילה2, מילה3"
            />
            {/* OG Image */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Open Graph Image</label>
              <div className="flex gap-2 items-start">
                <div className="flex-1 space-y-2">
                  <Input
                    dir="ltr"
                    value={form.ogImageUrl ?? ""}
                    onChange={e => setForm(f => ({ ...f, ogImageUrl: e.target.value }))}
                    className="text-sm font-mono"
                    placeholder="https://..."
                  />
                  <label className="flex items-center gap-1.5 text-xs text-[#8B1A1A] cursor-pointer hover:underline">
                    <ImageIcon className="w-3.5 h-3.5" />
                    {uploading ? "מעלה..." : "העלה תמונת OG"}
                    <input type="file" accept="image/*" className="hidden" onChange={handleOgUpload} disabled={uploading} />
                  </label>
                </div>
                {form.ogImageUrl && (
                  <img src={form.ogImageUrl} alt="og" className="w-20 h-14 object-cover rounded border border-gray-200 shrink-0" />
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function BlogEditor() {
  const utils = trpc.useUtils();
  const { data: posts, isLoading } = trpc.cms.getAllBlogPosts.useQuery();
  const createPost = trpc.cms.createBlogPost.useMutation({
    onSuccess: () => { utils.cms.getAllBlogPosts.invalidate(); utils.cms.getBlogPosts.invalidate(); toast.success("פוסט נוצר בהצלחה"); setEditing(null); setCreating(false); },
    onError: (e) => toast.error(`שגיאה: ${e.message}`),
  });
  const updatePost = trpc.cms.updateBlogPost.useMutation({
    onSuccess: () => { utils.cms.getAllBlogPosts.invalidate(); utils.cms.getBlogPosts.invalidate(); toast.success("פוסט עודכן בהצלחה"); setEditing(null); },
    onError: (e) => toast.error(`שגיאה: ${e.message}`),
  });
  const deletePost = trpc.cms.deleteBlogPost.useMutation({
    onSuccess: () => { utils.cms.getAllBlogPosts.invalidate(); utils.cms.getBlogPosts.invalidate(); toast.success("פוסט נמחק"); },
    onError: (e) => toast.error(`שגיאה: ${e.message}`),
  });

  const [creating, setCreating] = useState(false);
  const [editing, setEditing] = useState<BlogPost | null>(null);

  const handleSave = (data: Omit<BlogPost, "id"> & { id?: number }) => {
    // Convert null values to undefined for tRPC compatibility
    const clean = Object.fromEntries(
      Object.entries(data).map(([k, v]) => [k, v === null ? undefined : v])
    ) as any;
    if (data.id) {
      updatePost.mutate({ id: data.id, ...clean });
    } else {
      createPost.mutate(clean);
    }
  };

  if (editing) {
    return (
      <PostForm
        initial={editing}
        onSave={handleSave}
        onCancel={() => setEditing(null)}
        isSaving={updatePost.isPending}
      />
    );
  }

  if (creating) {
    return (
      <PostForm
        initial={{ ...EMPTY_POST }}
        onSave={handleSave}
        onCancel={() => setCreating(false)}
        isSaving={createPost.isPending}
      />
    );
  }

  return (
    <div className="space-y-4" dir="rtl">
      {/* Header */}
      <div className="bg-white rounded-xl border border-gray-200 p-5 flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-gray-900">ניהול בלוג</h2>
          <p className="text-xs text-gray-500 mt-0.5">
            {posts?.length ?? 0} פוסטים · {posts?.filter(p => p.published).length ?? 0} מפורסמים
          </p>
        </div>
        <Button
          size="sm"
          onClick={() => setCreating(true)}
          className="bg-[#8B1A1A] hover:bg-[#6d1414] text-white border-0 gap-1.5"
        >
          <Plus className="w-4 h-4" />
          פוסט חדש
        </Button>
      </div>

      {/* Posts list */}
      {isLoading && (
        <div className="bg-white rounded-xl border border-gray-200 p-8 flex items-center justify-center">
          <Loader2 className="w-5 h-5 animate-spin text-gray-400" />
        </div>
      )}

      {!isLoading && (!posts || posts.length === 0) && (
        <div className="bg-white rounded-xl border border-dashed border-gray-200 p-10 flex flex-col items-center gap-3 text-center">
          <div className="w-12 h-12 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center">
            <Globe className="w-5 h-5 text-gray-300" />
          </div>
          <p className="text-sm font-medium text-gray-400">אין פוסטים עדיין</p>
          <p className="text-xs text-gray-300">לחץ על "פוסט חדש" כדי להתחיל</p>
        </div>
      )}

      {posts && posts.map(post => (
        <div key={post.id} className="bg-white rounded-xl border border-gray-200 p-4 flex items-start gap-4">
          {/* Cover thumbnail */}
          <div className="w-16 h-12 rounded-lg overflow-hidden bg-gray-100 shrink-0 border border-gray-200">
            {post.coverImageUrl ? (
              <img src={post.coverImageUrl} alt={post.titleHe} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <ImageIcon className="w-5 h-5 text-gray-300" />
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0 text-right">
            <div className="flex items-center gap-2 mb-0.5 justify-end">
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                post.published ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"
              }`}>
                {post.published ? "מפורסם" : "טיוטה"}
              </span>
            </div>
            <p className="text-sm font-bold text-gray-900 truncate">{post.titleHe}</p>
            <p className="text-xs text-gray-400 truncate">{post.titleEn}</p>
            <p className="text-[10px] text-gray-300 mt-0.5 font-mono">/blog/{post.slug}</p>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1 shrink-0">
            <a href={`/blog/${post.slug}`} target="_blank" rel="noopener noreferrer"
              className="p-1.5 text-gray-400 hover:text-gray-700 transition-colors rounded"
              title="צפה בפוסט"
            >
              <Eye className="w-4 h-4" />
            </a>
            <button
              onClick={() => setEditing(post as BlogPost)}
              className="p-1.5 text-gray-400 hover:text-[#8B1A1A] transition-colors rounded"
              title="ערוך"
            >
              <Pencil className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                if (confirm(`למחוק את "${post.titleHe}"?`)) deletePost.mutate({ id: post.id });
              }}
              className="p-1.5 text-gray-400 hover:text-red-600 transition-colors rounded"
              title="מחק"
              disabled={deletePost.isPending}
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

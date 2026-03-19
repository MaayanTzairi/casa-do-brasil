/**
 * GALLERY IMAGE — תמונת גלריה
 */
export default {
  name: "galleryImage",
  title: "🖼️ תמונת גלריה",
  type: "document",
  fields: [
    {
      name: "image",
      title: "תמונה",
      type: "image",
      options: { hotspot: true },
      description: "JPG/WebP, מינימום 800px ברוחב, מקסימום 5MB",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "captionHe",
      title: "כיתוב — עברית (אופציונלי)",
      type: "string",
      validation: (Rule: any) => Rule.max(80),
    },
    {
      name: "captionEn",
      title: "Caption — English (optional)",
      type: "string",
      validation: (Rule: any) => Rule.max(80),
    },
    {
      name: "sortOrder",
      title: "סדר תצוגה",
      type: "number",
      initialValue: 99,
    },
    {
      name: "active",
      title: "מוצגת באתר",
      type: "boolean",
      initialValue: true,
    },
  ],
  orderings: [
    {
      title: "לפי סדר תצוגה",
      name: "sortOrder",
      by: [{ field: "sortOrder", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "captionHe", media: "image" },
    prepare: ({ title, media }: any) => ({
      title: title ?? "תמונה ללא כיתוב",
      media,
    }),
  },
};

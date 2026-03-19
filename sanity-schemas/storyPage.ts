/**
 * STORY PAGE — עמוד הסיפור
 * Singleton document
 */
export default {
  name: "storyPage",
  title: "📖 הסיפור שלנו",
  type: "document",
  __experimental_actions: ["update", "publish"],
  fields: [
    {
      name: "titleHe",
      title: "כותרת — עברית",
      type: "string",
      validation: (Rule: any) => Rule.required().max(60),
    },
    {
      name: "titleEn",
      title: "Title — English",
      type: "string",
      validation: (Rule: any) => Rule.required().max(60),
    },
    {
      name: "bodyHe",
      title: "תוכן — עברית",
      type: "array",
      of: [{ type: "block" }],
      description: "טקסט חופשי עם עיצוב בסיסי",
    },
    {
      name: "bodyEn",
      title: "Content — English",
      type: "array",
      of: [{ type: "block" }],
    },
    {
      name: "images",
      title: "תמונות",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
        },
      ],
      description: "JPG/WebP, יחס 4:3, מינימום 1200×900, מקסימום 5MB לתמונה",
      validation: (Rule: any) => Rule.max(6),
    },
    {
      name: "quoteHe",
      title: "ציטוט מיוחד — עברית (אופציונלי)",
      type: "text",
      rows: 2,
      validation: (Rule: any) => Rule.max(150),
    },
    {
      name: "quoteEn",
      title: "Featured Quote — English (optional)",
      type: "text",
      rows: 2,
      validation: (Rule: any) => Rule.max(150),
    },
  ],
  preview: {
    prepare: () => ({ title: "הסיפור שלנו" }),
  },
};

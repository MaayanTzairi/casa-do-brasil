/**
 * MENU ITEM — מנה בתפריט
 */
export default {
  name: "menuItem",
  title: "🥩 מנה בתפריט",
  type: "document",
  fields: [
    // ── שם המנה ──
    {
      name: "nameHe",
      title: "שם המנה — עברית",
      type: "string",
      validation: (Rule: any) => Rule.required().max(40),
    },
    {
      name: "nameEn",
      title: "Dish Name — English",
      type: "string",
      validation: (Rule: any) => Rule.required().max(40),
    },
    // ── תיאור ──
    {
      name: "descriptionHe",
      title: "תיאור — עברית",
      type: "text",
      rows: 2,
      validation: (Rule: any) => Rule.max(120),
    },
    {
      name: "descriptionEn",
      title: "Description — English",
      type: "text",
      rows: 2,
      validation: (Rule: any) => Rule.max(120),
    },
    // ── מחיר ──
    {
      name: "price",
      title: "מחיר (₪)",
      type: "number",
      validation: (Rule: any) => Rule.min(0).max(9999),
    },
    // ── קטגוריה ──
    {
      name: "category",
      title: "קטגוריה",
      type: "reference",
      to: [{ type: "menuCategory" }],
      validation: (Rule: any) => Rule.required(),
    },
    // ── תמונה ──
    {
      name: "image",
      title: "תמונה",
      type: "image",
      options: { hotspot: true },
      description: "JPG/WebP, יחס 1:1 (ריבוע), מינימום 600×600, מקסימום 3MB",
    },
    // ── תגיות ──
    {
      name: "badges",
      title: "תגיות",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "מומלץ השף", value: "chefRecommended" },
          { title: "חדש", value: "new" },
          { title: "עונתי", value: "seasonal" },
          { title: "אזל מהמלאי", value: "soldOut" },
          { title: "ללא גלוטן", value: "glutenFree" },
          { title: "חריף", value: "spicy" },
        ],
      },
    },
    // ── סדר תצוגה ──
    {
      name: "sortOrder",
      title: "סדר תצוגה",
      type: "number",
      description: "מספר נמוך יותר = מופיע ראשון",
      initialValue: 99,
    },
    // ── פעיל ──
    {
      name: "active",
      title: "מוצג באתר",
      type: "boolean",
      initialValue: true,
    },
  ],
  orderings: [
    {
      title: "לפי קטגוריה וסדר",
      name: "categoryAndOrder",
      by: [
        { field: "category.nameHe", direction: "asc" },
        { field: "sortOrder", direction: "asc" },
      ],
    },
  ],
  preview: {
    select: {
      title: "nameHe",
      subtitle: "price",
      media: "image",
    },
    prepare: ({ title, subtitle, media }: any) => ({
      title,
      subtitle: subtitle ? `₪${subtitle}` : "ללא מחיר",
      media,
    }),
  },
};

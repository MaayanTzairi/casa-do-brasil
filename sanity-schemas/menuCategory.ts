/**
 * MENU CATEGORY — קטגוריית תפריט
 */
export default {
  name: "menuCategory",
  title: "📂 קטגוריית תפריט",
  type: "document",
  fields: [
    {
      name: "nameHe",
      title: "שם הקטגוריה — עברית",
      type: "string",
      validation: (Rule: any) => Rule.required().max(40),
    },
    {
      name: "nameEn",
      title: "Category Name — English",
      type: "string",
      validation: (Rule: any) => Rule.required().max(40),
    },
    {
      name: "descriptionHe",
      title: "תיאור קצר — עברית",
      type: "string",
      validation: (Rule: any) => Rule.max(80),
    },
    {
      name: "descriptionEn",
      title: "Short Description — English",
      type: "string",
      validation: (Rule: any) => Rule.max(80),
    },
    {
      name: "sortOrder",
      title: "סדר תצוגה",
      type: "number",
      description: "מספר נמוך יותר = מופיע ראשון",
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
    select: { title: "nameHe", subtitle: "sortOrder" },
    prepare: ({ title, subtitle }: any) => ({
      title,
      subtitle: `סדר: ${subtitle ?? "?"}`,
    }),
  },
};

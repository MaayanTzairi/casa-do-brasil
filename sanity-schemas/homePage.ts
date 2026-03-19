/**
 * HOME PAGE — עמוד ראשי
 * Singleton document
 */
export default {
  name: "homePage",
  title: "🏠 עמוד ראשי",
  type: "document",
  __experimental_actions: ["update", "publish"],
  fields: [
    // ── Hero Section ──
    {
      name: "heroSection",
      title: "Hero — חלק עליון",
      type: "object",
      fields: [
        {
          name: "backgroundImage",
          title: "תמונת רקע",
          type: "image",
          options: { hotspot: true },
          description: "JPG/WebP, מינימום 1920×1080, מקסימום 8MB",
          validation: (Rule: any) => Rule.required(),
        },
        {
          name: "subtitleHe",
          title: "כותרת משנה — עברית",
          type: "string",
          description: "לדוגמה: גריל ברזילאי — מוזיקה וצ'וראסקריה",
          validation: (Rule: any) => Rule.max(60),
        },
        {
          name: "subtitleEn",
          title: "Subtitle — English",
          type: "string",
          description: "e.g. Brazilian Grill - Music & Churrascaria",
          validation: (Rule: any) => Rule.max(60),
        },
        {
          name: "ctaReserveHe",
          title: "כפתור הזמנה — עברית",
          type: "string",
          initialValue: "הזמן שולחן",
          validation: (Rule: any) => Rule.max(25),
        },
        {
          name: "ctaReserveEn",
          title: "Reserve Button — English",
          type: "string",
          initialValue: "Reserve a Table",
          validation: (Rule: any) => Rule.max(25),
        },
        {
          name: "ctaMenuHe",
          title: "כפתור תפריט — עברית",
          type: "string",
          initialValue: "לתפריט",
          validation: (Rule: any) => Rule.max(25),
        },
        {
          name: "ctaMenuEn",
          title: "Menu Button — English",
          type: "string",
          initialValue: "Explore Menu",
          validation: (Rule: any) => Rule.max(25),
        },
      ],
    },
    // ── Statistics ──
    {
      name: "stats",
      title: "סטטיסטיקות",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "valueHe",
              title: "ערך — עברית",
              type: "string",
              description: "לדוגמה: 2M+",
              validation: (Rule: any) => Rule.required().max(10),
            },
            {
              name: "valueEn",
              title: "Value — English",
              type: "string",
              validation: (Rule: any) => Rule.required().max(10),
            },
            {
              name: "labelHe",
              title: "תווית — עברית",
              type: "string",
              description: "לדוגמה: לקוחות שמחו איתנו",
              validation: (Rule: any) => Rule.required().max(30),
            },
            {
              name: "labelEn",
              title: "Label — English",
              type: "string",
              validation: (Rule: any) => Rule.required().max(30),
            },
          ],
          preview: {
            select: { title: "valueHe", subtitle: "labelHe" },
          },
        },
      ],
      validation: (Rule: any) => Rule.max(4),
    },
    // ── Reviews ──
    {
      name: "reviews",
      title: "ביקורות לקוחות",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "nameHe",
              title: "שם לקוח — עברית",
              type: "string",
              validation: (Rule: any) => Rule.required().max(25),
            },
            {
              name: "nameEn",
              title: "Customer Name — English",
              type: "string",
              validation: (Rule: any) => Rule.max(25),
            },
            {
              name: "dateHe",
              title: "תאריך — עברית",
              type: "string",
              description: "לדוגמה: ינואר 2025",
              validation: (Rule: any) => Rule.max(20),
            },
            {
              name: "dateEn",
              title: "Date — English",
              type: "string",
              description: "e.g. January 2025",
              validation: (Rule: any) => Rule.max(20),
            },
            {
              name: "textHe",
              title: "טקסט הביקורת — עברית",
              type: "text",
              rows: 3,
              validation: (Rule: any) => Rule.required().max(200),
            },
            {
              name: "textEn",
              title: "Review Text — English",
              type: "text",
              rows: 3,
              validation: (Rule: any) => Rule.max(200),
            },
          ],
          preview: {
            select: { title: "nameHe", subtitle: "textHe" },
          },
        },
      ],
    },
  ],
  preview: {
    prepare: () => ({ title: "עמוד ראשי" }),
  },
};

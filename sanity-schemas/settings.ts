/**
 * SETTINGS — הגדרות כלליות של האתר
 * Singleton document (only one instance)
 */
export default {
  name: "settings",
  title: "⚙️ הגדרות כלליות",
  type: "document",
  __experimental_actions: ["update", "publish"],
  fields: [
    // ── שם המסעדה ──
    {
      name: "restaurantNameHe",
      title: "שם המסעדה — עברית",
      type: "string",
      validation: (Rule: any) => Rule.required().max(40),
    },
    {
      name: "restaurantNameEn",
      title: "Restaurant Name — English",
      type: "string",
      validation: (Rule: any) => Rule.required().max(40),
    },
    // ── לוגו ──
    {
      name: "logo",
      title: "לוגו",
      type: "image",
      options: { hotspot: false },
      description: "PNG עם רקע שקוף, מינימום 400×400 פיקסל",
    },
    // ── פרטי קשר ──
    {
      name: "phone",
      title: "טלפון",
      type: "string",
      validation: (Rule: any) => Rule.required().max(20),
    },
    {
      name: "email",
      title: "אימייל",
      type: "string",
      validation: (Rule: any) => Rule.email(),
    },
    {
      name: "addressHe",
      title: "כתובת — עברית",
      type: "string",
      validation: (Rule: any) => Rule.max(80),
    },
    {
      name: "addressEn",
      title: "Address — English",
      type: "string",
      validation: (Rule: any) => Rule.max(80),
    },
    // ── שעות פתיחה ──
    {
      name: "openingHoursHe",
      title: "שעות פתיחה — עברית",
      type: "text",
      rows: 4,
      description: "לדוגמה: ראשון–חמישי 12:00–23:00",
      validation: (Rule: any) => Rule.max(300),
    },
    {
      name: "openingHoursEn",
      title: "Opening Hours — English",
      type: "text",
      rows: 4,
      description: "e.g. Sunday–Thursday 12:00–23:00",
      validation: (Rule: any) => Rule.max(300),
    },
    // ── רשתות חברתיות ──
    {
      name: "instagramUrl",
      title: "Instagram URL",
      type: "url",
    },
    {
      name: "facebookUrl",
      title: "Facebook URL",
      type: "url",
    },
    {
      name: "tiktokUrl",
      title: "TikTok URL",
      type: "url",
    },
    // ── כפתור הזמנה ──
    {
      name: "reservationUrl",
      title: "קישור להזמנת מקום",
      type: "url",
      description: "קישור ל-Tablecheck, Eat, או כל מערכת הזמנות אחרת",
    },
  ],
  preview: {
    select: { title: "restaurantNameHe" },
    prepare: ({ title }: any) => ({ title: title ?? "הגדרות" }),
  },
};

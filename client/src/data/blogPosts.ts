/**
 * CASA DO BRASIL — Blog Posts Data
 * Add new posts here. Each post supports Hebrew + English.
 * body blocks: { type: "h2" | "h3" | "p" | "divider", text?: string }
 */

export interface BodyBlock {
  type: "h2" | "h3" | "p" | "divider";
  text?: string;
}

export interface BlogPost {
  slug: string;
  titleHe: string;
  titleEn: string;
  excerptHe: string;
  excerptEn: string;
  categoryHe: string;
  categoryEn: string;
  date: string;       // display date e.g. "22 באפריל 2026"
  isoDate: string;    // ISO 8601 e.g. "2026-04-22"
  readMinutes: number;
  coverImage?: string;
  bodyHe: BodyBlock[];
  bodyEn: BodyBlock[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "picanha-the-crown-cut",
    titleHe: "פיקאניה — הנתח המלכותי של ברזיל",
    titleEn: "Picanha — The Crown Cut of Brasil",
    excerptHe: "מה הופך את הפיקאניה לנתח האיקוני ביותר בצ'ורוסקריה הברזילאית? הכל על הנתח שכבש את העולם.",
    excerptEn: "What makes Picanha the most iconic cut in Brazilian churrascaria? Everything about the cut that conquered the world.",
    categoryHe: "אוכל",
    categoryEn: "Food",
    date: "22 באפריל 2026",
    isoDate: "2026-04-22",
    readMinutes: 4,
    coverImage: "https://d2xsxph8kpxj0f.cloudfront.net/310519663392712778/NSX3yZdWqRV4jGmQcXqBFP/gallery-picanha_opt_665637ed.webp",
    bodyHe: [
      { type: "p", text: "פיקאניה (Picanha) היא ללא ספק הנתח הסמלי ביותר של הצ'ורוסקריה הברזילאית. מדובר בנתח הנלקח מהחלק העליון של הישבן, עם שכבת שומן עבה שמעניקה לו את הטעם העשיר והמיוחד שלו." },
      { type: "h2", text: "מדוע הפיקאניה כה מיוחדת?" },
      { type: "p", text: "הסוד טמון בשכבת השומן. בניגוד לנתחים אחרים, הפיקאניה נצלית עם שכבת השומן שלה שלמה — מה שמאפשר לשומן להמס לאט לאט על הגריל ולהשקות את הבשר מבפנים. התוצאה: נתח עסיסי, רך ועשיר בטעם." },
      { type: "h3", text: "כיצד מגישים פיקאניה בקאסה דו ברזיל?" },
      { type: "p", text: "אצלנו, הפיקאניה נצלית על שיפוד ישירות על גחלים לוהטות. הפאסדורים שלנו מביאים את הנתח לשולחנכם ופורסים אותו ישירות — כל פרוסה טרייה, חמה ומושלמת." },
      { type: "divider" },
      { type: "p", text: "הפיקאניה היא לא רק נתח בשר — היא חוויה. כשאתם מגיעים לקאסה דו ברזיל, אתם לא רק אוכלים פיקאניה, אתם חווים את ברזיל." },
    ],
    bodyEn: [
      { type: "p", text: "Picanha is undoubtedly the most iconic cut of Brazilian churrascaria. It comes from the top of the rump cap, with a thick fat cap that gives it its rich, distinctive flavour." },
      { type: "h2", text: "Why is Picanha so special?" },
      { type: "p", text: "The secret lies in the fat cap. Unlike other cuts, Picanha is grilled with its fat cap intact — allowing the fat to slowly melt over the fire and baste the meat from within. The result: a juicy, tender, flavour-rich cut unlike any other." },
      { type: "h3", text: "How do we serve Picanha at Casa do Brasil?" },
      { type: "p", text: "Our Picanha is skewered and grilled directly over hot coals. Our passadors bring the skewer to your table and carve it fresh — every slice hot, juicy and perfect." },
      { type: "divider" },
      { type: "p", text: "Picanha is not just a cut of meat — it is an experience. When you visit Casa do Brasil, you are not just eating Picanha, you are experiencing Brasil." },
    ],
  },
  {
    slug: "churrascaria-experience",
    titleHe: "מה זה בעצם פושידו קוהידו?",
    titleEn: "What is Churrascaria? The Full Experience Explained",
    excerptHe: "הפאסדורים, השיפודים, הדגלון הירוק-אדום — מדריך מלא לחוויית הצ'ורוסקריה הברזילאית האותנטית.",
    excerptEn: "The passadors, the skewers, the green-red disc — a complete guide to the authentic Brazilian churrascaria experience.",
    categoryHe: "חוויה",
    categoryEn: "Experience",
    date: "15 באפריל 2026",
    isoDate: "2026-04-15",
    readMinutes: 5,
    coverImage: "https://d2xsxph8kpxj0f.cloudfront.net/310519663392712778/NSX3yZdWqRV4jGmQcXqBFP/gallery-skewers_17adafb4.webp",
    bodyHe: [
      { type: "p", text: "פושידו קוהידו (Fogo de Chão) — שמשמעותו המילולית 'אש מהאדמה' — היא שיטת הגריל המסורתית של דרום ברזיל. זוהי לא רק שיטת בישול; זוהי תרבות שלמה סביב האש, הבשר והחברה." },
      { type: "h2", text: "הפאסדורים — לב החוויה" },
      { type: "p", text: "הפאסדורים (Passadors) הם הגאוצ'וס — רועי הבקר הברזילאיים — של המסעדה. הם מסתובבים בין השולחנות עם שיפודים ארוכים עמוסי בשר, ופורסים ישירות לצלחתכם." },
      { type: "h3", text: "הדגלון — שלטו בקצב שלכם" },
      { type: "p", text: "כל שולחן מקבל דגלון דו-צדדי: ירוק מצד אחד, אדום מהשני. ירוק = 'אנחנו מוכנים לעוד'. אדום = 'אנחנו צריכים הפסקה'. פשוט, אלגנטי, ומאפשר לכם לאכול בקצב שלכם." },
      { type: "divider" },
      { type: "p", text: "בקאסה דו ברזיל, אנחנו מביאים את החוויה האותנטית הזו לאילת. בואו לחוות את ברזיל — ללא כרטיס טיסה." },
    ],
    bodyEn: [
      { type: "p", text: "Fogo de Chão — literally 'fire from the ground' — is the traditional grilling method of southern Brazil. It is not just a cooking technique; it is an entire culture built around fire, meat and community." },
      { type: "h2", text: "The Passadors — Heart of the Experience" },
      { type: "p", text: "Passadors are the gauchos — Brazilian cowboys — of the restaurant. They circulate between tables carrying long skewers loaded with freshly grilled meats, carving directly onto your plate." },
      { type: "h3", text: "The Disc — Control Your Own Pace" },
      { type: "p", text: "Every table receives a two-sided disc: green on one side, red on the other. Green = 'we are ready for more'. Red = 'we need a break'. Simple, elegant, and puts you in complete control." },
      { type: "divider" },
      { type: "p", text: "At Casa do Brasil, we bring this authentic experience to Eilat. Come experience Brasil — no plane ticket required." },
    ],
  },
  {
    slug: "caipirinha-recipe",
    titleHe: "קייפיריניה — המתכון הרשמי של ברזיל",
    titleEn: "Caipirinha — Brasil's Official Cocktail Recipe",
    excerptHe: "שלושה מרכיבים, שתי דקות, ואתם בריו. המתכון הקלאסי לקוקטייל הלאומי של ברזיל.",
    excerptEn: "Three ingredients, two minutes, and you are in Rio. The classic recipe for Brasil's national cocktail.",
    categoryHe: "משקאות",
    categoryEn: "Drinks",
    date: "8 באפריל 2026",
    isoDate: "2026-04-08",
    readMinutes: 3,
    coverImage: "https://d2xsxph8kpxj0f.cloudfront.net/310519663392712778/NSX3yZdWqRV4jGmQcXqBFP/gallery-caipirinha_c48da7f4.webp",
    bodyHe: [
      { type: "p", text: "הקייפיריניה (Caipirinha) היא הקוקטייל הלאומי של ברזיל, ואחד הקוקטיילים הפופולריים בעולם. שלושה מרכיבים בלבד — קאשאסה, ליים וסוכר — יוצרים יחד משהו קסום." },
      { type: "h2", text: "המרכיבים" },
      { type: "p", text: "קאשאסה (Cachaça) — 50 מ\"ל. זהו הבסיס של הקוקטייל, ליקר הסוכר הברזילאי. ליים טרי — חצי ליים, חתוך לקוביות. סוכר לבן — 2 כפיות. קרח כתוש — מלא כוס." },
      { type: "h3", text: "אופן ההכנה" },
      { type: "p", text: "שמו את קוביות הליים והסוכר בכוס. מעכו היטב עם מועך (muddler) עד שהסוכר נמס ומשחרר את המיצים. הוסיפו קרח כתוש עד לשפת הכוס. שפכו את הקאשאסה. ערבבו בעדינות. שתו מיד." },
      { type: "divider" },
      { type: "p", text: "בקאסה דו ברזיל, הקייפיריניה שלנו מוכנה בדיוק כך — עם קאשאסה מובחרת ולימים טריים. בואו לטעום." },
    ],
    bodyEn: [
      { type: "p", text: "The Caipirinha is Brasil's national cocktail, and one of the most popular cocktails in the world. Just three ingredients — cachaça, lime and sugar — come together to create something magical." },
      { type: "h2", text: "The Ingredients" },
      { type: "p", text: "Cachaça — 50 ml. This is the base of the cocktail, Brasil's sugarcane spirit. Fresh lime — half a lime, cut into wedges. White sugar — 2 teaspoons. Crushed ice — fill the glass." },
      { type: "h3", text: "How to Make It" },
      { type: "p", text: "Place the lime wedges and sugar in a glass. Muddle firmly until the sugar dissolves and the lime releases its juice. Add crushed ice to the rim. Pour the cachaça. Stir gently. Drink immediately." },
      { type: "divider" },
      { type: "p", text: "At Casa do Brasil, our Caipirinha is made exactly this way — with premium cachaça and fresh limes. Come taste it." },
    ],
  },
];

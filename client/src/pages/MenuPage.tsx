/**
 * CASA DO BRASIL — Menu Page
 * Design: Cinematic Asymmetric Luxury (matches homepage)
 * Colors: White · Gold (185,161,103) · Deep Red (98,7,14) · Bordeaux (62,4,9)
 * Font: Heebo Black/Bold/Regular/Light only
 * Layout: Hero banner → Sticky tab bar → Category content panels
 * Tabs: Churrascaria | Specials | Under 12 | Fresh Meat By Weight | Desserts | Lunch Deal
 * Bilingual: EN/HE with RTL support
 */

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import { useLanguage } from "@/contexts/LanguageContext";

const GOLD = "#B9A167";
const GOLD_R = "rgba(185,161,103,";
const BORDEAUX = "rgb(62,4,9)";
const BORDEAUX_DEEP = "rgb(22,1,3)";

/* ─── HERO IMAGE ─── */
const HERO_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663392712778/NSX3yZdWqRV4jGmQcXqBFP/menu-churrascaria-ijXuaBJJLFb4tBUQeN7cvj.webp";

/* ─── MENU DATA ─── */
interface MenuItem {
  name: string;
  nameHe: string;
  description: string;
  descriptionHe: string;
  price?: string;
  tag?: string;
  tagHe?: string;
}

interface RodizioTrack {
  price: string;
  priceHe: string;
  count: string;
  countHe: string;
  items: string[];
  itemsHe: string[];
  note?: string;
  noteHe?: string;
}

interface MenuCategory {
  id: string;
  label: string;
  labelHe: string;
  subtitle: string;
  subtitleHe: string;
  description: string;
  descriptionHe: string;
  items: MenuItem[];
  type: "rodizio" | "ala-carte" | "kids" | "weight" | "dessert" | "deal";
  // Rodizio-specific
  appetizers?: { name: string; nameHe: string; price?: string }[];
  appetizersNote?: string;
  appetizersNoteHe?: string;
  tracks?: RodizioTrack[];
  footerNotes?: string[];
  footerNotesHe?: string[];
}

const MENU_DATA: MenuCategory[] = [
  {
    id: "churrascaria",
    label: "Churrascaria",
    labelHe: "צ'וראסקריה",
    subtitle: "All You Can Eat",
    subtitleHe: "כל כלול",
    description: "Served to the center of the table — as much as you want. Choose your track and enjoy an endless parade of the finest Brazilian cuts.",
    descriptionHe: "מוגש למרכז השולחן — כמה שרוצים. בחרו את המסלול שלכם והתפנקו במצעד אינסופי של הנתחים הברזילאיים הטובים ביותר.",
    type: "rodizio",
    items: [],
    appetizers: [
      { name: "Brazilian white rice", nameHe: "אורז לבן ברזילאי" },
      { name: "Chili Con Carne — meat, black beans and peppers cooked on traditional low heat", nameHe: "צ'ילי קון קרנה — בשר, שעועית שחורה ופלפלים בבישול מסורתי ואיטי" },
      { name: "Herb seasoned roasted potatoes", nameHe: "תפוחי אדמה צלויים בעשבי תיבול" },
      { name: "House salad with mustard vinaigrette", nameHe: "סלט בית עם וויניגרט חרדל" },
      { name: "Chimichurri sauce", nameHe: "רוטב צ'ימיצ'ורי" },
      { name: "Homemade bread with dipping sauces — 28 NIS", nameHe: "לחם ביתי עם רטבים — 28 שקל" },
    ],
    appetizersNote: "Served to the center of the table — as much as you want!",
    appetizersNoteHe: "מוגש למרכז השולחן — כמה שרוצים!",
    tracks: [
      {
        price: "259",
        priceHe: "259",
        count: "11 KINDS OF MEAT",
        countHe: "11 סוגי בשר",
        items: [
          "Veal asado",
          "Lamb shin",
          "Picanha",
          "Capa de file",
          "Maminha",
          "Pullet in soy, honey and white wine marinade",
          "Chuck steak",
          "Chicken wings in chili sauce",
          "Boliniho — Brazilian meat patties",
          "South American Chorizo sausages",
          "Chicken hearts",
        ],
        itemsHe: [
          "אסאדו עגל",
          "שוק כבש",
          "פיקאניה",
          "קאפה דה פילה",
          "מאמיניה",
          "פרגית במרינדת סויה, דבש ויין לבן",
          "צ'אק סטיק",
          "כנפי עוף ברוטב צ'ילי",
          "בוליניו — קציצות בשר ברזילאיות",
          "נקניקי צ'וריסו דרום אמריקאי",
          "לבבות עוף",
        ],
      },
      {
        price: "289",
        priceHe: "289",
        count: "12 KINDS OF MEAT",
        countHe: "12 סוגי בשר",
        items: [
          "Entrecote (rib eye)",
          "Veal asado",
          "Lamb shank",
          "Picanha",
          "Capa de file",
          "Maminha",
          "Pullet in soy, honey and white wine marinade",
          "Chuck steak",
          "Chicken wings in chili sauce",
          "Boliniho — Brazilian meat patties",
          "South American Chorizo sausages",
          "Chicken hearts",
        ],
        itemsHe: [
          "אנטריקוט (ריב אי)",
          "אסאדו עגל",
          "שוק כבש",
          "פיקאניה",
          "קאפה דה פילה",
          "מאמיניה",
          "פרגית במרינדת סויה, דבש ויין לבן",
          "צ'אק סטיק",
          "כנפי עוף ברוטב צ'ילי",
          "בוליניו — קציצות בשר ברזילאיות",
          "נקניקי צ'וריסו דרום אמריקאי",
          "לבבות עוף",
        ],
        note: "*Obliged by choosing the same route for all the table sitters",
        noteHe: "*בחירת מסלול זה מחייבת את כל היושבים בשולחן",
      },
    ],
    footerNotes: [
      "*A diner who does not order a main course will be charged for the appetizers — 68 NIS",
    ],
    footerNotesHe: [
      "*סועד שלא יזמין מנה עיקרית יחוייב בתשלום עבור המנות הפתיחה — 68 שקל",
    ],
  },
  {
    id: "specials",
    label: "Specials",
    labelHe: "מנות מיוחדות",
    subtitle: "Chef's Seasonal Selection",
    subtitleHe: "בחירת השף העונתית",
    description: "Rotating seasonal dishes crafted by our head chef — inspired by the flavors of Brazil and the freshest local ingredients.",
    descriptionHe: "מנות עונתיות מתחלפות שיצר השף הראשי שלנו — בהשראת טעמי ברזיל ומרכיבים מקומיים טריים.",
    type: "ala-carte",
    items: [
      { name: "Moqueca de Camarão", nameHe: "מוקקה דה קמרוֹן", description: "Brazilian coconut shrimp stew with palm oil, tomatoes and cilantro", descriptionHe: "תבשיל שרימפס קוקוס ברזילאי עם שמן דקל, עגבניות וכוסברה", price: "₪89", tag: "Seasonal", tagHe: "עונתי" },
      { name: "Peixe na Brasa", nameHe: "פישה נה ברזה", description: "Whole grilled sea bass with chimichurri and farofa", descriptionHe: "דג ים שלם על הגריל עם צ'ימיצ'ורי ופארופה", price: "₪115" },
      { name: "Risoto de Palmito", nameHe: "ריזוטו דה פלמיטו", description: "Creamy heart of palm risotto with parmesan and truffle oil", descriptionHe: "ריזוטו קרמי של לב דקל עם פרמזן ושמן כמהין", price: "₪78", tag: "Vegetarian", tagHe: "צמחוני" },
      { name: "Carne Seca com Abóbora", nameHe: "קארנה סקה קום אבובורה", description: "Dried beef with butternut squash purée and crispy cassava", descriptionHe: "בקר מיובש עם פירה דלעת חמאה וקסאווה פריכה", price: "₪95", tag: "Chef's Pick", tagHe: "בחירת השף" },
      { name: "Salada de Palmito", nameHe: "סלאדה דה פלמיטו", description: "Heart of palm salad with mango, avocado and passion fruit vinaigrette", descriptionHe: "סלט לב דקל עם מנגו, אבוקדו וויניגרט פסיפלורה", price: "₪52", tag: "Vegetarian", tagHe: "צמחוני" },
    ],
  },
  {
    id: "under12",
    label: "Under 12",
    labelHe: "עד גיל 12",
    subtitle: "Little Gauchos",
    subtitleHe: "גאושוס קטנים",
    description: "A special menu crafted for our youngest guests — familiar favorites with a Brazilian twist, all served with a smile.",
    descriptionHe: "תפריט מיוחד לאורחים הצעירים שלנו — מועדפים מוכרים עם טוויסט ברזילאי, כולם מוגשים עם חיוך.",
    type: "kids",
    items: [
      { name: "Mini Picanha Skewer", nameHe: "שיפוד פיקאניה מיני", description: "Small picanha skewer with mild seasoning and fries", descriptionHe: "שיפוד פיקאניה קטן עם תיבול עדין וצ'יפס", price: "₪45" },
      { name: "Chicken Skewer", nameHe: "שיפוד עוף", description: "Tender chicken breast skewer with honey glaze", descriptionHe: "שיפוד חזה עוף רך עם ציפוי דבש", price: "₪38" },
      { name: "Mini Burger Brasileiro", nameHe: "מיני בורגר ברזילאירו", description: "Beef burger with cheddar, tomato and our special sauce", descriptionHe: "בורגר בקר עם צ'דר, עגבנייה ורוטב מיוחד שלנו", price: "₪42" },
      { name: "Pasta com Queijo", nameHe: "פסטה קום קיז'ו", description: "Penne pasta with creamy cheese sauce", descriptionHe: "פסטה פנה עם רוטב גבינה קרמי", price: "₪35", tag: "Vegetarian", tagHe: "צמחוני" },
      { name: "Kids Rodízio", nameHe: "רודיזיו לילדים", description: "Mini portions of our most popular cuts — all you can eat for kids", descriptionHe: "מנות מיני מהנתחים הפופולריים ביותר שלנו — כל כלול לילדים", price: "₪55", tag: "All You Can Eat", tagHe: "כל כלול" },
    ],
  },
  {
    id: "fresh-meat",
    label: "Fresh Meat By Weight",
    labelHe: "בשר טרי לפי משקל",
    subtitle: "Prime Cuts, Your Way",
    subtitleHe: "נתחים פרמיום, בדרך שלך",
    description: "Select your cut, choose your weight. Our butcher prepares each piece to order — grilled to your exact preference.",
    descriptionHe: "בחר את הנתח שלך, בחר את המשקל. הקצב שלנו מכין כל חתיכה לפי הזמנה — על הגריל בדיוק לפי העדפתך.",
    type: "weight",
    items: [
      { name: "Picanha Premium", nameHe: "פיקאניה פרמיום", description: "Top sirloin cap — the finest cut in the house. Minimum 300g", descriptionHe: "כובע סינטה עליון — הנתח הטוב ביותר בבית. מינימום 300 גרם", price: "₪89 / 100g", tag: "Best Cut", tagHe: "הנתח הטוב ביותר" },
      { name: "Entrecôte", nameHe: "אנטריקוט", description: "Ribeye steak, well-marbled and full of flavor. Minimum 250g", descriptionHe: "סטייק ריב-איי, שיוש מצוין ועשיר בטעם. מינימום 250 גרם", price: "₪95 / 100g" },
      { name: "Filet Mignon", nameHe: "פילה מיניון", description: "The most tender cut, lean and buttery. Minimum 200g", descriptionHe: "הנתח הרך ביותר, רזה וחמאתי. מינימום 200 גרם", price: "₪110 / 100g", tag: "Premium", tagHe: "פרמיום" },
      { name: "T-Bone", nameHe: "טי-בון", description: "Classic T-bone — strip and tenderloin in one. Minimum 400g", descriptionHe: "טי-בון קלאסי — סטריפ ופילה באחד. מינימום 400 גרם", price: "₪85 / 100g" },
      { name: "Lamb Chops", nameHe: "צלעות כבש", description: "New Zealand lamb chops, rosemary and garlic. Minimum 300g", descriptionHe: "צלעות כבש מניו זילנד, רוזמרין ושום. מינימום 300 גרם", price: "₪92 / 100g" },
      { name: "Veal Cutlet", nameHe: "שניצל עגל", description: "Thin veal cutlet, pan-seared with lemon butter. Minimum 200g", descriptionHe: "שניצל עגל דק, מטוגן במחבת עם חמאת לימון. מינימום 200 גרם", price: "₪78 / 100g" },
    ],
  },
  {
    id: "desserts",
    label: "Desserts",
    labelHe: "קינוחים",
    subtitle: "Sweet Endings",
    subtitleHe: "סיום מתוק",
    description: "Classic Brazilian sweets and our pastry chef's creations — the perfect finale to your Casa do Brasil experience.",
    descriptionHe: "ממתקים ברזילאים קלאסיים ויצירות קונדיטור שלנו — הסיום המושלם לחוויית קאסה דו ברזיל שלך.",
    type: "dessert",
    items: [
      { name: "Brigadeiro", nameHe: "בריגדיירו", description: "Brazil's beloved chocolate truffle — dark chocolate, condensed milk and sprinkles", descriptionHe: "טראפל השוקולד האהוב של ברזיל — שוקולד מריר, חלב מרוכז וסוכריות", price: "₪28", tag: "Classic", tagHe: "קלאסי" },
      { name: "Pudim de Leite", nameHe: "פודים דה לייטה", description: "Silky Brazilian crème caramel with a deep caramel sauce", descriptionHe: "קרם קרמל ברזילאי משיי עם רוטב קרמל עמוק", price: "₪38" },
      { name: "Açaí Bowl", nameHe: "קערת אסאי", description: "Frozen açaí with granola, banana, strawberry and honey", descriptionHe: "אסאי קפוא עם גרנולה, בננה, תות ודבש", price: "₪45", tag: "Fresh", tagHe: "טרי" },
      { name: "Torta de Limão", nameHe: "טורטה דה לימאו", description: "Creamy lime tart with meringue and graham cracker crust", descriptionHe: "טארט ליים קרמי עם מרנג וקראסט ביסקוויט", price: "₪42" },
      { name: "Quindim", nameHe: "קינדים", description: "Traditional coconut and egg yolk custard — bright yellow and irresistible", descriptionHe: "קסטרד קוקוס וחלמון ביצה מסורתי — צהוב בוהק ובלתי נגמר", price: "₪32", tag: "Traditional", tagHe: "מסורתי" },
      { name: "Mousse de Maracujá", nameHe: "מוס דה מרקוז'ה", description: "Light passion fruit mousse with fresh fruit and mint", descriptionHe: "מוס פסיפלורה קל עם פירות טריים ומנטה", price: "₪36" },
    ],
  },
  {
    id: "lunch",
    label: "Lunch Deal",
    labelHe: "מבצע צהריים",
    subtitle: "Weekdays 12:00–16:00",
    subtitleHe: "ימי חול 12:00–16:00",
    description: "A curated lunch experience at a special price — choose your main, side, and drink. Available Monday to Friday.",
    descriptionHe: "חוויית צהריים מאוצרת במחיר מיוחד — בחר עיקרית, תוספת ושתייה. זמין ראשון עד שישי.",
    type: "deal",
    items: [
      { name: "Rodízio Express", nameHe: "רודיזיו אקספרס", description: "45-minute rodízio with 6 cuts, salad bar and soft drink", descriptionHe: "רודיזיו של 45 דקות עם 6 נתחים, סלט בר ושתייה קלה", price: "₪99", tag: "Best Value", tagHe: "הכי משתלם" },
      { name: "Picanha Plate", nameHe: "צלחת פיקאניה", description: "200g picanha with rice, farofa and vinaigrette", descriptionHe: "200 גרם פיקאניה עם אורז, פארופה וויניגרט", price: "₪79" },
      { name: "Frango Grelhado", nameHe: "פראנגו גרלאדו", description: "Grilled chicken breast with chimichurri, rice and salad", descriptionHe: "חזה עוף על הגריל עם צ'ימיצ'ורי, אורז וסלט", price: "₪65" },
      { name: "Misto Lunch", nameHe: "מיסטו צהריים", description: "Mixed grill plate: picanha, frango, linguiça with sides", descriptionHe: "צלחת גריל מעורב: פיקאניה, פראנגו, לינגויסה עם תוספות", price: "₪89", tag: "Popular", tagHe: "פופולרי" },
      { name: "Vegetarian Lunch", nameHe: "צהריים צמחוני", description: "Grilled vegetables, heart of palm, rice and black beans", descriptionHe: "ירקות על הגריל, לב דקל, אורז ושעועית שחורה", price: "₪58", tag: "Vegetarian", tagHe: "צמחוני" },
    ],
  },
];

/* ─── TAG BADGE ─── */
function TagBadge({ text }: { text: string }) {
  return (
    <span style={{
      display: "inline-block",
      fontFamily: "'Heebo', sans-serif",
      fontWeight: 700,
      fontSize: "0.42rem",
      letterSpacing: "0.22em",
      textTransform: "uppercase",
      color: GOLD,
      border: `1px solid ${GOLD_R}0.5)`,
      padding: "2px 7px",
      borderRadius: "2px",
      whiteSpace: "nowrap",
    }}>
      {text}
    </span>
  );
}

/* ─── MENU ITEM ROW ─── */
function MenuItemRow({ item, isHe, type, index }: { item: MenuItem; isHe: boolean; type: MenuCategory["type"]; index: number }) {
  const name = isHe ? item.nameHe : item.name;
  const desc = isHe ? item.descriptionHe : item.description;
  const tag = isHe ? item.tagHe : item.tag;

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{
        display: "flex",
        flexDirection: isHe ? "row-reverse" : "row",
        alignItems: "flex-start",
        justifyContent: "space-between",
        gap: "1.5rem",
        padding: "1.4rem 0",
        borderBottom: "1px solid rgba(185,161,103,0.12)",
        position: "relative",
      }}
    >
      {/* Left/Right: name + desc + tag */}
      <div style={{ flex: 1, textAlign: isHe ? "right" : "left" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", flexDirection: isHe ? "row-reverse" : "row", marginBottom: "0.35rem" }}>
          <span style={{
            fontFamily: "'Heebo', sans-serif",
            fontWeight: 800,
            fontSize: "clamp(14px, 1.2vw, 17px)",
            color: BORDEAUX,
            letterSpacing: isHe ? "0.01em" : "0.04em",
          }}>
            {name}
          </span>
          {tag && <TagBadge text={tag} />}
        </div>
        <p style={{
          fontFamily: "'Heebo', sans-serif",
          fontWeight: 300,
          fontSize: "clamp(12px, 0.85vw, 13.5px)",
          color: "rgb(100,50,50)",
          lineHeight: 1.65,
          margin: 0,
          maxWidth: "520px",
        }}>
          {desc}
        </p>
      </div>

      {/* Price */}
      {item.price && (
        <div style={{
          flexShrink: 0,
          fontFamily: "'Heebo', sans-serif",
          fontWeight: 700,
          fontSize: "clamp(13px, 1vw, 15px)",
          color: GOLD,
          letterSpacing: "0.04em",
          paddingTop: "2px",
          whiteSpace: "nowrap",
        }}>
          {item.price}
        </div>
      )}
    </motion.div>
  );
}

/* ─── CATEGORY PANEL ─── */
function CategoryPanel({ category, isHe }: { category: MenuCategory; isHe: boolean }) {
  const label = isHe ? category.labelHe : category.label;
  const subtitle = isHe ? category.subtitleHe : category.subtitle;
  const description = isHe ? category.descriptionHe : category.description;

  const isRodizio = category.type === "rodizio";
  const isDeal = category.type === "deal";

  return (
    <motion.div
      key={category.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
      dir={isHe ? "rtl" : "ltr"}
      style={{ width: "100%" }}
    >
      {/* Category header */}
      <div style={{
        padding: "3rem 0 2.5rem",
        borderBottom: `1px solid ${GOLD_R}0.2)`,
        marginBottom: "0.5rem",
        textAlign: isHe ? "right" : "left",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.7rem", marginBottom: "1rem", flexDirection: isHe ? "row-reverse" : "row" }}>
          <div style={{ width: "22px", height: "1px", background: GOLD }} />
          <span style={{
            fontFamily: "'Heebo', sans-serif",
            fontWeight: 700,
            fontSize: "0.52rem",
            letterSpacing: isHe ? "0.06em" : "0.38em",
            textTransform: "uppercase",
            color: GOLD,
          }}>
            {subtitle}
          </span>
        </div>

        <h2 style={{
          fontFamily: "'Heebo', sans-serif",
          fontWeight: 900,
          fontSize: "clamp(32px, 4.5vw, 62px)",
          color: BORDEAUX,
          lineHeight: 0.9,
          letterSpacing: isHe ? "0.01em" : "0.02em",
          margin: "0 0 1.2rem",
        }}>
          {label}
        </h2>

        <p style={{
          fontFamily: "'Heebo', sans-serif",
          fontWeight: 300,
          fontSize: "clamp(14px, 1.1vw, 16px)",
          color: "rgb(90,35,35)",
          lineHeight: 1.75,
          maxWidth: "540px",
          margin: 0,
          marginRight: isHe ? 0 : undefined,
          marginLeft: isHe ? "auto" : undefined,
        }}>
          {description}
        </p>

        {/* Rodízio — Appetizers + Dual Track */}
        {isRodizio && category.appetizers && (
          <div style={{ marginTop: "2rem" }}>
            {/* Appetizers block */}
            <div style={{
              padding: "1.4rem 1.8rem",
              background: "rgba(185,161,103,0.05)",
              border: `1px solid ${GOLD_R}0.18)`,
              marginBottom: "2rem",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1rem", flexDirection: isHe ? "row-reverse" : "row" }}>
                <div style={{ width: "16px", height: "1px", background: GOLD }} />
                <span style={{ fontFamily: "'Heebo', sans-serif", fontWeight: 700, fontSize: "0.46rem", letterSpacing: isHe ? "0.06em" : "0.3em", textTransform: "uppercase", color: GOLD }}>
                  {isHe ? "מנות פתיחה" : "Appetizers"}
                </span>
              </div>
              <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "0.45rem" }}>
                {category.appetizers.map((a, i) => (
                  <li key={i} style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "0.6rem",
                    flexDirection: isHe ? "row-reverse" : "row",
                    textAlign: isHe ? "right" : "left",
                  }}>
                    <span style={{ color: GOLD, fontSize: "0.55rem", marginTop: "3px", flexShrink: 0 }}>▪</span>
                    <span style={{ fontFamily: "'Heebo', sans-serif", fontWeight: 300, fontSize: "clamp(12px, 0.9vw, 14px)", color: "rgb(80,30,30)", lineHeight: 1.55 }}>
                      {isHe ? a.nameHe : a.name}
                    </span>
                  </li>
                ))}
              </ul>
              {category.appetizersNote && (
                <p style={{ fontFamily: "'Heebo', sans-serif", fontWeight: 700, fontSize: "clamp(11px, 0.8vw, 13px)", color: GOLD, margin: "0.9rem 0 0", fontStyle: "italic", textAlign: isHe ? "right" : "left" }}>
                  {isHe ? category.appetizersNoteHe : category.appetizersNote}
                </p>
              )}
            </div>

            {/* Two tracks side by side */}
            {category.tracks && (
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "1.2rem",
                marginBottom: "1.5rem",
              }}>
                {category.tracks.map((track, ti) => (
                  <div key={ti} style={{
                    border: `1px solid ${ti === 1 ? GOLD : GOLD_R + "0.35)"}`,
                    background: ti === 1 ? BORDEAUX : "#fff",
                    padding: "1.6rem 1.8rem",
                    position: "relative",
                  }}>
                    {/* Track header */}
                    <div style={{ marginBottom: "1.2rem", textAlign: isHe ? "right" : "left" }}>
                      <div style={{ fontFamily: "'Heebo', sans-serif", fontWeight: 700, fontSize: "0.44rem", letterSpacing: "0.28em", color: ti === 1 ? GOLD : GOLD, textTransform: "uppercase", marginBottom: "0.4rem" }}>
                        {isHe ? track.countHe : track.count}
                      </div>
                      <div style={{ display: "flex", alignItems: "baseline", gap: "0.3rem", flexDirection: isHe ? "row-reverse" : "row", justifyContent: isHe ? "flex-end" : "flex-start" }}>
                        <span style={{ fontFamily: "'Heebo', sans-serif", fontWeight: 900, fontSize: "clamp(28px, 3vw, 40px)", color: ti === 1 ? "#fff" : BORDEAUX, lineHeight: 1 }}>
                          ₪{track.price}
                        </span>
                        <span style={{ fontFamily: "'Heebo', sans-serif", fontWeight: 300, fontSize: "0.65rem", color: ti === 1 ? "rgba(255,255,255,0.65)" : "rgba(62,4,9,0.55)" }}>
                          {isHe ? "לסועד" : "per diner"}
                        </span>
                      </div>
                    </div>

                    {/* Divider */}
                    <div style={{ height: "1px", background: ti === 1 ? `${GOLD_R}0.3)` : `${GOLD_R}0.18)`, marginBottom: "1.1rem" }} />

                    {/* Meat list */}
                    <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "0.38rem" }}>
                      {(isHe ? track.itemsHe : track.items).map((item, ii) => (
                        <li key={ii} style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: "0.55rem",
                          flexDirection: isHe ? "row-reverse" : "row",
                        }}>
                          <span style={{ color: GOLD, fontSize: "0.5rem", marginTop: "4px", flexShrink: 0 }}>▪</span>
                          <span style={{ fontFamily: "'Heebo', sans-serif", fontWeight: 300, fontSize: "clamp(12px, 0.88vw, 14px)", color: ti === 1 ? "rgba(255,255,255,0.88)" : "rgb(70,25,25)", lineHeight: 1.5, textAlign: isHe ? "right" : "left" }}>
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {/* Track note */}
                    {track.note && (
                      <p style={{ fontFamily: "'Heebo', sans-serif", fontWeight: 300, fontSize: "clamp(10px, 0.75vw, 12px)", color: ti === 1 ? "rgba(255,255,255,0.55)" : "rgba(62,4,9,0.5)", margin: "1rem 0 0", fontStyle: "italic", textAlign: isHe ? "right" : "left" }}>
                        {isHe ? track.noteHe : track.note}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Footer notes */}
            {category.footerNotes && (
              <div style={{ padding: "0.8rem 0", textAlign: isHe ? "right" : "left" }}>
                {(isHe ? category.footerNotesHe! : category.footerNotes).map((note, i) => (
                  <p key={i} style={{ fontFamily: "'Heebo', sans-serif", fontWeight: 300, fontSize: "clamp(11px, 0.78vw, 13px)", color: "rgba(62,4,9,0.55)", margin: "0.25rem 0", fontStyle: "italic" }}>
                    {note}
                  </p>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Lunch deal badge */}
        {isDeal && (
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.6rem",
            marginTop: "1.2rem",
            padding: "0.6rem 1.2rem",
            border: `1px solid ${GOLD_R}0.4)`,
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="1.8">
              <circle cx="12" cy="12" r="10"/><polyline points="12,6 12,12 16,14"/>
            </svg>
            <span style={{ fontFamily: "'Heebo', sans-serif", fontWeight: 700, fontSize: "0.52rem", letterSpacing: "0.15em", color: GOLD, textTransform: "uppercase" }}>
              {isHe ? "ימי חול 12:00–16:00" : "Weekdays 12:00–16:00"}
            </span>
          </div>
        )}
      </div>

      {/* Items */}
      <div>
        {category.items.map((item, i) => (
          <MenuItemRow key={item.name} item={item} isHe={isHe} type={category.type} index={i} />
        ))}
      </div>

      {/* Weight section note */}
      {category.type === "weight" && (
        <div style={{
          marginTop: "2rem",
          padding: "1.2rem 1.5rem",
          background: "rgba(185,161,103,0.06)",
          border: `1px solid ${GOLD_R}0.18)`,
          textAlign: isHe ? "right" : "left",
        }}>
          <p style={{ fontFamily: "'Heebo', sans-serif", fontWeight: 300, fontSize: "clamp(12px, 0.85vw, 13px)", color: "rgb(90,35,35)", margin: 0, lineHeight: 1.65 }}>
            {isHe
              ? "כל הנתחים מוכנים לפי הזמנה. המחיר הוא לפי 100 גרם. המשקל הסופי עשוי להשתנות מעט. מינימום הזמנה כמצוין."
              : "All cuts prepared to order. Price is per 100g. Final weight may vary slightly. Minimum order as indicated."}
          </p>
        </div>
      )}
    </motion.div>
  );
}

/* ─── TAB BAR ─── */
function TabBar({
  categories,
  activeId,
  onSelect,
  isHe,
  sticky,
}: {
  categories: MenuCategory[];
  activeId: string;
  onSelect: (id: string) => void;
  isHe: boolean;
  sticky: boolean;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showScrollHint, setShowScrollHint] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Scroll active tab into view
  useEffect(() => {
    const el = scrollRef.current?.querySelector(`[data-tab="${activeId}"]`) as HTMLElement;
    if (el) el.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [activeId]);

  // Hide scroll hint after first scroll interaction
  const handleScroll = () => {
    if (scrollRef.current && scrollRef.current.scrollLeft > 10) {
      setShowScrollHint(false);
    }
  };

  return (
    <div
      style={{
        position: sticky ? "sticky" : "relative",
        top: sticky ? "70px" : undefined,
        zIndex: 40,
        background: sticky ? "rgba(255,255,255,0.97)" : "#fff",
        backdropFilter: sticky ? "blur(12px)" : "none",
        WebkitBackdropFilter: sticky ? "blur(12px)" : "none",
        borderBottom: `1px solid ${GOLD_R}0.22)`,
        boxShadow: sticky ? `0 4px 24px rgba(62,4,9,0.07)` : "none",
        transition: "box-shadow 0.3s ease",
        overflow: "hidden",
      }}
    >
      {/* Mobile scroll hint — animated arrow on right edge */}
      {isMobile && showScrollHint && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0.7, 1] }}
          transition={{ duration: 1.2, delay: 0.6, repeat: 3, repeatType: "reverse" }}
          style={{
            position: "absolute",
            right: 0, top: 0, bottom: 0,
            width: "52px",
            zIndex: 5,
            pointerEvents: "none",
            background: "linear-gradient(to right, transparent, rgba(255,255,255,0.96))",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            paddingRight: "8px",
          }}
        >
          <motion.div
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut" }}
            style={{ display: "flex", alignItems: "center", gap: "2px" }}
          >
            <span style={{ fontFamily: "'Heebo', sans-serif", fontWeight: 700, fontSize: "0.42rem", letterSpacing: "0.1em", color: GOLD, textTransform: "uppercase" }}>
              {isHe ? "עוד" : "more"}
            </span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="2.2" strokeLinecap="round">
              <polyline points="9,18 15,12 9,6"/>
            </svg>
          </motion.div>
        </motion.div>
      )}

      <div
        ref={scrollRef}
        dir={isHe ? "rtl" : "ltr"}
        onScroll={handleScroll}
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: isMobile ? "0 1rem" : "0 6vw",
          display: "flex",
          gap: 0,
          overflowX: "auto",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          /* Center tabs on desktop when they fit */
          justifyContent: isMobile ? "flex-start" : "center",
        }}
      >
        {categories.map((cat) => {
          const isActive = cat.id === activeId;
          const label = isHe ? cat.labelHe : cat.label;
          return (
            <button
              key={cat.id}
              data-tab={cat.id}
              onClick={() => onSelect(cat.id)}
              style={{
                flexShrink: 0,
                background: "none",
                border: "none",
                borderBottom: isActive ? `2px solid ${GOLD}` : "2px solid transparent",
                padding: isMobile ? "1rem 0.9rem" : "1.1rem 1.6rem",
                cursor: "pointer",
                fontFamily: "'Heebo', sans-serif",
                fontWeight: isActive ? 800 : 500,
                fontSize: isHe
                  ? (isMobile ? "clamp(12px, 3.5vw, 15px)" : "clamp(11px, 1.05vw, 14px)")
                  : (isMobile ? "clamp(9px, 2.5vw, 11px)" : "clamp(9px, 0.72vw, 11px)"),
                letterSpacing: isHe ? "0.03em" : "0.18em",
                textTransform: "uppercase",
                color: isActive ? BORDEAUX : "rgba(62,4,9,0.45)",
                transition: "all 0.25s ease",
                whiteSpace: "nowrap",
                position: "relative",
              }}
              onMouseEnter={e => {
                if (!isActive) (e.currentTarget as HTMLButtonElement).style.color = BORDEAUX;
              }}
              onMouseLeave={e => {
                if (!isActive) (e.currentTarget as HTMLButtonElement).style.color = "rgba(62,4,9,0.45)";
              }}
            >
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ─── HERO SECTION ─── */
function MenuHero({ isHe }: { isHe: boolean }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = HERO_IMG;
    img.onload = () => setLoaded(true);
  }, []);

  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        height: "clamp(320px, 42vw, 560px)",
        overflow: "hidden",
        background: BORDEAUX_DEEP,
      }}
    >
      {/* Background image */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        initial={{ scale: 1.06 }}
        animate={loaded ? { scale: 1 } : { scale: 1.06 }}
        transition={{ duration: 1.8, ease: "easeOut" }}
      >
        <motion.div
          className="w-full h-full"
          animate={{ scale: [1, 1.05] }}
          transition={{ duration: 25, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
        >
          <div
            style={{
              width: "100%", height: "100%",
              backgroundImage: `url(${HERO_IMG})`,
              backgroundSize: "cover",
              backgroundPosition: "center 35%",
            }}
          />
        </motion.div>
      </motion.div>

      {/* Overlay */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(110deg, rgba(22,1,3,0.88) 0%, rgba(62,4,9,0.72) 45%, rgba(20,4,6,0.45) 100%)",
      }} />

      {/* Bottom fade */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        height: "120px",
        background: "linear-gradient(to top, #ffffff 0%, transparent 100%)",
        pointerEvents: "none",
      }} />

      {/* Gold inset frame */}
      <div style={{ position: "absolute", inset: "20px", pointerEvents: "none", zIndex: 2 }}>
        <motion.div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: "rgba(185,161,103,0.45)", transformOrigin: "left" }} initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1.2, delay: 0.4 }} />
        <motion.div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "1px", background: "rgba(185,161,103,0.45)", transformOrigin: "left" }} initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1.2, delay: 0.6 }} />
        <motion.div style={{ position: "absolute", top: 0, bottom: 0, left: 0, width: "1px", background: "rgba(185,161,103,0.45)", transformOrigin: "top" }} initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ duration: 1.2, delay: 0.4 }} />
        <motion.div style={{ position: "absolute", top: 0, bottom: 0, right: 0, width: "1px", background: "rgba(185,161,103,0.45)", transformOrigin: "top" }} initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ duration: 1.2, delay: 0.55 }} />
      </div>

      {/* Content */}
      <div
        dir={isHe ? "rtl" : "ltr"}
        style={{
          position: "absolute", inset: 0, zIndex: 10,
          display: "flex", flexDirection: "column", justifyContent: "flex-end",
          padding: "clamp(2rem, 5vw, 4rem) clamp(1.5rem, 6vw, 5.5rem)",
          paddingBottom: "clamp(3rem, 6vw, 5rem)",
        }}
      >
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          style={{ display: "flex", alignItems: "center", gap: "0.7rem", marginBottom: "0.9rem", flexDirection: isHe ? "row-reverse" : "row" }}
        >
          <div style={{ width: "22px", height: "1px", background: GOLD }} />
          <span style={{ fontFamily: "'Heebo', sans-serif", fontWeight: 700, fontSize: "0.52rem", letterSpacing: isHe ? "0.06em" : "0.38em", textTransform: "uppercase", color: GOLD }}>
            {isHe ? "קאסה דו ברזיל" : "Casa do Brasil"}
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.65 }}
          style={{
            fontFamily: "'Heebo', sans-serif",
            fontWeight: 900,
            fontSize: "clamp(44px, 7vw, 100px)",
            color: "#FFFFFF",
            lineHeight: 0.88,
            letterSpacing: isHe ? "-0.01em" : "-0.02em",
            margin: "0 0 0.8rem",
          }}
        >
          {isHe ? "התפריט" : "THE MENU"}
        </motion.h1>

        {/* Gold rule */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
          style={{
            width: "clamp(80px, 14vw, 200px)",
            height: "1px",
            background: GOLD,
            transformOrigin: isHe ? "right" : "left",
            marginBottom: "0.9rem",
          }}
        />

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 1.1 }}
          style={{
            fontFamily: "'Heebo', sans-serif",
            fontWeight: 300,
            fontSize: "clamp(12px, 1.2vw, 16px)",
            color: GOLD,
            letterSpacing: "0.1em",
            fontStyle: "italic",
            margin: 0,
          }}
        >
          {isHe ? "גריל ברזילאי — מוזיקה וצ'וראסקריה" : "Brazilian Grill — Music & Churrascaria"}
        </motion.p>
      </div>
    </section>
  );
}

/* ─── MAIN PAGE ─── */
export default function MenuPage() {
  const { lang } = useLanguage();
  const isHe = lang === "he";
  const [activeId, setActiveId] = useState("churrascaria");
  const [tabSticky, setTabSticky] = useState(false);
  const tabSentinelRef = useRef<HTMLDivElement>(null);

  const activeCategory = MENU_DATA.find((c) => c.id === activeId)!;

  // Detect when tab bar should become sticky
  useEffect(() => {
    const sentinel = tabSentinelRef.current;
    if (!sentinel) return;
    const observer = new IntersectionObserver(
      ([entry]) => setTabSticky(!entry.isIntersecting),
      { threshold: 0, rootMargin: "-70px 0px 0px 0px" }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: "#fff" }}>
      <Navbar />

      {/* Hero */}
      <MenuHero isHe={isHe} />

      {/* Tab sentinel — invisible element to detect sticky threshold */}
      <div ref={tabSentinelRef} style={{ height: 0 }} />

      {/* Sticky tab bar */}
      <TabBar
        categories={MENU_DATA}
        activeId={activeId}
        onSelect={setActiveId}
        isHe={isHe}
        sticky={tabSticky}
      />

      {/* Content */}
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 6vw 6rem",
        }}
      >
        <AnimatePresence mode="wait">
          <CategoryPanel key={activeId} category={activeCategory} isHe={isHe} />
        </AnimatePresence>
      </div>

      {/* Footer strip */}
      <div style={{
        borderTop: `1px solid ${GOLD_R}0.2)`,
        padding: "2.5rem 6vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "1rem",
        background: "#faf9f7",
      }}>
        <div style={{ width: "28px", height: "1px", background: GOLD }} />
        <span style={{ fontFamily: "'Heebo', sans-serif", fontWeight: 700, fontSize: "0.48rem", letterSpacing: "0.3em", textTransform: "uppercase", color: GOLD }}>
          {isHe ? "קאסה דו ברזיל — גריל ברזילאי" : "Casa do Brasil — Brazilian Grill"}
        </span>
        <div style={{ width: "28px", height: "1px", background: GOLD }} />
      </div>
    </div>
  );
}

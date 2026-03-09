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
    subtitle: "Selected & Aged In-House",
    subtitleHe: "בשר נבחר ומיושן בבית",
    description: "The cuts of meat are selected, aged in the house butchery. Includes the appetizers served to the center of the table — as much as you want!",
    descriptionHe: "נתחי בשר נבחרים ומיושנים בקצבייה הביתית. כולל את מנות הפתיחה המוגשות למרכז השולחן — כמה שרוצים!",
    type: "ala-carte",
    items: [
      {
        name: "Picanha",
        nameHe: "פיקאניה",
        description: "300 grams of prime Brazilian cut, grilled to your choice. + Goose liver medallion (100g) available +70 NIS",
        descriptionHe: "300 גרם מהנתח הברזילאי המובחר, על הגריל לפי בחירתך. + מדליון כבד אווז (100 גרם) בתוספת 70 שקל",
        price: "₪175",
        tag: "Signature",
        tagHe: "חתימה",
      },
      {
        name: "Sirloin",
        nameHe: "סירלוין",
        description: "300 grams of selected and aged beef, grilled to your choice (Medium 169 NIS). + Goose liver medallion (100g) available +70 NIS",
        descriptionHe: "300 גרם בקר נבחר ומיושן, על הגריל לפי בחירתך (מדיום 169 שקל). + מדליון כבד אווז (100 גרם) בתוספת 70 שקל",
        price: "₪169",
      },
      {
        name: "Rossini Filet",
        nameHe: "פילה רוסיני",
        description: "Beef fillet medallions and goose liver, seared on hot pan, served with cherry tomatoes jam",
        descriptionHe: "מדליוני פילה בקר וכבד אווז, צרובים במחבת חמה, מוגשים עם ריבה עגבניות שררי",
        price: "₪264",
        tag: "Chef's Pick",
        tagHe: "בחירת השף",
      },
      {
        name: "Tornado",
        nameHe: "טורנדו",
        description: "A festival of meat: entrecote, beef fillet medallion and seared goose liver. Served with a glass of wine",
        descriptionHe: "חג בשר: אנטריקוט, מדליון פילה בקר וכבד אווז צרוב. מוגש עם כוס יין",
        price: "₪295",
        tag: "Signature",
        tagHe: "חתימה",
      },
      {
        name: "Beef Filet Medallions",
        nameHe: "מדליוני פילה בקר",
        description: "300 grams, from a superior and aged cut, grilled to your choice",
        descriptionHe: "300 גרם, מנתח עילאי ומיושן, על הגריל לפי בחירתך",
        price: "₪184",
      },
      {
        name: "Aged Lamb Chops",
        nameHe: "צלעות כבש מיושנות",
        description: "450 grams, grilled to your choice",
        descriptionHe: "450 גרם, על הגריל לפי בחירתך",
        price: "₪189",
      },
      {
        name: "Seared Goose Liver",
        nameHe: "כבד אווז צרוב",
        description: "Served on a homemade brioche bun with cherry tomatoes jam",
        descriptionHe: "מוגש על לחמניית בריוש ביתי עם ריבה עגבניות שררי",
        price: "₪220",
        tag: "Premium",
        tagHe: "פרמיום",
      },
      {
        name: "Entrecote",
        nameHe: "אנטריקוט",
        description: "300/500 grams, from a superior and aged cut, grilled to your choice. + Goose liver medallion (100g) available +70 NIS",
        descriptionHe: "300/500 גרם, מנתח עילאי ומיושן, על הגריל לפי בחירתך. + מדליון כבד אווז (100 גרם) בתוספת 70 שקל",
        price: "₪179 / ₪239",
      },
      {
        name: "Breast of Moulard",
        nameHe: "חזה מולאר",
        description: "350 grams",
        descriptionHe: "350 גרם",
        price: "₪169",
      },
      {
        name: "Boliniho",
        nameHe: "בוליניו",
        description: "Brazilian meat patties",
        descriptionHe: "קציצות בשר ברזילאיות",
        price: "₪139",
      },
      {
        name: "Chorizos — South American Beef Sausages",
        nameHe: "צ'וריסו — נקניקי בקר דרום אמריקאי",
        description: "300 grams",
        descriptionHe: "300 גרם",
        price: "₪139",
      },
      {
        name: "Pullet",
        nameHe: "פרגית",
        description: "300 grams in marinade",
        descriptionHe: "300 גרם במרינדה",
        price: "₪129",
      },
      {
        name: '"Casa Do Brasil" Hamburger',
        nameHe: 'בורגר "קאסה דו ברזיל"',
        description: "300 grams of selected beef, with French fries and fresh vegetables. Extras: stir fried mushrooms / seared onions / fried egg +10 NIS | Asado in smoked BBQ sauce +17 NIS | Goose liver medallion 100g +70 NIS",
        descriptionHe: "300 גרם בקר נבחר, עם צ'יפס וירקות טריות. תוספות: פטריות מוקפצות / בצל צרוב / ביצה מטוגנת +10 שקל | אסאדו ברוטב BBQ מעושן +17 שקל | מדליון כבד אווז 100 גרם +70 שקל",
        price: "₪108",
      },
      {
        name: '"Casa Do Brasil" Nature Burger',
        nameHe: 'בורגר נייחר "קאסה דו ברזיל"',
        description: "With French fries and fresh vegetables. Extras: stir fried mushrooms / seared onions / fried egg +10 NIS",
        descriptionHe: "עם צ'יפס וירקות טריות. תוספות: פטריות מוקפצות / בצל צרוב / ביצה מטוגנת +10 שקל",
        price: "₪89",
      },
      {
        name: "Gilt-Head Bream",
        nameHe: "דניס (דג ים)",
        description: "Grilled",
        descriptionHe: "על הגריל",
        price: "₪139",
      },
      {
        name: "Salmon Filet",
        nameHe: "פילה סלמון",
        description: "Oven baked with stir-fried vegetables and cream",
        descriptionHe: "בתנור עם ירקות מוקפצים ושמנת",
        price: "₪139",
      },
      {
        name: "Sweet Potato Ravioli",
        nameHe: "ראוויולי בטטה מתוקה",
        description: "With sauce of your choice: Napolitana / Cream / Rose / Mushrooms & Cream",
        descriptionHe: "עם רוטב לבחירתך: נאפוליטאנה / שמנת / רוזה / פטריות ושמנת",
        price: "₪89",
        tag: "Vegetarian",
        tagHe: "צמחוני",
      },
      {
        name: "Hand Made Fettuccine Pasta",
        nameHe: "פסטה פטוצ'יני ביתי",
        description: "With sauce of your choice: Napolitana / Cream / Rose / Mushrooms & Cream",
        descriptionHe: "עם רוטב לבחירתך: נאפוליטאנה / שמנת / רוזה / פטריות ושמנת",
        price: "₪79",
        tag: "Vegetarian",
        tagHe: "צמחוני",
      },
      {
        name: "Upgraded Greek Salad",
        nameHe: "סלט יווני משודרג",
        description: "Crisp romaine lettuce, tomatoes, cherry tomatoes, red onion, kalamata olives and Bulgarian cheese",
        descriptionHe: "חסה רומאין פריך, עגבניות, עגבניות שררי, בצל אדום, זיתי קלמאטה וגבינה בולגרית",
        price: "₪79",
        tag: "Vegetarian",
        tagHe: "צמחוני",
      },
    ],
  },
  {
    id: "under12",
    label: "Under 12",
    labelHe: "עד גיל 12",
    subtitle: "Kids Team",
    subtitleHe: "קידס טים",
    description: "A special menu for children up to age 12. All dishes marked with * are served with French fries.",
    descriptionHe: "תפריט מיוחד לילדים עד גיל 12. כל המנות המסומנות ב-* מוגשות עם צ'יפס.",
    type: "kids",
    items: [
      {
        name: "Churrascaria for Children",
        nameHe: "צ'וראסקריה לילדים",
        description: "11 kinds of meat — Veal asado, Lamb shank, Picanha, Capa de file, Maminha, Pullet in soy/honey/white wine, Chuck steak, Chicken wings in chili sauce, Boliniho, Chorizo sausages, Chicken hearts — AS MUCH AS YOU WANT!",
        descriptionHe: "11 סוגי בשר — אסאדו עגל, שוק כבש, פיקאניה, קאפה דה פילה, מאמיניה, פרגית במרינדה, צ'אק סטיק, כנפי עוף, בוליניו, צ'וריסו, לבבות עוף — כמה שרוצים!",
        price: "₪169",
        tag: "All You Can Eat",
        tagHe: "כל כלול",
      },
      {
        name: "* Pullet — 150 grams",
        nameHe: "* פרגית — 150 גרם",
        description: "Served with French fries",
        descriptionHe: "מוגש עם צ'יפס",
        price: "₪65",
      },
      {
        name: "* Chicken Nuggets",
        nameHe: "* נגטס עוף",
        description: "Served with French fries",
        descriptionHe: "מוגש עם צ'יפס",
        price: "₪65",
      },
      {
        name: '* "Junior do Brasil"',
        nameHe: "* \"ג'וניור דו ברזיל\"",
        description: "Served with French fries",
        descriptionHe: "מוגש עם צ'יפס",
        price: "₪65",
      },
      {
        name: "Penne Pasta",
        nameHe: "פסטה פנה",
        description: "In a variety of sauces",
        descriptionHe: "במגוון רטבים",
        price: "₪49",
        tag: "Vegetarian",
        tagHe: "צמחוני",
      },
    ],
  },
  {
    id: "fresh-meat",
    label: "Fresh Meat By Weight",
    labelHe: "בשר טרי לפי משקל",
    subtitle: "Priced Per Kilogram",
    subtitleHe: "מחיר לקילוגרם",
    description: "All prices are per kilogram. Items marked * are without discount. Special offer: buy fresh meat for ₪600 and receive a set of starters for free!",
    descriptionHe: "כל המחירים הם לקילוגרם. פריטים המסומנים ב-* הם ללא הנחה. מבצע מיוחד: קנה בשר טרי ב-600 שקל וקבל סט פתיחות במתנה!",
    type: "weight",
    items: [
      { name: "Picanha", nameHe: "פיקאניה", description: "", descriptionHe: "", price: "₪269 / kg" },
      { name: "Spring Chicken", nameHe: "פרגית", description: "", descriptionHe: "", price: "₪139 / kg" },
      { name: "Entrecote", nameHe: "אנטריקוט", description: "", descriptionHe: "", price: "₪349 / kg", tag: "*No Discount", tagHe: "*ללא הנחה" },
      { name: "Goose Liver", nameHe: "כבד אווז", description: "", descriptionHe: "", price: "₪520 / kg", tag: "*No Discount", tagHe: "*ללא הנחה" },
      { name: "Moulard Breast", nameHe: "חזה מולאר", description: "", descriptionHe: "", price: "₪289 / kg" },
      { name: "Chorizo (Spicy Sausage)", nameHe: "צ'וריסו (נקניק חריף)", description: "", descriptionHe: "", price: "₪169 / kg" },
      { name: "Beef Fillet", nameHe: "פילה בקר", description: "", descriptionHe: "", price: "₪349 / kg", tag: "*No Discount", tagHe: "*ללא הנחה" },
      { name: "Dry-Aged Sirloin", nameHe: "סירלוין יבש", description: "", descriptionHe: "", price: "₪269 / kg" },
      { name: "Lamb Chops", nameHe: "צלעות כבש", description: "", descriptionHe: "", price: "₪269 / kg" },
      { name: "Hamburger", nameHe: "המבורגר", description: "Burger bun +₪5 | Vegetable toppings +₪12", descriptionHe: "לחמניית בורגר +5 שקל | תוספת ירקות +12 שקל", price: "₪149 / kg" },
      { name: "Bolinho (Brazilian Meatballs)", nameHe: "בוליניו (קציצות ברזילאיות)", description: "", descriptionHe: "", price: "₪149 / kg" },
      { name: "Chicken Hearts", nameHe: "לבבות עוף", description: "", descriptionHe: "", price: "₪79 / kg" },
      { name: "Chicken Wings", nameHe: "כנפי עוף", description: "", descriptionHe: "", price: "₪69 / kg" },
      { name: "Beyond Meat Veggie Burger", nameHe: "בורגר צמחוני Beyond Meat", description: "", descriptionHe: "", price: "₪33", tag: "Vegan", tagHe: "טבעוני" },
    ],
    footerNotes: [
      "Set of starters ₪79 — Chili con carne, white rice, baked potatoes with herbs, home-made salad",
      "Chimichurri ₪10 | Garlic confit ₪10 | Cherry tomatoes jam ₪10 | Our salad dressing ₪10",
      "Starter ₪29 per unit: Chili con carne / white rice / baked potatoes with herbs / home-made salad",
      "★ Special offer: Buy fresh meat for ₪600* and get a set of starters for free! (*not including any other offer)",
    ],
    footerNotesHe: [
      "סט פתיחות 79 שקל — צ'ילי קון קרנה, אורז לבן, תפוחי אדמה צלויים בעשבים, סלט ביתי",
      "צ'ימיצ'ורי 10 שקל | שום קונפי 10 שקל | ריבה עגבניות שררי 10 שקל | רוטב הסלט שלנו 10 שקל",
      "פתיחה בודדת 29 שקל: צ'ילי קון קרנה / אורז לבן / תפוחי אדמה צלויים / סלט ביתי",
      "★ מבצע מיוחד: קנה בשר טרי ב-600 שקל* וקבל סט פתיחות במתנה! (*ללא כולל מבצע אחר)",
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
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "space-between",
        gap: "1.5rem",
        padding: "1.4rem 0",
        borderBottom: "1px solid rgba(185,161,103,0.12)",
        position: "relative",
      }}
    >
      {/* Name + desc + tag — inherits dir from parent */}
      <div style={{ flex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.35rem" }}>
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
        }}>
          {description}
        </p>

        {/* Rodízio — Appetizers + Dual Track */}
        {isRodizio && category.appetizers && (
          <div style={{ marginTop: "2rem" }}>
            {/* Appetizers block */}
            <div dir={isHe ? "rtl" : "ltr"} style={{
              padding: "1.4rem 1.8rem",
              background: "rgba(185,161,103,0.05)",
              border: `1px solid ${GOLD_R}0.18)`,
              marginBottom: "2rem",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1rem" }}>
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
                  <div key={ti} dir={isHe ? "rtl" : "ltr"} style={{
                    border: `1px solid ${ti === 1 ? GOLD : GOLD_R + "0.35)"}`,
                    background: ti === 1 ? BORDEAUX : "#fff",
                    padding: "1.6rem 1.8rem",
                    position: "relative",
                  }}>
                    {/* Track header */}
                    <div style={{ marginBottom: "1.2rem" }}>
                      <div style={{ fontFamily: "'Heebo', sans-serif", fontWeight: 700, fontSize: "0.44rem", letterSpacing: "0.28em", color: ti === 1 ? GOLD : GOLD, textTransform: "uppercase", marginBottom: "0.4rem" }}>
                        {isHe ? track.countHe : track.count}
                      </div>
                      <div style={{ display: "flex", alignItems: "baseline", gap: "0.3rem" }}>
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
                        }}>
                          <span style={{ color: GOLD, fontSize: "0.5rem", marginTop: "4px", flexShrink: 0 }}>▪</span>
                          <span style={{ fontFamily: "'Heebo', sans-serif", fontWeight: 300, fontSize: "clamp(12px, 0.88vw, 14px)", color: ti === 1 ? "rgba(255,255,255,0.88)" : "rgb(70,25,25)", lineHeight: 1.5 }}>
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
    <div dir={isHe ? "rtl" : "ltr"} style={{ minHeight: "100vh", background: "#fff" }}>
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
          direction: isHe ? "rtl" : "ltr",
          textAlign: isHe ? "right" : "left",
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

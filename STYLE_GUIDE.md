# Casa do Brasil — Style Guide
**גרסה 1.0 | אפריל 2026**

מסמך זה מתעד את שפת העיצוב של האתר ומשמש כמדריך מחייב לכל דף ורכיב שייבנה מעתה. כל עיצוב חדש חייב להתאים לאסתטיקה המוגדרת כאן.

---

## 1. פילוסופיית העיצוב

> **"Cinematic Asymmetric Luxury"** — חוויה קולנועית, אסימטרית, יוקרתית.

האתר מבטא מסעדה ברזילאית פרימיום: בשר, אש, מוזיקה, ואווירה. כל אלמנט עיצובי צריך לשדר חום, עומק, ועוצמה — לא ניקיון סטרילי. עדיפות לפריסות אסימטריות על פני מרכוז גנרי.

---

## 2. פלטת צבעים

### צבעי מותג ראשיים

| שם | HEX / RGB | שימוש |
|---|---|---|
| **Bordeaux Deep** | `rgb(22, 1, 3)` / `#160103` | רקע ראשי, סקשנים כהים, footer |
| **Bordeaux** | `rgb(62, 4, 9)` / `#3E0409` | כרטיסי תפריט כהים, overlay |
| **Gold** | `#B9A167` / `rgb(185, 161, 103)` | קווי הדגשה, אייקונים, כוכבי ביקורות, גבולות |
| **Gold Bright** | `#FEDF00` | כפתור שפה (EN/עב), גבול כפתור הזמנה |
| **White** | `#FFFFFF` | טקסט על רקע כהה, כותרות Hero |
| **Warm White** | `rgba(240, 220, 160, 0.90)` | כותרת משנה ב-Hero, טקסטים עדינים על רקע כהה |
| **Light Cream** | `#FAFAF8` | רקע כרטיסים בהירים, סקשנים בהירים |

### צבעי מיתוג משניים

| שם | HEX | שימוש |
|---|---|---|
| **Brazil Green** | `#009C3B` | כפתור "הזמנת שולחן", קישורי CTA, hover על nav links |
| **Brazil Green Dark** | `#0f6030` | hover state של כפתור הזמנה |
| **Yellow Brazil** | `#FEDF00` | כפתור שפה, הדגשות |

### עקרון שימוש בצבעים

צבעי הרקע מתחלפים לאורך הדף בין **Bordeaux Deep** (כהה) ל-**Light Cream** (בהיר), ויוצרים קצב ויזואלי. הזהב משמש תמיד כ"קו הדגשה" — לא כרקע. הירוק הברזילאי שמור לפעולות (CTA).

---

## 3. טיפוגרפיה

### גופנים

| גופן | שימוש | טעינה |
|---|---|---|
| **Heebo** | גופן ראשי לכל הטקסטים — כותרות, גוף, ניווט | Self-hosted (Hebrew + Latin subsets) |
| **Dancing Script** | לוגו "Casa do Brasil" בניווט בלבד | Self-hosted CDN |
| **Frank Ruhl Libre** | גיבוי לטקסטים עבריים | Self-hosted |

> **חשוב:** אין להוסיף גופנים נוספים. Heebo מכסה את כל הצרכים בעברית ובאנגלית.

### סולם גדלי פונט

| רמה | גודל | משקל | שימוש |
|---|---|---|---|
| **Display XL** | `clamp(42px, 6.5vw, 90px)` | 900 (Black) | כותרת ראשית Hero ("CASA DO BRASIL") |
| **Display L** | `clamp(48px, 8vw, 112px)` | 900 (Black) | כותרות סקשן ראשיות ("OUR STORY", "MENU") |
| **Display M** | `clamp(48px, 5vw, 72px)` | 900 (Black) | כותרות משנה של סקשנים |
| **Heading** | `1.15rem` | 700 (Bold) | תגיות סקשן ("GALLERY", "REVIEWS") |
| **Body** | `clamp(16px, 1.35vw, 19px)` | 300 (Light) | פסקאות גוף טקסט |
| **Small / Nav** | `0.72rem–0.85rem` | 700 (Bold) | קישורי ניווט, תוויות כפתורים |
| **Caption** | `clamp(12px, 1vw, 15px)` | 400 (Regular) | כיתובי כרטיסים, metadata |

### Letter-Spacing

| הקשר | ערך |
|---|---|
| כותרות Display | `0.01em–0.04em` |
| ניווט אנגלית | `0.10em` |
| ניווט עברית | `0.05em` |
| כפתורי CTA | `0.18em–0.20em` |
| תגיות סקשן | `0.26em–0.28em` |

---

## 4. כפתורים (Buttons)

### כפתור ראשי — "הזמנת שולחן" / "BOOK A TABLE"

```
רקע:     linear-gradient(180deg, #1e8a40 → #0f6030 → #0a4820)
גבול:    1.5px solid rgba(180,140,20, 0.70) → זהב בהובר
טקסט:   #e8f5e0 | Heebo Bold | 0.78rem | letter-spacing 0.14em
Radius:  10px
Padding: 0.48rem 1.4rem
Hover:   gradient כהה יותר + גבול זהב + translateY(-2px) scale(1.03)
```

### כפתור CTA ירוק (בתוך סקשנים)

```
רקע:     #009C3B
גבול:    2px solid #FEDF00
טקסט:   #fff | Heebo Bold 800 | 1rem | letter-spacing 0.18em
Radius:  10px
Padding: 0.9rem 2.2rem
```

### כפתור Ghost (שקוף)

```
רקע:     transparent
גבול:    1px solid rgba(255,255,255, 0.5)
טקסט:   #fff | Heebo Bold | 0.75rem | letter-spacing 0.20em
Hover:   גבול + טקסט → Gold (#B9A167)
```

### כפתור Primary (כהה)

```
רקע:     Bordeaux Deep (oklch 0.20 0.09 22)
גבול:    1px solid Bordeaux Deep
טקסט:   #fff | Heebo Bold | 0.75rem | letter-spacing 0.20em
Hover:   רקע → Gold (אנימציית slide-in מהשמאל)
```

---

## 5. ניווט (Navbar)

### דסקטופ

- **מבנה:** שלושה עמודות — קישורים | לוגו מרכזי | כפתור הזמנה + שפה
- **גובה:** `72px` (לא scrolled) → `60px` (scrolled)
- **רקע:** שקוף על Hero → לבן עם `box-shadow` בגלילה
- **קישורים:** Heebo Bold | `0.72rem` (EN) / `0.85rem` (HE) | UPPERCASE
- **Hover:** צבע → `#009C3B` + קו תחתון

### מובייל (Hamburger)

- **כפתור הזמנה** בשמאל + **לוגו** במרכז + **המבורגר** בימין
- **Overlay:** מלא מסך, רקע Bordeaux עם blur
- **פריטי תפריט:** Heebo Bold | `clamp(18px, 4.5vw, 24px)` | gap `clamp(0.85rem, 2.5vw, 1.3rem)`

---

## 6. כרטיסים (Cards)

### כרטיס תפריט — Dark

```
רקע:     Bordeaux Deep (#160103)
גבול:    1.2px solid Gold (#B9A167)
Shadow:  0 2px 8px rgba(185,161,103,0.14), 0 16px 44px rgba(62,4,9,0.52)
Radius:  0 (ישר — אסתטיקה מסעדה)
כותרת:  Heebo Black 900 | clamp(12px,1.4vw,20px) | #fff
תת-כותרת: Heebo Regular Italic | clamp(13px,1vw,15px) | #FEDF00
```

### כרטיס תפריט — Light

```
רקע:     #FAFAF8
גבול:    1.2px solid Gold
כותרת:  Heebo Black 900 | Bordeaux
תת-כותרת: Heebo Regular Italic | #009C3B
```

### כרטיס ביקורת (Google Review)

```
רקע:     Bordeaux Deep עם opacity
גבול:    Gold subtle
כוכבים:  15px | Gold (#B9A167)
טקסט:   Heebo Regular | clamp(14px,1.0vw,16px) | Warm White
שם:     Heebo Bold | ~0.85rem
```

---

## 7. קווי הפרדה ואלמנטי עיצוב

- **Gold Rule:** קו אופקי `1px` בצבע Gold — מפריד בין סקשנים
- **SVG Dividers:** מחברים בין סקשנים בהירים לכהים בצורה אורגנית
- **Decorative SVG:** קווי עיגול/ענפים בצבע Gold ב-opacity נמוך (0.07–0.08) כרקע דקורטיבי
- **Overlay:** `rgba(0,0,0,0.55)` על תמונות Hero לשמירת קריאות

---

## 8. אנימציות ומעברים

| אלמנט | אנימציה |
|---|---|
| כניסת סקשן | `fadeInUp` — opacity 0→1, translateY 30px→0 |
| Hover כפתור | `0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94)` |
| Hover כפתור Primary | Gold slide-in `0.4s` מהשמאל |
| Navbar scroll | opacity + height `0.4s ease` |
| Hamburger overlay | `translateY(100%)→0` + opacity |
| Nav link underline | `width 0→100%` `0.3s ease` |

---

## 9. Responsive Breakpoints

| Breakpoint | ערך | שינוי |
|---|---|---|
| Mobile | `< 1024px` | Hamburger menu, font clamp קטן |
| Desktop | `≥ 1024px` | Full navbar, font clamp גדול |
| Container max | `1440px` | padding `3rem` בצדדים |

---

## 10. עקרונות יישום לדפים חדשים

כל דף חדש שייבנה באתר חייב לעמוד בכללים הבאים:

1. **צבעים** — להשתמש אך ורק בפלטה המוגדרת בסעיף 2. אין להכניס צבעים חדשים ללא אישור.
2. **גופנים** — Heebo בלבד לכל הטקסטים. Dancing Script — לוגו בלבד.
3. **כפתורים** — להשתמש בסגנונות הקיימים (ירוק/כהה/ghost). אין לייצר סגנון כפתור חדש.
4. **קצב צבעי רקע** — לסירוגין בין Bordeaux Deep לבין Light Cream/White.
5. **אנימציות** — fadeInUp בלבד לכניסות. מעברים `0.25s–0.4s` בלבד.
6. **ניווט** — לא לשנות את ה-Navbar ללא עדכון מסמך זה.
7. **RTL/LTR** — כל דף תומך בשתי השפות. `isHe` מכתיב כיוון ו-letter-spacing.

# Casa do Brasil — Sanity CMS Schemas

## הגדרת Sanity Studio

### 1. התקנת Sanity Studio

בפרויקט ה-Sanity שלך, הוסף את הקבצים האלה לתיקיית `schemas/`:

```
schemas/
  settings.ts
  homePage.ts
  storyPage.ts
  menuCategory.ts
  menuItem.ts
  galleryImage.ts
  index.ts
```

### 2. עדכון `sanity.config.ts`

```ts
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas'

export default defineConfig({
  name: 'casa-do-brasil',
  title: 'Casa do Brasil CMS',
  projectId: '78t1q0i6',
  dataset: 'production',
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('ניהול תוכן')
          .items([
            S.listItem().title('⚙️ הגדרות כלליות').child(
              S.document().schemaType('settings').documentId('settings')
            ),
            S.listItem().title('🏠 עמוד ראשי').child(
              S.document().schemaType('homePage').documentId('homePage')
            ),
            S.listItem().title('📖 הסיפור שלנו').child(
              S.document().schemaType('storyPage').documentId('storyPage')
            ),
            S.divider(),
            S.documentTypeListItem('menuCategory').title('📂 קטגוריות תפריט'),
            S.documentTypeListItem('menuItem').title('🥩 מנות'),
            S.documentTypeListItem('galleryImage').title('🖼️ גלריה'),
          ]),
    }),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
})
```

### 3. מבנה ה-CMS

| סכמה | סוג | תיאור |
|---|---|---|
| `settings` | Singleton | הגדרות גלובליות: שם, טלפון, שעות, רשתות |
| `homePage` | Singleton | Hero, סטטיסטיקות, ביקורות |
| `storyPage` | Singleton | הסיפור שלנו — טקסט ותמונות |
| `menuCategory` | Collection | קטגוריות תפריט (רודיציו, מנות עיקריות...) |
| `menuItem` | Collection | מנות — שם, תיאור, מחיר, תמונה |
| `galleryImage` | Collection | תמונות גלריה |

### 4. שדות דו-לשוניים

כל שדה טקסט מופיע פעמיים:
- `nameHe` — עברית
- `nameEn` — English

שדות כמו מחיר, תמונה, וסדר תצוגה הם **אוניברסליים** (שדה אחד).

import { createConnection } from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

const conn = await createConnection(process.env.DATABASE_URL);

// Update menuBtnHe and menuBtnEn in hero_section table
await conn.execute(
  `UPDATE hero_section SET menuBtnHe = 'תפריט', menuBtnEn = 'MENU', menuBtnUrl = '/menu' WHERE id = 1`
);

const [rows] = await conn.execute(`SELECT menuBtnHe, menuBtnEn, menuBtnUrl FROM hero_section LIMIT 1`);
console.log("Updated hero section:", rows);

await conn.end();

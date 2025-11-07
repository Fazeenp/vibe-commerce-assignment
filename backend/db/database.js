import sqlite3 from "sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Connect to SQLite DB
const dbPath = path.join(__dirname, "ecom.db");
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) console.error("DB Connection error:", err);
  else console.log("Connected to SQLite database");
});

// Create tables if not exist
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS products(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      price REAL,
      image TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS cart(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      productId INTEGER,
      qty INTEGER,
      FOREIGN KEY (productId) REFERENCES products(id)
  )`);
});

export default db;

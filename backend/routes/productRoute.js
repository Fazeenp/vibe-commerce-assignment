import express from "express";
import db from "../db/database.js";

const router = express.Router();

// Seed mock products only once
const products = [
  { name: "Wireless Headphones", price: 2499, image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTBJp13MePZrLnoNFeSiPzr5lwxmk1UcC-qlw-Of0HxgWbdB1scUlMBquFtbX42Nr5EP3nu1deOufGN7Vf3S8dKHxVz8Y4WQmkjmqaf3DwoK-jGH9h6p891wQ" },
  { name: "Smart Watch", price: 3999, image: "https://www.gonoise.com/cdn/shop/products/Icon2-6.png?v=1681610912" },
  { name: "Bluetooth Speaker", price: 2999, image: "https://m.media-amazon.com/images/I/61C1YkP5lzL.jpg" },
  { name: "Gaming Mouse", price: 999, image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSdIJieADh_YnBXt1POJivS3gVi-Fj-fi_vpXe53vl3XYo0b_1tMsbj2iQd74kldJPAxtpVbfppa6QNLMEPCV-5xv0TS4k-jBxOtZOcId8" },
  { name: "Mechanical Keyboard", price: 2999, image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQPGv88ehq9yMXH1NWwmF97o9qGgcyBQfJaB3dvqpcAGwY1qqFGn9gW29NRNSg1amsFdmTA5MiqiaCTGki8e-RcnAqsljAVAV2s4L5HsM27W5J-33u7YSuF7Q" },
  { name: "USB-C Charger", price: 799, image: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcSPHCDCAWHBHEPvWhDJeSnbyhraKAD96rmcZV03AcR_b7RZzRw2PcSJpARNjtpZysWGh4UgoQusUL_qm0dvkVgIR8nek9pb7_BHvyR1uMUtQd8_H4eJQBWSZg" },
  { name: "Power Bank 10000mAh", price: 1499, image: "https://m.media-amazon.com/images/I/61HgzHGMBBL._SX679_.jpg" },
  { name: "Portable SSD 1TB", price: 6999, image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTlXV0YeLooqjtBnxYbPQj4kr_B_XNLUfXBxVnnF8ta7g3v7X3Icb0SCoIST1liSi8dnJvw76lU_nkfYC5fQg8QOXE87T6irqNla87plu439X0DCQjvhmLQ7w" },
];



// Insert mock data if products table empty
db.get("SELECT COUNT(*) as count FROM products", (err, row) => {
  if (!err && row.count === 0) {
    const stmt = db.prepare("INSERT INTO products (name, price, image) VALUES (?,?,?)");
    products.forEach((p) => stmt.run(p.name, p.price, p.image));
    stmt.finalize();
    console.log("Mock products inserted");
  }
});

// GET /api/products
router.get("/", (req, res) => {
  db.all("SELECT * FROM products", (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

export default router;

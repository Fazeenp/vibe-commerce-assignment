import express from "express";
import db from "../db/database.js";

const router = express.Router();

router.post("/", (req, res) => {
  const { name, email,cartitems } = req.body;

  const query = `
    SELECT products.name, products.price, cart.qty
    FROM cart
    JOIN products ON cart.productId = products.id
  `;

  db.all(query, [], (err, items) => {
    if (err) return res.status(500).json({ error: err.message });

    const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);
    const receipt = {
      id: Date.now(),
      name,
      email,
      total,
      timestamp: new Date().toISOString(),
      items,
    };

    db.run("DELETE FROM cart", () => {
      res.json(receipt);
    });
  });
});

export default router;

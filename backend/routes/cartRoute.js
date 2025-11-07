import express from "express";
import db from "../db/database.js";

const router = express.Router();

// GET /api/cart
router.get("/", (req, res) => {
  const query = `
    SELECT cart.id, products.name, products.price, products.image, cart.qty
    FROM cart
    JOIN products ON cart.productId = products.id
  `;
  db.all(query, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    const total = rows.reduce((acc, item) => acc + item.price * item.qty, 0);
    res.json({ items: rows, total });
  });
});

// POST /api/cart (add item)
router.post("/", (req, res) => {
  const { productId, qty } = req.body;

  db.get("SELECT * FROM cart WHERE productId = ?", [productId], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });

    if (row) {
      db.run("UPDATE cart SET qty = qty + ? WHERE productId = ?", [qty, productId], (err2) => {
        if (err2) return res.status(500).json({ error: err2.message });
        res.json({ message: "Item quantity updated" });
      });
    } else {
      db.run("INSERT INTO cart (productId, qty) VALUES (?, ?)", [productId, qty], (err3) => {
        if (err3) return res.status(500).json({ error: err3.message });
        res.json({ message: "Item added to cart" });
      });
    }
  });
});
// DELETE /api/cart/clear (clear entire cart)
router.delete("/clear", (req, res) => {
  db.run("DELETE FROM cart", function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Cart cleared" });
  });
});

// DELETE /api/cart/:id (remove item)
router.delete("/:id", (req, res) => {
  db.run("DELETE FROM cart WHERE id = ?", [req.params.id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ deleted: this.changes });
  });
});

export default router;

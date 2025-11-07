import express from "express";
import cors from "cors";
import productRoute from "./routes/productRoute.js";
import cartRoute from "./routes/cartRoute.js";
import checkoutRoute from "./routes/checkoutRoute.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/products", productRoute);
app.use("/api/cart", cartRoute);
app.use("/api/checkout", checkoutRoute);

app.get("/", (req, res) => res.send("Mock E-Com Cart Backend with SQLite running!"));

app.listen(5000, () => console.log("Server running on http://localhost:5000"));

import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";

export default function Home({ addToCart, cart, updateQty }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then(setProducts)
      .catch(console.error);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((p) => {
          const inCart = cart.find((item) => item.productId === p.id || item.id === p.id);
          return (
            <ProductCard
              key={p.id}
              product={p}
              inCart={inCart}
              addToCart={addToCart}
              updateQty={updateQty}
            />
          );
        })}
      </div>
    </div>
  );
}

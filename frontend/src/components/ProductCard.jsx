export default function ProductCard({ product, inCart, addToCart, updateQty }) {
  return (
    <div className="bg-white shadow-md rounded-2xl p-4 flex flex-col justify-between transition hover:shadow-xl">
      <div>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-contain rounded-lg mb-4 bg-gray-50 p-2"
        />
        <h3 className="font-semibold text-lg text-gray-800 truncate">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-4">₹{product.price}</p>
      </div>

      {!inCart ? (
        <button
          onClick={() => addToCart(product)}
          className="mt-auto w-full bg-green-600 text-white font-medium py-2 rounded-lg hover:bg-green-500 transition"
        >
          Add to Cart
        </button>
      ) : (
        <div className="mt-auto flex items-center justify-center gap-4">
          <button
            onClick={() => updateQty(inCart.id || inCart.productId, inCart.qty - 1)}
            className="bg-gray-200 text-lg font-semibold w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-300 transition"
          >
            –
          </button>
          <span className="text-gray-800 font-medium">{inCart.qty}</span>
          <button
            onClick={() => updateQty(inCart.id || inCart.productId, inCart.qty + 1)}
            className="bg-gray-200 text-lg font-semibold w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-300 transition"
          >
            +
          </button>
        </div>
      )}
    </div>
  );
}

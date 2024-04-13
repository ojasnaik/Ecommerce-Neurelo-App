import React from "react";

function ProductItem({ product, addToCart }) {
  return (
    <div className="flex border-b border-gray-200 p-4 hover:bg-gray-50">
      <img
        src={product.thumbnail}
        alt={product.title}
        className="w-32 h-32 object-cover flex-none bg-gray-100 rounded-md"
      />
      <div className="flex flex-col justify-between ml-4 flex-grow">
        <div>
          <h3 className="text-lg font-semibold text-gray-700">
            {product.title}
          </h3>
          <p className="text-sm text-gray-600 mt-1">{product.description}</p>
        </div>
        <div className="flex items-center justify-between mt-3">
          <p className="text-lg font-bold text-gray-800">${product.price}</p>
          <button
            onClick={() => addToCart(product)}
            className="px-3 py-1 bg-blue-500 text-white text-xs font-bold uppercase rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-700"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductItem;

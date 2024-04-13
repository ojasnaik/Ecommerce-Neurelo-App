import React from "react";

function Cart({
  cart,
  updateProductInCart,
  removeProductFromCart,
  setIsCartVisible,
}) {
  const handleQuantityChange = (product, increment) => {
    let newQuantity = product.quantity + increment;
    if (newQuantity >= 1 && newQuantity <= 5) {
      updateProductInCart(product.id, { ...product, quantity: newQuantity });
    } else if (newQuantity < 1) {
      removeProductFromCart(product.id);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-10">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Your Cart</h2>
          <button
            onClick={() => setIsCartVisible(false)}
            className="text-black rounded-full bg-transparent hover:bg-gray-200 p-2"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        {cart.length > 0 ? (
          cart.map((product) => (
            <div
              key={product.id}
              className="flex items-center justify-between my-2 p-2 hover:bg-gray-100 rounded-lg"
            >
              <img
                src={product.thumbnail}
                alt={product.title}
                className="w-16 h-16 object-cover rounded-md"
              />
              <div className="flex-grow ml-4">
                <h3 className="text-sm font-semibold">{product.title}</h3>
                <p className="text-xs text-gray-600">${product.price}</p>
              </div>
              <div className="flex items-center">
                <button
                  className="text-gray-500 focus:outline-none focus:text-gray-600"
                  onClick={() => handleQuantityChange(product, -1)}
                >
                  &ndash;
                </button>
                <input
                  type="text"
                  readOnly
                  className="mx-2 text-center w-8 border-none text-sm"
                  value={product.quantity}
                />
                <button
                  className="text-gray-500 focus:outline-none focus:text-gray-600"
                  onClick={() => handleQuantityChange(product, 1)}
                >
                  +
                </button>
              </div>
              <button
                className="text-red-600 hover:text-red-800 focus:outline-none bg-red-100 hover:bg-red-200 rounded-full p-1 ml-2"
                onClick={() => handleQuantityChange(product, -product.quantity)}
                aria-label={`Remove ${product.title} from cart`}
              >
                &times;
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 text-sm">
            Your cart is empty.
          </p>
        )}
      </div>
    </div>
  );
}

export default Cart;

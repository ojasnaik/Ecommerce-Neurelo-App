import React, { useState, useEffect } from "react";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import Search from "./components/Search";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isCartVisible, setIsCartVisible] = useState(false);

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  const fetchProducts = async () => {
    const response = await fetch("https://us-west-2.aws.neurelo.com/rest/product", {
      method: "GET",
      headers: {
        "X-API-KEY": `${process.env.REACT_APP_API_KEY}`,
      },
    });
    const jsonResponse = await response.json();
    
    const productsData = jsonResponse.data;
    setProducts(productsData);
    setSearchResults(productsData);
    
    console.log(productsData);

    const categories = await fetch("https://us-west-2.aws.neurelo.com/custom/categories", {
      method: "GET",
      headers: {
        "X-API-KEY": `${process.env.REACT_APP_API_KEY}`,
      },
    });
    const categoriesJsonResponse = await categories.json();
    const extractedCategories = categoriesJsonResponse.data.values
  
    setCategories(extractedCategories);
  };
  
  const fetchCart = async () => {
    try {
      const response = await fetch('https://us-west-2.aws.neurelo.com/rest/cartProduct?', {
        method: 'GET',
        headers: {
          'X-API-KEY': process.env.REACT_APP_CART_API_KEY,
        }
      });
      if (!response.ok) throw new Error('Failed to fetch cart.');
      const cartData = await response.json();
      setCart(cartData.data.map(item => ({
        id: item.id,
        price: item.price,
        quantity: item.quantity,
        thumbnail: item.thumbnail,
        title: item.title
      })));
    } catch (error) {
      console.error(error.message);
    }
  };

  const saveCart = async (cart) => {
    try {
      // Clear the existing cart
      const deleteResponse = await fetch('https://us-west-2.aws.neurelo.com/rest/cartProduct', {
        method: 'DELETE',
        headers: {
          'X-API-KEY': process.env.REACT_APP_CART_API_KEY,
        }
      });
      if (!deleteResponse.ok) throw new Error('Failed to clear the cart.');
  
      // Save the updated cart
      const saveResponse = await fetch('https://us-west-2.aws.neurelo.com/rest/cartProduct', {
        method: 'POST',
        headers: {
          'X-API-KEY': process.env.REACT_APP_CART_API_KEY,
        },
        body: JSON.stringify(cart.map((product) => ({
          id: product.id,
          price: product.price,
          quantity: product.quantity,
          thumbnail: product.thumbnail,
          title: product.title
        })))
      });
      if (!saveResponse.ok) throw new Error('Failed to save the cart.');
  
      console.log('Cart updated successfully!');
    } catch (error) {
      console.error(error.message);
    }
  };
  

  const toggleCart = () => {
    setIsCartVisible(!isCartVisible);
  };

  // Function to calculate the total number of items in the cart
  const getCartItemCount = () => {
    return cart.reduce((totalCount, item) => totalCount + item.quantity, 0);
  };

  const resetSearch = () => {
    setSearchResults(products);
  };

  const addToCart = (productToAdd) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find(
        (item) => item.id === productToAdd.id
      );
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === productToAdd.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...productToAdd, quantity: 1 }];
    });
  };

  const updateProductInCart = (productId, updatedProduct) => {
    setCart((prevCart) =>
      prevCart.map((item) => (item.id === productId ? updatedProduct : item))
    );
  };

  const removeProductFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  return (
    <div className="App container mx-auto mt-5 flex">
      <div className="flex-grow overflow-auto">
        <Search
          onSearchResult={setSearchResults}
          categories={categories}
          resetSearch={resetSearch}
        />
        <ProductList products={searchResults} addToCart={addToCart} />
      </div>
      <button
        className="fixed top-4 right-4 bg-white text-white p-2 rounded-full"
        onClick={toggleCart}
      >
        <img
          src={process.env.PUBLIC_URL + "/Cart.png"}
          alt="Cart"
          className="w-12 h-12"
        />
        {getCartItemCount() > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
            {getCartItemCount()}
          </span>
        )}
      </button>
      {isCartVisible && (
        <Cart
          cart={cart}
          updateProductInCart={updateProductInCart}
          removeProductFromCart={removeProductFromCart}
          setIsCartVisible={setIsCartVisible}
          saveCart={saveCart}
        />
      )}
    </div>
  );
}

export default App;

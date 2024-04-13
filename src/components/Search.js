import React, { useState, useEffect } from "react";

function Search({ onSearchResult, categories, resetSearch }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    if (selectedCategory) {
      handleCategorySearch(selectedCategory);
    }
  }, [selectedCategory]);

  const handleSearch = async () => {
    const response = await fetch(
      `https://dummyjson.com/products/search?q=${searchTerm}`
    );
    const data = await response.json();
    onSearchResult(data.products);
  };

  const handleCategorySearch = async (category) => {
    const response = await fetch(`https://us-west-2.aws.neurelo.com/custom/category?category=${category}`, {
      method: "GET",
      headers: {
        "X-API-KEY": `${process.env.REACT_APP_API_KEY}`,
      },
    });
    const data = await response.json();
    onSearchResult(data.data.cursor.firstBatch);
  };

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleReset = () => {
    setSearchTerm("");
    setSelectedCategory("");
    resetSearch();
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="flex flex-col md:flex-row md:items-center gap-2 p-4">
      <input
        type="text"
        id="search"
        value={searchTerm}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="   Search products by name"
        className="form-input mt-0 block w-6/12 border-2 border-gray-300 rounded-md shadow-sm py-1"
        />
      <button
        onClick={handleSearch}
        className="btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Search
      </button>
      <div className="relative w-3/12">
        <select
          id="category"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="block appearance-none w-full border border-gray-200 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        >
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <button
        onClick={handleReset}
        className="btn bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      >
        Reset
      </button>
    </div>
  );
}

export default Search;

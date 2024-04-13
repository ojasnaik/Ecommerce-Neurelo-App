import React from 'react';
import ProductItem from './ProductItem';

function ProductList({ products, addToCart }) {
    return (
        <div className="product-list">
            {products.length > 0 ? (
                products.map(product => (
                    <ProductItem key={product.id} product={product} addToCart={addToCart} />
                ))
            ) : (
                <p>No products found.</p>
            )}
        </div>
    );
}

export default ProductList;
import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <div className="border p-4 rounded-lg">
      <Link to={`/product/${product._id}`}>
        <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
        <h3 className="mt-2 text-lg font-bold">{product.name}</h3>
        <p className="mt-1 text-gray-600">${product.price}</p>
      </Link>
    </div>
  );
};

export default ProductCard;

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get(`/api/products/${id}`);
      setProduct(data);
    };
    fetchProduct();
  }, [id]);

  if (!product) return <div>Loading...</div>;

  return (
    <div className="container mx-auto">
      <div className="flex">
        <img src={product.image} alt={product.name} className="w-1/2 h-auto" />
        <div className="ml-4">
          <h2 className="text-2xl font-bold">{product.name}</h2>
          <p className="mt-2 text-gray-600">${product.price}</p>
          <p className="mt-4">{product.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
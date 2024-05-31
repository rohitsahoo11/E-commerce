import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get(`/api/products/${id}`);
      setProduct(data);
    };
    fetchProduct();
  }, [id]);

  return (
    <div className="container mx-auto">
      <div className="flex flex-col md:flex-row">
        <img src={product.image} alt={product.name} className="w-full md:w-1/2 h-64 object-cover" />
        <div className="md:ml-4 mt-4 md:mt-0">
          <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
          <p className="mb-4">${product.price}</p>
          <p className="mb-4">{product.description}</p>
          {/* Add to Cart functionality */}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

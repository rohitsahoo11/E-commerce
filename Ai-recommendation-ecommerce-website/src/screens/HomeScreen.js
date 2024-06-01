import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';

const HomeScreen = () => {
    const dispatch = useDispatch();

    const productList = useSelector((state) => state.productList);
    const { loading, error, products } = productList;

    useEffect(() => {
        dispatch(listProducts());
    }, [dispatch]);

    return (
        <div>
            <h1>Latest Products</h1>
            {loading ? (
                <h2>Loading...</h2>
            ) : error ? (
                <h3>{error}</h3>
            ) : (
                <div>
                    {products.map((product) => (
                        <div key={product._id}>
                            <h3>{product.name}</h3>
                            <p>{product.description}</p>
                            <p>{product.price}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default HomeScreen;

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listProductDetails } from '../actions/productActions';

const ProductScreen = ({ match }) => {
    const dispatch = useDispatch();

    const productDetails = useSelector((state) => state.productDetails);
    const { loading, error, product } = productDetails;

    useEffect(() => {
        dispatch(listProductDetails(match.params.id));
    }, [dispatch, match]);

    return (
        <div>
            {loading ? (
                <h2>Loading...</h2>
            ) : error ? (
                <h3>{error}</h3>
            ) : (
                <div>
                    <h3>{product.name}</h3>
                    <p>{product.description}</p>
                    <p>{product.price}</p>
                </div>
            )}
        </div>
    );
};

export default ProductScreen;

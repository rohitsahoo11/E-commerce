import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../actions/cartActions';

const CartScreen = ({ match, location, history }) => {
    const productId = match.params.id;

    const qty = location.search ? Number(location.search.split('=')[1]) : 1;

    const dispatch = useDispatch();

    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;

    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, qty));
        }
    }, [dispatch, productId, qty]);

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id));
    };

    const checkoutHandler = () => {
        history.push('/login?redirect=shipping');
    };

    return (
        <div>
            <h1>Shopping Cart</h1>
            {cartItems.length === 0 ? (
                <p>
                    Your cart is empty <Link to="/">Go Back</Link>
                </p>
            ) : (
                <div>
                    {cartItems.map((item) => (
                        <div key={item.product}>
                            <div>
                                <img src={item.image} alt={item.name} />
                                <Link to={`/product/${item.product}`}>{item.name}</Link>
                            </div>
                            <div>
                                <select
                                    value={item.qty}
                                    onChange={(e) =>
                                        dispatch(
                                            addToCart(item.product, Number(e.target.value))
                                        )
                                    }
                                >
                                    {[...Array(item.countInStock).keys()].map((x) => (
                                        <option key={x + 1} value={x + 1}>
                                            {x + 1}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>{item.price}</div>
                            <div>
                                <button type="button" onClick={() => removeFromCartHandler(item.product)}>
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            <div>
                <h2>
                    Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items
                </h2>
                <p>${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}</p>
                <button
                    type="button"
                    disabled={cartItems.length === 0}
                    onClick={checkoutHandler}
                >
                    Proceed To Checkout
                </button>
            </div>
        </div>
    );
};

export default CartScreen;

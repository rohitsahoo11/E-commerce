import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const PlaceOrderScreen = ({ history }) => {
    const cart = useSelector((state) => state.cart);
    const { cartItems, shippingAddress, paymentMethod } = cart;

    const itemsPrice = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0);
    const shippingPrice = itemsPrice > 100 ? 0 : 10;
    const taxPrice = 0.15 * itemsPrice;
    const totalPrice = itemsPrice + shippingPrice + taxPrice;

    const placeOrderHandler = () => {
        console.log('Order placed');
    };

    useEffect(() => {
        if (!paymentMethod) {
            history.push('/payment');
        }
    }, [history, paymentMethod]);

    return (
        <div>
            <h1>Place Order</h1>
            <div>
                <h2>Shipping</h2>
                <p>
                    <strong>Address: </strong>
                    {shippingAddress.address}, {shippingAddress.city},{' '}
                    {shippingAddress.postalCode}, {shippingAddress.country}
                </p>
            </div>
            <div>
                <h2>Payment Method</h2>
                <p>
                    <strong>Method: </strong>
                    {paymentMethod}
                </p>
            </div>
            <div>
                <h2>Order Items</h2>
                {cartItems.length === 0 ? (
                    <p>Your cart is empty</p>
                ) : (
                    <div>
                        {cartItems.map((item, index) => (
                            <div key={index}>
                                <div>
                                    <img src={item.image} alt={item.name} />
                                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                                </div>
                                <div>{item.qty} x ${item.price} = ${item.qty * item.price}</div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div>
                <div>
                    <h2>Order Summary</h2>
                    <div>
                        <p>Items</p>
                        <p>${itemsPrice.toFixed(2)}</p>
                    </div>
                    <div>
                        <p>Shipping</p>
                        <p>${shippingPrice.toFixed(2)}</p>
                    </div>
                    <div>
                        <p>Tax</p>
                        <p>${taxPrice.toFixed(2)}</p>
                    </div>
                    <div>
                        <p>Total</p>
                        <p>${totalPrice.toFixed(2)}</p>
                    </div>
                    <button type="button" onClick={placeOrderHandler}>
                        Place Order
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PlaceOrderScreen;

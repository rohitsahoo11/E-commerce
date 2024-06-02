import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderDetails, payOrder } from '../actions/orderActions';
import { PayPalButton } from 'react-paypal-button-v2';

const OrderScreen = ({ match }) => {
    const orderId = match.params.id;
    const dispatch = useDispatch();

    const orderDetails = useSelector((state) => state.orderDetails);
    const { order, loading, error } = orderDetails;

    const orderPay = useSelector((state) => state.orderPay);
    const { loading: loadingPay, success: successPay } = orderPay;

    useEffect(() => {
        if (!order || successPay || order._id !== orderId) {
            dispatch({ type: 'ORDER_PAY_RESET' });
            dispatch(getOrderDetails(orderId));
        }
    }, [dispatch, orderId, successPay, order]);

    const successPaymentHandler = (paymentResult) => {
        dispatch(payOrder(orderId, paymentResult));
    };

    return loading ? (
        <p>Loading...</p>
    ) : error ? (
        <p>{error}</p>
    ) : (
        <div>
            <h1>Order {order._id}</h1>
            <div>
                <h2>Shipping</h2>
                <p>
                    <strong>Name: </strong> {order.user.name}
                </p>
                <p>
                    <strong>Email: </strong>{' '}
                    <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
                </p>
                <p>
                    <strong>Address: </strong>
                    {order.shippingAddress.address}, {order.shippingAddress.city}{' '}
                    {order.shippingAddress.postalCode}, {order.shippingAddress.country}
                </p>
            </div>
            <div>
                <h2>Payment Method</h2>
                <p>
                    <strong>Method: </strong>
                    {order.paymentMethod}
                </p>
            </div>
            <div>
                <h2>Order Items</h2>
                {order.orderItems.length === 0 ? (
                    <p>Order is empty</p>
                ) : (
                    <div>
                        {order.orderItems.map((item, index) => (
                            <div key={index}>
                                <div>
                                    <img src={item.image} alt={item.name} />
                                    <p>{item.name}</p>
                                </div>
                                <p>
                                    {item.qty} x ${item.price} = ${item.qty * item.price}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div>
                <h2>Order Summary</h2>
                <div>
                    <p>Items</p>
                    <p>${order.itemsPrice}</p>
                </div>
                <div>
                    <p>Shipping</p>
                    <p>${order.shippingPrice}</p>
                </div>
                <div>
                    <p>Tax</p>
                    <p>${order.taxPrice}</p>
                </div>
                <div>
                    <p>Total</p>
                    <p>${order.totalPrice}</p>
                </div>
                {!order.isPaid && (
                    <div>
                        {loadingPay && <p>Loading...</p>}
                        <PayPalButton amount={order.totalPrice} onSuccess={successPaymentHandler} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default OrderScreen;

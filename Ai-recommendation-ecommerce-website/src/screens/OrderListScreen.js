import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listMyOrders } from '../actions/orderActions';
import { Link } from 'react-router-dom';

const OrderListScreen = ({ history }) => {
    const dispatch = useDispatch();

    const orderListMy = useSelector((state) => state.orderListMy);
    const { loading, error, orders } = orderListMy;

    useEffect(() => {
        dispatch(listMyOrders());
    }, [dispatch]);

    return (
        <div>
            <h1>My Orders</h1>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>DATE</th>
                                <th>TOTAL</th>
                                <th>PAID</th>
                                <th>DELIVERED</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order._id}>
                                    <td>{order._id}</td>
                                    <td>{order.createdAt.substring(0, 10)}</td>
                                    <td>${order.totalPrice}</td>
                                    <td>{order.isPaid ? order.paidAt.substring(0, 10) : 'No'}</td>
                                    <td>{order.isDelivered ? order.deliveredAt.substring(0, 10) : 'No'}</td>
                                    <td>
                                        <Link to={`/order/${order._id}`}>
                                            <button>Details</button>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default OrderListScreen;

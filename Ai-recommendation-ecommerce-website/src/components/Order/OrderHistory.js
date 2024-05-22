import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { GlobalContext } from '../../context/GlobalContext';

const OrderHistory = () => {
  const { user } = useContext(GlobalContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const { data } = await axios.get(`/api/orders`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setOrders(data);
    };
    fetchOrders();
  }, [user]);

  return (
    <div className="container mx-auto">
      <h2>Order History</h2>
      {orders.length === 0 ? (
        <p>You have no past orders.</p>
      ) : (
        <div>
          {orders.map(order => (
            <div key={order._id} className="border p-4 mb-4">
              <h3>Order {order._id}</h3>
              <p>Placed on {new Date(order.createdAt).toLocaleDateString()}</p>
              <p>Total: ${order.totalPrice}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;

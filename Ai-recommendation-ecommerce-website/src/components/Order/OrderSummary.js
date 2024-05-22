import React, { useContext } from 'react';
import { GlobalContext } from '../../context/GlobalContext';

const OrderSummary = () => {
  const { cart } = useContext(GlobalContext);

  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  return (
    <div className="container mx-auto">
      <h2>Order Summary</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cart.map(item => (
            <div key={item._id} className="flex justify-between items-center">
              <div>{item.name}</div>
              <div>{item.qty}</div>
              <div>${item.price}</div>
            </div>
          ))}
          <div className="mt-4">
            <h3>Total: ${totalPrice}</h3>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderSummary;

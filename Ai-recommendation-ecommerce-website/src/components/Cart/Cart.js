import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { GlobalContext } from '../../context/GlobalContext';

const Cart = () => {
  const { cart, dispatch } = useContext(GlobalContext);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(items);
  }, [cart]);

  const removeFromCart = (id) => {
    const updatedCart = cartItems.filter(item => item._id !== id);
    setCartItems(updatedCart);
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
    dispatch({ type: 'REMOVE_FROM_CART', payload: id });
  };

  return (
    <div className="container mx-auto">
      <h2>Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty. <Link to="/products">Go Shopping</Link></p>
      ) : (
        <div>
          {cartItems.map(item => (
            <div key={item._id} className="flex justify-between items-center">
              <div>{item.name}</div>
              <div>{item.qty}</div>
              <div>${item.price}</div>
              <button onClick={() => removeFromCart(item._id)}>Remove</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cart;

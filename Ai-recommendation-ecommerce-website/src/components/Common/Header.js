import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-gray-800 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">E-commerce</Link>
        <nav>
          <Link to="/products" className="mr-4">Products</Link>
          <Link to="/cart" className="mr-4">Cart</Link>
          <Link to="/login" className="mr-4">Login</Link>
          <Link to="/profile">Profile</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;

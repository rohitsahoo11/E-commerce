import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/Common/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import ProductList from './components/Product/ProductList';
import ProductDetails from './components/Product/ProductDetails';
import Cart from './components/Cart/Cart';
import OrderSummary from './components/Order/OrderSummary';
import OrderHistory from './components/Order/OrderHistory';
import Chatbot from './components/Chatbot';

function App() {
  return (
    <Router>
      <Header />
      <main className="container mx-auto px-4 py-6">
        <Route path="/" component={Home} exact />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/products" component={ProductList} exact />
        <Route path="/product/:id" component={ProductDetails} />
        <Route path="/cart" component={Cart} />
        <Route path="/order-summary" component={OrderSummary} />
        <Route path="/order-history" component={OrderHistory} />
        <Route path="/chatbot" component={Chatbot} />
      </main>
      <Footer />
    </Router>
  );
}

export default App;

import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/Header';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';

const App = () => {
    return (
        <Router>
            <Header />
            <main>
                <Route path="/" component={HomeScreen} exact />
                <Route path="/product/:id" component={ProductScreen} />
            </main>
        </Router>
    );
};

export default App;

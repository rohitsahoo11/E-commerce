import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';

const initialState = {
  user: null,
  products: [],
  cart: [],
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  return (
    <GlobalContext.Provider value={{
      user: state.user,
      products: state.products,
      cart: state.cart,
      dispatch,
    }}>
      {children}
    </GlobalContext.Provider>
  );
};

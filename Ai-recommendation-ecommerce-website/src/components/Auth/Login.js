import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { GlobalContext } from '../../context/GlobalContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { dispatch } = useContext(GlobalContext);
  const history = useHistory();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/users/login', { email, password });
      dispatch({ type: 'LOGIN_SUCCESS', payload: data });
      localStorage.setItem('userInfo', JSON.stringify(data));
      history.push('/');
    } catch (error) {
      console.error('Error logging in', error);
    }
  };

  return (
    <div className="container mx-auto">
      <form onSubmit={submitHandler}>
        <h2>Login</h2>
        <div>
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;

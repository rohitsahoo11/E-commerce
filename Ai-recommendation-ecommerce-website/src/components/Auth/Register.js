import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { GlobalContext } from '../../context/GlobalContext';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { dispatch } = useContext(GlobalContext);
  const history = useHistory();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/users/register', { name, email, password });
      dispatch({ type: 'REGISTER_SUCCESS', payload: data });
      localStorage.setItem('userInfo', JSON.stringify(data));
      history.push('/');
    } catch (error) {
      console.error('Error registering', error);
    }
  };

  return (
    <div className="container mx-auto">
      <form onSubmit={submitHandler}>
        <h2>Register</h2>
        <div>
          <label>Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const [, setCookie] = useCookies(['accesstoken', 'refreshtoken']);

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/login', {
        email,
        password
      });

      const data = response.data;

      setMessage('Login successful');
      console.log('Access Token:', data.token.accesstoken);
      console.log('Refresh Token:', data.token.refreshtoken);

      // Store tokens in cookies
      setCookie('accesstoken', data.token.accesstoken, { path: '/', httpOnly: true, secure: true });
      setCookie('refreshtoken', data.token.refreshtoken, { path: '/', httpOnly: true, secure: true });

      // Navigate to the home page
      navigate('/home');
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.message || 'Login failed');
      } else {
        setMessage('Login failed');
      }
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <input 
        type="email" 
        placeholder="Email" 
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input 
        type="password" 
        placeholder="Password" 
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      <div className="message">{message}</div>
    </div>
  );
}

export default Signin;

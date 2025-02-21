import React from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  
  return (
    <div className="container">
      <h1>Login</h1>
      <input type="text" className="input-box" placeholder="Username" />
      <input type="password" className="input-box" placeholder="Password" />
      <button className="login-button">START</button>
      
    </div>
  );
}

export default Login;

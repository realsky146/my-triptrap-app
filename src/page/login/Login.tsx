import React from "react";
import { useNavigate } from "react-router-dom";
import BackToIntroButton from "../../components/BackToIntroButton";

const Login = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/profile"); // ไปที่หน้าโปรไฟล์
  };

  return (
    <div className="container">
      <h1>Login</h1>
      <input type="text" className="input-box" placeholder="Username" />
      <input type="password" className="input-box" placeholder="Password" />
      <button className="login-button" onClick={handleStart}>
        START
      </button>
      <div><BackToIntroButton /></div>
    </div>
  );
};

export default Login;

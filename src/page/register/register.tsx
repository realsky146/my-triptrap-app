import rect from 'react';
import App from '../../App';
import { useNavigate } from 'react-router-dom';  // นำเข้า useNavigate
import BackToIntroButton from '../../components/BackToIntroButton';

const Register = () => {
    const navigate = useNavigate();  // สร้างตัวแปร navigate

  const goToLogin = () => {
    navigate('/login');  // กำหนดเส้นทางไปยังหน้า /login
};

  return (
    <div className="container">
      <div className="wallpaper"></div>
      <div className="polygon"></div>
      <div className="image"></div>
      <div className="rectangle"></div>
      <h1 className="register">Register</h1>
      <div className="line"></div>
      <input type="text" className="input-box" placeholder="Username" />
      <input type="password" className="input-box" placeholder="Password" />
      <p className="confirm-password">Confirm Password</p>
      <p className="google-login">Or login with Google</p>
      <button className="login-button" onClick={goToLogin} > Login </button>
      <div> <BackToIntroButton /></div>
    </div>

    
  );
}

export default Register;
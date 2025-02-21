import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './page/style/App.css';
import logo from './assets/pic/Logo.png';
import Intro from './intro'; 
import wal from './assets/pic/วอลเปเปอร์.png'
import './page/register/register'
import Register from './page/register/register';
import Login from './page/login/Login';  // นำเข้าไฟล์ Login
import Profile from './page/profile/profile';
import { LogIn } from 'lucide-react';

// ✅ Component หลักที่ใช้ `useNavigate()`
function AppContent() {
  const navigate = useNavigate(); // ✅ ใช้ useNavigate() ได้ถูกต้อง

  return (
    <>
      <div className="logo-container">
        <img src={logo} className="logo" alt="TripTrap logo" />
      </div>
      <div className="background"> 
      <img src={wal} className="waldesk" alt="wal" />
      </div>
      <button className="start-button" onClick={() => navigate('/intro')}>
        START
      </button>
      <p className="read-the-docs">"เดินทางไม่หลงทางอีกต่อไป! ปล่อยให้เราได้นำทางคุณไปยังที่หมาย!</p>
    </>
  );
}
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AppContent />} />
        <Route path="/intro" element={<Intro />} />
        <Route path="/register" element={<Register/>} /> {/* หน้าลงทะเบียน */}
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}
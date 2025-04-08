import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import './page/style/App.css';
import logo from './assets/pic/Logo.png';
import Intro from './intro';
import wal from './assets/pic/วอลเปเปอร์.png';

import Register from './page/register/register';
import Login from './page/login/Login';
import Profile from './page/profile/profile';
import Home from './page/home/home'; // ✅ เปลี่ยนเป็นตัวพิมพ์ใหญ่
import LocationSettings from '../src/components/LocationSettings';

// ✅ Component หลักที่ใช้ `useNavigate()`
function AppContent() {
  const navigate = useNavigate();

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
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/home" element={<Home />} /> {/* ✅ แก้ไขให้ใช้ <Home /> */}
        <Route path="/location" element={<LocationSettings />} />
      </Routes>
    </Router>
  );
}

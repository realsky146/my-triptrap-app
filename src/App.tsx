import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './App.css';
import logo from './assets/pic/Logo.png';
import Intro from './intro'; 
import wal from './assets/pic/วอลเปเปอร์.png'

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
      </Routes>
    </Router>
  );
}

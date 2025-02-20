import React from "react";
import "./style/intro.css" // นำไฟล์ CSS เข้ามาใช้
import logo from './assets/pic/Logobar.png'
import wal from './assets/pic/วอลเปเปอร์.png'
import { useNavigate } from 'react-router-dom';
import { FaHome } from 'react-icons/fa'; // ใช้ไอคอนจาก react-icons

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const goToRegister = () => {
    navigate('/register'); // ไปที่หน้า Register
  };

  return (
    <div className="Desktop-2">
    
      <div className="background"> 
      <img src={wal} className="waldesk" alt="wal" />
      </div>
      {/* navbar */}
            {/* Navbar */}
            <nav className="navbar">
        <div className="navbar-logo">
          <img src={logo} alt="Logo" />
          <h1 className="TRIPTRAP">TRIPTRAP</h1>
        </div>
        <div className="navbar-buttons">
          <button className="signin-btn"  >LOGIN</button>
          <button className="signup-btn"  onClick={goToRegister} > REGISTER </button>
          <button className="Ellipse-4" >  <FaHome /> </button>
        </div>
      </nav>

      {/* Hero Section */}
      <h2 className="WHATISTRIPTRAP">WHAT IS TRIPTRAP?</h2>
      
      <p className="intro-text">
      " เว็บไซต์แอปพลิเคชันที่ออกแบบมาเพื่อช่วยคุณวางแผนการเดินทางได้อย่างสะดวกและรวดเร็ว ไม่ว่าคุณจะกำลังมองหาวิธีเดินทางไปยังจุดหมาย รถที่ต้องใช้ ค่าโดยสาร เวลาเดินทาง หรือแม้กระทั่งสภาพจราจรในช่วงเทศกาล 
      เราใช้เทคโนโลยี AI และการวิเคราะห์ข้อมูลเพื่อมอบประสบการณ์ที่ดีที่สุด พร้อมทั้งฟีเจอร์แนะนำเส้นทางที่เหมาะสมที่สุดสำหรับคุณ... 🚗✨ "
      </p>

      {/* Image Grid Section */}
      <div className="image-grid">
      <div className="pic-header"> <img src="/4.png" alt="Logo" /></div>
        <div className="siampic">
        {/* <img src="/สยาม.png" alt="Logo" /> */}
        </div>
        <div className="benpark"></div>
        <div className="bantadthongstreet"></div>
        <div className="suanluuangpark"></div>
        <div className="iconsiam"></div>
        <div className="chinatow"></div>
      </div>

      {/* Footer Navigation */}
      <div className="Ellipse-4">
        <div className="ic:round-home"></div>
      </div>
    </div>
  );
};

export default HomePage;
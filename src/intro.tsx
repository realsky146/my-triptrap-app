import React from "react";
import { useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Box, Typography, Button, IconButton, Grid } from "@mui/material";
import { FaHome } from "react-icons/fa"; // ใช้ไอคอนจาก react-icons
import logo from "./assets/pic/Logobar.png";
import wal from "./assets/pic/วอลเปเปอร์.png";
import pichead from './assets/pic/4.png'
// Import รูปทั้งหมด
import img1 from "../src/assets/pic/IconSiam.jpeg";
import img2 from "../src/assets/pic/บรรทัดทอง.jpeg";
import img3 from "../src/assets/pic/สยาม.jpg";
import img4 from "../src/assets/pic/สวนป่าเบญจกิติ.webp";
import img5 from "../src/assets/pic/สวนหลวง.jpg";
import img6 from "../src/assets/pic/สวนเบญ.jpg";
import img7 from "../src/assets/pic/เยาวราช.jpeg";

const images = [img1, img2, img3, img4, img5, img6, img7];

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div>
      {/* Background */}
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100vh",
          backgroundImage: `url(${wal})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          zIndex: -99,
        }}
      >
        {/* Navbar */}
        <AppBar position="fixed" sx={{ backgroundColor: "rgba(138, 0, 0, 0.7)", zIndex: 1000 }}>
          <Toolbar>
            <Box display="flex" alignItems="center" flexGrow={1}>
              <img src={logo} alt="Logo" style={{ height: 40, marginRight: 10 }} />
              <Typography variant="h6">TRIPTRAP</Typography>
            </Box>
          </Toolbar>
        </AppBar>
        {/* Hero Section */}
       <Box
  sx={{
    maxWidth: 600,
    padding: 2,
    margin: "0 auto",
    marginTop: "80px", // เว้นที่ด้านบนจาก Navbar
    textAlign: "center",
  }}
>
  {/* เพิ่มรูปภาพในส่วนหัวข้อ */}
  <img
    src={pichead} // กำหนดเป็นรูปที่ต้องการแสดง
    alt="Triptrap Header"
    style={{
      display: "flex",
      width: "20%",
      height: "20%",
     
    }}
  />
  
  <Typography variant="h4" sx={{ fontWeight: "bold" }}>
    WHAT IS TRIPTRAP?
  </Typography>
  <Typography variant="body1">
    " เว็บไซต์แอปพลิเคชันที่ออกแบบมาเพื่อช่วยคุณวางแผนการเดินทางได้อย่างสะดวกและรวดเร็ว ไม่ว่าคุณจะกำลังมองหาวิธีเดินทางไปยังจุดหมาย รถที่ต้องใช้ ค่าโดยสาร เวลาเดินทาง หรือแม้กระทั่งสภาพจราจรในช่วงเทศกาล
    เราใช้เทคโนโลยี AI และการวิเคราะห์ข้อมูลเพื่อมอบประสบการณ์ที่ดีที่สุด พร้อมทั้งฟีเจอร์แนะนำเส้นทางที่เหมาะสมที่สุดสำหรับคุณ... 🚗✨ "
  </Typography>
</Box>

      </Box>

      {/* Image Grid Section */}
      <Grid container spacing={2} sx={{ justifyContent: "center", alignItems: "center", marginTop: "520px" }}>
  {Object.values(images).map((src, index) => (
    <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
      <Box
        sx={{
          width: "100%",
          height: "250px", // กำหนดความสูงให้เท่ากัน
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
          borderRadius: "8px",
          boxShadow: 3, // เพิ่มเงาให้ดูเด่นขึ้น
        }}
      >
        <img
          src={src}
          alt={`Image ${index + 1}`}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover", // ป้องกันการผิดสัดส่วนของภาพ
            borderRadius: "8px",
            zIndex:-98
          }}
        />
      </Box>
    </Grid>
  ))}
</Grid>


      {/* Footer Navigation */}
      <Box sx={{ textAlign: "center", padding: 2 }}>
        <IconButton color="inherit" onClick={() => navigate("/")}>
          <FaHome />
        </IconButton>

        <Box
          sx={{
            position: "fixed",
            top: 0,
            right: 0,
            padding: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <Button
            variant="outlined"
            onClick={() => navigate("/login")}
            sx={{ color: "white", borderColor: "white", marginRight: 1, cursor: "pointer" }}
          >
            LOGIN
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/register")}
            sx={{ cursor: "pointer" }}
          >
            REGISTER
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default HomePage;

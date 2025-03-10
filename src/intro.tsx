import React from "react";
import { useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Box, Typography, Button, IconButton, Paper, Grid } from "@mui/material";
import { FaHome } from "react-icons/fa";
import logo from "./assets/pic/Logobar.png";
import wal from "./assets/pic/วอลเปเปอร์.png";
import pichead from "./assets/pic/4.png";

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
      />

      {/* Navbar */}
      <AppBar position="fixed"
        sx={{
          backgroundColor: "rgba(138, 0, 0, 0.7)",
          zIndex: -1
        }}>
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
          margin: "100px auto 0",
          textAlign: "center",
        }}
      >
        <Paper
          elevation={0}
          sx={{
            p: 3,
            bgcolor: "transparent", // ไม่มีสีพื้นหลัง
            borderRadius: 2,
            textAlign: "center",
            marginTop: 20, // ขยับลง
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: "bold", fontFamily: "Kanit, sans-serif" }}>
            WHAT IS TRIPTRAP?
          </Typography>
          <Typography variant="body1" sx={{ fontFamily: "Kanit, sans-serif" }}>
            " เว็บไซต์แอปพลิเคชันที่ออกแบบมาเพื่อช่วยคุณวางแผนการเดินทางได้อย่างสะดวกและรวดเร็ว ไม่ว่าคุณจะกำลังมองหาวิธีเดินทางไปยังจุดหมาย
            รถที่ต้องใช้ ค่าโดยสาร เวลาเดินทาง หรือแม้กระทั่งสภาพจราจรในช่วงเทศกาล
            เราใช้เทคโนโลยี AI และการวิเคราะห์ข้อมูลเพื่อมอบประสบการณ์ที่ดีที่สุด พร้อมทั้งฟีเจอร์แนะนำเส้นทางที่เหมาะสมที่สุดสำหรับคุณ... 🚗✨ "
          </Typography>

          {/* โลโก้ใต้ข้อความ */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 2, // เว้นระยะห่างจากข้อความด้านบน
            }}
          >
            <img
              src={pichead}
              alt="Triptrap Header"
              style={{
                width: "100px",
                height: "100px",
              }}
            />
          </Box>
        </Paper>
      </Box>

      {/* Image Grid Section */}
      <Grid container spacing={2} sx={{ justifyContent: "center", marginTop: "50px", padding: 3 }}>
        {images.map((src, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Box
              sx={{
                width: "100%",
                height: "250px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                overflow: "hidden",
                borderRadius: "8px",
                boxShadow: 3,
                zIndex: 5,
              }}
            >
              <img
                src={src}
                alt={`Image ${index + 1}`}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "8px",
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

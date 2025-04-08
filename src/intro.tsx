import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { AppBar, Toolbar, Box, Typography, Button, IconButton, Paper, Grid } from "@mui/material";
import { FaHome } from "react-icons/fa";
import logo from "./assets/pic/Logobar.png";
import pichead from "./assets/pic/4.png";
import img1 from "../src/assets/pic/IconSiam.jpeg";
import img2 from "../src/assets/pic/บรรทัดทอง.jpeg";
import img3 from "../src/assets/pic/สยาม.jpg";
import img4 from "../src/assets/pic/สวนป่าเบญจกิติ.webp";
import img5 from "../src/assets/pic/สวนหลวง.jpg";
import img6 from "../src/assets/pic/สวนเบญ.jpg";
import img7 from "../src/assets/pic/เยาวราช.jpeg";
import wal from "./assets/pic/วอลเปเปอร์.png"; // ✅ Fixed missing import

const images = [img1, img2, img3, img4, img5, img6, img7];

export default function HomePage() {
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Box sx={{ position: "relative", overflow: "hidden" }}>
      <Paper
        elevation={0}
        sx={{
          p: 3,
          bgcolor: "transparent",
          borderRadius: 2,
          textAlign: "center",
          marginTop: 50,
          position: "relative",
          zIndex: 10,
        }}
      >
        <Typography
          variant="h3"
          sx={{ fontWeight: "bold", fontFamily: "Roboto, sans-serif", fontSize: "2.5rem" }}
        >
          WHAT IS TRIPTRAP?
        </Typography>

        <Typography
          variant="body1"
          sx={{
            fontFamily: "Kanit, sans-serif",
            fontSize: "1rem",
            textAlign: "center",
            marginTop: 3,
            whiteSpace: "normal" // ข้อความจะขึ้นบรรทัดใหม่ตามขนาดกล่อง
          }}
        >
          " เว็บไซต์แอปพลิเคชันที่ออกแบบมาเพื่อช่วยคุณวางแผนการเดินทางได้อย่างสะดวกและรวดเร็ว ไม่ว่าคุณจะกำลังมองหาวิธีเดินทางไปยังจุดหมาย รถที่ต้องใช้ ค่าโดยสาร เวลาเดินทาง หรือแม้กระทั่งสภาพจราจรในช่วงเทศกาล เราใช้เทคโนโลยี AI และการวิเคราะห์ข้อมูลเพื่อมอบประสบการณ์ที่ดีที่สุด พร้อมทั้งฟีเจอร์แนะนำเส้นทางที่เหมาะสมที่สุดสำหรับคุณ... 🚗✨ "
        </Typography>



        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: -5 }}>
          <img src={pichead} alt="Triptrap Header" style={{ width: "50%", maxWidth: "300px", height: "auto" }} />
        </Box>

      </Paper>
      <div className="background">
        <img src={wal} className="waldesk" alt="wal" />
      </div>

      {/* Navbar */}
      <AppBar position="fixed"
        sx={{
          backgroundColor: "rgba(138, 0, 0, 0.7)",
          zIndex: 1000 // ✅ Ensure navbar stays above content
        }}>
        <Toolbar>
          <Box display="flex" alignItems="center" flexGrow={1}>
            <img src={logo} alt="Logo" style={{ height: 40, marginRight: 10 }} />
            <Typography variant="h6">TRIPTRAP</Typography>
          </Box>
        </Toolbar>
      </AppBar>
      <Grid container spacing={2} sx={{ justifyContent: "center", marginTop: "-160px", padding: 3 }}>
        {images.map((src, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: Math.max(0, 100 - scrollY * 0.5), opacity: 1 }}
              transition={{ type: "spring", stiffness: 50 }}
              style={{
                width: "100%",
                height: "250px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                overflow: "hidden",
                borderRadius: "8px",
                zIndex: 5,
              }}
            >
              <img src={src} alt={`Image ${index + 1}`} style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "8px" }} />
            </motion.div>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ textAlign: "center", padding: 2, }}>
        <IconButton color="inherit" onClick={() => navigate("/")}> <FaHome /> </IconButton>

        <Box sx={{ position: "fixed", top: 0, right: 0, padding: 2, display: "flex", alignItems: "center", justifyContent: "flex-end", zIndex: 200000, }}>
          <Button variant="outlined" onClick={() => navigate("/login")} sx={{ color: "white", borderColor: "white", marginRight: 1, cursor: "pointer" }}> LOGIN </Button>
          <Button variant="contained" color="primary" onClick={() => navigate("/register")} sx={{ cursor: "pointer" }}> REGISTER </Button>
        </Box>
      </Box>
    </Box>
  );

  // สวัสดีจ้า
}

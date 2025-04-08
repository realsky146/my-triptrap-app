import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import BackToIntroButton from "../../components/BackToIntroButton";
import wal from "../../assets/pic/วอลเปเปอร์.png";

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleStart = async () => {
    // ส่งข้อมูลไปยัง backend
    try {
      const response = await fetch('http://localhost/myapp/login.php', { // URL ของ PHP Backend
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok) {
        alert("Login สำเร็จ!");
        navigate("/profile"); // ถ้า login สำเร็จ ไปหน้า profile
      } else {
        alert(`เกิดข้อผิดพลาด: ${data.message}`);
      }
    } catch (error) {
      console.error(error);
      alert("เกิดข้อผิดพลาดในการเชื่อมต่อกับเซิร์ฟเวอร์");
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100vh",
        backgroundImage: `url(${wal})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Container
        maxWidth="xs"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          bgcolor: "rgba(255, 255, 255, 0.8)",
          p: 3,
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography variant="h4" gutterBottom sx={{ color: "black" }}>
          Login
        </Typography>

        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          onClick={handleStart}
        >
          START
        </Button>

        <Box mt={2}>
          <BackToIntroButton />
        </Box>
      </Container>
    </Box>
  );
};

export default Login;

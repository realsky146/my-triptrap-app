import React from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import BackToIntroButton from "../../components/BackToIntroButton";
import wal from "../../assets/pic/วอลเปเปอร์.png";

const Login: React.FC = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/profile");
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
          bgcolor: "rgba(255, 255, 255, 0.8)", // พื้นหลังใสเพื่อให้อ่านง่ายขึ้น
          p: 3,
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography variant="h4" gutterBottom sx={{ color: "black" }}>
          Login
        </Typography>

        <TextField label="Username" variant="outlined" fullWidth margin="normal" />
        <TextField label="Password" type="password" variant="outlined" fullWidth margin="normal" />
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

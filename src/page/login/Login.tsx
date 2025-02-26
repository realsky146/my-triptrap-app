import React from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Container, Typography } from "@mui/material";
import BackToIntroButton from "../../components/BackToIntroButton";

const Login: React.FC = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/profile");
  };

  return (
    <Container
      maxWidth="xs"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        textAlign: "center",
      }}
    >
      <Typography variant="h4" gutterBottom>
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
      <BackToIntroButton />
    </Container>
  );
};

export default Login;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Typography, Box, Paper, Divider } from '@mui/material';
import BackToIntroButton from '../../components/BackToIntroButton';
import wal from "../../assets/pic/วอลเปเปอร์.png"; // ใส่ path ของวอลเปเปอร์
const Register: React.FC = () => {
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate('/login');
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
      <Paper elevation={3} sx={{ p: 4, width: 400, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Register
        </Typography>
        <Divider sx={{ mb: 2 }} />
        
        <TextField fullWidth label="Username" variant="outlined" margin="normal" />
        <TextField fullWidth label="Password" type="password" variant="outlined" margin="normal" />
        <TextField fullWidth label="Confirm Password" type="password" variant="outlined" margin="normal" />
        
        <Typography variant="body2" sx={{ my: 2 }}>
          Or login with Google
        </Typography>
        
        <Button fullWidth variant="contained" color="primary" onClick={goToLogin}>
          Login
        </Button>
        
        <Box mt={2}>
          <BackToIntroButton />
        </Box>
      </Paper>
    </Box>
  );
};

export default Register;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, Button, Container, TextField, Typography, Box } from "@mui/material";
import wal from "../../assets/pic/วอลเปเปอร์.png"; // ใส่ path ของวอลเปเปอร์
import { mockUserData } from "../../data/mockUserData"; // นำเข้าข้อมูล mock
import { ButtonGroup } from "@mui/material";
import { Edit, Save, Logout } from "@mui/icons-material";

const Profile: React.FC = () => {
  const [user, setUser] = useState(mockUserData);
  const [image, setImage] = useState<string | null>(null); // เก็บข้อมูลรูปโปรไฟล์
  const navigate = useNavigate();

  // ฟังก์ชันอัปโหลดรูป
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      {/* พื้นหลังเต็มจอ */}
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
          zIndex: -1, // ทำให้เป็นพื้นหลังจริงๆ
        }}
      />

      {/* คอนเทนต์โปรไฟล์ */}
      <Container
        maxWidth="sm"
        sx={{
          bgcolor: "#f7ffbb", // ทำให้โปร่งแสงเล็กน้อย
          padding: 4,
          borderRadius: 3,
          boxShadow: 3,
          textAlign: "center",
          mt: 5, // ขยับลงให้สวย
        }}
      >
        <Typography variant="h4" gutterBottom>
          Profile
        </Typography>

        {/* ส่วนอัปโหลดรูปโปรไฟล์ */}
        <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
          <Avatar
            src={image || user.profileImage}
            sx={{ width: 100, height: 100, mb: 2 }}
          />
          <Button variant="contained" component="label" color="info">
            Upload Photo
            <input type="file" hidden accept="image/*" onChange={handleImageChange} />
          </Button>
        </Box>

        {/* ฟอร์มข้อมูล */}
        <TextField fullWidth margin="normal" label="Name - Lastname" defaultValue={user.fullName} />
        <TextField fullWidth margin="normal" label="Username" defaultValue={user.username} />
        <TextField fullWidth margin="normal" label="E-mail" type="email" defaultValue={user.email} />
        <TextField fullWidth margin="normal" label="Phone" type="tel" />
        <TextField fullWidth margin="normal" label="Password" type="password" />
        <TextField fullWidth margin="normal" label="Confirm Password" type="password" />

        {/* ปุ่มต่างๆ */}
        <Box mt={2} display="flex" justifyContent="space-between">
          <Button variant="outlined" color="warning">
            Edit Profile
          </Button>
          <Button variant="contained" color="success">
            Save Changes
          </Button>
          <Button variant="contained" color="error" onClick={() => navigate("/")}>
            Logout
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default Profile;

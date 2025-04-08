import React, { useState } from "react";
import { Button, Box, Typography, IconButton, Paper, TextField } from "@mui/material";
import { ArrowBack, ArrowForward, Search, Settings } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import wal from "../../assets/pic/วอลเปเปอร์.png";
import FileUploadButton from "@/components/FileUploadButton";
import { FaHome } from "react-icons/fa";
import TrafficSettingsPopup from "@/components/TrafficSettingsPopup";
import { Send } from "lucide-react";
import { History } from "@mui/icons-material";
import SearchHistoryButton from "@/components/SearchHistoryButton";

const TripTrapUI: React.FC = () => {
    const navigate = useNavigate();
    const [inputText, setInputText] = useState(""); // State สำหรับช่องพิมพ์
    const [fileAttached, setFileAttached] = useState(false); // สถานะของไฟล์ที่แนบ
    const [openPopup, setOpenPopup] = useState(false); // เพิ่ม state ควบคุมป๊อปอัพ
    const [openSearcHistor, setOpenSearchPopup] = useState(false); // Popup state for search

    const handleFileSelect = (fileName: string) => {
        setInputText(fileName); // กำหนดชื่อไฟล์ในช่องข้อความ
        setFileAttached(true); // ตั้งค่าสถานะว่าไฟล์ถูกแนบแล้ว
    };

    const handleSendClick = () => {
        // จัดการกับการคลิกปุ่มส่ง
        console.log("ข้อความถูกส่ง:", inputText);
    };

    function setSearchHistory(arg0: boolean): void {
        throw new Error("Function not implemented.");
    }

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

            <Paper
                elevation={3}
                sx={{
                    width: 550,
                    p: 3,
                    bgcolor: "#8B1E1E",
                    borderRadius: 5,
                    textAlign: "center",
                    position: "relative",
                }}
            >
                {/* Search Bar */}
                <Box
                    display="flex"
                    alignItems="center"
                    bgcolor="#AA3939"
                    borderRadius={5}
                    px={2}
                    py={1}
                >
                    <Search sx={{ color: "white", opacity: 0.7 }} />
                    <TextField
                        fullWidth
                        placeholder="Search Maps"
                        variant="standard"
                        InputProps={{
                            disableUnderline: true,
                            sx: { color: "white", ml: 1 },
                        }}
                        sx={{ bgcolor: "transparent", flex: 1 }}
                    />
                    <Typography color="#FFBA65" sx={{ fontSize: 16, fontWeight: 500, cursor: "pointer" }}>
                        Cancel
                    </Typography>
                </Box>

                {/* TripTrap Logo */}
                <Typography variant="h4" color="white" fontWeight="bold" mt={2} gutterBottom>
                    TRIPTRAP...
                </Typography>

                {/* Input Box */}
                <Paper
                    elevation={0}
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        px: 2,
                        py: 1,
                        my: 2,
                        borderRadius: 3,
                        bgcolor: "#fff",
                        position: "relative",
                    }}
                >
                    <TextField
                        fullWidth
                        value={inputText} // แสดงค่าที่แนบไฟล์
                        onChange={(e) => setInputText(e.target.value)} // อัปเดตข้อความ
                        placeholder="มีอะไรให้เราช่วยหรือเปล่า..."
                        variant="standard"
                        InputProps={{
                            disableUnderline: true,
                            sx: { ml: 2, color: "black", opacity: 0.7 },
                        }}
                        sx={{ bgcolor: "transparent", flex: 1 }}
                    />

                    {/* การแสดงปุ่มตามสถานะว่าไฟล์ถูกแนบหรือไม่ */}
                    {fileAttached ? (
                        <IconButton onClick={handleSendClick}>
                            <Send /> {/* เปลี่ยนเป็นไอคอน "ส่ง" หรือไอคอนที่เหมาะสม */}
                        </IconButton>
                    ) : (
                        <FileUploadButton onFileSelect={handleFileSelect} />
                    )}
                    <IconButton onClick={() => setOpenPopup(true)}>
                        <Settings sx={{ color: "#757575" }} />
                    </IconButton>
                </Paper>

                {/* Let's Go Button */}
                <Button
                    variant="contained"
                    sx={{
                        width: "100%",
                        height: 50,
                        bgcolor: "#F4A2A2",
                        borderRadius: 3,
                        fontSize: 20,
                        color: "#B70202",
                        textTransform: "none",
                    }}
                    onClick={() => navigate("/home")}
                >
                    LET’S GO
                </Button>
            </Paper>


            {/* Navigation Buttons */}
            <Box position="absolute" display="flex" width="100%" justifyContent="space-between" bottom={20} px={5}>

                {/* ปุ่มประวัติการค้นหา */}
                <SearchHistoryButton />

                {/* ปุ่มย้อนกลับ */}
                <IconButton
                    sx={{
                        width: 50,
                        height: 50,
                        bgcolor: "#ffffff",
                        borderRadius: "50%",
                        boxShadow: 2,
                        ml: 3,
                    }}
                >
                    <ArrowBack fontSize="large" />
                </IconButton>

                {/* ปุ่มกลับหน้า Home */}
                <IconButton
                    sx={{
                        width: 50,
                        height: 50,
                        position: "fixed",
                        bottom: 20,
                        left: "50%",
                        transform: "translateX(-50%)",
                        zIndex: 1000,
                    }}
                    onClick={() => navigate("/")}
                >
                    <FaHome size={24} color="#000" />
                </IconButton>

                {/* ปุ่มไปข้างหน้า */}
                <IconButton
                    sx={{
                        width: 50,
                        height: 50,
                        bgcolor: "#ffffff",
                        borderRadius: "50%",
                        boxShadow: 2,
                        mr: 3,
                    }}
                >
                    <ArrowForward fontSize="large" />
                </IconButton>
            </Box>

            {/* เรียกใช้ป๊อปอัพ */}
            <TrafficSettingsPopup open={openPopup} setOpen={setOpenPopup} />
        </Box>
    );
};

export default TripTrapUI;

// เช็คๆ
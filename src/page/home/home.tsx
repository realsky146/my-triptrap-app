import React from "react";
import { Button, Box, Typography, IconButton, Paper, TextField, Container } from "@mui/material";
import { Home, History, Search } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import BackToIntroButton from "../../components/BackToIntroButton";
import wal from "../../assets/pic/วอลเปเปอร์.png";

const TripTrapUI: React.FC = () => {
    const navigate = useNavigate();

    const handleStart = () => {
        navigate("/home");
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
            {/* Main Content */}
            <Paper Paper
                elevation={3}
                sx={{
                    width: 600,
                    p: 4,
                    bgcolor: "rgba(255, 255, 255, 0.9)",
                    borderRadius: 5,
                    textAlign: "center",
                }}
            >
                {/* TripTrap Title */}
                <Typography variant="h4" color="#942121" gutterBottom>
                    TRIPTRAP...
                </Typography>

                {/* Search Bar */}
                <Paper
                    elevation={2}
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        px: 2,
                        py: 1,
                        my: 2,
                        opacity: 0.8,
                        borderRadius: 3,
                        bgcolor: "#f0f0f0",
                    }}
                >
                    <Search sx={{ opacity: 0.7 }} />
                    <Typography ml={2} color="black" sx={{ opacity: 0.7, fontSize: 18 }}>
                        Search Maps
                    </Typography>
                    <Typography ml="auto" color="#FFBA65" sx={{ fontSize: 18, fontWeight: 500, cursor: "pointer" }}>
                        Cancel
                    </Typography>
                </Paper>

                {/* Help Box */}
                <Typography color="rgba(0, 0, 0, 0.6)" fontSize={20} my={2}>
                    มีอะไรให้เราช่วยหรือเปล่า...
                </Typography>

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
                    onClick={handleStart}
                >
                    LET’S GO
                </Button>
            </Paper>

            {/* Navigation Buttons */}
            <Box position="absolute" bottom={20} left={20} display="flex" gap={2}>
                <IconButton sx={{ width: 60, height: 60, bgcolor: "#ffffff88", borderRadius: "50%" }}>
                    <History fontSize="large" />
                </IconButton>
                <IconButton sx={{ width: 60, height: 60, bgcolor: "#ffffff88", borderRadius: "50%" }}>
                    <Home fontSize="large" />
                </IconButton>
            </Box>
        </Box >
    );
};

export default TripTrapUI;

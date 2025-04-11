import React, { useState, useEffect, useRef } from "react";
import {
  Button,
  Box,
  Typography,
  IconButton,
  TextField,
  Paper,
} from "@mui/material";
import { Home, History, Search } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import wal from "../../assets/pic/วอลเปเปอร์.png";
import ChatbotIcon from "@/components/ChatbotIcon";
import ChatForm from "@/components/ChatForm";
import ChatMessage from "@/components/ChatMessage";
import { locationInfo as locationFromFile } from "@/page/home/location";
import "@/page/home/index.css";
import InfoBox from "@/components/InfoBox"; // ✅ ใช้ InfoBox ที่คุณสร้างไว้

const TripTrapUI = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState(null);
  const [coordinates, setCoordinates] = useState(null);
  const [currentPosition, setCurrentPosition] = useState(null);
  const [distance, setDistance] = useState(null);
  const [trafficDelay, setTrafficDelay] = useState(null);
  const [travelTime, setTravelTime] = useState(null);
  const [locationInfo, setLocationInfo] = useState("กำลังดึงข้อมูลตำแหน่งของคุณ...");
  const [chatHistory, setChatHistory] = useState([]);
  const [showChatbot, setShowChatbot] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [arrivalTime, setArrivalTime] = useState(null);
  const chatBodyRef = useRef();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentPosition({ lat: latitude, lon: longitude });
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
          );
          const data = await res.json();
          const locationText = data.display_name
            ? `ตอนนี้คุณอยู่ใกล้: ${data.display_name}`
            : `พิกัด: ละติจูด ${latitude.toFixed(4)}, ลองจิจูด ${longitude.toFixed(4)}`;
          setLocation(data.display_name);
          setLocationInfo(locationText);
        } catch (err) {
          console.error(err);
          setLocation("ไม่สามารถดึงตำแหน่งได้");
          setLocationInfo("ไม่สามารถดึงชื่อสถานที่ได้");
        }
      },
      (error) => {
        console.error(error);
        setLocation("ไม่สามารถดึงตำแหน่งได้");
        setLocationInfo("ไม่สามารถดึงตำแหน่งของคุณได้");
      }
    );
  }, []);

  useEffect(() => {
    const combinedLocationInfo = `${locationInfo}\n\n${locationFromFile}`;
    setChatHistory((prev) => [
      ...prev.filter((msg) => msg.role !== "model" || !msg.hideInChat),
      { role: "model", text: combinedLocationInfo, hideInChat: true },
    ]);
  }, [locationInfo]);

  useEffect(() => {
    if (travelTime !== null) {
      const arrival = new Date();
      arrival.setMinutes(arrival.getMinutes() + travelTime);
      setArrivalTime(arrival);
    }
  }, [travelTime]);

  const generateBotResponse = async (history) => {
    const updateHistory = (text) => {
      setChatHistory((prev) => [
        ...prev.filter((msg) => msg.text !== "..."),
        { role: "model", text },
      ]);
    };

    history = history.map(({ role, text }) => ({ role, parts: [{ text }] }));
    try {
      const response = await fetch(import.meta.env.VITE_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents: history }),
      });
      const data = await response.json();
      const text = data.candidates[0].content.parts[0].text
        .replace(/\*\*(.*?)\*\*/g, "$1")
        .trim();
      updateHistory(text);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearchChange = (e) => setSearchQuery(e.target.value);
  const handleCancel = () => setSearchQuery("");

  const handleStart = () => {
    if (!searchQuery) return alert("กรุณากรอกชื่อที่อยู่");

    fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${searchQuery}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (!data.length) {
          alert("ไม่พบข้อมูลที่อยู่");
          return setCoordinates(null);
        }

        const { lat, lon } = data[0];
        const latNum = parseFloat(lat);
        const lonNum = parseFloat(lon);
        setCoordinates({ lat: latNum, lon: lonNum });

        if (currentPosition) {
          calculateDistanceAndTraffic(
            currentPosition.lat,
            currentPosition.lon,
            latNum,
            lonNum
          );
        }
      })
      .catch((err) => {
        console.error("Error fetching location data: ", err);
        setCoordinates(null);
      });
  };

  const calculateDistanceAndTraffic = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    setDistance(R * c);

    fetch(
      `https://api.tomtom.com/routing/1/calculateRoute/${lat1},${lon1}:${lat2},${lon2}/json?key=2JFifh1oEBskiT2PJT9bgJYgztkrqRkb`
    )
      .then((res) => res.json())
      .then((data) => {
        const summary = data.routes[0].summary;
        setTravelTime(summary.travelTimeInSeconds / 60);
        setTrafficDelay(summary.trafficDelayInSeconds / 60);
      })
      .catch((err) => {
        console.error("Error fetching traffic data: ", err);
        setTravelTime(0);
        setTrafficDelay(0);
      });
  };

  const toRad = (deg) => (deg * Math.PI) / 180;

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      sx={{
        backgroundImage: `url(${wal})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: 600,
          p: 4,
          bgcolor: "rgba(255, 255, 255, 0.95)",
          borderRadius: 5,
          textAlign: "center",
        }}
      >
        <Typography
          variant="h4"
          color="#B70202"
          fontFamily="'Kanit', sans-serif"
          fontWeight={600}
          gutterBottom
        >
          TRIPTRAP
        </Typography>

        {/* Search Box */}
        <Paper
          elevation={1}
          sx={{
            display: "flex",
            alignItems: "center",
            px: 2,
            py: 1,
            my: 2,
            borderRadius: 3,
            bgcolor: "#FFF7F0",
          }}
        >
          <Search sx={{ opacity: 0.6 }} />
          <TextField
            variant="standard"
            placeholder="พิมพ์ที่อยู่ที่คุณอยากไป..."
            fullWidth
            value={searchQuery}
            onChange={handleSearchChange}
            sx={{
              ml: 2,
              fontSize: 18,
              "& .MuiInputBase-root": {
                fontFamily: "'Kanit', sans-serif",
              },
            }}
            InputProps={{
              disableUnderline: true,
            }}
          />
          <Typography
            ml="auto"
            color="#FF9E80"
            sx={{
              cursor: "pointer",
              fontSize: 18,
              "& .MuiInputBase-root": {
                fontFamily: "'Kanit', sans-serif",
              },
            }}
            onClick={handleCancel}
          >
            ยกเลิก
          </Typography>
        </Paper>

        {/* Let’s Go Button */}
        <Button
          variant="contained"
          onClick={handleStart}
          sx={{
            width: "100%",
            height: 50,
            bgcolor: "#FFD3B6",
            borderRadius: 3,
            fontSize: 20,
            color: "#B70202",
            fontWeight: 600,
            textTransform: "none",
          }}
        >
          LET’S GO 🐾
        </Button>

        {/* Info Section */}
        {location && <InfoBox>📍 ตำแหน่งปัจจุบันของคุณ: {location}</InfoBox>}
        {coordinates && (
          <InfoBox>🗺️ พิกัดที่ค้นหา: Lat: {coordinates.lat}, Lon: {coordinates.lon}</InfoBox>
        )}
        {distance !== null && (
          <InfoBox>🚗 ระยะทาง: {distance.toFixed(2)} กม.</InfoBox>
        )}
        {trafficDelay !== null && (
          <InfoBox>⏱️ เวลาชะลอตัวจากจราจร: {trafficDelay.toFixed(2)} นาที</InfoBox>
        )}
        {travelTime !== null && (
          <InfoBox>🕒 เวลาเดินทางโดยประมาณ: {travelTime.toFixed(2)} นาที</InfoBox>
        )}
        <InfoBox>
          ⏰ เวลาปัจจุบัน:{" "}
          {currentTime.toLocaleTimeString("th-TH", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </InfoBox>
        {arrivalTime && (
          <InfoBox>
            🎯 เวลาที่ถึงโดยประมาณ:{" "}
            {arrivalTime.toLocaleTimeString("th-TH", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </InfoBox>
        )}

        {/* Chatbot & Buttons */}
        <Box position="absolute" bottom={20} left={20} display="flex" gap={2}>
          <IconButton
            sx={{ width: 60, height: 60, bgcolor: "#ffffffaa", borderRadius: "50%" }}
          >
            <History fontSize="large" />
          </IconButton>
          <IconButton
            sx={{ width: 60, height: 60, bgcolor: "#ffffffaa", borderRadius: "50%" }}
          >
            <Home fontSize="large" />
          </IconButton>
        </Box>

        {/* Chatbot Section */}
        <div className={`container ${showChatbot ? "show-chatbot" : ""}`}>
          <button onClick={() => setShowChatbot((prev) => !prev)} id="chatbot-toggler">
            <span className="material-symbols-outlined">mode_comment</span>
            <span className="material-symbols-outlined">close</span>
          </button>

          <div className="chatbot-popup">
            <div className="chat-header">
              <div className="header-info">
                <ChatbotIcon />
                <h2 className="logo-text">TRIPTRAP</h2>
              </div>
              <button
                onClick={() => setShowChatbot((prev) => !prev)}
                className="material-symbols-outlined"
              >
                keyboard_arrow_down
              </button>
            </div>

            <div ref={chatBodyRef} className="chat-body">
              <div className="message bot-message">
                <ChatbotIcon />
                <p className="message-text">
                  สวัสดีเหมียว <br /> วันนี้มีอะไรให้ช่วยไหมเหมียว
                </p>
              </div>

              {chatHistory.map((chat, index) => (
                <ChatMessage key={index} chat={chat} />
              ))}
            </div>

            <div className="chat-footer">
              <ChatForm
                chatHistory={chatHistory}
                setChatHistory={setChatHistory}
                generateBotResponse={generateBotResponse}
              />
            </div>
          </div>
        </div>
      </Paper>
    </Box>
  );
};

export default TripTrapUI;

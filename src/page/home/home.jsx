import React, { useState, useEffect, useRef } from "react";
import { Button, Box, Typography, IconButton, TextField, Paper } from "@mui/material";
import { Home, History, Search } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import wal from "../../assets/pic/วอลเปเปอร์.png";
import ChatbotIcon from "@/components/ChatbotIcon";
import ChatForm from "@/components/ChatForm";
import ChatMessage from "@/components/ChatMessage";
import { locationInfo as locationFromFile } from "@/page/home/location"; 
import "@/page/home/index.css";

const TripTrapUI = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState(""); // สำหรับเก็บคำค้นหาจาก TextField
  const [location, setLocation] = useState(null); // เก็บตำแหน่งปัจจุบันของผู้ใช้
  const [coordinates, setCoordinates] = useState(null); // พิกัดของตำแหน่งที่ผู้ใช้กรอก
  const [currentPosition, setCurrentPosition] = useState(null); // เก็บตำแหน่งปัจจุบัน
  const [distance, setDistance] = useState(null); // เก็บระยะทาง
  const [trafficDelay, setTrafficDelay] = useState(null); // เก็บเวลาชะลอตัวจากจราจร
  const [travelTime, setTravelTime] = useState(null); // เก็บเวลาเดินทาง
  const [locationInfo, setLocationInfo] = useState("กำลังดึงข้อมูลตำแหน่งของคุณ...");
  const [chatHistory, setChatHistory] = useState([]);
  const [showChatbot, setShowChatbot] = useState(false);
  const chatBodyRef = useRef();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          setCurrentPosition({ lat, lon }); // เซ็ตพิกัดตำแหน่งปัจจุบัน

          fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`)
            .then((response) => response.json())
            .then((data) => {
              setLocation(data.display_name); // แสดงชื่อที่อยู่จากตำแหน่งของผู้ใช้
            })
            .catch((error) => {
              console.error("Error fetching location data: ", error);
              setLocation("ไม่สามารถดึงตำแหน่งได้");
            });
        },
        (error) => {
          console.error("Error getting location: ", error);
          setLocation("ไม่สามารถดึงตำแหน่งได้");
        }
      );
    } else {
      setLocation("เบราว์เซอร์ไม่รองรับตำแหน่ง");
    }
  }, []);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`);
          const data = await res.json();

          const locationText = data.display_name
            ? `ตอนนี้คุณอยู่ใกล้: ${data.display_name}`
            : `พิกัด: ละติจูด ${latitude.toFixed(4)}, ลองจิจูด ${longitude.toFixed(4)}`;

          setLocationInfo(locationText);
        } catch (err) {
          console.error(err);
          setLocationInfo("ไม่สามารถดึงชื่อสถานที่ได้");
        }
      },
      (error) => {
        console.error(error);
        setLocationInfo("ไม่สามารถดึงตำแหน่งของคุณได้");
      }
    );
  }, []);

  useEffect(() => {
    const combinedLocationInfo = `${locationInfo}\n\n${locationFromFile}`;
    setChatHistory((prev) => [
      ...prev.filter((msg) => msg.role !== "model" || !msg.hideInChat),
      { role: "model", text: combinedLocationInfo, hideInChat: true }
    ]);
  }, [locationInfo]);

  const generateBotResponse = async (history) => {
    const updateHistory = (text) => {
      setChatHistory((prev) =>
        [...prev.filter(msg => msg.text !== "..."), { role: "model", text }]
      );
    };

    history = history.map(({ role, text }) => ({ role, parts: [{ text }] }));
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: history })
    };

    try {
      const response = await fetch(import.meta.env.VITE_API_URL, requestOptions);
      const data = await response.json();
      if (!response.ok) throw new Error(data.error.message || "มีบางอย่างผิดพลาด");

      const apiResponseText = data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g, "$1").trim();
      updateHistory(apiResponseText);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTo({ top: chatBodyRef.current.scrollHeight, behavior: "smooth" });
    }
  }, [chatHistory]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value); // อัปเดตค่า searchQuery เมื่อผู้ใช้กรอก
  };

  const handleCancel = () => {
    setSearchQuery(""); // เคลียร์ค่าเมื่อผู้ใช้คลิก "Cancel"
  };

  const handleStart = () => {
    if (searchQuery) {
      fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${searchQuery}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.length > 0) {
            const lat = parseFloat(data[0].lat);
            const lon = parseFloat(data[0].lon);
            setCoordinates({ lat, lon });

            // คำนวณระยะทางและจราจรระหว่างตำแหน่งปัจจุบันและตำแหน่งที่ผู้ใช้ค้นหา
            if (currentPosition) {
              calculateDistanceAndTraffic(currentPosition.lat, currentPosition.lon, lat, lon);
            }
          } else {
            alert("ไม่พบข้อมูลที่อยู่");
            setCoordinates(null);
          }
        })
        .catch((error) => {
          console.error("Error fetching location data: ", error);
          setCoordinates(null);
        });
    } else {
      alert("กรุณากรอกชื่อที่อยู่");
    }
  };

  // คำนวณระยะทางและเวลาในการเดินทางจากตำแหน่งปัจจุบันไปยังตำแหน่งที่ค้นหา
  const calculateDistanceAndTraffic = (lat1, lon1, lat2, lon2) => {
    // คำนวณระยะทางระหว่างตำแหน่งปัจจุบันและตำแหน่งที่ค้นหา
    const R = 6371; // รัศมีของโลก (กิโลเมตร)
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // ระยะทางในกิโลเมตร
    setDistance(distance);

    // ใช้ TomTom Directions API เพื่อคำนวณเส้นทางและข้อมูลจราจร
    const apiKey = '2JFifh1oEBskiT2PJT9bgJYgztkrqRkb';
    const routeUrl = `https://api.tomtom.com/routing/1/calculateRoute/${lat1},${lon1}:${lat2},${lon2}/json?key=${apiKey}`;

    fetch(routeUrl)
      .then((response) => response.json())
      .then((data) => {
        const travelTimeInSeconds = data.routes[0].summary.travelTimeInSeconds; // เวลาเดินทาง (วินาที)
        const trafficDelayInSeconds = data.routes[0].summary.trafficDelayInSeconds; // เวลาชะลอตัวจากจราจร (วินาที)
        setTravelTime(travelTimeInSeconds / 60); // แปลงเวลาเดินทางเป็นนาที
        setTrafficDelay(trafficDelayInSeconds / 60); // แปลงเวลาชะลอตัวเป็นนาที
      })
      .catch((error) => {
        console.error("Error fetching traffic data: ", error);
        setTravelTime(0);
        setTrafficDelay(0);
      });
  };

  // ฟังก์ชันแปลงองศาเป็นเรเดียน
  const toRad = (degrees) => {
    return degrees * Math.PI / 180;
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
      <Paper
        elevation={3}
        sx={{
          width: 600,
          p: 4,
          bgcolor: "rgba(255, 255, 255, 0.9)",
          borderRadius: 5,
          textAlign: "center",
        }}
      >
        <Typography variant="h4" color="#942121" gutterBottom>
          TRIPTRAP...
        </Typography>

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

          <TextField
            variant="outlined"
            placeholder="Enter address"
            fullWidth
            value={searchQuery}
            onChange={handleSearchChange}
            sx={{ ml: 2, opacity: 0.7, fontSize: 18 }}
          />

          <Typography
            ml="auto"
            color="#FFBA65"
            sx={{ fontSize: 18, fontWeight: 500, cursor: "pointer" }}
            onClick={handleCancel}
          >
            Cancel
          </Typography>
        </Paper>

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

        {location && (
          <Typography color="rgba(0, 0, 0, 0.7)" fontSize={18} my={2}>
            ตำแหน่งปัจจุบันของคุณ: {location}
          </Typography>
        )}

        {coordinates && (
          <Typography color="rgba(0, 0, 0, 0.7)" fontSize={18} my={2}>
            พิกัดของที่อยู่ที่ค้นหา: Lat: {coordinates.lat}, Lon: {coordinates.lon}
          </Typography>
        )}

        {distance !== null && (
          <Typography color="rgba(0, 0, 0, 0.7)" fontSize={18} my={2}>
            ระยะทาง: {distance.toFixed(2)} กิโลเมตร
          </Typography>
        )}

        {trafficDelay !== null && (
          <Typography color="rgba(0, 0, 0, 0.7)" fontSize={18} my={2}>
            เวลาเพิ่มเติมจากจราจร: {trafficDelay.toFixed(2)} นาที
          </Typography>
        )}

        {travelTime !== null && (
          <Typography color="rgba(0, 0, 0, 0.7)" fontSize={18} my={2}>
            เวลาเดินทาง: {travelTime.toFixed(2)} นาที
          </Typography>
        )}
      </Paper>

      <Box position="absolute" bottom={20} left={20} display="flex" gap={2}>
        <IconButton sx={{ width: 60, height: 60, bgcolor: "#ffffff88", borderRadius: "50%" }}>
          <History fontSize="large" />
        </IconButton>
        <IconButton sx={{ width: 60, height: 60, bgcolor: "#ffffff88", borderRadius: "50%" }}>
          <Home fontSize="large" />
        </IconButton>
      </Box>
      <div className={`container ${showChatbot ? "show-chatbot" : ""}`}>
      <button onClick={() => setShowChatbot((prev) => !prev)} id="chatbot-toggler">
        <span className="material-symbols-outlined">mode_comment</span>
        <span className="material-symbols-outlined">close</span>
      </button>

      <div className="chatbot-popup">
        <div className="chat-header">
          <div className="header-info">
            <ChatbotIcon />
            <h2 className="logo-text">Chatbot</h2>
          </div>
          <button onClick={() => setShowChatbot((prev) => !prev)} className="material-symbols-outlined">keyboard_arrow_down</button>
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
    </Box>
  );
};

export default TripTrapUI;


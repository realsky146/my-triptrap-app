import React, { useEffect, useState } from "react";
import { Button, Box, Typography, IconButton, TextField, Paper } from "@mui/material";
import { Home, History, Search } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import wal from "../../assets/pic/วอลเปเปอร์.png";

const TripTrapUI: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState(""); // สำหรับเก็บคำค้นหาจาก TextField
  const [location, setLocation] = useState<string | null>(null); // เก็บตำแหน่งปัจจุบันของผู้ใช้
  const [coordinates, setCoordinates] = useState<{ lat: number; lon: number } | null>(null); // พิกัดของตำแหน่งที่ผู้ใช้กรอก
  const [currentPosition, setCurrentPosition] = useState<{ lat: number; lon: number } | null>(null); // เก็บตำแหน่งปัจจุบัน
  const [distance, setDistance] = useState<number | null>(null); // เก็บระยะทาง
  const [trafficDelay, setTrafficDelay] = useState<number | null>(null); // เก็บเวลาชะลอตัวจากจราจร
  const [travelTime, setTravelTime] = useState<number | null>(null); // เก็บเวลาเดินทาง

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

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
  const calculateDistanceAndTraffic = (lat1: number, lon1: number, lat2: number, lon2: number) => {
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
  const toRad = (degrees: number) => {
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
    </Box>
  );
};

export default TripTrapUI;

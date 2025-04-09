// import React, { useState } from "react";
// import { Button, Box, Typography, IconButton, Paper, TextField } from "@mui/material";
// import { ArrowBack, ArrowForward, Search, Settings } from "@mui/icons-material";
// import { useNavigate } from "react-router-dom";
// import wal from "../../assets/pic/วอลเปเปอร์.png";
// import FileUploadButton from "@/components/FileUploadButton";
// import { FaHome } from "react-icons/fa";
// import TrafficSettingsPopup from "@/components/TrafficSettingsPopup";
// import { Send } from "lucide-react";
// import { History } from "@mui/icons-material";
// import SearchHistoryButton from "@/components/SearchHistoryButton";

// const TripTrapUI = () => {
//     const navigate = useNavigate();
//     const [inputText, setInputText] = useState(""); // State for input field
//     const [fileAttached, setFileAttached] = useState(false); // State for file attachment
//     const [openPopup, setOpenPopup] = useState(false); // Popup state
//     const [openSearchPopup, setOpenSearchPopup] = useState(false); // Popup state for search

//     const handleFileSelect = (fileName) => {
//         setInputText(fileName); // Set the filename in the input field
//         setFileAttached(true); // Set the file attachment status
//     };

//     const handleSendClick = () => {
//         // Handle the send button click
//         console.log("Message sent:", inputText);
//     };

//     return (
//         <Box
//             display="flex"
//             justifyContent="center"
//             alignItems="center"
//             minHeight="100vh"
//             sx={{
//                 position: "fixed",
//                 top: 0,
//                 left: 0,
//                 width: "100%",
//                 height: "100vh",
//                 backgroundImage: `url(${wal})`,
//                 backgroundSize: "cover",
//                 backgroundPosition: "center",
//             }}
//         >
//             <Paper
//                 elevation={3}
//                 sx={{
//                     width: 550,
//                     p: 3,
//                     bgcolor: "#8B1E1E",
//                     borderRadius: 5,
//                     textAlign: "center",
//                     position: "relative",
//                 }}
//             >
//                 {/* Search Bar */}
//                 <Box
//                     display="flex"
//                     alignItems="center"
//                     bgcolor="#AA3939"
//                     borderRadius={5}
//                     px={2}
//                     py={1}
//                 >
//                     <Search sx={{ color: "white", opacity: 0.7 }} />
//                     <TextField
//                         fullWidth
//                         placeholder="Search Maps"
//                         variant="standard"
//                         InputProps={{
//                             disableUnderline: true,
//                             sx: { color: "white", ml: 1 },
//                         }}
//                         sx={{ bgcolor: "transparent", flex: 1 }}
//                     />
//                     <Typography color="#FFBA65" sx={{ fontSize: 16, fontWeight: 500, cursor: "pointer" }}>
//                         Cancel
//                     </Typography>
//                 </Box>

//                 {/* TripTrap Logo */}
//                 <Typography variant="h4" color="white" fontWeight="bold" mt={2} gutterBottom>
//                     TRIPTRAP...
//                 </Typography>

//                 {/* Input Box */}
//                 <Paper
//                     elevation={0}
//                     sx={{
//                         display: "flex",
//                         alignItems: "center",
//                         px: 2,
//                         py: 1,
//                         my: 2,
//                         borderRadius: 3,
//                         bgcolor: "#fff",
//                         position: "relative",
//                     }}
//                 >
//                     <TextField
//                         fullWidth
//                         value={inputText} // Display the attached file name
//                         onChange={(e) => setInputText(e.target.value)} // Update the input text
//                         placeholder="มีอะไรให้เราช่วยหรือเปล่า..."
//                         variant="standard"
//                         InputProps={{
//                             disableUnderline: true,
//                             sx: { ml: 2, color: "black", opacity: 0.7 },
//                         }}
//                         sx={{ bgcolor: "transparent", flex: 1 }}
//                     />

//                     {/* Display button based on file attachment status */}
//                     {fileAttached ? (
//                         <IconButton onClick={handleSendClick}>
//                             <Send /> {/* Send icon */}
//                         </IconButton>
//                     ) : (
//                         <FileUploadButton onFileSelect={handleFileSelect} />
//                     )}
//                     <IconButton onClick={() => setOpenPopup(true)}>
//                         <Settings sx={{ color: "#757575" }} />
//                     </IconButton>
//                 </Paper>

//                 {/* Let's Go Button */}
//                 <Button
//                     variant="contained"
//                     sx={{
//                         width: "100%",
//                         height: 50,
//                         bgcolor: "#F4A2A2",
//                         borderRadius: 3,
//                         fontSize: 20,
//                         color: "#B70202",
//                         textTransform: "none",
//                     }}
//                     onClick={() => navigate("/home")}
//                 >
//                     LET’S GO
//                 </Button>
//             </Paper>

//             {/* Navigation Buttons */}
//             <Box position="absolute" display="flex" width="100%" justifyContent="space-between" bottom={20} px={5}>
//                 {/* Search History Button */}
//                 <SearchHistoryButton />

//                 {/* Back Button */}
//                 <IconButton
//                     sx={{
//                         width: 50,
//                         height: 50,
//                         bgcolor: "#ffffff",
//                         borderRadius: "50%",
//                         boxShadow: 2,
//                         ml: 3,
//                     }}
//                 >
//                     <ArrowBack fontSize="large" />
//                 </IconButton>

//                 {/* Home Button */}
//                 <IconButton
//                     sx={{
//                         width: 50,
//                         height: 50,
//                         position: "fixed",
//                         bottom: 20,
//                         left: "50%",
//                         transform: "translateX(-50%)",
//                         zIndex: 1000,
//                     }}
//                     onClick={() => navigate("/")}
//                 >
//                     <FaHome size={24} color="#000" />
//                 </IconButton>

//                 {/* Forward Button */}
//                 <IconButton
//                     sx={{
//                         width: 50,
//                         height: 50,
//                         bgcolor: "#ffffff",
//                         borderRadius: "50%",
//                         boxShadow: 2,
//                         mr: 3,
//                     }}
//                 >
//                     <ArrowForward fontSize="large" />
//                 </IconButton>
//             </Box>

//             {/* Traffic Settings Popup */}
//             <TrafficSettingsPopup open={openPopup} setOpen={setOpenPopup} />
//         </Box>
//     );
// };

// export default TripTrapUI;




// import { useEffect, useRef, useState } from "react";
// import ChatbotIcon from "@/components/ChatbotIcon";
// import ChatForm from "@/components/ChatForm";
// import ChatMessage from "@/components/ChatMessage";
// import { locationInfo as locationFromFile } from "@/page/home/location"; 
// import "@/page/home/index.css";


// const App = () => {
//   const [locationInfo, setLocationInfo] = useState("กำลังดึงข้อมูลตำแหน่งของคุณ...");
//   const [chatHistory, setChatHistory] = useState([]);
//   const [showChatbot, setShowChatbot] = useState(false);
//   const chatBodyRef = useRef();

//   useEffect(() => {
//     navigator.geolocation.getCurrentPosition(
//       async (position) => {
//         const { latitude, longitude } = position.coords;
//         try {
//           const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`);
//           const data = await res.json();

//           const locationText = data.display_name
//             ? `ตอนนี้คุณอยู่ใกล้: ${data.display_name}`
//             : `พิกัด: ละติจูด ${latitude.toFixed(4)}, ลองจิจูด ${longitude.toFixed(4)}`;

//           setLocationInfo(locationText);
//         } catch (err) {
//           console.error(err);
//           setLocationInfo("ไม่สามารถดึงชื่อสถานที่ได้");
//         }
//       },
//       (error) => {
//         console.error(error);
//         setLocationInfo("ไม่สามารถดึงตำแหน่งของคุณได้");
//       }
//     );
//   }, []);

//   useEffect(() => {
//     const combinedLocationInfo = `${locationInfo}\n\n${locationFromFile}`;
//     setChatHistory((prev) => [
//       ...prev.filter((msg) => msg.role !== "model" || !msg.hideInChat),
//       { role: "model", text: combinedLocationInfo, hideInChat: true }
//     ]);
//   }, [locationInfo]);

//   const generateBotResponse = async (history) => {
//     const updateHistory = (text) => {
//       setChatHistory((prev) =>
//         [...prev.filter(msg => msg.text !== "..."), { role: "model", text }]
//       );
//     };

//     history = history.map(({ role, text }) => ({ role, parts: [{ text }] }));
//     const requestOptions = {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ contents: history })
//     };

//     try {
//       const response = await fetch(import.meta.env.VITE_API_URL, requestOptions);
//       const data = await response.json();
//       if (!response.ok) throw new Error(data.error.message || "มีบางอย่างผิดพลาด");

//       const apiResponseText = data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g, "$1").trim();
//       updateHistory(apiResponseText);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     if (chatBodyRef.current) {
//       chatBodyRef.current.scrollTo({ top: chatBodyRef.current.scrollHeight, behavior: "smooth" });
//     }
//   }, [chatHistory]);

//   return (

//     <div className={`container ${showChatbot ? "show-chatbot" : ""}`}>
//       <button onClick={() => setShowChatbot((prev) => !prev)} id="chatbot-toggler">
//         <span className="material-symbols-outlined">mode_comment</span>
//         <span className="material-symbols-outlined">close</span>
//       </button>

//       <div className="chatbot-popup">
//         <div className="chat-header">
//           <div className="header-info">
//             <ChatbotIcon />
//             <h2 className="logo-text">Chatbot</h2>
//           </div>
//           <button onClick={() => setShowChatbot((prev) => !prev)} className="material-symbols-outlined">keyboard_arrow_down</button>
//         </div>

//         <div ref={chatBodyRef} className="chat-body">
//           <div className="message bot-message">
//             <ChatbotIcon />
//             <p className="message-text">
//               สวัสดีเหมียว <br /> วันนี้มีอะไรให้ช่วยไหมเหมียว
//             </p>
//           </div>

//           {chatHistory.map((chat, index) => (
//             <ChatMessage key={index} chat={chat} />
//           ))}
//         </div>

//         <div className="chat-footer">
//           <ChatForm
//             chatHistory={chatHistory}
//             setChatHistory={setChatHistory}
//             generateBotResponse={generateBotResponse}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default App;



// TripTrapUI Component
// const TripTrapUI = () => {
    

//     return (
       
//     );
// };

// App Component
import React, { useState, useEffect, useRef } from "react";
import { Box, Paper, Typography, TextField, IconButton, Button } from "@mui/material";
import { ArrowBack, ArrowForward, Search, Settings } from "@mui/icons-material";
import { FaHome } from "react-icons/fa";
import { Send } from "lucide-react";
import { useNavigate } from "react-router-dom";
import wal from "../../assets/pic/วอลเปเปอร์.png";
import FileUploadButton from "@/components/FileUploadButton";
import TrafficSettingsPopup from "@/components/TrafficSettingsPopup";
import SearchHistoryButton from "@/components/SearchHistoryButton";
import ChatbotIcon from "@/components/ChatbotIcon";
import ChatForm from "@/components/ChatForm";
import ChatMessage from "@/components/ChatMessage";
import { locationInfo as locationFromFile } from "@/page/home/location"; 
import "@/page/home/index.css";

const App = () => {
  const navigate = useNavigate();
  const [inputText, setInputText] = useState(""); // State for input field
  const [fileAttached, setFileAttached] = useState(false); // State for file attachment
  const [openPopup, setOpenPopup] = useState(false); // Popup state
  const [locationInfo, setLocationInfo] = useState("กำลังดึงข้อมูลตำแหน่งของคุณ...");
  const [chatHistory, setChatHistory] = useState([]);
  const [showChatbot, setShowChatbot] = useState(false);
  const chatBodyRef = useRef();

  const handleFileSelect = (fileName) => {
    setInputText(fileName); // Set the filename in the input field
    setFileAttached(true); // Set the file attachment status
  };

  const handleSendClick = () => {
    console.log("Message sent:", inputText);
  };

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
        <Box display="flex" alignItems="center" bgcolor="#AA3939" borderRadius={5} px={2} py={1}>
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
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="มีอะไรให้เราช่วยหรือเปล่า..."
            variant="standard"
            InputProps={{
              disableUnderline: true,
              sx: { ml: 2, color: "black", opacity: 0.7 },
            }}
            sx={{ bgcolor: "transparent", flex: 1 }}
          />

          {/* Display button based on file attachment status */}
          {fileAttached ? (
            <IconButton onClick={handleSendClick}>
              <Send /> {/* Send icon */}
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
        <SearchHistoryButton />

        <IconButton sx={{ width: 50, height: 50, bgcolor: "#ffffff", borderRadius: "50%", boxShadow: 2, ml: 3 }}>
          <ArrowBack fontSize="large" />
        </IconButton>

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

        <IconButton sx={{ width: 50, height: 50, bgcolor: "#ffffff", borderRadius: "50%", boxShadow: 2, mr: 3 }}>
          <ArrowForward fontSize="large" />
        </IconButton>
      </Box>

      {/* Traffic Settings Popup */}
      <TrafficSettingsPopup open={openPopup} setOpen={setOpenPopup} />

      {/* Chatbot */}
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
            <button onClick={() => setShowChatbot((prev) => !prev)} className="material-symbols-outlined">
              keyboard_arrow_down
            </button>
          </div>

          <div ref={chatBodyRef} className="chat-body">
            <div className="message bot-message">
              <ChatbotIcon />
              <p className="message-text">สวัสดีเหมียว <br /> วันนี้มีอะไรให้ช่วยไหมเหมียว</p>
            </div>

            {chatHistory.map((chat, index) => (
              <ChatMessage key={index} chat={chat} />
            ))}
          </div>

          <div className="chat-footer">
            <ChatForm chatHistory={chatHistory} setChatHistory={setChatHistory} generateBotResponse={generateBotResponse} />
          </div>
        </div>
      </div>
    </Box>
  );
};

export default App;





import { useRef } from "react";
import { Button, TextField, Box } from "@mui/material";
import { Send } from "@mui/icons-material";

const ChatForm = ({ chatHistory, setChatHistory, generateBotResponse }) => {
    const inputRef = useRef();

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const userMessage = inputRef.current.value.trim();
        if (!userMessage) return;
        inputRef.current.value = "";

        // Update chat history with the user's message
        setChatHistory((history) => [...history, { role: "user", text: userMessage }]);

        // Add a "..." placeholder for the bot's response
        setTimeout(() => {
            setChatHistory((history) => [...history, { role: "model", text: "..." }]);
            generateBotResponse([
                ...chatHistory,
                { role: "user", text: `Using the details provided above, please address this query: ${userMessage}` },
            ]);
        }, 600);
    };

    return (
        <form onSubmit={handleFormSubmit} style={{ display: "flex", alignItems: "center", width: "100%" }}>
            <TextField
                inputRef={inputRef}
                variant="outlined"
                placeholder="Message..."
                fullWidth
                size="small"
                sx={{
                    backgroundColor: "#fff",
                    borderRadius: 2,
                    marginRight: 1,
                    "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                        "& fieldset": {
                            borderColor: "#ddd",
                        },
                    },
                    "& .MuiInputBase-input": {
                        padding: "10px 12px",
                    },
                }}
            />
            <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{
                    height: "40px",
                    width: "40px",
                    borderRadius: "50%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minWidth: "40px", // Ensures the button has a minimum size
                    padding: "0", // Removes padding to make button smaller
                    marginLeft: "8px", // Adds space between the input and button
                    backgroundColor: "#ffb6c1", // Soft pink color (light pastel pink)
                    "&:hover": {
                        backgroundColor: "#ff80aa", // Slightly darker pink on hover
                    },
                }}
            >
                <Send fontSize="small" sx={{ color: "#fff" }} />
            </Button>
        </form>
    );
};

export default ChatForm;

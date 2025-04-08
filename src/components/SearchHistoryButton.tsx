import React, { useState } from "react";
import {
    Box,
    IconButton,
    Popover,
    Typography,
    Paper,
    List,
    ListItem,
    ListItemText
} from "@mui/material";
import { History } from "@mui/icons-material";

const searchHistory = [
    { date: "12/01/67", text: "สีเเวง- มหา อาจารย์ฯ คนเเยอะมั้ย ?", time: "13.00 น." },
    { date: "12/01/67", text: "สีเเวง- มหา อาจารย์ฯ มีเวรมั้ย ?", time: "13.12 น." },
    { date: "12/01/67", text: "สีเเวง- มหา อาจารย์ฯ คนเเยอะมั้ย ?", time: "16.00 น." },
    { date: "12/01/67", text: "สีเเวง- มหา อาจารย์ฯ คนเเยอะมั้ย ?", time: "16.00 น." },
    { date: "12/01/67", text: "สีเเวง- มหา อาจารย์ฯ คนเเยอะมั้ย ?", time: "16.00 น." },
];

const SearchHistoryButton: React.FC = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? "search-history-popover" : undefined;

    return (
        <>
            {/* ปุ่ม History ที่มุมขวาบน */}
            <IconButton
                sx={{
                    width: 50,
                    height: 50,
                    bgcolor: "#ffffff",
                    borderRadius: "50%",
                    position: "fixed",
                    top: 10,
                    right: 10,
                    zIndex: 1000,
                    boxShadow: 2,
                }}
                onClick={handleClick}
            >
                <History fontSize="large" />
            </IconButton>

            {/* Popover ป๊อปอัพแสดงประวัติการค้นหา */}
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
            >
                <Paper
                    sx={{
                        width: 400,
                        p: 2,
                        borderRadius: 3,
                        bgcolor: "#F7F7F7",
                        boxShadow: 3,
                    }}
                >
                    {/* หัวข้อ History */}
                    <Typography variant="h6" align="center" sx={{ fontWeight: 600, mb: 1 }}>
                        History......
                    </Typography>

                    {/* เส้นคั่น */}
                    <Box
                        sx={{
                            width: "100%",
                            height: "2px",
                            bgcolor: "#000",
                            opacity: 0.5,
                            mb: 1,
                        }}
                    />

                    {/* รายการประวัติการค้นหา */}
                    <List sx={{ maxHeight: 300, overflowY: "auto" }}>
                        {searchHistory.map((item, index) => (
                            <ListItem key={index} sx={{ display: "flex", justifyContent: "space-between" }}>
                                <Typography sx={{ fontSize: 14, opacity: 0.8 }}>{item.date}</Typography>
                                <ListItemText primary={item.text} sx={{ mx: 1, fontSize: 14 }} />
                                <Typography sx={{ fontSize: 14, opacity: 0.8 }}>{item.time}</Typography>
                            </ListItem>
                        ))}
                    </List>
                </Paper>
            </Popover>
        </>
    );
};

export default SearchHistoryButton;

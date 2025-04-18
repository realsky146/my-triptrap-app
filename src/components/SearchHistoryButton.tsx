import React, { useState } from "react";
import { Dialog, DialogTitle, List, ListItem, ListItemText, Divider, Typography, IconButton } from "@mui/material";
import { History } from "@mui/icons-material";
import '@fontsource/kanit';  // นำฟอนต์ Kanit มาใช้

<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Kanit:wght@400;500&display=swap" />

const SearchHistoryButton = () => {
    const [open, setOpen] = useState(false);
    const history = JSON.parse(localStorage.getItem("triptrap-history") || "[]");

    return (
        <>
            <IconButton
                onClick={() => setOpen(true)}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#e0e0e0")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#f5f5f5")}
            >
                <History style={{ color: "#300606" }} />
            </IconButton>

            <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm" sx={{ "& .MuiDialog-paper": { overflow: "hidden" } }}>
                <DialogTitle>
                    <Typography variant="h6" color="black" align="center" sx={{ fontFamily: 'Kanit, sans-serif' }}>
                        ประวัติการค้นหา
                    </Typography>

                </DialogTitle>
                <Divider />
                <List sx={{ overflow: "auto", maxHeight: "400px" }}>
                    {history.length === 0 ? (
                        <ListItem>
                            <ListItemText primary="ไม่มีประวัติการค้นหา" />
                        </ListItem>
                    ) : (
                        history.map((item: { query: string; timestamp: string | number | Date }, index: React.Key) => (
                            <ListItem key={index} alignItems="flex-start">
                                <ListItemText
                                    primary={<Typography variant="body1" sx={{ fontFamily: 'Roboto, sans-serif' }}>{item.query}</Typography>}
                                    secondary={
                                        <Typography variant="body2" color="textSecondary" sx={{ fontFamily: 'Roboto, sans-serif' }}>
                                            {`เวลา: ${new Date(item.timestamp).toLocaleString("th-TH")}`}
                                        </Typography>
                                    }
                                />
                            </ListItem>
                        ))
                    )}
                </List>
            </Dialog>
        </>
    );
};

export default SearchHistoryButton;

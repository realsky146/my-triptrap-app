import React from "react";
import { Dialog, DialogTitle, DialogContent, Button, Grid, Typography } from "@mui/material";
import { DirectionsCar, Timer, People, Traffic, MonetizationOn, Loop } from "@mui/icons-material";
import { useNavigate } from "react-router-dom"; // import useNavigate
import { MapIcon } from "lucide-react";

interface PopupProps {
    open: boolean;
    setOpen: (open: boolean) => void;
}

const TrafficSettingsPopup: React.FC<PopupProps> = ({ open, setOpen }) => {
    const navigate = useNavigate(); // ใช้ navigate เพื่อการนำทาง

    return (
        <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
            <DialogTitle sx={{ textAlign: "center", fontWeight: "bold" }}>
                SETTING......
            </DialogTitle>

            <DialogContent>
                <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>การจราจร</Typography>

                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Button
                            fullWidth
                            variant="outlined"
                            startIcon={<MapIcon />}
                            onClick={() => navigate('/location')} // ใช้ navigate สำหรับการนำทางไปยัง '/location'
                        >
                            ตำแหน่ง
                        </Button>
                    </Grid>
                    <Grid item xs={6}><Button fullWidth variant="outlined" startIcon={<DirectionsCar />}>ประเภทรถ</Button></Grid>
                    <Grid item xs={6}><Button fullWidth variant="outlined" startIcon={<Loop />}>สถานะรถ</Button></Grid>
                    <Grid item xs={6}><Button fullWidth variant="outlined" startIcon={<People />}>ผู้ใช้บริการ</Button></Grid>
                    <Grid item xs={6}><Button fullWidth variant="outlined" startIcon={<Timer />}>เวลา</Button></Grid>
                    <Grid item xs={6}><Button fullWidth variant="outlined" startIcon={<Traffic />}>สถานะจราจร</Button></Grid>
                    <Grid item xs={12}><Button fullWidth variant="outlined" startIcon={<MonetizationOn />}>ราคา</Button></Grid>
                </Grid>
            </DialogContent>
        </Dialog>
    );
};

export default TrafficSettingsPopup;

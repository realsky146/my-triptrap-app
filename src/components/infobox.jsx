import { Paper, Typography } from "@mui/material";

const InfoBox = ({ children }) => (
    <Paper
        elevation={2}
        sx={{
            bgcolor: "#FFF7F0",
            p: 2,
            my: 1,
            borderRadius: 3,
            boxShadow: "0 4px 7px rgba(0,0,0,0.1)",
        }}
    >
        <Typography fontSize={16} color="text.secondary"
            sx={{
                fontWeight: 350,
                fontFamily: 'Arial, sans-serif'
            }}>

            {children}
        </Typography>
    </Paper>
);

export default InfoBox;

import { Paper, Typography } from "@mui/material";

const InfoBox = ({ children }) => (
    <Paper
        elevation={2}
        sx={{
            bgcolor: "#FFF7F0",
            p: 2,
            my: 1,
            borderRadius: 3,
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        }}
    >
        <Typography fontSize={18} color="text.secondary" sx={{ fontWeight: 500 }}>
            {children}
        </Typography>
    </Paper>
);

export default InfoBox;

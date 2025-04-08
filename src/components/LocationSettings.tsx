import React, { useState } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import MapIcon from '@mui/icons-material/Map';
import { useNavigate } from 'react-router-dom';
const LocationSettings: React.FC = () => {
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');

    const handleGoClick = () => {
        console.log('จาก:', from);
        console.log('ไป:', to);
        // สามารถ fetch ไป backend ได้ตรงนี้
    };

    return (
        <Box
            sx={{
                bgcolor: '#8B0000',
                minHeight: '100vh',
                p: 4,
                color: 'white',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <Typography variant="h5" mb={2}>SETTING......</Typography>

            <Box
                sx={{
                    bgcolor: 'white',
                    color: 'black',
                    p: 3,
                    borderRadius: 4,
                    width: '100%',
                    maxWidth: 400,
                }}
            >
                <Box display="flex" alignItems="center" mb={2}>
                    <MapIcon sx={{ mr: 1 }} />
                    <Typography variant="h6">ตำแหน่ง</Typography>
                </Box>

                <TextField
                    variant="outlined"
                    placeholder="ตำแหน่งปัจจุบัน..."
                    fullWidth
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                    sx={{ mb: 2 }}
                />
                <TextField
                    variant="outlined"
                    placeholder="ตำแหน่งที่ต้องการไป..."
                    fullWidth
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                />
            </Box>

            <Button
                variant="contained"
                sx={{
                    mt: 3,
                    bgcolor: '#FA8072',
                    color: '#8B0000',
                    borderRadius: 3,
                    px: 5,
                    fontWeight: 'bold',
                }}
                onClick={handleGoClick}
            >
                LET'S GO
            </Button>
        </Box>
    );
};

export default LocationSettings;

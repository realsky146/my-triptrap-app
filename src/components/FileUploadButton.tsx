import React from "react";
import { IconButton } from "@mui/material";
import { AttachFile } from "@mui/icons-material";

interface FileUploadButtonProps {
    onFileSelect: (fileName: string) => void; // ส่งชื่อไฟล์กลับไปยัง `TextField`
}

const FileUploadButton: React.FC<FileUploadButtonProps> = ({ onFileSelect }) => {
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            onFileSelect(file.name); // ส่งชื่อไฟล์กลับไปแสดงในช่องพิมพ์
        }
    };

    return (
        <IconButton component="label">
            <AttachFile sx={{ color: "#757575" }} />
            <input type="file" hidden onChange={handleFileChange} />
        </IconButton>
    );
};

export default FileUploadButton;

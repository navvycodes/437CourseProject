import { Box, Button } from "@mui/material";
import MicIcon from "@mui/icons-material/Mic";
import React from "react";

const CHATGPT_API_URL = "http://127.0.0.1:5000/chatgpt";
export const ChatGPTButton = () => {
  const handleClick = () => {};

  return (
    <Box
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      width={"33%"}
    >
      <Button
        fullWidth
        sx={{ height: "100%" }}
        variant="contained"
        onClick={handleClick}
        startIcon={<MicIcon />}
      >
        ChatGPT
      </Button>
    </Box>
  );
};

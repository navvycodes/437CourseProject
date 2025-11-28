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
        sx={{ 
          height: "100%",
          backgroundColor: "var(--color-accent)",
          color: "var(--color-text-accent)",
          "&:hover": {
            backgroundColor: "var(--color-accent-soft)",
            color: "var(--color-text-main)",
          },
        }}
        variant="contained"
        onClick={handleClick}
      >
        <MicIcon
          sx={{
            width: "100%",
            height: "100%",
          }}
        />
      </Button>
    </Box>
  );
};

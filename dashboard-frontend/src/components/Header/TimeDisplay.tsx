import { Box } from "@mui/material";
import React from "react";

export const TimeDisplay = () => {
  const [currentTime, setCurrentTime] = React.useState(new Date());
  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  return (
    <Box
      display={"flex"}
      justifyContent={"flex-start"}
      textAlign={"left"}
      alignItems={"center"}
    >
      {currentTime.toLocaleTimeString()}
    </Box>
  );
};

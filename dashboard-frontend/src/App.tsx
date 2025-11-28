import { Box } from "@mui/material";
import { Header } from "./components/Header/Header";
import { Middle } from "./components/Middle/Middle";
import { Bottom } from "./components/Bottom/Bottom";
import { PhoneAlertDialog } from "./components/PhoneAlertDialog";
import React from "react";

// Phone In Use URL
const PHONE_API_URL = "http://127.0.0.1:5000/phone/inuse";

export const App = () => {
  const [isUsingPhone, setIsUsingPhone] = React.useState(false);
  React.useEffect(() => {
    let retryTimeout: ReturnType<typeof setTimeout> | null = null;
    const fetchPhoneStatus = () => {
      fetch(PHONE_API_URL)
        .then((response) => response.json())
        .then((data) => {
          setIsUsingPhone(!!data.in_use);
          if (retryTimeout) {
            clearTimeout(retryTimeout);
            retryTimeout = null;
          }
        })
        .catch((error) => {
          console.error("Error fetching phone status:", error);
          retryTimeout = setTimeout(fetchPhoneStatus, 5000); // Retry after 5s if failed
        });
    };
    fetchPhoneStatus();
    const intervalId = setInterval(fetchPhoneStatus, 1000); // Poll every second
    return () => {
      clearInterval(intervalId);
      if (retryTimeout) clearTimeout(retryTimeout);
    };
  }, []);

  return (
    <Box
      height={"100vh"}
      width={"100vw"}
      display={"flex"}
      flexDirection={"column"}
    >
      <Header />
      <Middle />
      <Bottom />
      <PhoneAlertDialog open={isUsingPhone} />
    </Box>
  );
};

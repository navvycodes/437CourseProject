import { Box, CircularProgress } from "@mui/material";
import NetworkCheckIcon from "@mui/icons-material/NetworkCheck";
import React from "react";

const NETWORK_STATS_URL = "http://127.0.0.1:5000/network-speed";
export const NetworkStatsDisplay = () => {
  const [networkStats, setNetworkStats] = React.useState<string>("Loading...");
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  React.useEffect(() => {
    let retryTimeout: ReturnType<typeof setTimeout> | null = null;
    const fetchNetworkStats = () => {
      setIsLoading(true);
      fetch(NETWORK_STATS_URL)
        .then((response) => response.json())
        .then((data) => {
          console.log("Network stats data fetched:", data);
          const download = data?.download_mbps ? data.download_mbps : "N/A";
          const upload = data?.upload_mbps ? data.upload_mbps : "N/A";
          setNetworkStats(
            `Download: ${download} Mbps | Upload: ${upload} Mbps`
          );
          if (retryTimeout) {
            clearTimeout(retryTimeout);
            retryTimeout = null;
          }
          setIsLoading(false);
        })
        .catch((error) => {
          setNetworkStats("Error loading network stats");
          console.error("Error fetching network stats data:", error);
          // Retry after 1 minute if failed
          retryTimeout = setTimeout(fetchNetworkStats, 60000);
          setIsLoading(false);
        });
    };
    fetchNetworkStats();

    // Try to fetch network stats every 5 minutes
    const intervalId = setInterval(fetchNetworkStats, 300000);
    return () => {
      clearInterval(intervalId);
      if (retryTimeout) clearTimeout(retryTimeout);
    };
  }, []);

  return (
    <Box display={"flex"} alignItems={"center"}>
      <NetworkCheckIcon sx={{ marginRight: 0.5 }} />
      {isLoading ? (
        <CircularProgress size={20} sx={{ color: "black", marginLeft: 0.5 }} />
      ) : (
        networkStats
      )}
    </Box>
  );
};

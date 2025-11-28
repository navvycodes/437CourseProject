import { Box } from "@mui/material";
import React from "react";

const WEATHER_URL = "http://127.0.0.1:5000/weather/current";

export const WeatherDisplay = () => {
  const [weather, setWeather] = React.useState<string>("Loading...");
  const [imageUrl, setImageUrl] = React.useState<string>("");

  React.useEffect(() => {
    let retryTimeout: ReturnType<typeof setTimeout> | null = null;
    const fetchWeather = () => {
      fetch(WEATHER_URL)
        .then((response) => response.json())
        .then((data) => {
          const temperature = data?.current?.temp_f
            ? data.current?.temp_f
            : "N/A";
          const feelslike = data?.current?.feelslike_f
            ? data.current?.feelslike_f
            : "N/A";
          const condition = data?.current?.condition
            ? data.current.condition.text
            : "N/A";
          const iconUrl = data?.current?.condition
            ? `http:${data.current.condition.icon}`
            : "";
          setImageUrl(iconUrl);
          setWeather(
            `${temperature}°F ${condition}, feels like ${feelslike}°F`
          );
          if (retryTimeout) {
            clearTimeout(retryTimeout);
            retryTimeout = null;
          }
        })
        .catch((error) => {
          setWeather("Error loading weather");
          setImageUrl("");
          console.error("Error fetching weather data:", error);
          // Retry after 1 minute if failed
          retryTimeout = setTimeout(fetchWeather, 60000);
        });
    };
    fetchWeather();

    // Try to fetch weather every hour
    const intervalId = setInterval(fetchWeather, 3600000);
    return () => {
      clearInterval(intervalId);
      if (retryTimeout) clearTimeout(retryTimeout);
    };
  }, []);

  return (
    <Box
      display={"flex"}
      justifyContent={"flex-start"}
      alignItems={"center"}
      textAlign={"left"}
      sx={{
        color: "var(--color-text-accent)",
        fontWeight: 500,
      }}
    >
      {imageUrl && (
        <img src={imageUrl} alt="Weather Icon" style={{ marginRight: 8 }} />
      )}
      {weather}
    </Box>
  );
};

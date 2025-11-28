import { AppBar, Box, Toolbar } from "@mui/material";
import { TimeDisplay } from "./TimeDisplay";
import Divider from "@mui/material/Divider";

import { WeatherDisplay } from "./WeatherDisplay";
import { NetworkStatsDisplay } from "./NetworkStatsDisplay";

export const Header = () => {
  return (
    <AppBar position="static" sx={{ height: "64px", minHeight: "64px", maxHeight: "64px" }}>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "left",
          alignContent: "center",
          textAlign: "left",
          height: "64px",
          minHeight: "64px",
          maxHeight: "64px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "left",
          }}
        >
          <TimeDisplay />
          <Divider orientation="vertical" flexItem sx={{ marginX: 1 }} />
          <WeatherDisplay />
          <Divider orientation="vertical" flexItem sx={{ marginX: 1 }} />
          <NetworkStatsDisplay />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

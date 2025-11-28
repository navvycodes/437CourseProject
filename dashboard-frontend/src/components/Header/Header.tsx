import { AppBar, Box, Toolbar } from "@mui/material";
import { TimeDisplay } from "./TimeDisplay";
import Divider from "@mui/material/Divider";

import { WeatherDisplay } from "./WeatherDisplay";

export const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "left",
          alignContent: "center",
          textAlign: "left",
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
        </Box>
      </Toolbar>
    </AppBar>
  );
};

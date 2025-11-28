import { Box } from "@mui/material";
import { JiraDisplay } from "./JiraDisplay";

export const Middle = () => {
  return (
    <Box display={"flex"} justifyContent={"flex-start"}>
      <JiraDisplay />
    </Box>
  );
};

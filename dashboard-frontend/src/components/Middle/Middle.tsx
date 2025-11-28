import { Box } from "@mui/material";
import { JiraDisplay } from "./JiraDisplay";

export const Middle = () => {
  return (
    <Box 
      display={"flex"} 
      justifyContent={"flex-start"}
      flex={1}
      overflow={"hidden"}
      margin={0}
      padding={0}
      minHeight={0}
    >
      <JiraDisplay />
    </Box>
  );
};

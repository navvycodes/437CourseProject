import { Box } from "@mui/material";
import { RestaurantsDisplay } from "./RestaurantsDisplay";
import { GithubDisplay } from "./GithubDisplay";
import { ChatGPTButton } from "./ChatGPTButton";

export const Bottom = () => {
  return (
    <Box 
      display={"flex"} 
      justifyContent={"space-between"}
      height={"200px"}
      minHeight={"200px"}
      maxHeight={"200px"}
      overflow={"hidden"}
      margin={0}
      padding={0}
      sx={{
        backgroundColor: "var(--color-surface)",
      }}
    >
      <RestaurantsDisplay />
      <GithubDisplay />
      <ChatGPTButton />
    </Box>
  );
};

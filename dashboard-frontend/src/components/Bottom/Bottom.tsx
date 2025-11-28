import { Box } from "@mui/material";
import { RestaurantsDisplay } from "./RestaurantsDisplay";
import { GithubDisplay } from "./GithubDisplay";
import { ChatGPTButton } from "./ChatGPTButton";

export const Bottom = () => {
  return (
    <Box display={"flex"} justifyContent={"space-between"}>
      <RestaurantsDisplay />
      <GithubDisplay />
      <ChatGPTButton />
    </Box>
  );
};

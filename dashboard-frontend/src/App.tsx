import { Box } from "@mui/material";
import { Header } from "./components/Header/Header";
import { Middle } from "./components/Middle/Middle";
import { Bottom } from "./components/Bottom/Bottom";
function App() {
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
    </Box>
  );
}

export default App;

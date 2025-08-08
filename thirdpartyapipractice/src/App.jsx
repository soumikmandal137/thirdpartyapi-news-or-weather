// import './App.css'

import NewsApi from "./components/newsapi/NewsApi";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import theme from "./theme/Theme";
import WeatherApi from "./components/weatherapi/WeatherApi";

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {/* <NewsApi /> */}
        <WeatherApi />
      </ThemeProvider>
    </>
  );
}

export default App;

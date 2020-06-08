//react-hot-loader needs to be imported before react and react-dom
import { hot } from "react-hot-loader/root";
import React from "react";
import { ThemeProvider } from "theme-ui";
import theme from "./theme";
import { Header, Canvas, Logo } from "components";
import { BrowserRouter, Link } from "react-router-dom";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Header
        sx={{
          gridArea: "header",
          backgroundColor: "grays.0",
          color: "white",
          boxShadow: 0,
        }}
      >
        <Logo as={Link} />
      </Header>
      <Canvas />
    </ThemeProvider>
  );
};

const AppWrapper = () => {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
};

export default hot(AppWrapper);

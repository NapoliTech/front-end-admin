import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import LoginCard from "../organismo/LoginCard";

// Criando um tema personalizado (opcional)
const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
  },
});

export default function Login() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LoginCard />
    </ThemeProvider>
  );
}

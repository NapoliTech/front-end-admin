import React from "react";
import { ThemeProvider } from "./componente/contexts/ThemeContext";
import { RouterProvider } from "react-router-dom";
import { routes } from "./routes";

function App() {
  return (
    <ThemeProvider>
      <RouterProvider router={routes} />
    </ThemeProvider>
  );
}

export default App;

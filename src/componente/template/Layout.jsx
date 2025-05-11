import React from "react";
import { Box } from "@mui/material";
import SideNav from "../moleculas/SideNav";

const Layout = ({ children }) => {
  return (
    <Box sx={{ display: "flex" }}>
      <SideNav />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          mt: "8px",
          maxWidth: "1920px",
          margin: "0 auto",
          boxSizing: "border-box",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Layout;

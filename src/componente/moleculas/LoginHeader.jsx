import React from "react";
import { Avatar, Box, Typography } from "@mui/material";
import LockOutlineIcon from "@mui/icons-material/LockOutline";
const LoginHeader = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mb: 3,
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
        <LockOutlineIcon />
      </Avatar>
      <Typography variant="h5" component="h1" gutterBottom>
        Login
      </Typography>
      <Typography variant="body2" color="textSecondary" align="center">
        Entre com suas credenciais para acessar o sistema
      </Typography>
    </Box>
  );
};

export default LoginHeader;

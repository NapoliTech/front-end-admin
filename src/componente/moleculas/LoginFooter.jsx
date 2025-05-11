import React from "react";
import { Box, Link, Typography } from "@mui/material";

const LoginFooter = () => {
  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="body2" color="textSecondary" align="center">
        Esqueceu sua senha?{" "}
        <Link href="#" variant="body2">
          Clique aqui
        </Link>
      </Typography>
      <Typography
        variant="body2"
        color="textSecondary"
        align="center"
        sx={{ mt: 2 }}
      >
        {"Copyright © "}
        <Link color="inherit" href="#">
          NapoliTech
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    </Box>
  );
};

export default LoginFooter;

import React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";

const LoadingIndicator = ({ message = "Carregando...", size = 60 }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        p: 4,
      }}
    >
      <CircularProgress size={size} />
      <Typography variant="h6" sx={{ mt: 2 }}>
        {message}
      </Typography>
    </Box>
  );
};

export default LoadingIndicator;

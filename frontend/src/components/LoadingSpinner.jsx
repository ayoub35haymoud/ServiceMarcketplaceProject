import React from "react";
import { CircularProgress, Box, Typography } from "@mui/material";

const LoadingSpinner = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      minHeight="100vh"
      bgcolor="#f8f9fa"
    >
      {/* Circular Spinner */}
      <CircularProgress size={80} thickness={4} color="primary" />
      {/* Animated Text */}
      <Typography
        variant="h6"
        component="div"
        color="textSecondary"
        mt={3}
        sx={{
          animation: "fade-in-out 1.5s infinite",
          "@keyframes fade-in-out": {
            "0%, 100%": { opacity: 0.5 },
            "50%": { opacity: 1 },
          },
        }}
      >
        Loading, please wait...
      </Typography>
    </Box>
  );
};

export default LoadingSpinner;

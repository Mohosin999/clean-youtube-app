import {
  Box,
  Typography,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { X, LinkedIn, GitHub } from "@mui/icons-material";

/**
 * Footer component with centered column alignment for all content.
 */
const Footer = () => {
  const theme = useTheme();
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box
      sx={{
        background: "#0C0C0F",
        padding: 4,
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 1,
        borderTop: "1px solid #202024ff",
      }}
    >
      {/* Social Media Section */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 1,
        }}
      >
        <IconButton
          href="https://www.linkedin.com/in/mohosinh99/"
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            color: "#f5e1da",
            "&:hover": {
              transform: "scale(1.2)",
              transition: "transform 0.2s ease-in-out",
            },
          }}
        >
          <LinkedIn />
        </IconButton>
        <IconButton
          href="https://x.com/mohosinh99"
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            color: "#f5e1da",
            "&:hover": {
              transform: "scale(1.2)",
              transition: "transform 0.2s ease-in-out",
            },
          }}
        >
          <X />
        </IconButton>

        <IconButton
          href="https://github.com/Mohosin999"
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            color: "#f5e1da",
            "&:hover": {
              transform: "scale(1.2)",
              transition: "transform 0.2s ease-in-out",
            },
          }}
        >
          <GitHub />
        </IconButton>
      </Box>

      {/* Bottom Text */}
      <Typography
        variant="body2"
        sx={{
          fontSize: isMediumScreen ? "0.7rem" : "0.9rem",
          color: "#f5e1da",
        }}
      >
        © 2023-2025 Clean YouTube. All Rights Reserved.
      </Typography>
    </Box>
  );
};

export default Footer;

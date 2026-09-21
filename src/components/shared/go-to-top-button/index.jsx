import { useState, useEffect } from "react";
import { IconButton, Box } from "@mui/material";
import { ArrowUpward } from "@mui/icons-material";

const GoToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const handleScroll = () => setIsVisible(window.scrollY > window.innerHeight * 0.6);
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return isVisible ? (
    <IconButton
      onClick={scrollToTop}
      sx={{
        position: "fixed",
        bottom: 22,
        right: 22,
        width: 46,
        height: 46,
        background: "linear-gradient(135deg,#FF1A1A,#FF8C42)",
        color: "#fff",
        boxShadow: "0 8px 24px rgba(255,59,48,0.35), 0 0 0 1px rgba(255,255,255,0.1) inset",
        border: "1px solid rgba(255,255,255,0.12)",
        backdropFilter: "blur(10px)",
        zIndex: 1200,
        "&:hover": { background: "linear-gradient(135deg,#FF2E2E,#FF9A57)", transform: "translateY(-2px)" },
        transition: "all 0.2s",
      }}
    >
      <ArrowUpward sx={{ fontSize: 20 }} />
    </IconButton>
  ) : null;
};

export default GoToTopButton;

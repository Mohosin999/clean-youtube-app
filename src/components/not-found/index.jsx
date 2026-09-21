import { Typography, Box, Container, Stack, Chip } from "@mui/material";
import { Home, SearchOff, ArrowBack } from "@mui/icons-material";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Box sx={{ minHeight: "calc(100vh - 72px)", display: "grid", placeItems: "center", background: "#07080B", color: "#fff", position: "relative", overflow: "hidden" }}>
      <Box sx={{ position: "absolute", inset: 0, background: `radial-gradient(600px 600px at 50% 0%, rgba(255,59,48,0.08), transparent 60%)`, pointerEvents: "none" }} />
      <Container maxWidth="md" sx={{ position: "relative", zIndex: 1, px: { xs: 2, md: 3 }, py: 8, textAlign: "center" }}>
        <Chip icon={<SearchOff sx={{ fontSize: 16 }} />} label="ERROR 404" sx={{ mb: 3, bgcolor: "rgba(255,59,48,0.10)", border: "1px solid rgba(255,59,48,0.18)", color: "#FF6B6B", fontWeight: 800, fontSize: "0.72rem", letterSpacing: "0.1em" }} />
        <Typography sx={{ fontFamily: "'Outfit',sans-serif", fontWeight: 800, fontSize: { xs: "3rem", md: "4.5rem" }, lineHeight: 0.9, letterSpacing: "-0.04em", mb: 1.5 }}>Lost in space?</Typography>
        <Typography sx={{ color: "rgba(255,255,255,0.5)", fontSize: { xs: "1rem", md: "1.05rem" }, maxWidth: 460, mx: "auto", mb: 4 }}>
          The page you’re looking for doesn’t exist or was moved. Let’s get you back to learning.
        </Typography>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} justifyContent="center">
          <Box component={Link} to="/" sx={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 1, px: 3, py: 1.4, borderRadius: "999px", background: "linear-gradient(135deg,#FF1A1A,#FF8C42)", color: "#fff", fontWeight: 800, textDecoration: "none", boxShadow: "0 8px 24px rgba(255,59,48,0.3)" }}>
            <Home sx={{ fontSize: 18 }} /> Back to Home
          </Box>
          <Box component="a" href="javascript:history.back()" onClick={(e) => { e.preventDefault(); history.back(); }} sx={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 1, px: 3, py: 1.4, borderRadius: "999px", bgcolor: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)", color: "#fff", fontWeight: 700, textDecoration: "none", cursor: "pointer" }}>
            <ArrowBack sx={{ fontSize: 18 }} /> Go Back
          </Box>
        </Stack>
        <Typography sx={{ mt: 6, fontSize: "7rem", fontWeight: 900, color: "rgba(255,255,255,0.03)", lineHeight: 1, letterSpacing: "-0.06em", userSelect: "none" }}>404</Typography>
      </Container>
    </Box>
  );
};

export default NotFound;

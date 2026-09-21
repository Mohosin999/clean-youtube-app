import { Box, Typography, IconButton, Container, Divider, Stack } from "@mui/material";
import { LinkedIn, GitHub, X } from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom";

const Footer = () => {
  return (
    <Box component="footer" sx={{ bgcolor: "#09090B", borderTop: "1px solid #18181B" }}>
      <Container maxWidth="xl" sx={{ px: { xs: 2, md: 3 }, py: 5 }}>
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1.4fr 1fr 1fr" }, gap: 4 }}>
          <Box>
            <Stack direction="row" spacing={1.2} alignItems="center" sx={{ mb: 1.2 }}>
              <Box sx={{ width: 28, height: 28, borderRadius: "8px", bgcolor: "#DC2626", display: "grid", placeItems: "center" }}>
                <Box sx={{ width: 0, height: 0, borderLeft: "7px solid white", borderTop: "4px solid transparent", borderBottom: "4px solid transparent", ml: "2px" }} />
              </Box>
              <Typography sx={{ fontFamily: "'Outfit',sans-serif", fontWeight: 800, fontSize: "1rem" }}>Clean YouTube</Typography>
              <Typography sx={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.08em", color: "#71717A", border: "1px solid #27272A", px: 1, py: 0.2, borderRadius: "6px" }}>2026</Typography>
            </Stack>
            <Typography sx={{ color: "#71717A", fontSize: "0.875rem", lineHeight: 1.6, maxWidth: 340, mb: 2 }}>
              A quiet place to finish what you started. No ads, no shorts, no noise — just playlists & videos.
            </Typography>
            <Stack direction="row" spacing={0.8}>
              {[
                { icon: LinkedIn, href: "https://www.linkedin.com/in/mohosinh99/" },
                { icon: X, href: "https://x.com/mohosinh99" },
                { icon: GitHub, href: "https://github.com/Mohosin999" },
              ].map((s, i) => (
                <IconButton key={i} href={s.href} target="_blank" rel="noopener noreferrer" sx={{ width: 32, height: 32, borderRadius: "8px", bgcolor: "#18181B", border: "1px solid #27272A", color: "#71717A", "&:hover": { color: "#fff", borderColor: "#3F3F46" } }}>
                  <s.icon sx={{ fontSize: 16 }} />
                </IconButton>
              ))}
            </Stack>
          </Box>

          <Box>
            <Typography sx={{ fontWeight: 700, fontSize: "0.8rem", letterSpacing: "0.08em", color: "#FAFAFA", mb: 1.5 }}>PRODUCT</Typography>
            <Stack spacing={1} sx={{ fontSize: "0.875rem", color: "#71717A" }}>
              <Typography component={RouterLink} to="/" sx={{ color: "inherit", textDecoration: "none", "&:hover": { color: "#fff" } }}>Home</Typography>
              <Typography component={RouterLink} to="/playlists" sx={{ color: "inherit", textDecoration: "none", "&:hover": { color: "#fff" } }}>Playlists</Typography>
              <Typography component={RouterLink} to="/videos" sx={{ color: "inherit", textDecoration: "none", "&:hover": { color: "#fff" } }}>Videos</Typography>
              <Typography component={RouterLink} to="/favorites" sx={{ color: "inherit", textDecoration: "none", "&:hover": { color: "#fff" } }}>Favorites</Typography>
              <Typography component={RouterLink} to="/recents" sx={{ color: "inherit", textDecoration: "none", "&:hover": { color: "#fff" } }}>Recents</Typography>
            </Stack>
          </Box>

          <Box sx={{ p: 2, borderRadius: "12px", bgcolor: "#111113", border: "1px solid #27272A" }}>
            <Typography sx={{ fontWeight: 700, fontSize: "0.875rem", mb: 0.8 }}>How it’s built</Typography>
            <Typography sx={{ color: "#71717A", fontSize: "0.84rem", lineHeight: 1.6 }}>
              React + YouTube Data API. No backend. Your data never leaves the browser.
            </Typography>
            <Typography sx={{ color: "#52525B", fontSize: "0.75rem", mt: 1.5 }}>Paste → Save → Learn.</Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 3, borderColor: "#18181B" }} />
        <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, justifyContent: "space-between", gap: 1, color: "#52525B", fontSize: "0.78rem" }}>
          <Typography sx={{ fontSize: "0.78rem" }}>© 2023–2026 Clean YouTube • Built by Mohosin Hasan Akash</Typography>
          <Typography sx={{ fontSize: "0.78rem" }}>No tracking. No ads. Just learning.</Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;

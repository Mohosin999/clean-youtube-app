import { useStoreState } from "easy-peasy";
import { Container } from "@mui/system";
import PlaylistCardItem from "../../playlist-card-item";
import { Box, Grid, Typography } from "@mui/material";

const Recents = () => {
  const { data } = useStoreState((state) => state.playlists);
  const { items } = useStoreState((state) => state.recents);

  const itemArray = [];
  items.forEach((item) => itemArray.push(data[item]));

  return (
    <Box
      sx={{
        minHeight: "100vh",
        position: "relative",
        background: `
          radial-gradient(circle at 20% 20%, rgba(255,152,0,0.08), transparent 40%),
          radial-gradient(circle at 80% 0%, rgba(30,136,229,0.08), transparent 40%),
          linear-gradient(180deg, #0b0b0f 0%, #0e0e14 100%)
        `,
        overflow: "hidden",
        color: "#fff",
      }}
    >
      {/* Subtle noise overlay */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundImage: "url('/noise.png')",
          opacity: 0.03,
          pointerEvents: "none",
        }}
      />

      <Container
        maxWidth="lg"
        sx={{
          pt: { xs: 14, md: 16 },
          pb: 8,
          position: "relative",
          zIndex: 2,
        }}
      >
        {itemArray.length > 0 ? (
          <Grid container spacing={3}>
            {itemArray.map((item) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={item.playlistId}>
                <Box
                  sx={{
                    borderRadius: 3,
                    overflow: "hidden",
                    background: "rgba(255,255,255,0.03)",
                    backdropFilter: "blur(12px)",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-5px)",
                      boxShadow: "0 12px 24px rgba(0,0,0,0.4)",
                    },
                  }}
                >
                  <PlaylistCardItem
                    playlistId={item.playlistId}
                    playlistThumbnail={item.playlistItems[0]?.thumbnails}
                    playlistTitle={item.playlistTitle}
                    channelTitle={item.channelTitle}
                    playlistItems={item.playlistItems}
                    path={"recents"}
                  />
                </Box>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "calc(100vh - 96px)",
              textAlign: "center",
              px: 2,
            }}
          >
            <Typography
              variant="h4"
              gutterBottom
              sx={{ fontWeight: 700, mb: 2 }}
            >
              📄 Empty Recent Page
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "#B4B2B0",
                maxWidth: 400,
                lineHeight: 1.6,
              }}
            >
              You should visit a playlist first to see them here! Once you do,
              your recent playlists will appear beautifully in this section.
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default Recents;

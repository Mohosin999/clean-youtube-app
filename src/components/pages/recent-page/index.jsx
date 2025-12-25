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
        backgroundImage: "url(/bg.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      }}
    >
      {/* Overlay */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0,0,0,0.9)", // dark overlay
          zIndex: 1,
        }}
      />

      {/* Content */}
      <Container
        maxWidth="lg"
        sx={{
          pt: {
            xs: 14,
            md: 16,
          },
          pb: 8,
          minHeight: "100%",
          position: "relative",
          zIndex: 2, // above overlay
        }}
      >
        {itemArray.length > 0 ? (
          <Grid container alignItems="stretch" spacing={2}>
            {itemArray.map((item) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                lg={3}
                mb={2}
                key={item.playlistId}
              >
                <PlaylistCardItem
                  playlistId={item.playlistId}
                  playlistThumbnail={item.playlistItems[0]?.thumbnails}
                  playlistTitle={item.playlistTitle}
                  channelTitle={item.channelTitle}
                  playlistItems={item.playlistItems}
                  path={"recents"}
                />
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
              color: "#fff",
            }}
          >
            <Typography variant="h4" gutterBottom>
              📄 Empty Recent Page
            </Typography>
            <Typography variant="body1" sx={{ color: "#B4B2B0" }}>
              You should visit a playlist first to see them here!
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default Recents;

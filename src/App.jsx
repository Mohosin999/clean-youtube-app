import { BrowserRouter, Route, Routes } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Navbar from "./components/navbar";
import NotFound from "./components/not-found";
import Footer from "./components/footer";
import HomePage from "./pages/home-page";
import PlaylistsPage from "./pages/playlists-page";
import VideosPage from "./pages/videos-page";
import PlayerPage from "./pages/player-page";
import WatchPage from "./pages/watch-page";
import Favorites from "./pages/favorite-page";
import Recents from "./pages/recent-page";
import VideoPlayer from "./components/video-player";

const theme = createTheme({
  palette: {
    mode: "dark",
    background: { default: "#09090B", paper: "#111113" },
    primary: { main: "#DC2626" },
    text: { primary: "#FAFAFA", secondary: "#A1A1AA" },
  },
  typography: {
    fontFamily: "'Plus Jakarta Sans','Inter',system-ui,sans-serif",
    h1: { fontFamily: "'Outfit',sans-serif", fontWeight: 800 },
    h2: { fontFamily: "'Outfit',sans-serif", fontWeight: 800 },
    button: { textTransform: "none", fontWeight: 600 },
  },
  shape: { borderRadius: 10 },
  components: {
    MuiCssBaseline: { styleOverrides: { body: { background: "#09090B" } } },
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div style={{ background: "#09090B", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <BrowserRouter>
          <Navbar />
          <div style={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/playlists" element={<PlaylistsPage />} />
              <Route path="/videos" element={<VideosPage />} />
              <Route path="/watch/:videoId" element={<WatchPage />} />
              <Route path="/player/:playlistId" element={<PlayerPage />} />
              <Route path="/player/:playlistId/:index" element={<VideoPlayer />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/recents" element={<Recents />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
};

export default App;

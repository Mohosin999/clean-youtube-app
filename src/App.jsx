import { BrowserRouter, Route, Routes } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import Navbar from "./components/navbar";
import HomePage from "./components/pages/home-page";
import NotFound from "./components/not-found";
import PlayerPage from "./components/pages/player-page";
import Favorites from "./components/pages/favorite-page";
import Recents from "./components/pages/recent-page";
import VideoPlayer from "./components/video-player";
import Footer from "./components/footer";

const App = () => {
  return (
    <div style={{ background: "#0F0F0F" }}>
      <BrowserRouter>
        <CssBaseline />
        <Navbar />

        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route path="/player/:playlistId" element={<PlayerPage />} />
          <Route path="/player/:playlistId/:index" element={<VideoPlayer />} />

          <Route path="/favorites" element={<Favorites />} />
          <Route path="/recents" element={<Recents />} />

          <Route path="*" element={<NotFound />} />
        </Routes>

        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;

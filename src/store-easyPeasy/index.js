import { createStore } from "easy-peasy";
import playlistModel from "./playlist-model";
import videoModel from "./video-model";
import recentModel from "./recent-model";
import favoriteModel from "./favorite-model";

const store = createStore({
  playlists: playlistModel,
  videos: videoModel,
  recents: recentModel,
  favorites: favoriteModel,
});

export default store;

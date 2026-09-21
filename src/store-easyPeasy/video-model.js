import { action, thunk, persist } from "easy-peasy";
import getVideo from "../api/video";

const loadVideosFromLocalStorage = () => {
  const stored = localStorage.getItem("videos");
  return stored ? JSON.parse(stored) : {};
};

const videoModel = persist({
  data: loadVideosFromLocalStorage(),
  error: "",
  isLoading: false,

  addVideo: action((state, payload) => {
    state.data[payload.videoId] = payload;
    localStorage.setItem("videos", JSON.stringify(state.data));
  }),

  removeVideo: action((state, payload) => {
    delete state.data[payload];
    localStorage.setItem("videos", JSON.stringify(state.data));
  }),

  setError: action((state, payload) => {
    state.error = payload;
  }),

  setLoading: action((state, payload) => {
    state.isLoading = payload;
  }),

  getVideo: thunk(async ({ addVideo, setError, setLoading }, payload, { getState }) => {
    if (getState().data[payload]) return getState().data[payload];
    setLoading(true);
    try {
      const video = await getVideo(payload);
      if (!video || !video.videoId) {
        setError("Invalid video data");
        return null;
      }
      addVideo(video);
      return video;
    } catch (e) {
      const msg = e.response?.data?.error?.message || e.message || "Something Went Wrong";
      setError(msg);
      return null;
    } finally {
      setLoading(false);
    }
  }),
});

export default videoModel;

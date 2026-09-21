import axios from "axios";

const key = import.meta.env.VITE_YOUTUBE_API_KEY;

const getVideo = async (videoId) => {
  const URL = `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoId}&key=${key}`;
  const { data } = await axios.get(URL);
  if (!data.items || data.items.length === 0) throw new Error("Video not found");
  const item = data.items[0];
  const { title, description, thumbnails, channelId, channelTitle, publishedAt } = item.snippet;
  return {
    videoId,
    title,
    description,
    thumbnails: thumbnails.medium || thumbnails.default,
    thumbnailsAll: thumbnails,
    channelId,
    channelTitle,
    publishedAt,
    contentDetails: item.contentDetails,
    statistics: item.statistics,
  };
};

export default getVideo;

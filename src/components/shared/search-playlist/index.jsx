import { useState } from "react";
import PropTypes from "prop-types";
import { fetchYouTubePlaylist } from "../../../api-searchPlaylist";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const SearchPlaylist = ({ onApply }) => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");

  const handleAsk = async () => {
    try {
      const playlistLink = await fetchYouTubePlaylist(prompt);
      setResponse(playlistLink);
      setPrompt(""); // ✅ clear textarea after search
    } catch (error) {
      console.error(error);
      setResponse("Error fetching playlist.");
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      {/* ChatGPT-like input */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "#3f3f3f",
          borderRadius: "12px",
          padding: "6px 10px",
          width: "100%",
        }}
      >
        <TextField
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Search playlists..."
          multiline
          maxRows={4}
          variant="standard"
          InputProps={{
            disableUnderline: true,
            style: { color: "white" },
          }}
          sx={{
            flexGrow: 1,
            "& .MuiInputBase-root": {
              color: "white",
            },
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault(); // stop newline
              handleAsk(); // trigger search
            }
          }}
        />
        <IconButton onClick={handleAsk}>
          <SearchIcon sx={{ color: "white" }} />
        </IconButton>
      </Box>

      {/* Response */}
      {response && response !== "Error fetching playlist." && (
        <Typography sx={{ marginTop: 2, color: "#ddd" }}>
          <a
            href={response}
            target="_blank"
            rel="noreferrer"
            style={{ color: "skyblue", fontSize: "14px" }}
          >
            {response}
          </a>{" "}
          <span
            style={{
              cursor: "pointer",
              color: "lightgreen",
              marginLeft: "8px",
              fontSize: "14px",
              fontWeight: "bold",
              transition: "all 0.2s ease-in-out",
              display: "inline-block",
            }}
            onMouseEnter={(e) => (e.target.style.color = "lime")}
            onMouseLeave={(e) => (e.target.style.color = "lightgreen")}
            onMouseDown={(e) => (e.target.style.transform = "scale(1.05)")}
            onMouseUp={(e) => (e.target.style.transform = "scale(1)")}
            onClick={() => onApply(response)}
          >
            apply
          </span>
        </Typography>
      )}

      {response === "Error fetching playlist." && (
        <Typography sx={{ marginTop: 2, color: "red" }}>{response}</Typography>
      )}
    </Box>
  );
};

SearchPlaylist.propTypes = {
  onApply: PropTypes.func,
};

export default SearchPlaylist;

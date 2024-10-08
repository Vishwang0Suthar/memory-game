import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getPlaylistTracks } from "../spotify";
import ClipLoader from "react-spinners/ClipLoader";
import { PuffLoader } from "react-spinners";

const Playlist = ({ data, isPlaying, onTogglePlaying }) => {
  const [tracks, setTracks] = useState([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [viewState, setViewState] = useState("playlists");
  const [prevViewState, setPrevViewState] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState({});
  const [selectedPlaylistName, setSelectedPlaylistName] = useState("");
  const [currentAudio, setCurrentAudio] = useState(null);

  const handlePlay = (audioElement) => {
    onTogglePlaying();
    if (currentAudio && currentAudio !== audioElement) {
      currentAudio.pause(); // Pause the currently playing audio
      currentAudio.currentTime = 0; // Optionally, reset to the beginning
    }
    setCurrentAudio(audioElement); // Set the new audio as the current one
  };

  const handlePause = () => {
    onTogglePlaying();

    setCurrentAudio(null); // Clear the current audio when paused
  };
  const handleImageLoad = (index) => {
    setImageLoading((prevState) => ({
      ...prevState,
      [index]: false,
    }));
  };
  useEffect(() => {
    const fetchTracks = async () => {
      if (selectedPlaylist) {
        setLoading(true); // Start loading spinner
        try {
          const userTracks = await getPlaylistTracks(selectedPlaylist);
          setTracks(userTracks);
          setViewState("tracks"); // Switch to track view
        } catch (error) {
          console.error("Error fetching tracks:", error);
        } finally {
          setLoading(false); // Stop loading spinner
        }
      }
    };

    fetchTracks();
  }, [selectedPlaylist]);

  const handlePlaylistClick = (playlist_id, playlist_name) => {
    setSelectedPlaylist(playlist_id);
    setSelectedPlaylistName(playlist_name);
  };

  const handleForthClick = () => {
    console.log("in");

    if (prevViewState !== null) {
      setViewState("tracks");
      console.log("if");
    }
  };

  const handleBackClick = () => {
    setSelectedPlaylist(null);
    if (
      prevViewState !== "null" &&
      viewState !== "playlists" &&
      prevViewState !== "tracks"
    ) {
      onTogglePlaying();
    }

    setPrevViewState("tracks");
    setViewState("playlists"); // Switch back to playlist view
  };

  return (
    <div className="playlists">
      <div className="track-header">
        <h2>
          {viewState === "playlists" ? (
            "Your Playlist"
          ) : (
            <>
              Tracks from
              <br />
              {selectedPlaylistName}
            </>
          )}
        </h2>
        <div className="play-pause"></div>
        <div className="navig">
          <div onClick={handleBackClick} className="back-button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              height={24}
              width={24}
              stroke="white"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                stroke-linejoin="round"
                d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"
              />
            </svg>
          </div>
          <div onClick={handleForthClick} className="forth-button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              height={24}
              width={24}
              stroke="white"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                stroke-linejoin="round"
                d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
              />
            </svg>
          </div>
        </div>
      </div>
      {loading ? (
        <div className="spinner-container">
          <PuffLoader color={"#ffffff"} loading={loading} size={150} />
        </div>
      ) : viewState === "playlists" ? (
        <ul className="play-list">
          {data.map((playlist) => (
            <li
              onClick={() => handlePlaylistClick(playlist.id, playlist.name)}
              key={playlist.id}
              className="playlist-item"
            >
              <div className="playlist-image">
                <img
                  src={playlist.images[0]?.url || "/default_playlist.jpg"}
                  alt={playlist.name}
                  onLoad={() => handleImageLoad(0)}
                  // onError={() => handleImageError(0)}
                  style={imageLoading[0] ? { display: "none" } : {}}
                />
              </div>
              <div className="playlist-details">
                <p className="playlist-name">{playlist.name}</p>
                <p className="playlist-track-count">
                  {playlist.tracks.total} tracks
                </p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <ul className="track-list">
          {tracks.map((track, index) => (
            <li key={index} className="track-item">
              <div className="track-bg"></div>
              <div className="cover-det">
                <img
                  src={track.track.album.images[0]?.url || "/default_track.jpg"}
                  alt={track.track.name}
                  onLoad={() => handleImageLoad(index)}
                  // onError={() => handleImageError(index)}
                  style={imageLoading[index] ? { display: "none" } : {}}
                />
                <div className="track-details">
                  <div className="det-up">
                    <div className="det">
                      <p className="track-name">{track.track.name}</p>
                      <p className="track-artist">
                        {track.track.artists
                          .map((artist) => artist.name)
                          .join(", ")}
                      </p>
                    </div>
                    <a href={track.track.external_urls.spotify} target="_blank">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="2"
                        height={16}
                        width={16}
                        stroke="white"
                        class="size-6"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
                        />
                      </svg>
                    </a>
                  </div>
                  {track.track.preview_url ? (
                    <div className="track-preview">
                      <audio
                        controls
                        onPlay={(e) => handlePlay(e.target)}
                        onPause={handlePause}
                      >
                        <source
                          src={track.track.preview_url}
                          type="audio/mpeg"
                        />
                        Your browser does not support the audio element.
                      </audio>
                    </div>
                  ) : (
                    <p>No preview available</p>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

Playlist.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      images: PropTypes.arrayOf(
        PropTypes.shape({
          url: PropTypes.string,
        })
      ),
      tracks: PropTypes.shape({
        total: PropTypes.number.isRequired,
      }).isRequired,
    })
  ).isRequired,
};

export default Playlist;

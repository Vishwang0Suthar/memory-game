import React from "react";
import PropTypes from "prop-types";

const Playlist = ({ data }) => {
  const handleClick = () => {
    console.log(data);
  };
  return (
    <div className="playlists">
      <h2>Your Playlists</h2>
      <ul>
        {data.map((playlist) => (
          <li onClick={handleClick} key={playlist.id} className="playlist-item">
            <div className="playlist-image">
              <img
                src={playlist.images[0]?.url || "/default_playlist.jpg"}
                alt={playlist.name}
              />
            </div>
            <div className="playlist-details">
              <p className="playlist-name">{playlist.name}</p>
              <p className="playlist-track-count">{playlist.tracks.total}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Playlist;

Playlist.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      // Add other expected properties here
    })
  ).isRequired,
};

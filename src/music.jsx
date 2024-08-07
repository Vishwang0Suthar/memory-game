import { useEffect, useState } from "react";
import apiClient from "./spotify";
import { setClientToken, getUserPlaylists } from "./spotify"; // Import the new method

import APIKit from "./spotify";
import "./music.css";

export default function Music() {
  const [image, setImage] = useState("/logo.jpg");
  const [name, setName] = useState("Magan");
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Set your token here
        const token = window.localStorage.getItem("spotify-token"); // Replace with your token retrieval method
        setClientToken(token);

        // Fetch user data
        const userData = await apiClient.get("me");
        setImage(userData.data.images[0].url);
        setName(userData.data.display_name);

        // Fetch playlists
        const userPlaylists = await getUserPlaylists();
        setPlaylists(userPlaylists);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="music">
      <div className="musicheader">
        <h1>Skibidi music player</h1>
        <div className="music-wrap">
          <p>{name}</p>
          <img src={image} />
        </div>
      </div>
      <div className="playlists">
        <h2>Your Playlists</h2>
        <ul>
          {playlists.map((playlist) => (
            <li key={playlist.id} className="playlist-item">
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
      <div className="controls">
        {/* <button className="btn prev-btn">Prev</button>
        <button className="btn play-btn">Play</button>
        <button className="btn next-btn">Next</button> */}
      </div>
    </div>
  );
}

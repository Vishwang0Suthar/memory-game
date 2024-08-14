import { useEffect, useState } from "react";
import apiClient from "./spotify";
import { setClientToken, getUserPlaylists } from "./spotify"; // Import the new method

import APIKit from "./spotify";
import "./music.css";
import Playlist from "./components/playlist";

export default function Music({ token }) {
  const [image, setImage] = useState("");
  const [name, setName] = useState("Magan");
  const [playlists, setPlaylists] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        // // Get token from localStorage
        // const token = window.localStorage.getItem("spotify-token");
        // if (!token) {
        //   throw new Error("No Spotify token found");
        // }

        // Set the token in the API client
        setClientToken(token);

        // Fetch user data
        const userData = await apiClient.get("me");
        setImage(userData.data.images[0]?.url || "/default_profile_image.jpg");
        setName(userData.data.display_name);

        // Fetch playlists
        const userPlaylists = await getUserPlaylists();
        setPlaylists(userPlaylists);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, []);

  const togglePlaying = () => {
    setIsPlaying((prevIsPlaying) => !prevIsPlaying);
  };

  return (
    <div className="music">
      <div className="musicheader">
        <h1>Skibidi music player</h1>
        <div className="music-wrap">
          <svg
            width="100%"
            height="100%"
            id="svg"
            viewBox="0 0 1440 390"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M 0,400 L 0,400 C 27.241068048406383,292.38513670404893 54.482136096812766,184.7702734080978 87,140 C 119.51786390318723,95.22972659190218 157.3125236611553,113.30404307165765 186,142 C 214.6874763388447,170.69595692834235 234.2677692585661,210.0135543052717 264,188 C 293.7322307414339,165.9864456947283 333.61639930458017,82.64173970725558 370,91 C 406.38360069541983,99.35826029274442 439.26663352311306,199.41948686570592 464,201 C 488.73336647688694,202.58051313429408 505.31706660296766,105.68031282992074 534,79 C 562.6829333970323,52.31968717007926 603.4651000650166,95.85926181461113 639,133 C 674.5348999349834,170.14073818538887 704.8225331369661,200.88263991163478 729,213 C 753.1774668630339,225.11736008836522 771.244767387119,218.61017853884982 795,212 C 818.755232612881,205.38982146115018 848.1983973145582,198.6766459329659 885,196 C 921.8016026854418,193.3233540670341 965.9616433546485,194.68323772928673 997,196 C 1028.0383566453515,197.31676227071327 1045.9550292668482,198.59040314988727 1070,191 C 1094.0449707331518,183.40959685011273 1124.2182395779582,166.95514967116424 1157,166 C 1189.7817604220418,165.04485032883576 1225.1720124213189,179.5889981654558 1258,150 C 1290.8279875786811,120.41100183454421 1321.0937107367658,46.68885766701263 1351,81 C 1380.9062892632342,115.31114233298737 1410.453144631617,257.6555711664937 1440,400 L 1440,400 L 0,400 Z"
              stroke="none"
              stroke-width="0"
              fill="#fbb55b"
              fill-opacity="1"
              class="transition-all duration-300 ease-in-out delay-150 path-0"
            ></path>
          </svg>
          <p>{name}</p>
          {/* <img
            src={image}
            className={isPlaying ? "music-wrap-img-playing" : "music-wrap-img"}
            alt="Profile"
          /> */}
          {isPlaying ? (
            <div className="cd-player">
              <img
                src={image}
                className="music-wrap-img-playing"
                alt="Profile"
              />
              <div className="red-dot">
                <div className="dot"></div>
              </div>
            </div>
          ) : (
            <div className="cd-unplay">
              <img src={image} className="music-wrap-img" alt="Profile" />
            </div>
          )}
        </div>
      </div>
      <Playlist
        data={playlists}
        isPlaying={isPlaying}
        onTogglePlaying={togglePlaying}
      />
      <div className="controls">
        {/* <button className="btn prev-btn">Prev</button>
        <button className="btn play-btn">Play</button>
        <button className="btn next-btn">Next</button> */}
      </div>
    </div>
  );
}

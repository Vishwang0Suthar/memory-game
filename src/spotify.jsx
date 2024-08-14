import axios from "axios";

// Get environment variables
const authEndpoint = "https://accounts.spotify.com/authorize?";
const clientId = "ead5b4050a0147c8b68b917c383ff6d7";
const redirectUri = "https://memory-game-flax-six.vercel.app/#"; // Use environment variable
const scopes = ["user-library-read", "playlist-read-private"];

export const loginEndpoint = `${authEndpoint}client_id=${clientId}&redirect_uri=${encodeURIComponent(
  redirectUri
)}&scope=${encodeURIComponent(
  scopes.join(" ")
)}&response_type=token&show_dialog=true`;

const apiClient = axios.create({
  baseURL: "https://api.spotify.com/v1/",
});

// Set token in axios instance
export const setClientToken = (token) => {
  if (token) {
    apiClient.defaults.headers.Authorization = `Bearer ${token}`;
  } else {
    throw new Error("No token provided for authorization");
  }
};

export const getUserPlaylists = async () => {
  try {
    const response = await apiClient.get("me/playlists");
    return response.data.items;
  } catch (error) {
    console.error("Error fetching playlists:", error);
    throw error;
  }
};

export const getPlaylistTracks = async (playlist_id) => {
  try {
    const response = await apiClient.get(`playlists/${playlist_id}/tracks`);
    return response.data.items;
  } catch (error) {
    console.error("Error fetching playlist tracks:", error);
    throw error;
  }
};

export default apiClient;

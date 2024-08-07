import axios from "axios";

const authEndpoint = "https://accounts.spotify.com/authorize?";
const clientId = "ead5b4050a0147c8b68b917c383ff6d7";
const redirectUri = "http://localhost:5173";
const scopes = ["user-library-read", "playlist-read-private"];

export const loginEndpoint = `${authEndpoint}client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
  "%20"
)}&response_type=token&show_dialog=true`;

const apiClient = axios.create({
  baseURL: "https://api.spotify.com/v1/",
});

// Add this function to your apiClient setup file
export const getUserPlaylists = async () => {
  try {
    const response = await apiClient.get("me/playlists");
    return response.data.items;
  } catch (error) {
    console.error("Error fetching playlists:", error);
    throw error;
  }
};

export const setClientToken = (token) => {
  apiClient.interceptors.request.use(async function (config) {
    config.headers.Authorization = "Bearer " + token;
    return config;
  });
};

export default apiClient;

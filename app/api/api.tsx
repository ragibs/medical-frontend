import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: "https://med-app.ca/",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const accessToken = Cookies.get("medappapi_access_token");
  if (accessToken) {
    config.headers["Authorization"] = `Bearer ${accessToken}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.warn("Access token expired. Logging out.");

      Cookies.remove("medappapi_access_token");
      window.location.href = "/auth";
    }
    return Promise.reject(error);
  }
);

export default api;

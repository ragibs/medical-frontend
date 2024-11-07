import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000",
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor to attach access token for each request
api.interceptors.request.use((config) => {
  const accessToken = Cookies.get("medappapi_access_token");
  if (accessToken) {
    config.headers["Authorization"] = `Bearer ${accessToken}`;
  }
  return config;
});

// Interceptor to handle 401 errors and refresh tokens automatically
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true; // Prevent retry loop
      try {
        const refreshToken = Cookies.get("medappapi_refresh_token");
        const response = await axios.post(
          "http://127.0.0.1:8000/token/refresh/", // Django refresh endpoint
          { refresh: refreshToken },
          { headers: { "Content-Type": "application/json" } }
        );

        const { access } = response.data;
        // Update access token in cookies
        Cookies.set("medappapi_access_token", access, {
          sameSite: "None",
          secure: true,
        });

        // Retry the original request with new access token
        originalRequest.headers["Authorization"] = `Bearer ${access}`;
        return api(originalRequest);
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
        // Clear tokens and redirect to login
        Cookies.remove("medappapi_access_token");
        Cookies.remove("medappapi_refresh_token");
        window.location.href = "/auth";
      }
    }
    return Promise.reject(error);
  }
);

export default api;

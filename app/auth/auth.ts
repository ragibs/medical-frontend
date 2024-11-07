import api from "../api/api";
import Cookies from "js-cookie";

// Login
export const login = async (username: string, password: string) => {
  const response = await api.post("/login/", { username, password });
  const { access, refresh } = response.data;

  Cookies.set("medappapi_access_token", access, { secure: true });
  Cookies.set("medappapi_refresh_token", refresh, { secure: true });

  return response.data;
};

// Logout
export const logout = () => {
  Cookies.remove("medappapi_access_token");
  Cookies.remove("medappapi_refresh_token");
  window.location.href = "/auth";
};

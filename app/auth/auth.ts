import api from "../api/api";
import Cookies from "js-cookie";

// Login
export const login = async (username: string, password: string) => {
  const response = await api.post("/login/", { username, password });
  const { access } = response.data;

  Cookies.set("medappapi_access_token", access, {
    secure: true,
    sameSite: "Strict",
  });

  return response.data;
};

// Logout
export const logout = () => {
  Cookies.remove("medappapi_access_token");
  window.location.href = "/auth";
};

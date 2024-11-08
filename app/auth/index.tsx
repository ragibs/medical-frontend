import api from "../api/api";
import Cookies from "js-cookie";
import { useUserContext } from "@/app/context";

// Custom hook to handle authentication
export const useAuth = () => {
  const { setUser, clearUser } = useUserContext();

  // Login function
  const login = async (username: string, password: string) => {
    try {
      const response = await api.post("/login/", { username, password });
      const { access, user, role } = response.data;

      // Set the access token in cookies
      Cookies.set("medappapi_access_token", access, {
        secure: true,
        sameSite: "Strict",
      });

      // Update the user context
      setUser({
        id: user.pk,
        first_name: user.first_name,
        last_name: user.last_name,
        username: user.username,
        role: role,
      });

      return response.data;
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  // Logout function
  const logout = () => {
    Cookies.remove("medappapi_access_token");
    window.location.href = "/auth";

    setTimeout(() => {
      clearUser();
    }, 100);
  };

  return { login, logout };
};

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/authService";

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const login = async (credentials) => {
    setLoading(true);
    setError(null);

    try {
      const data = await authService.login(credentials);

      // Armazenar token no localStorage
      localStorage.setItem("token", data.token);

      setLoading(false);
      return data;
    } catch (err) {
      setError(err.response?.data?.message || "Erro ao fazer login");
      setLoading(false);
      throw err;
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    } finally {
      localStorage.removeItem("token");
      navigate("/login");
    }
  };

  const isAuthenticated = () => {
    return !!localStorage.getItem("token");
  };

  return {
    login,
    logout,
    loading,
    error,
    isAuthenticated,
  };
};

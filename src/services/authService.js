import { jwtDecode } from "jwt-decode";
import httpClient from "./httpClient";

export const authService = {
  login: async (credentials) => {
    try {
      const response = await httpClient.post("/api/login", credentials);
      const token = response.data;
      const decodedToken = jwtDecode(token);

      sessionStorage.setItem("token", token);
      sessionStorage.setItem(
        "userData",
        JSON.stringify({
          id: decodedToken.id,
          email: decodedToken.email,
          nome: decodedToken.nome,
          tipoUsuario: decodedToken.tipoUsuario,
          cpf: decodedToken.cpf,
          dataNasc: decodedToken.dataNasc,
        })
      );

      return response.data;
    } catch (error) {
      console.error("Erro durante login:", error.message);
      throw new Error(
        `Falha na autenticação: ${
          error.response?.data?.message || error.message
        }`
      );
    }
  },

  getUserData: () => {
    const userData = sessionStorage.getItem("userData");
    return userData ? JSON.parse(userData) : null;
  },
};

import httpClient from "./httpClient";

export const usuarioService = {
  // Buscar usuário pelo email
  buscarUsuario: async (email) => {
    try {
      const response = await httpClient.get(`/api/enderecos/email/${email}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar usuário:", error);
      throw error;
    }
  },

  // Cadastro de usuário (POST /api/cadastro)
  cadastrarUsuario: async (dadosUsuario) => {
    try {
      const response = await httpClient.post("/api/cadastro", dadosUsuario);
      return response;
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);
      throw error;
    }
  },

  // Cadastro de endereço (POST /api/enderecos)
  cadastrarEndereco: async (dadosEndereco) => {
    try {
      const response = await httpClient.post("/api/enderecos", dadosEndereco);
      return response;
    } catch (error) {
      console.error("Erro ao cadastrar endereço:", error);
      throw error;
    }
  },
};
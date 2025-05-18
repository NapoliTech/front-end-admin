import httpClient from "./httpClient";

export const usuarioService = {
  // Buscar usuário pelo ID (usando ID mocado 1 por enquanto)
  buscarUsuario: async (email) => {
    try {
      // Usando ID mocado 1 conforme solicitado
      const response = await httpClient.get(`/api/3`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar usuário:", error);
      throw error;
    }
  },

  // Outros métodos relacionados a usuários podem ser adicionados aqui
  cadastrarUsuario: async (dadosUsuario) => {
    try {
      const response = await httpClient.post("/api/usuarios", dadosUsuario);
      return response.data;
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);
      throw error;
    }
  },
};

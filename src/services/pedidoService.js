import httpClient from "./httpClient";

export const pedidoService = {
  getProdutos: async () => {
    try {
      const response = await httpClient.get("/api/produtos");
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
      throw new Error(
        `Falha ao carregar produtos: ${
          error.response?.data?.message || error.message
        }`
      );
    }
  },

  getTamanhos: () => [
    { value: "GRANDE", label: "Grande" },
    { value: "MEIO_A_MEIO", label: "Meio a Meio" },
  ],

  getBordas: () => [
    { value: "CATUPIRY", label: "Catupiry" },
    { value: "NENHUM", label: "Sem Borda" },
  ],

  gerarPedido: async (payload) => {
    try {
      const response = await httpClient.post("/api/pedidos", payload);
      return response.data;
    } catch (error) {
      console.error("Erro ao gerar pedido:", error);
      throw new Error(
        `Falha ao gerar pedido: ${
          error.response?.data?.message || error.message
        }`
      );
    }
  },
};

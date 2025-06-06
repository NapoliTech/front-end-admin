import httpClient from "./httpClient";

export const dashboardService = {
  getKPIs: async () => {
    try {
      const response = await httpClient.get("/api/dashboard/kpis/cards");
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar KPIs:", error);
      throw new Error(
        `Falha ao carregar KPIs: ${
          error.response?.data?.message || error.message
        }`
      );
    }
  },

  getFaturamentoAnual: async (ano) => {
    try {
      const response = await httpClient.get(
        `/api/dashboard/kpis/faturamento/${ano}`
      );
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar faturamento anual:", error);
      throw new Error(
        `Falha ao carregar faturamento: ${
          error.response?.data?.message || error.message
        }`
      );
    }
  },
  getDistribuicaoVendas: async (ano, mes) => {
    try {
      const response = await httpClient.get(
        `/api/dashboard/kpis/vendas/categoria/${ano}/${mes}`
      );
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar distribuição de vendas:", error);
      throw new Error(
        `Falha ao carregar distribuição: ${
          error.response?.data?.message || error.message
        }`
      );
    }
  },

  getVendasUltimosDias: async () => {
    try {
      const response = await httpClient.get(
        "/api/dashboard/kpis/vendas/ultimos-sete-dias"
      );
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar vendas dos últimos dias:", error);
      throw new Error(
        `Falha ao carregar vendas: ${
          error.response?.data?.message || error.message
        }`
      );
    }
  },
};

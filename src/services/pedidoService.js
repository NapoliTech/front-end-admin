const mockPizzas = [
  { id: 1, nome: "Pizza de Calabresa", preco: 39.9, categoria: "PIZZA" },
  { id: 2, nome: "Pizza de Frango", preco: 39.9, categoria: "PIZZA" },
  { id: 3, nome: "Pizza de Portuguesa", preco: 42.9, categoria: "PIZZA" },
];

const mockBebidas = [
  { id: 1, nome: "Coca-Cola 2L", preco: 12.9, categoria: "BEBIDA" },
  { id: 2, nome: "Guaraná 2L", preco: 10.9, categoria: "BEBIDA" },
  { id: 3, nome: "Cerveja 600ml", preco: 8.9, categoria: "BEBIDA" },
];

export const pedidoService = {
  getPizzas: async () => {
    // Simula chamada à API
    return mockPizzas;
  },

  getBebidas: async () => {
    // Simula chamada à API
    return mockBebidas;
  },

  getTamanhos: () => [
    { value: "GRANDE", label: "Grande" },
    { value: "MEIO_A_MEIO", label: "Meio a Meio" },
  ],

  getBordas: () => [
    { value: "CATUPIRY", label: "Catupiry" },
    { value: "NENHUM", label: "Sem Borda" },
  ],
};

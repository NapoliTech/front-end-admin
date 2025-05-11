import React from "react";
import PedidosTable from "../organismo/PedidosTable";


const Pedidos = () => {
  const mockPedidos = [
    {
      id: 1,
      nomeCliente: "ale fadim",
      statusPedido: "RECEBIDO",
      precoTotal: 55.9,
      observacao: "",
      tipoEntrega: "ENCOMENDA",
      itens: [
        {
          id: 21,
          quantidade: 1,
          produto: {
            id: 1,
            nome: "Pizza de palmito",
            preco: 39.9,
            quantidadeEstoque: 9,
            ingredientes: "",
            categoriaProduto: "PIZZA",
          },
          tamanhoPizza: "MEIO_A_MEIO",
          bordaRecheada: "CATUPIRY",
          precoTotal: 27.95,
        },
        {
          id: 22,
          quantidade: 1,
          produto: {
            id: 2,
            nome: "Pizza de FRANGO",
            preco: 39.9,
            quantidadeEstoque: 10,
            ingredientes: "",
            categoriaProduto: "PIZZA",
          },
          tamanhoPizza: "MEIO_A_MEIO",
          bordaRecheada: "CATUPIRY",
          precoTotal: 27.95,
        },
      ],
    },
  ];

  return <PedidosTable pedidos={mockPedidos} />;
};

export default Pedidos;

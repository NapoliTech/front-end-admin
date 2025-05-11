import React from "react";
import PedidosTable from "../organismo/PedidosTable";


const Pedidos = () => {
  const mockPedidos = [
    {
      id: 1,
      cliente: "João Silva",
      status: "Pendente",
      total: "R$ 150,00",
      data: "20/01/2024",
    },
    {
      id: 2,
      cliente: "Maria Santos",
      status: "Finalizado",
      total: "R$ 280,00",
      data: "19/01/2024",
    },
    {
      id: 3,
      cliente: "Pedro Souza",
      status: "Em Preparo",
      total: "R$ 95,00",
      data: "20/01/2024",
    },
    {
      id: 4,
      cliente: "Ana Oliveira",
      status: "Pendente",
      total: "R$ 175,00",
      data: "19/01/2024",
    },
  ];

  return <PedidosTable pedidos={mockPedidos} />;
};

export default Pedidos;

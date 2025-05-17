import React, { useState, useEffect } from "react";
import PedidosTable from "../organismo/PedidosTable";
import {
  Box,
  Typography,
  CircularProgress,
  Container,
  Button,
} from "@mui/material";
import { Refresh } from "@mui/icons-material";

const Pedidos = () => {
  const [loading, setLoading] = useState(false);
  const [allPedidos, setAllPedidos] = useState([]);
  const [filteredPedidos, setFilteredPedidos] = useState([]);
  const [searchParams, setSearchParams] = useState({ term: "", filters: [] });

  const carregarPedidos = () => {
    setLoading(true);

    // Em produção, você faria uma chamada à API:
    // const fetchPedidos = async () => {
    //   try {
    //     const response = await pedidoService.listarPedidosAtivos();
    //     setAllPedidos(response.data);
    //     setFilteredPedidos(response.data);
    //   } catch (error) {
    //     console.error("Erro ao carregar pedidos:", error);
    //   } finally {
    //     setLoading(false);
    //   }
    // };
    // fetchPedidos();

    // Simulando um atraso para mostrar o loading
    setTimeout(() => {
      setAllPedidos(mockPedidos);
      setFilteredPedidos(mockPedidos);
      setLoading(false);
    }, 800);
  };

  useEffect(() => {
    carregarPedidos();
  }, []);

  // Efeito para filtrar pedidos quando os parâmetros de busca mudam
  useEffect(() => {
    if (!searchParams.term.trim()) {
      setFilteredPedidos(allPedidos);
      return;
    }

    const term = searchParams.term.toLowerCase().trim();
    const hasFilter = searchParams.filters.length > 0;

    const filtered = allPedidos.filter((pedido) => {
      // Se não há filtros ativos, busca em todos os campos
      if (!hasFilter) {
        return (
          pedido.id.toString().includes(term) ||
          pedido.nomeCliente.toLowerCase().includes(term) ||
          pedido.statusPedido.toLowerCase().includes(term) ||
          pedido.tipoEntrega.toLowerCase().includes(term)
        );
      }

      // Se há filtros ativos, busca apenas nos campos filtrados
      // Se há filtros ativos, busca apenas nos campos filtrados
return searchParams.filters.some(filter => {
  switch (filter) {
    case 'codigo':
      return pedido.id.toString().includes(term);
    case 'cliente':
      return pedido.nomeCliente.toLowerCase().includes(term);
    case 'status': {
      // Mapear termos comuns para os status do sistema
      const statusTerms = {
        'recebido': 'RECEBIDO',
        'preparo': 'EM_PREPARO',
        'pronto': 'PRONTO',
        'entregue': 'ENTREGUE'
      };
      
      // Verificar se o termo de busca corresponde a algum status
      for (const [key, value] of Object.entries(statusTerms)) {
        if (key.includes(term)) {
          return pedido.statusPedido === value;
        }
      }
      
      // Verificar diretamente se o status contém o termo
      return pedido.statusPedido.toLowerCase().includes(term);
    }
    case 'entrega':
      return pedido.tipoEntrega.toLowerCase().includes(term);
    case 'data':
      // Aqui você implementaria a lógica para filtrar por data
      // se tiver um campo de data no pedido
      return false;
    default:
      return false;
  }
});

    });

    setFilteredPedidos(filtered);
  }, [searchParams, allPedidos]);

  const handleSearch = (params) => {
    setSearchParams(params);
  };

  // Dados de exemplo expandidos
  const mockPedidos = [
    {
      id: 1,
      nomeCliente: "Alessandro Fadim",
      statusPedido: "RECEBIDO",
      precoTotal: 55.9,
      observacao: "Sem cebola, por favor.",
      tipoEntrega: "ENCOMENDA",
      itens: [
        {
          id: 21,
          quantidade: 1,
          produto: {
            id: 1,
            nome: "Pizza de Palmito",
            preco: 39.9,
            quantidadeEstoque: 9,
            ingredientes: "Palmito, mussarela, molho de tomate",
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
            nome: "Pizza de Frango",
            preco: 39.9,
            quantidadeEstoque: 10,
            ingredientes: "Frango, catupiry, milho, mussarela",
            categoriaProduto: "PIZZA",
          },
          tamanhoPizza: "MEIO_A_MEIO",
          bordaRecheada: "CATUPIRY",
          precoTotal: 27.95,
        },
      ],
    },
    {
      id: 2,
      nomeCliente: "Maria Silva",
      statusPedido: "EM_PREPARO",
      precoTotal: 72.8,
      observacao: "",
      tipoEntrega: "DELIVERY",
      itens: [
        {
          id: 23,
          quantidade: 1,
          produto: {
            id: 3,
            nome: "Pizza de Calabresa",
            preco: 42.9,
            quantidadeEstoque: 8,
            ingredientes: "Calabresa, cebola, mussarela, molho de tomate",
            categoriaProduto: "PIZZA",
          },
          tamanhoPizza: "GRANDE",
          bordaRecheada: "CHEDDAR",
          precoTotal: 42.9,
        },
        {
          id: 24,
          quantidade: 2,
          produto: {
            id: 10,
            nome: "Refrigerante Cola 2L",
            preco: 14.9,
            quantidadeEstoque: 15,
            ingredientes: "",
            categoriaProduto: "BEBIDA",
          },
          precoTotal: 29.8,
        },
      ],
    },
    {
      id: 3,
      nomeCliente: "João Pereira",
      statusPedido: "PRONTO",
      precoTotal: 89.7,
      observacao: "Entregar na portaria",
      tipoEntrega: "DELIVERY",
      itens: [
        {
          id: 25,
          quantidade: 1,
          produto: {
            id: 4,
            nome: "Pizza de Quatro Queijos",
            preco: 45.9,
            quantidadeEstoque: 7,
            ingredientes: "Mussarela, provolone, gorgonzola, parmesão",
            categoriaProduto: "PIZZA",
          },
          tamanhoPizza: "GRANDE",
          bordaRecheada: "CREAM_CHEESE",
          precoTotal: 45.9,
        },
        {
          id: 26,
          quantidade: 1,
          produto: {
            id: 5,
            nome: "Pizza de Chocolate",
            preco: 43.8,
            quantidadeEstoque: 5,
            ingredientes: "Chocolate, morango, leite condensado",
            categoriaProduto: "PIZZA",
          },
          tamanhoPizza: "GRANDE",
          bordaRecheada: "CHOCOLATE",
          precoTotal: 43.8,
        },
      ],
    },
    {
      id: 4,
      nomeCliente: "Carlos Oliveira",
      statusPedido: "RECEBIDO",
      precoTotal: 62.5,
      observacao: "",
      tipoEntrega: "DELIVERY",
      itens: [
        {
          id: 27,
          quantidade: 1,
          produto: {
            id: 6,
            nome: "Pizza Margherita",
            preco: 38.9,
            quantidadeEstoque: 10,
            ingredientes: "Molho de tomate, mussarela, manjericão",
            categoriaProduto: "PIZZA",
          },
          tamanhoPizza: "GRANDE",
          bordaRecheada: "TRADICIONAL",
          precoTotal: 38.9,
        },
        {
          id: 28,
          quantidade: 1,
          produto: {
            id: 11,
            nome: "Refrigerante Guaraná 2L",
            preco: 13.9,
            quantidadeEstoque: 12,
            ingredientes: "",
            categoriaProduto: "BEBIDA",
          },
          precoTotal: 13.9,
        },
        {
          id: 29,
          quantidade: 1,
          produto: {
            id: 15,
            nome: "Batata Frita Porção",
            preco: 9.7,
            quantidadeEstoque: 8,
            ingredientes: "",
            categoriaProduto: "ACOMPANHAMENTO",
          },
          precoTotal: 9.7,
        },
      ],
    },
    {
      id: 5,
      nomeCliente: "Ana Beatriz",
      statusPedido: "EM_PREPARO",
      precoTotal: 48.9,
      observacao: "Bem passada, por favor",
      tipoEntrega: "ENCOMENDA",
      itens: [
        {
          id: 30,
          quantidade: 1,
          produto: {
            id: 7,
            nome: "Pizza Portuguesa",
            preco: 48.9,
            quantidadeEstoque: 6,
            ingredientes: "Presunto, ovo, cebola, ervilha, mussarela",
            categoriaProduto: "PIZZA",
          },
          tamanhoPizza: "GRANDE",
          bordaRecheada: "TRADICIONAL",
          precoTotal: 48.9,
        },
      ],
    },
    {
      id: 5,
      nomeCliente: "Ana Beatriz",
      statusPedido: "EM_PREPARO",
      precoTotal: 48.9,
      observacao: "Bem passada, por favor",
      tipoEntrega: "ENCOMENDA",
      itens: [
        {
          id: 30,
          quantidade: 1,
          produto: {
            id: 7,
            nome: "Pizza Portuguesa",
            preco: 48.9,
            quantidadeEstoque: 6,
            ingredientes: "Presunto, ovo, cebola, ervilha, mussarela",
            categoriaProduto: "PIZZA",
          },
          tamanhoPizza: "GRANDE",
          bordaRecheada: "TRADICIONAL",
          precoTotal: 48.9,
        },
      ],
    },
    {
      id: 5,
      nomeCliente: "Ana Beatriz",
      statusPedido: "EM_PREPARO",
      precoTotal: 48.9,
      observacao: "Bem passada, por favor",
      tipoEntrega: "ENCOMENDA",
      itens: [
        {
          id: 30,
          quantidade: 1,
          produto: {
            id: 7,
            nome: "Pizza Portuguesa",
            preco: 48.9,
            quantidadeEstoque: 6,
            ingredientes: "Presunto, ovo, cebola, ervilha, mussarela",
            categoriaProduto: "PIZZA",
          },
          tamanhoPizza: "GRANDE",
          bordaRecheada: "TRADICIONAL",
          precoTotal: 48.9,
        },
      ],
    },
  ];

  return (
    <Container maxWidth="xl" sx={{ mt: 3 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h4">Pedidos</Typography>
        <Button
          variant="outlined"
          startIcon={<Refresh />}
          onClick={carregarPedidos}
          disabled={loading}
        >
          Atualizar
        </Button>
      </Box>

      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "50vh",
          }}
        >
          <CircularProgress />
        </Box>
      ) : filteredPedidos.length > 0 ? (
        <PedidosTable pedidos={filteredPedidos} onSearch={handleSearch} />
      ) : (
        <Box sx={{ textAlign: "center", py: 5 }}>
          <Typography variant="h6" color="text.secondary">
            Nenhum pedido encontrado com os critérios de busca atuais
          </Typography>
          <Button
            variant="text"
            color="primary"
            onClick={() => setSearchParams({ term: "", filters: [] })}
            sx={{ mt: 2 }}
          >
            Limpar filtros
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default Pedidos;

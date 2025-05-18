import React, { useState, useEffect } from "react";
import PedidosTable from "../organismo/PedidosTable";
import {
  Box,
  Typography,
  CircularProgress,
  Container,
  Button,
  Alert,
  Snackbar,
} from "@mui/material";
import { Refresh } from "@mui/icons-material";
import { pedidosAtivos } from "../../services/pedidosAtivos";

const Pedidos = () => {
  const [loading, setLoading] = useState(false);
  const [allPedidos, setAllPedidos] = useState([]);
  const [filteredPedidos, setFilteredPedidos] = useState([]);
  const [searchParams, setSearchParams] = useState({ term: "", filters: [] });
  const [error, setError] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const carregarPedidos = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await pedidosAtivos.listarPedidosAtivos();
      setAllPedidos(data);
      setFilteredPedidos(data);
    } catch (error) {
      console.error("Erro ao carregar pedidos:", error);
      setError(
        error.message ||
          "Não foi possível carregar os pedidos. Tente novamente mais tarde."
      );
      setOpenSnackbar(true);
    } finally {
      setLoading(false);
    }
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
      return searchParams.filters.some((filter) => {
        switch (filter) {
          case "codigo":
            return pedido.id.toString().includes(term);
          case "cliente":
            return pedido.nomeCliente.toLowerCase().includes(term);
          case "status": {
            // Mapear termos comuns para os status do sistema
            const statusTerms = {
              recebido: "RECEBIDO",
              preparo: "EM_PREPARO",
              pronto: "PRONTO",
              entregue: "ENTREGUE",
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
          case "entrega":
            return pedido.tipoEntrega.toLowerCase().includes(term);
          case "data":
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

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

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
            {error
              ? "Erro ao carregar pedidos"
              : "Nenhum pedido encontrado com os critérios de busca atuais"}
          </Typography>
          <Button
            variant="text"
            color="primary"
            onClick={() =>
              error
                ? carregarPedidos()
                : setSearchParams({ term: "", filters: [] })
            }
            sx={{ mt: 2 }}
          >
            {error ? "Tentar novamente" : "Limpar filtros"}
          </Button>
        </Box>
      )}

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="error"
          sx={{ width: "100%" }}
        >
          {error}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Pedidos;

import React, { useState } from "react";
import {
  IconButton,
  Chip,
  Collapse,
  Box,
  Divider,
  Stack,
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
} from "@mui/material";
import {
  KeyboardArrowDown,
  KeyboardArrowUp,
  Visibility,
  Edit,
  Delete,
  LocalPizza,
} from "@mui/icons-material";

const PedidoCardTelaAtivos = ({ pedido }) => {
  // Estado local para este card específico
  const [isOpen, setIsOpen] = useState(false);

  // Verificar se o pedido existe para evitar erros
  if (!pedido) {
    return null;
  }

  const toggleDetails = (e) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  const getStatusColor = (status) => {
    const colors = {
      RECEBIDO: "info",
      EM_PREPARO: "warning",
      PRONTO: "success",
      ENTREGUE: "default",
    };
    return colors[status] || "default";
  };

  return (
    <Card
      elevation={2}
      sx={{
        width: { xs: "100%", sm: "48%", md: "32%", lg: "24%" },
        minWidth: 280,
        borderLeft: `4px solid ${
          pedido.statusPedido === "RECEBIDO"
            ? "#2196f3"
            : pedido.statusPedido === "EM_PREPARO"
            ? "#ff9800"
            : pedido.statusPedido === "PRONTO"
            ? "#4caf50"
            : "#9e9e9e"
        }`,
      }}
    >
      <CardContent sx={{ p: 2, pb: 1 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 1,
          }}
        >
          <Chip
            label={pedido.statusPedido}
            color={getStatusColor(pedido.statusPedido)}
            size="small"
          />
          <Typography variant="body2" color="text.secondary">
            #{pedido.id}
          </Typography>
        </Box>

        <Typography variant="h6" component="div" noWrap>
          {pedido.nomeCliente}
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
          <Typography variant="body2" color="text.secondary">
            {pedido.tipoEntrega}
          </Typography>
          <Typography variant="body1" fontWeight="bold">
            R$ {pedido.precoTotal.toFixed(2)}
          </Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ p: 1, pt: 0, justifyContent: "space-between" }}>
        <Box>
          <IconButton size="small" color="primary">
            <Visibility />
          </IconButton>
          <IconButton size="small" color="success">
            <Edit />
          </IconButton>
          <IconButton size="small" color="error">
            <Delete />
          </IconButton>
        </Box>
        <Button
          size="small"
          endIcon={isOpen ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          onClick={toggleDetails}
        >
          Detalhes
        </Button>
      </CardActions>

      <Collapse in={isOpen} timeout="auto" unmountOnExit>
        <Divider />
        <CardContent sx={{ p: 2 }}>
          {pedido.observacao && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2">
                <strong>Observação:</strong> {pedido.observacao}
              </Typography>
            </Box>
          )}

          <Typography variant="subtitle2" gutterBottom sx={{ mt: 1 }}>
            <LocalPizza sx={{ mr: 1, verticalAlign: "middle", fontSize: 18 }} />
            Itens do Pedido
          </Typography>

          <Stack spacing={1} sx={{ mt: 1 }}>
            {/* Verificar se itens existe antes de mapear */}
            {pedido.itens && pedido.itens.length > 0 ? (
              pedido.itens.map((item) => (
                <Box
                  key={item.id}
                  sx={{
                    p: 1,
                    bgcolor: "background.default",
                    borderRadius: 1,
                    fontSize: "0.875rem",
                  }}
                >
                  <Typography variant="body2" fontWeight="medium">
                    {item.produto?.nome || "Produto sem nome"}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mt: 0.5,
                    }}
                  >
                    <Typography variant="caption" color="text.secondary">
                      {item.tamanhoPizza && `${item.tamanhoPizza} • `}
                      {item.bordaRecheada && `Borda: ${item.bordaRecheada} • `}
                      Qtd: {item.quantidade || 1}
                    </Typography>
                    <Typography variant="body2" fontWeight="bold">
                      R$ {(item.precoTotal || 0).toFixed(2)}
                    </Typography>
                  </Box>
                </Box>
              ))
            ) : (
              <Typography variant="body2" color="text.secondary">
                Nenhum item encontrado neste pedido.
              </Typography>
            )}
          </Stack>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default PedidoCardTelaAtivos;

import React from "react";
import { Paper, Typography, Box, Alert } from "@mui/material";
import PedidoCardTelaAtivos from "../moleculas/PedidoCardTelaAtivos";
import SearchField from "../moleculas/SearchField";

const PedidosTable = ({ pedidos, onSearch }) => {
  return (
    <Paper sx={{ width: "100%", p: 2 }}>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Pedidos Ativos
      </Typography>

      <SearchField
        onSearch={onSearch}
        placeholder="Buscar por código ou nome do cliente..."
      />

      {pedidos.length === 0 ? (
        <Alert severity="info" sx={{ mt: 2 }}>
          Nenhum pedido encontrado com os critérios de busca atuais.
        </Alert>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          {pedidos.map((pedido) => (
            <PedidoCardTelaAtivos key={pedido.id} pedido={pedido}  />
          ))}
        </Box>
      )}
    </Paper>
  );
};

export default PedidosTable;

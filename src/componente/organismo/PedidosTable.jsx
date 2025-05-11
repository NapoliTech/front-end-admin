import React from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  IconButton,
  Chip,
  Collapse,
  Box,
  Divider,
} from "@mui/material";
import {
  KeyboardArrowDown,
  KeyboardArrowUp,
  Visibility,
  Edit,
  Delete,
  LocalPizza,
} from "@mui/icons-material";

const PedidosTable = ({ pedidos }) => {
  const [openRows, setOpenRows] = React.useState({});

  const getStatusColor = (status) => {
    const colors = {
      RECEBIDO: "info",
      EM_PREPARO: "warning",
      PRONTO: "success",
      ENTREGUE: "default",
    };
    return colors[status] || "default";
  };

  const toggleRow = (id) => {
    setOpenRows((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <Typography variant="h5" sx={{ p: 2 }}>
        Pedidos Ativos
      </Typography>
      <TableContainer sx={{ maxHeight: "calc(100vh - 200px)" }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>ID</TableCell>
              <TableCell>Cliente</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Tipo Entrega</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pedidos.map((pedido) => (
              <React.Fragment key={pedido.id}>
                <TableRow>
                  <TableCell>
                    <IconButton
                      size="small"
                      onClick={() => toggleRow(pedido.id)}
                    >
                      {openRows[pedido.id] ? (
                        <KeyboardArrowUp />
                      ) : (
                        <KeyboardArrowDown />
                      )}
                    </IconButton>
                  </TableCell>
                  <TableCell>{pedido.id}</TableCell>
                  <TableCell>{pedido.nomeCliente}</TableCell>
                  <TableCell>
                    <Chip
                      label={pedido.statusPedido}
                      color={getStatusColor(pedido.statusPedido)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{pedido.tipoEntrega}</TableCell>
                  <TableCell>R$ {pedido.precoTotal.toFixed(2)}</TableCell>
                  <TableCell>
                    <IconButton size="small" color="primary">
                      <Visibility />
                    </IconButton>
                    <IconButton size="small" color="success">
                      <Edit />
                    </IconButton>
                    <IconButton size="small" color="error">
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    style={{ paddingBottom: 0, paddingTop: 0 }}
                    colSpan={7}
                  >
                    <Collapse
                      in={openRows[pedido.id]}
                      timeout="auto"
                      unmountOnExit
                    >
                      <Box sx={{ margin: 2 }}>
                        <Typography variant="h6" gutterBottom>
                          Detalhes do Pedido
                        </Typography>
                        <Box sx={{ mb: 2 }}>
                          <Typography
                            variant="subtitle2"
                            color="text.secondary"
                          >
                            Observação:{" "}
                            {pedido.observacao || "Nenhuma observação"}
                          </Typography>
                        </Box>
                        <Divider sx={{ my: 2 }} />
                        <Typography variant="h6" gutterBottom>
                          <LocalPizza sx={{ mr: 1, verticalAlign: "bottom" }} />
                          Pizza Meio a Meio
                        </Typography>
                        <Table size="small">
                          <TableHead>
                            <TableRow>
                              <TableCell>Sabor</TableCell>
                              <TableCell>Tamanho</TableCell>
                              <TableCell>Borda</TableCell>
                              <TableCell>Quantidade</TableCell>
                              <TableCell>Preço</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {pedido.itens.map((item) => (
                              <TableRow key={item.id}>
                                <TableCell>{item.produto.nome}</TableCell>
                                <TableCell>{item.tamanhoPizza}</TableCell>
                                <TableCell>{item.bordaRecheada}</TableCell>
                                <TableCell>{item.quantidade}</TableCell>
                                <TableCell>
                                  R$ {item.precoTotal.toFixed(2)}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </Box>
                    </Collapse>
                  </TableCell>
                </TableRow>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default PedidosTable;

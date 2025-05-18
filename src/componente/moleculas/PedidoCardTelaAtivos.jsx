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
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import {
  KeyboardArrowDown,
  KeyboardArrowUp,
  Visibility,
  Edit,
  Delete,
  LocalPizza,
} from "@mui/icons-material";
import { pedidosAtivos } from "../../services/pedidosAtivos";

const PedidoCardTelaAtivos = ({ pedido, onStatusChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [statusLocal, setStatusLocal] = useState(pedido?.statusPedido);
  const [openModal, setOpenModal] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");

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

  const handleEditClick = () => {
    setSelectedStatus(statusLocal);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleSaveStatus = async () => {
    setLoading(true);
    try {
      await pedidosAtivos.atualizarStatusPedido(pedido.id, selectedStatus);
      setStatusLocal(selectedStatus);
      if (onStatusChange) {
        onStatusChange(pedido.id, selectedStatus);
      }
      handleCloseModal();
    } catch (error) {
      console.error("Erro ao atualizar status:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Card
        elevation={2}
        sx={{
          width: { xs: "100%", sm: "48%", md: "32%", lg: "24%" },
          minWidth: 280,
          borderLeft: `4px solid ${
            statusLocal === "RECEBIDO"
              ? "#2196f3"
              : statusLocal === "EM_PREPARO"
              ? "#ff9800"
              : statusLocal === "PRONTO"
              ? "#4caf50"
              : "#9e9e9e"
          }`,
          position: "relative",
        }}
      >
        {loading && (
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgba(255, 255, 255, 0.7)",
              zIndex: 1,
            }}
          >
            <CircularProgress size={40} />
          </Box>
        )}

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
              label={statusLocal}
              color={getStatusColor(statusLocal)}
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
            {/* <IconButton size="small" color="primary">
              <Visibility />
            </IconButton> */}
            <IconButton size="small" color="success" onClick={handleEditClick}>
              <Edit />
            </IconButton>
            {/* <IconButton size="small" color="error">
              <Delete />
            </IconButton> */}
          </Box>

          <IconButton
            size="small"
            onClick={toggleDetails}
            aria-expanded={isOpen}
            aria-label="mostrar detalhes"
          >
            {isOpen ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </CardActions>

        <Collapse in={isOpen} timeout="auto" unmountOnExit>
          <CardContent sx={{ pt: 0 }}>
            <Divider sx={{ my: 1 }} />

            {pedido.observacao && (
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  Observação:
                </Typography>
                <Typography variant="body2">{pedido.observacao}</Typography>
              </Box>
            )}

            <Typography
              variant="subtitle2"
              color="text.secondary"
              sx={{ display: "flex", alignItems: "center" }}
            >
              <LocalPizza sx={{ mr: 1, fontSize: 18 }} />
              Itens do Pedido:
            </Typography>

            <Stack spacing={1} sx={{ mt: 1 }}>
              {pedido.itens.map((item) => (
                <Box
                  key={item.id}
                  sx={{
                    p: 1,
                    borderRadius: 1,
                    backgroundColor: "background.paper",
                    border: "1px solid",
                    borderColor: "divider",
                  }}
                >
                  <Typography variant="body2" fontWeight="medium">
                    {item.produto.nome}
                    {item.tamanhoPizza && ` - ${item.tamanhoPizza}`}
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mt: 0.5,
                    }}
                  >
                    <Typography variant="body2" color="text.secondary">
                      {item.quantidade}x
                      {item.bordaRecheada && ` • Borda: ${item.bordaRecheada}`}
                    </Typography>
                    <Typography variant="body2">
                      R$ {item.precoTotal.toFixed(2)}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Stack>
          </CardContent>
        </Collapse>
      </Card>

      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Alterar Status do Pedido</DialogTitle>
        <DialogContent>
          <FormControl component="fieldset">
            <RadioGroup
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <FormControlLabel
                value="RECEBIDO"
                control={<Radio />}
                label="Recebido"
              />
              <FormControlLabel
                value="EM_PREPARO"
                control={<Radio />}
                label="Em Preparo"
              />
              <FormControlLabel
                value="PRONTO"
                control={<Radio />}
                label="Pronto"
              />
              <FormControlLabel
                value="ENTREGUE"
                control={<Radio />}
                label="Entregue"
              />
            </RadioGroup>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Cancelar</Button>
          <Button
            onClick={handleSaveStatus}
            variant="contained"
            color="primary"
            disabled={loading}
          >
            {loading ? "Salvando..." : "Salvar"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default PedidoCardTelaAtivos;

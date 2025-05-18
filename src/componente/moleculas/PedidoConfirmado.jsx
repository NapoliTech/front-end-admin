import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Divider,
  Chip,
  Button,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import {
  Store,
  DirectionsWalk,
  Info,
  Person,
  Phone,
  Home,
  AccessTime,
  LocalPizza,
  LocalDrink,
  FiberManualRecord,
  CheckCircle,
} from "@mui/icons-material";

const PedidoConfirmado = ({
  pedidoFinalizado,
  tipoEntrega,
  onGerarPedido,
  onNavigateToPedidos,
}) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleGerarPedido = async () => {
    setLoading(true);
    try {
      const success = await onGerarPedido();

      if (success) {
        setDialogOpen(true);
      }
    } catch (error) {
      console.error("Erro ao gerar pedido:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = () => {
    setDialogOpen(false);

    // Chamar a função de navegação com uma mensagem
    if (onNavigateToPedidos) {
      onNavigateToPedidos("Redirecionando para a lista de pedidos...");
    }
  };

  return (
    <Box sx={{ maxWidth: "100%", mx: "auto" }}>
      <Paper
        elevation={3}
        sx={{
          p: 4,
          borderRadius: 2,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Faixa decorativa no topo */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "8px",
            bgcolor:
              tipoEntrega === "retirada" ? "warning.main" : "success.main",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          }}
        />

        {/* Cabeçalho com ícone */}
        <Box sx={{ display: "flex", alignItems: "center", mb: 3, mt: 1 }}>
          {tipoEntrega === "retirada" ? (
            <Store sx={{ fontSize: 40, color: "warning.main", mr: 2 }} />
          ) : (
            <DirectionsWalk
              sx={{ fontSize: 40, color: "success.main", mr: 2 }}
            />
          )}
          <Typography
            variant="h4"
            color={tipoEntrega === "retirada" ? "warning.main" : "success.main"}
            sx={{ fontWeight: "bold" }}
          >
            {tipoEntrega === "retirada"
              ? "Pedido para Retirada"
              : "Pedido Confirmado!"}
          </Typography>
        </Box>

        {/* Número do pedido destacado */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mb: 4,
            p: 2,
            bgcolor: "background.default",
            borderRadius: 2,
            border: "1px dashed",
            borderColor:
              tipoEntrega === "retirada" ? "warning.light" : "success.light",
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: "medium" }}>
            Número do Pedido:
            <Box
              component="span"
              sx={{
                ml: 1,
                color:
                  tipoEntrega === "retirada" ? "warning.dark" : "success.dark",
                fontWeight: "bold",
              }}
            >
              {pedidoFinalizado?.numeroPedido}
            </Box>
          </Typography>
        </Box>

        <Box
          sx={{
            my: 3,
            p: 3,
            bgcolor: "background.default",
            borderRadius: 2,
            boxShadow: "inset 0 2px 4px rgba(0,0,0,0.05)",
          }}
        >
          <Typography
            variant="h6"
            gutterBottom
            sx={{
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              pb: 1,
              borderBottom: "1px solid",
              borderColor: "divider",
            }}
          >
            <Info sx={{ mr: 1 }} /> Detalhes do Pedido:
          </Typography>

          {tipoEntrega === "retirada" ? (
            <Alert
              severity="warning"
              variant="filled"
              icon={<Store />}
              sx={{ mb: 3, mt: 2 }}
            >
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: "bold", mb: 0.5 }}
              >
                Retirada na Loja
              </Typography>
              <Typography variant="body1">
                Tempo estimado para retirada:{" "}
                {pedidoFinalizado?.previsaoRetirada}
              </Typography>
            </Alert>
          ) : (
            <Box
              sx={{
                mb: 3,
                mt: 2,
                p: 2,
                bgcolor: "success.light",
                color: "success.contrastText",
                borderRadius: 2,
              }}
            >
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: "bold", mb: 1 }}
              >
                <Person sx={{ mr: 1, verticalAlign: "middle" }} />
                Cliente: {pedidoFinalizado?.cliente?.nome}
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                <Phone sx={{ mr: 1, verticalAlign: "middle", fontSize: 20 }} />
                Telefone: {pedidoFinalizado?.cliente?.telefone}
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                <Home sx={{ mr: 1, verticalAlign: "middle", fontSize: 20 }} />
                Endereço: {pedidoFinalizado?.endereco?.logradouro}
                {pedidoFinalizado?.endereco?.complemento &&
                  `, ${pedidoFinalizado.endereco.complemento}`}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: "medium" }}>
                <AccessTime
                  sx={{ mr: 1, verticalAlign: "middle", fontSize: 20 }}
                />
                Tempo estimado de entrega: {pedidoFinalizado?.previsaoEntrega}
              </Typography>
            </Box>
          )}

          <Typography
            variant="h6"
            gutterBottom
            sx={{
              fontWeight: "bold",
              mt: 3,
              display: "flex",
              alignItems: "center",
            }}
          >
            <LocalPizza sx={{ mr: 1 }} /> Itens do Pedido:
          </Typography>

          <Box sx={{ mt: 2 }}>
            {pedidoFinalizado?.itens?.map((item, index) => (
              <Paper
                key={index}
                elevation={1}
                sx={{
                  mb: 2,
                  p: 2,
                  bgcolor: "background.paper",
                  borderRadius: 2,
                  transition: "transform 0.2s, box-shadow 0.2s",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: 3,
                  },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 1,
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: "bold",
                      color: "primary.main",
                    }}
                  >
                    <LocalPizza
                      sx={{ mr: 0.5, verticalAlign: "middle", fontSize: 20 }}
                    />
                    Pedido {index + 1}
                  </Typography>
                  <Chip
                    label={`${item.tamanho} - Borda: ${item.borda}`}
                    size="small"
                    color="primary"
                    variant="outlined"
                  />
                </Box>

                <Divider sx={{ my: 1 }} />

                <Box sx={{ pl: 1 }}>
                  {item.pizzas?.map((pizza, pizzaIndex) => (
                    <Box
                      key={pizzaIndex}
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        py: 0.5,
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{ display: "flex", alignItems: "center" }}
                      >
                        <FiberManualRecord
                          sx={{ mr: 1, fontSize: 10, color: "text.secondary" }}
                        />
                        {pizzaIndex === 0
                          ? "Primeira metade"
                          : "Segunda metade"}
                        : {pizza.nome}
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: "medium" }}>
                        R$ {pizza.preco}
                      </Typography>
                    </Box>
                  ))}

                  {item.bebidas?.length > 0 && (
                    <>
                      <Divider sx={{ my: 1 }} />
                      <Typography
                        variant="body2"
                        sx={{
                          mt: 1,
                          fontWeight: "medium",
                          color: "secondary.main",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <LocalDrink sx={{ mr: 0.5, fontSize: 18 }} /> Bebidas:
                      </Typography>
                      {item.bebidas.map((bebida, bebidaIndex) => (
                        <Box
                          key={bebidaIndex}
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            py: 0.5,
                            pl: 1,
                          }}
                        >
                          <Typography
                            variant="body2"
                            sx={{ display: "flex", alignItems: "center" }}
                          >
                            <FiberManualRecord
                              sx={{
                                mr: 1,
                                fontSize: 10,
                                color: "text.secondary",
                              }}
                            />
                            {bebida.nome}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{ fontWeight: "medium" }}
                          >
                            R$ {bebida.preco}
                          </Typography>
                        </Box>
                      ))}
                    </>
                  )}

                  <Divider sx={{ my: 1 }} />
                  <Box
                    sx={{ display: "flex", justifyContent: "flex-end", mt: 1 }}
                  >
                    <Chip
                      label={`Subtotal: R$ ${item.valorTotal}`}
                      color="primary"
                      size="small"
                      sx={{ fontWeight: "bold" }}
                    />
                  </Box>
                </Box>
              </Paper>
            ))}
          </Box>

          <Box
            sx={{
              mt: 3,
              p: 2,
              bgcolor: "primary.light",
              color: "primary.contrastText",
              borderRadius: 2,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Valor Total:
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              R$ {pedidoFinalizado?.valorTotal}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
          <Button
            variant="contained"
            color="success"
            size="large"
            onClick={handleGerarPedido}
            disabled={loading}
            sx={{
              px: 6,
              py: 1.5,
              borderRadius: 2,
              boxShadow: "0 4px 10px rgba(76, 175, 80, 0.3)",
              "&:hover": {
                boxShadow: "0 6px 15px rgba(76, 175, 80, 0.4)",
              },
            }}
            startIcon={<CheckCircle />}
          >
            {loading ? "Processando..." : "Gerar Pedido"}
          </Button>
        </Box>
      </Paper>

      {/* Diálogo de confirmação */}
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{
          sx: {
            borderRadius: 2,
            p: 1,
            maxWidth: 500,
          },
        }}
      >
        <DialogTitle
          id="alert-dialog-title"
          sx={{ display: "flex", alignItems: "center" }}
        >
          <CheckCircle color="success" sx={{ mr: 1 }} />
          Pedido Gerado com Sucesso!
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Seu pedido {pedidoFinalizado?.numeroPedido} foi gerado e está sendo
            processado. Você será redirecionado para a lista de pedidos.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleConfirm}
            color="primary"
            variant="contained"
            autoFocus
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PedidoConfirmado;

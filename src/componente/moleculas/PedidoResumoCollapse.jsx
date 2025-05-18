import React from "react";
import {
  Box,
  Button,
  Collapse,
  Stack,
  Typography,
  Chip,
  Grid,
  Divider,
} from "@mui/material";
import {
  ShoppingCart,
  KeyboardArrowUp,
  KeyboardArrowDown,
  AttachMoney,
  LocalPizza,
  LocalDrink,
  Restaurant,
  Fastfood,
  FiberManualRecord,
} from "@mui/icons-material";

const PedidoResumoCollapse = ({
  pedidos,
  showPedidoSummary,
  setShowPedidoSummary,
  calcularTotalPedidos,
}) => {
  return (
    <Box sx={{ mb: 3 }}>
      <Button
        variant="outlined"
        fullWidth
        onClick={() => setShowPedidoSummary(!showPedidoSummary)}
        endIcon={
          showPedidoSummary ? <KeyboardArrowUp /> : <KeyboardArrowDown />
        }
        sx={{
          justifyContent: "space-between",
          py: 1.2,
          borderWidth: 2,
          borderColor: "primary.main",
          "&:hover": {
            borderWidth: 2,
            backgroundColor: "rgba(25, 118, 210, 0.04)",
          },
        }}
      >
        <Typography
          sx={{ display: "flex", alignItems: "center", fontWeight: "medium" }}
        >
          <ShoppingCart sx={{ mr: 1 }} /> Resumo do Pedido
        </Typography>
       
      </Button>
      <Collapse in={showPedidoSummary}>
        <Box
          sx={{
            mt: 2,
            p: 2,
            bgcolor: "background.default",
            borderRadius: 2,
            boxShadow: "inset 0 2px 4px rgba(0,0,0,0.1)",
            border: "1px solid rgba(0,0,0,0.08)",
          }}
        >
          <Stack spacing={2}>
            {pedidos.map((pedido, index) => (
              <Box
                key={index}
                sx={{
                  p: 2,
                  bgcolor: "background.paper",
                  borderRadius: 2,
                  boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                  border: "1px solid rgba(0,0,0,0.08)",
                  position: "relative",
                  overflow: "hidden",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "5px",
                    height: "100%",
                    backgroundColor: "primary.main",
                    borderTopLeftRadius: 2,
                    borderBottomLeftRadius: 2,
                  },
                }}
              >
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: "bold",
                    mb: 1,
                    display: "flex",
                    alignItems: "center",
                    color: "primary.main",
                  }}
                >
                  <LocalPizza sx={{ mr: 1 }} /> Pedido {index + 1}
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Box
                      sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 1 }}
                    >
                      <Chip
                        size="small"
                        icon={<Restaurant />}
                        label={`Tamanho: ${pedido.tamanho}`}
                        variant="outlined"
                        color="primary"
                      />
                      <Chip
                        size="small"
                        icon={<Fastfood />}
                        label={`Borda: ${pedido.borda}`}
                        variant="outlined"
                        color="secondary"
                      />
                    </Box>

                    {/* Detalhes das Pizzas */}
                    <Box
                      sx={{
                        mt: 2,
                        p: 1.5,
                        borderRadius: 1,
                        bgcolor: "rgba(25, 118, 210, 0.04)",
                        border: "1px dashed rgba(25, 118, 210, 0.4)",
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: "medium",
                          display: "flex",
                          alignItems: "center",
                          color: "primary.main",
                          mb: 1,
                        }}
                      >
                        <LocalPizza sx={{ mr: 0.5, fontSize: 18 }} /> Pizzas:
                      </Typography>
                      {pedido.pizzas &&
                        pedido.pizzas.map((pizza, pizzaIndex) => (
                          <Box
                            key={pizzaIndex}
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              pl: 2,
                              py: 0.5,
                              borderBottom:
                                pizzaIndex < pedido.pizzas.length - 1
                                  ? "1px dotted rgba(0,0,0,0.1)"
                                  : "none",
                            }}
                          >
                            <Typography
                              variant="body2"
                              sx={{ display: "flex", alignItems: "center" }}
                            >
                              <FiberManualRecord
                                sx={{ mr: 0.5, fontSize: 8 }}
                              />
                              {pizzaIndex === 0
                                ? "Primeira metade"
                                : "Segunda metade"}
                              : {pizza.nome}
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{
                                fontWeight: "medium",
                                color: "text.secondary",
                              }}
                            >
                              R$ {pizza.preco}
                            </Typography>
                          </Box>
                        ))}
                    </Box>

                    {/* Detalhes das Bebidas (se houver) */}
                    {pedido.bebidas && pedido.bebidas.length > 0 && (
                      <Box
                        sx={{
                          mt: 2,
                          p: 1.5,
                          borderRadius: 1,
                          bgcolor: "rgba(156, 39, 176, 0.04)",
                          border: "1px dashed rgba(156, 39, 176, 0.4)",
                        }}
                      >
                        <Typography
                          variant="body2"
                          sx={{
                            fontWeight: "medium",
                            display: "flex",
                            alignItems: "center",
                            color: "secondary.main",
                            mb: 1,
                          }}
                        >
                          <LocalDrink sx={{ mr: 0.5, fontSize: 18 }} /> Bebidas:
                        </Typography>
                        {pedido.bebidas.map((bebida, bebidaIndex) => (
                          <Box
                            key={bebidaIndex}
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              pl: 2,
                              py: 0.5,
                              borderBottom:
                                bebidaIndex < pedido.bebidas.length - 1
                                  ? "1px dotted rgba(0,0,0,0.1)"
                                  : "none",
                            }}
                          >
                            <Typography
                              variant="body2"
                              sx={{ display: "flex", alignItems: "center" }}
                            >
                              <FiberManualRecord
                                sx={{ mr: 0.5, fontSize: 8 }}
                              />
                              {bebida.nome}
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{
                                fontWeight: "medium",
                                color: "text.secondary",
                              }}
                            >
                              R$ {bebida.preco}
                            </Typography>
                          </Box>
                        ))}
                      </Box>
                    )}
                  </Grid>
                </Grid>
              </Box>
            ))}

            {/* Total Geral */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                mt: 2,
                pt: 2,
                borderTop: "2px dashed rgba(0,0,0,0.1)",
              }}
            >
              <Chip
                icon={<AttachMoney />}
                label={`Total: R$ ${calcularTotalPedidos()}`}
                color="success"
                sx={{
                  fontWeight: "bold",
                  fontSize: "1rem",
                  py: 0.5,
                  px: 1,
                  height: "auto",
                  "& .MuiChip-icon": {
                    fontSize: "1.2rem",
                  },
                }}
              />
            </Box>
          </Stack>
        </Box>
      </Collapse>
    </Box>
  );
};

export default PedidoResumoCollapse;

import React from "react";
import {
  Box,
  Typography,
  Stack,
  Card,
  CardContent,
  Chip,
  Badge,
  Divider,
  IconButton,
  Tooltip,
} from "@mui/material";
import { LocalPizza, AttachMoney, Delete } from "@mui/icons-material";
import { styled } from "@mui/material/styles";

const PedidoBox = styled(Box)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(2),
  boxShadow: theme.shadows[2],
  transition: "box-shadow 0.3s",
  "&:hover": {
    boxShadow: theme.shadows[4],
  },
  position: "relative",
}));

const PedidoCard = ({ pedido, index, onRemove }) => {
  return (
    <PedidoBox>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography
          variant="h6"
          sx={{ fontWeight: "bold", display: "flex", alignItems: "center" }}
        >
          <Badge badgeContent={index + 1} color="primary" sx={{ mr: 2 }}>
            <LocalPizza />
          </Badge>
          Pedido {index + 1}
        </Typography>
        <Box>
          <Chip
            icon={<AttachMoney />}
            label={`R$ ${pedido.total}`}
            color="success"
            variant="outlined"
            sx={{ mr: 1 }}
          />
          <Tooltip title="Remover pedido">
            <IconButton
              color="error"
              size="small"
              onClick={() => onRemove(index)}
              sx={{
                "&:hover": {
                  backgroundColor: "rgba(211, 47, 47, 0.1)",
                },
              }}
            >
              <Delete />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
      <Divider sx={{ mb: 2 }} />
      <Stack spacing={1}>
        {pedido.pizzas.map((pizza, idx) => (
          <Card key={idx} variant="outlined">
            <CardContent
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  {idx === 0 ? "Primeira Metade" : "Segunda Metade"}
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: "medium" }}>
                  {pizza.nome}
                </Typography>
              </Box>
              <Chip
                icon={<AttachMoney />}
                label={`R$ ${pizza.preco}`}
                size="small"
                color="primary"
                variant="outlined"
              />
            </CardContent>
          </Card>
        ))}

        {pedido.bebidas.length > 0 && (
          <>
            <Typography
              variant="subtitle2"
              color="text.secondary"
              sx={{ mt: 1 }}
            >
              Bebidas
            </Typography>
            {pedido.bebidas.map((bebida, idx) => (
              <Card key={idx} variant="outlined">
                <CardContent
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography>{bebida.nome}</Typography>
                  <Chip
                    icon={<AttachMoney />}
                    label={`R$ ${bebida.preco}`}
                    size="small"
                    color="secondary"
                    variant="outlined"
                  />
                </CardContent>
              </Card>
            ))}
          </>
        )}
      </Stack>
    </PedidoBox>
  );
};

export default PedidoCard;

import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  Delete,
  LocalPizza,
  LocalDrink,
  AttachMoney,
  Restaurant,
  Fastfood,
} from "@mui/icons-material";

const PedidoCard = ({ pedido, index, onRemove }) => {
  return (
    <Card variant="outlined" sx={{ borderRadius: 2 }}>
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography variant="h6">Pedido #{index + 1}</Typography>
          <Button
            size="small"
            color="error"
            startIcon={<Delete />}
            onClick={() => onRemove(index)}
          >
            Remover
          </Button>
        </Box>

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
          <Chip
            icon={<Restaurant />}
            label={`Tamanho: ${pedido.tamanho}`}
            variant="outlined"
            size="small"
          />
          <Chip
            icon={<Fastfood />}
            label={`Borda: ${pedido.borda}`}
            variant="outlined"
            size="small"
          />
        </Box>

        <Divider sx={{ my: 1 }} />

        <List dense disablePadding>
          {pedido.pizzas.map((pizza, idx) => (
            <ListItem key={idx} disablePadding sx={{ py: 0.5 }}>
              <ListItemIcon sx={{ minWidth: 36 }}>
                <LocalPizza color="primary" fontSize="small" />
              </ListItemIcon>
              <ListItemText
                primary={`${idx === 0 ? "Primeira" : "Segunda"} metade: ${
                  pizza.nome
                }`}
                secondary={`R$ ${pizza.preco}`}
              />
            </ListItem>
          ))}

          {pedido.bebidas.length > 0 && (
            <>
              <Divider sx={{ my: 1 }} textAlign="left">
                Bebidas
              </Divider>
              {pedido.bebidas.map((bebida, idx) => (
                <ListItem key={idx} disablePadding sx={{ py: 0.5 }}>
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    <LocalDrink color="secondary" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText
                    primary={bebida.nome}
                    secondary={`R$ ${bebida.preco}`}
                  />
                </ListItem>
              ))}
            </>
          )}
        </List>

        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
          <Chip
            icon={<AttachMoney />}
            label={`Total: R$ ${pedido.total}`}
            color="success"
            sx={{ fontWeight: "bold" }}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default PedidoCard;

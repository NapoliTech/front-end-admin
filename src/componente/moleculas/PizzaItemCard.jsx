import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  IconButton,
  Chip,
} from "@mui/material";
import { Delete, LocalPizza } from "@mui/icons-material";

const PizzaItemCard = ({ pizza, index, onRemove }) => {
  return (
    <Card variant="outlined" sx={{ borderRadius: 1 }}>
      <CardContent sx={{ py: 1, px: 2, "&:last-child": { pb: 1 } }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <LocalPizza color="primary" sx={{ mr: 1 }} fontSize="small" />
            <Typography variant="body1">
              {index === 0 ? "Primeira metade: " : "Segunda metade: "}
              <strong>{pizza.nome}</strong>
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Chip
              label={`R$ ${pizza.preco}`}
              size="small"
              color="primary"
              variant="outlined"
              sx={{ mr: 1 }}
            />
            <IconButton
              size="small"
              color="error"
              onClick={() => onRemove(index)}
              sx={{ p: 0.5 }}
            >
              <Delete fontSize="small" />
            </IconButton>
          </Box>
        </Box>
        {pizza.ingredientes && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mt: 0.5, fontSize: "0.8rem" }}
          >
            {pizza.ingredientes}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default PizzaItemCard;

import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  IconButton,
  Chip,
} from "@mui/material";
import { Delete, LocalDrink } from "@mui/icons-material";

const BebidaItemCard = ({ bebida, index, onRemove }) => {
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
            <LocalDrink color="secondary" sx={{ mr: 1 }} fontSize="small" />
            <Typography variant="body1">
              <strong>{bebida.nome}</strong>
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Chip
              label={`R$ ${bebida.preco}`}
              size="small"
              color="secondary"
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
      </CardContent>
    </Card>
  );
};

export default BebidaItemCard;

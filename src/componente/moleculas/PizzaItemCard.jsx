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
    <Card
      variant="outlined"
      sx={{
        borderRadius: 1,
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          cursor: "pointer",
          borderColor: "primary.main",
        },
      }}
    >
      <CardContent
        sx={{
          py: 1,
          px: 2,
          "&:last-child": { pb: 1 },
          "&:hover .delete-icon": {
            opacity: 1,
            transform: "scale(1)",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              "&:hover .pizza-icon": {
                transform: "rotate(45deg)",
              },
            }}
          >
            <LocalPizza
              color="primary"
              sx={{
                mr: 1,
                transition: "transform 0.3s ease",
              }}
              fontSize="small"
              className="pizza-icon"
            />
            <Typography
              variant="body1"
              sx={{
                fontWeight: 500,
                color: "text.primary",
                transition: "color 0.2s ease",
                "&:hover": {
                  color: "primary.main",
                },
              }}
            >
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
              sx={{
                mr: 1,
                transition: "all 0.2s ease",
                "&:hover": {
                  backgroundColor: "primary.main",
                  color: "white",
                  transform: "scale(1.05)",
                },
              }}
            />
            <IconButton
              size="small"
              color="error"
              onClick={() => onRemove(index)}
              sx={{
                p: 0.5,
                opacity: 0.7,
                transition: "all 0.2s ease",
                "&:hover": {
                  backgroundColor: "error.light",
                  transform: "scale(1.1)",
                },
              }}
              className="delete-icon"
            >
              <Delete fontSize="small" />
            </IconButton>
          </Box>
        </Box>
        {pizza.ingredientes && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mt: 0.5,
              fontSize: "0.8rem",
              transition: "color 0.2s ease",
              "&:hover": {
                color: "text.primary",
              },
              pl: 1,
              borderLeft: "2px solid",
              borderColor: "primary.light",
            }}
          >
            {pizza.ingredientes}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default PizzaItemCard;

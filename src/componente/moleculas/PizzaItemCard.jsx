import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Avatar,
  Fade,
  IconButton,
} from "@mui/material";
import { LocalPizza, AttachMoney, Delete } from "@mui/icons-material";
import { styled } from "@mui/material/styles";

const StyledCard = styled(Card)(({ theme }) => ({
  transition: "transform 0.2s, box-shadow 0.2s",
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: theme.shadows[8],
  },
}));

const PizzaItemCard = ({ pizza, index, onRemove }) => {
  return (
    <Fade in={true}>
      <StyledCard variant="outlined">
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
              {index === 0 ? "Primeira Metade" : "Segunda Metade"}
            </Typography>
            <Typography>{pizza.nome}</Typography>
            <Chip
              icon={<AttachMoney />}
              label={`R$ ${pizza.preco}`}
              size="small"
              color="primary"
              variant="outlined"
              sx={{ mt: 1 }}
            />
          </Box>
          <Box>
            <IconButton
              color="error"
              size="small"
              onClick={() => onRemove(index)}
              sx={{ mr: 1 }}
            >
              <Delete />
            </IconButton>
            <Avatar sx={{ bgcolor: "primary.main", display: "inline-flex" }}>
              <LocalPizza />
            </Avatar>
          </Box>
        </CardContent>
      </StyledCard>
    </Fade>
  );
};

export default PizzaItemCard;

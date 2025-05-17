import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Avatar,
  IconButton,
  Fade,
} from "@mui/material";
import { LocalDrink, AttachMoney, Delete } from "@mui/icons-material";
import { styled } from "@mui/material/styles";

const StyledCard = styled(Card)(({ theme }) => ({
  transition: "transform 0.2s, box-shadow 0.2s",
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: theme.shadows[8],
  },
}));

const BebidaItemCard = ({ bebida, index, onRemove }) => {
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
              Bebida
            </Typography>
            <Typography>{bebida.nome}</Typography>
            <Chip
              icon={<AttachMoney />}
              label={`R$ ${bebida.preco}`}
              size="small"
              color="secondary"
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
            <Avatar sx={{ bgcolor: "secondary.main", display: "inline-flex" }}>
              <LocalDrink />
            </Avatar>
          </Box>
        </CardContent>
      </StyledCard>
    </Fade>
  );
};

export default BebidaItemCard;

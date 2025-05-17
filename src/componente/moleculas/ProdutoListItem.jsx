import React from "react";
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Chip,
} from "@mui/material";
import { AttachMoney } from "@mui/icons-material";

const ProdutoListItem = ({ produto, icon, onClick, color = "primary" }) => {
  return (
    <ListItem
      button
      onClick={() => onClick(produto)}
      sx={{
        "&:hover": {
          backgroundColor: "rgba(0, 0, 0, 0.04)",
        },
        borderRadius: 1,
        mb: 1,
      }}
    >
      <ListItemIcon>
        <Avatar sx={{ bgcolor: `${color}.main` }}>{icon}</Avatar>
      </ListItemIcon>
      <ListItemText
        primary={produto.nome}
        secondary={`${produto.descricao || "Não informado"}`}
      />
      <Chip
        icon={<AttachMoney />}
        label={`R$ ${produto.preco}`}
        color={color}
        variant="outlined"
      />
    </ListItem>
  );
};

export default ProdutoListItem;

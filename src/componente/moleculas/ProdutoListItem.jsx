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
          transform: "translateY(-2px)",
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        },
        borderRadius: 1,
        mb: 1,
        transition: "all 0.3s ease",
        border: "1px solid transparent",
        "&:hover .produto-avatar": {
          transform: "scale(1.1)",
          boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
        },
        "&:hover .produto-preco": {
          transform: "scale(1.05)",
          backgroundColor: `${color}.main`,
          color: "white",
        },
        "&:hover .produto-nome": {
          color: `${color}.main`,
        },
        "&:active": {
          transform: "translateY(0)",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        },
      }}
    >
      <ListItemIcon>
        <Avatar
          sx={{
            bgcolor: `${color}.main`,
            transition: "all 0.3s ease",
          }}
          className="produto-avatar"
        >
          {icon}
        </Avatar>
      </ListItemIcon>
      <ListItemText
        primary={produto.nome}
        secondary={`${produto.ingredientes || "Não informado"}`}
        sx={{
          "& .MuiListItemText-primary": {
            fontWeight: 500,
            transition: "color 0.2s ease",
          },
          "& .MuiListItemText-secondary": {
            transition: "opacity 0.2s ease",
            "&:hover": {
              opacity: 0.9,
            },
          },
        }}
        className="produto-nome"
      />
      <Chip
        icon={<AttachMoney />}
        label={`R$ ${produto.preco}`}
        color={color}
        variant="outlined"
        className="produto-preco"
        sx={{
          transition: "all 0.3s ease",
          "&:hover": {
            cursor: "pointer",
            "& .MuiSvgIcon-root": {
              transform: "rotate(15deg)",
            },
          },
          "& .MuiSvgIcon-root": {
            transition: "transform 0.2s ease",
          },
          fontWeight: "bold",
          borderWidth: "2px",
          "&:active": {
            transform: "scale(0.95)",
          },
        }}
      />
    </ListItem>
  );
};

export default ProdutoListItem;

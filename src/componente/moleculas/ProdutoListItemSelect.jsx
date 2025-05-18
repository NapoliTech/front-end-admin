import React from "react";
import {
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  Box,
  Chip,
} from "@mui/material";

/**
 * Componente para exibir um item de produto em uma lista de seleção
 *
 * @param {Object} props - Propriedades do componente
 * @param {Object} props.produto - Dados do produto
 * @param {React.ReactNode} props.icon - Ícone a ser exibido no avatar
 * @param {Function} props.onClick - Função chamada quando o item é clicado
 * @param {string} props.color - Cor do tema para o avatar (primary, secondary, etc)
 */
const ProdutoListItemSelect = ({
  produto,
  icon,
  onClick,
  color = "primary",
}) => {
  return (
    <ListItem
      alignItems="flex-start"
      button
      onClick={() => onClick(produto)}
      sx={{
        "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.04)" },
        borderRadius: 1,
        mb: 0.5,
      }}
    >
      <ListItemAvatar>
        <Avatar sx={{ bgcolor: `${color}.main` }}>{icon}</Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="subtitle1" component="span">
              {produto.nome}
            </Typography>
            <Chip
              label={`R$ ${produto.preco}`}
              color={color}
              size="small"
              sx={{ fontWeight: "bold" }}
            />
          </Box>
        }
        secondary={
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              display: "-webkit-box",
              overflow: "hidden",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 2,
            }}
          >
            {produto.ingredientes || "Sem descrição"}
          </Typography>
        }
      />
    </ListItem>
  );
};

export default ProdutoListItemSelect;

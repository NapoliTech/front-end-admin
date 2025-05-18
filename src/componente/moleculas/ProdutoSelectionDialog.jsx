import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  List,
  Divider,
  IconButton,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import { Close, CheckCircle } from "@mui/icons-material";
import ProdutoListItemSelect from "./ProdutoListItemSelect";

/**
 * Componente de diálogo para seleção de produtos (pizzas ou bebidas)
 *
 * @param {Object} props - Propriedades do componente
 * @param {boolean} props.open - Estado de abertura do diálogo
 * @param {Function} props.onClose - Função para fechar o diálogo
 * @param {Array} props.produtos - Lista de produtos a serem exibidos
 * @param {Function} props.onSelect - Função chamada quando um produto é selecionado
 * @param {React.ReactNode} props.icon - Ícone a ser exibido no título
 * @param {string} props.title - Título do diálogo
 * @param {boolean} props.loading - Estado de carregamento
 * @param {string} props.color - Cor do tema para os itens (primary, secondary, etc)
 * @param {boolean} props.showSections - Se deve mostrar seções separadas por categoria
 * @param {Array} props.sections - Array de objetos de seção {category, title} para mostrar seções
 */
const ProdutoSelectionDialog = ({
  open,
  onClose,
  produtos = [],
  onSelect,
  icon,
  title,
  loading = false,
  color = "primary",
  showSections = false,
  sections = [],
}) => {
  // Se não há seções definidas mas showSections é true, criar seções padrão
  const renderSections = () => {
    if (!showSections) {
      return (
        <List sx={{ width: "100%" }}>
          {produtos.map((produto, index) => (
            <React.Fragment key={produto.id}>
              <ProdutoListItemSelect
                produto={produto}
                icon={icon}
                onClick={onSelect}
                color={color}
              />
              {index < produtos.length - 1 && (
                <Divider variant="inset" component="li" />
              )}
            </React.Fragment>
          ))}
        </List>
      );
    }

    return sections.map((section) => {
      const sectionProducts = produtos.filter(
        (p) => p.categoriaProduto === section.category
      );

      if (sectionProducts.length === 0) return null;

      return (
        <Box key={section.category} sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            {section.title}
          </Typography>
          <List sx={{ width: "100%" }}>
            {sectionProducts.map((produto, index) => (
              <React.Fragment key={produto.id}>
                <ProdutoListItemSelect
                  produto={produto}
                  icon={icon}
                  onClick={onSelect}
                  color={color}
                />
                {index < sectionProducts.length - 1 && (
                  <Divider variant="inset" component="li" />
                )}
              </React.Fragment>
            ))}
          </List>
        </Box>
      );
    });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ display: "flex", alignItems: "center" }}>
        {icon && <Box sx={{ mr: 1 }}>{icon}</Box>}
        {title}
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ position: "absolute", right: 8, top: 8 }}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
            <CircularProgress />
          </Box>
        ) : produtos.length === 0 ? (
          <Typography align="center" color="text.secondary" sx={{ py: 3 }}>
            Nenhum produto disponível
          </Typography>
        ) : (
          renderSections()
        )}
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onClose}
          variant="contained"
          color={color}
          startIcon={<CheckCircle />}
        >
          Concluir Seleção
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProdutoSelectionDialog;

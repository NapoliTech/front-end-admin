import React from "react";
import {
  Box,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  Switch,
  Divider,
  IconButton,
  Tooltip,
} from "@mui/material";
import {
  Notifications,
  VolumeUp,
  Security,
  Language,
  Print,
  Store,
  Receipt,
  Help,
  Info,
  CloudSync,
} from "@mui/icons-material";
import { useTheme } from "../contexts/ThemeContext";

const ConfiguracoesScreen = () => {
  const { isDarkMode } = useTheme();

  const configSections = [
    {
      title: "Notificações",
      items: [
        {
          icon: <Notifications />,
          label: "Notificações de Pedidos",
          description: "Receber alertas de novos pedidos",
          action: "switch",
          defaultValue: true,
        },
        {
          icon: <VolumeUp />,
          label: "Som de Notificação",
          description: "Alerta sonoro para novos pedidos",
          action: "switch",
          defaultValue: true,
        },
      ],
    },
    {
      title: "Impressão",
      items: [
        {
          icon: <Print />,
          label: "Impressão Automática",
          description: "Imprimir pedidos automaticamente",
          action: "switch",
          defaultValue: false,
        },
        {
          icon: <Receipt />,
          label: "Formato de Impressão",
          description: "Configurar layout da impressão",
          action: "button",
        },
      ],
    },
    {
      title: "Sistema",
      items: [
        {
          icon: <Store />,
          label: "Dados do Estabelecimento",
          description: "Gerenciar informações da loja",
          action: "button",
        },
        {
          icon: <CloudSync />,
          label: "Sincronização",
          description: "Última sincronização: há 5 minutos",
          action: "button",
        },
        {
          icon: <Security />,
          label: "Segurança",
          description: "Configurações de acesso",
          action: "button",
        },
        {
          icon: <Language />,
          label: "Idioma",
          description: "Português (Brasil)",
          action: "button",
        },
      ],
    },
  ];

  return (
    <Box sx={{ p: 3, maxWidth: "1200px", margin: "0 auto" }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
        Configurações
      </Typography>

      {configSections.map((section) => (
        <Paper
          key={section.title}
          elevation={isDarkMode ? 2 : 1}
          sx={{
            mb: 3,
            overflow: "hidden",
            borderRadius: 2,
            border: `1px solid ${
              isDarkMode ? "rgba(255, 255, 255, 0.12)" : "rgba(0, 0, 0, 0.12)"
            }`,
          }}
        >
          <Box sx={{ px: 3, py: 2, bgcolor: "background.default" }}>
            <Typography variant="h6" color="primary">
              {section.title}
            </Typography>
          </Box>

          <Divider />

          <List>
            {section.items.map((item) => (
              <ListItem
                key={item.label}
                sx={{
                  py: 2,
                  "&:hover": {
                    bgcolor: "action.hover",
                  },
                }}
              >
                <ListItemIcon sx={{ color: "primary.main" }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  secondary={item.description}
                  primaryTypographyProps={{
                    fontWeight: 500,
                  }}
                />
                <ListItemSecondaryAction>
                  {item.action === "switch" ? (
                    <Switch
                      edge="end"
                      defaultChecked={item.defaultValue}
                      color="primary"
                    />
                  ) : (
                    <Tooltip title="Configurar">
                      <IconButton edge="end" color="primary">
                        <Info />
                      </IconButton>
                    </Tooltip>
                  )}
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </Paper>
      ))}

      <Box sx={{ mt: 4, display: "flex", justifyContent: "center", gap: 2 }}>
        <Tooltip title="Central de Ajuda">
          <IconButton color="primary" size="large">
            <Help />
          </IconButton>
        </Tooltip>
        <Tooltip title="Sobre o Sistema">
          <IconButton color="primary" size="large">
            <Info />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default ConfiguracoesScreen;

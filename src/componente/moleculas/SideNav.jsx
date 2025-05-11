import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Box,
  Divider,
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  Assignment as AssignmentIcon,
  History as HistoryIcon,
  Settings as SettingsIcon,
  ChevronLeft as ChevronLeftIcon,
  Menu as MenuIcon,
  AddShoppingCart as MontarPedidoIcon,
} from "@mui/icons-material";

const SideNav = ({ onMenuClick }) => {
  const [open, setOpen] = useState(true);

  const handleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: open ? 240 : "64px",
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: open ? 240 : "64px",
          boxSizing: "border-box",
          backgroundColor: "#f5f5f5",
          transition: "width 0.3s",
          overflowX: "hidden",
          whiteSpace: "nowrap",
        },
      }}
    >
      <Box sx={{ mt: 8 }}>
        <IconButton onClick={handleDrawer} sx={{ ml: open ? 1 : 0.5 }}>
          {open ? <ChevronLeftIcon /> : <MenuIcon />}
        </IconButton>
        <List>
          <ListItemButton
            onClick={() => onMenuClick("dashboard")}
            sx={{ "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.04)" } }}
          >
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            {open && <ListItemText primary="Dashboard" />}
          </ListItemButton>
          <ListItemButton
            onClick={() => onMenuClick("pedidos")}
            sx={{ "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.04)" } }}
          >
            <ListItemIcon>
              <AssignmentIcon />
            </ListItemIcon>
            {open && <ListItemText primary="Pedidos Ativos" />}
          </ListItemButton>
          <ListItemButton
            onClick={() => onMenuClick("montarPedido")}
            sx={{ "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.04)" } }}
          >
            <ListItemIcon>
              <MontarPedidoIcon />
            </ListItemIcon>
            {open && <ListItemText primary="Montar Pedido" />}
          </ListItemButton>
          <Divider />
          <ListItemButton
            sx={{ "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.04)" } }}
          >
            <ListItemIcon>
              <HistoryIcon />
            </ListItemIcon>
            {open && <ListItemText primary="Histórico" />}
          </ListItemButton>
          <ListItemButton
            sx={{ "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.04)" } }}
          >
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            {open && <ListItemText primary="Configurações" />}
          </ListItemButton>
        </List>
      </Box>
    </Drawer>
  );
};

export default SideNav;

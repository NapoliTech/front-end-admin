import React from "react";
import { Grid, Paper, Typography, Box } from "@mui/material";
import {
  ShoppingBag as OrdersIcon,
  CheckCircle as CompletedIcon,
  Pending as PendingIcon,
  AttachMoney as MoneyIcon,
} from "@mui/icons-material";

const DashboardCard = ({
  title,
  value,
  icon,
  color,
  onClick,
  loading = false,
}) => (
  <Paper
    elevation={3}
    sx={{
      p: 3,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      height: 90,
      width: "100%",
      cursor: onClick ? "pointer" : "default",
      "&:hover": onClick
        ? {
            transform: "translateY(-2px)",
            transition: "transform 0.2s",
          }
        : {},
    }}
    onClick={onClick}
  >
    <Box>
      <Typography variant="h6" color="textSecondary" fontSize="1.2rem">
        {title}
      </Typography>
      <Typography variant="h4" component="div" sx={{ mt: 1 }} fontSize="1.2rem">
        {loading ? "..." : value}
      </Typography>
    </Box>
    <Box
      sx={{
        backgroundColor: `${color}15`,
        borderRadius: "50%",
        p: 1.5,
      }}
    >
      {React.cloneElement(icon, { sx: { fontSize: 40 } })}
    </Box>
  </Paper>
);

const DashboardCards = ({ cardsData = [], onCardClick, loading = false }) => {
  const defaultCards = [
    {
      title: "Pedidos Totais",
      value: "45",
      icon: <OrdersIcon sx={{ fontSize: 40, color: "#2196f3" }} />,
      color: "#2196f3",
    },
    {
      title: "Pedidos Finalizados",
      value: "28",
      icon: <CompletedIcon sx={{ fontSize: 40, color: "#4caf50" }} />,
      color: "#4caf50",
    },
    {
      title: "Pedidos em Aberto",
      value: "17",
      icon: <PendingIcon sx={{ fontSize: 40, color: "#ff9800" }} />,
      color: "#ff9800",
    },
    {
      title: "Faturamento Diário",
      value: "R$ 2.850",
      icon: <MoneyIcon sx={{ fontSize: 40, color: "#9c27b0" }} />,
      color: "#9c27b0",
    },
  ];

  const cards = cardsData.length > 0 ? cardsData : defaultCards;

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "1920px",
        margin: "0 auto",
      }}
    >
      <Grid
        container
        sx={{
          width: "100%",
          display: "flex",
          alignItems: 'center',
          justifyContent: 'center',
          gap: "8px",
          "& > .MuiGrid-item": {
            padding: "0 !important",
            width: "calc(25% - 6px)",
            flex: "1 1 calc(25% - 6px)",
          },
        }}
      >
        {cards.map((card, index) => (
          <Grid item key={index}>
            <DashboardCard
              {...card}
              loading={loading}
              onClick={() => onCardClick && onCardClick(card, index)}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default DashboardCards;

import React, { useState } from "react";
import { Box } from "@mui/material";
import SideNav from "../moleculas/SideNav";
import DashboardCards from "../moleculas/DashboardCards";
import DashboardCharts from "./DashboardCharts";
import MontarPedido from "../pages/MontarPedido";
import Pedidos from "../pages/Pedidos";
import ConfiguracoesScreen from "../moleculas/ConfiguracoesScreen";

const AtendimentoMain = () => {
  const [currentView, setCurrentView] = useState("dashboard");
  const [loading, setLoading] = useState(false);
  const [cardsData, setCardsData] = useState([]);
  const [weeklyData, setWeeklyData] = useState([
    { name: "Jan", valor: 4000 },
    { name: "Fev", valor: 3000 },
    { name: "Mar", valor: 2000 },
    { name: "Abr", valor: 2780 },
    { name: "Mai", valor: 1890 },
    { name: "Jun", valor: 2390 },
  ]);

  const [distributionData, setDistributionData] = useState([
    { name: "Grupo A", value: 400 },
    { name: "Grupo B", value: 300 },
    { name: "Grupo C", value: 300 },
    { name: "Grupo D", value: 200 },
  ]);

  const handleMenuClick = (view) => {
    setCurrentView(view);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <SideNav onMenuClick={handleMenuClick} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          maxWidth: "1920px",
          margin: "0 auto",
          boxSizing: "border-box",
        }}
      >
        {currentView === "dashboard" && (
          <>
            <DashboardCards cardsData={cardsData} loading={loading} />
            <DashboardCharts
              weeklyData={weeklyData}
              distributionData={distributionData}
              loading={loading}
            />
          </>
        )}
        {currentView === "pedidos" && <Pedidos />}
        {currentView === "montarPedido" && (
          <MontarPedido onNavigate={handleMenuClick} />
        )}
        {currentView === "configuracoes" && <ConfiguracoesScreen />}
      </Box>
    </Box>
  );
};

export default AtendimentoMain;

import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import SideNav from "../moleculas/SideNav";
import DashboardCards from "../moleculas/DashboardCards";
import DashboardCharts from "./DashboardCharts";

const AtendimentoMain = () => {
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

  return (
    <Box sx={{ display: "flex" }}>
      <SideNav />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          // maxWidth: "calc(100vw - 10px)",
          boxSizing: "border-box",
        }}
      >
        <Box
          sx={{
            flexGrow: 1,
            p: 3,
            // maxWidth: "calc(100vw - 10px)",
            boxSizing: "border-box",
          }}
        >
          <DashboardCards cardsData={cardsData} loading={loading} />
        </Box>

        <DashboardCharts
          weeklyData={weeklyData}
          distributionData={distributionData}
          loading={loading}
        />
      </Box>
    </Box>
  );
};

export default AtendimentoMain;

import React from "react";
import { Box, Paper } from "@mui/material";
import LineChart from "../moleculas/LineChart";
import BarChart from "../moleculas/BarChart";
import DistributionChart from "../moleculas/DistributionChart";

const DashboardCharts = ({ weeklyData, distributionData, loading }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        mt: 3,
        height: "calc(100vh - 220px)",
        width: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: "16px",
          height: "48%",
          width: "100%",
        }}
      >
        <Paper sx={{ width: "50%", height: "100%", p: 2 }}>
          <LineChart
            data={weeklyData}
            loading={loading}
            title="Faturamento Anual"
          />
        </Paper>
        <Paper sx={{ width: "50%", height: "100%", p: 2 }}>
          <DistributionChart
            data={distributionData}
            loading={loading}
            title="Distribuição de Vendas"
          />
        </Paper>
      </Box>

      <Box
        sx={{
          display: "flex",
          gap: "16px",
          height: "48%",
          width: "100%",
        }}
      >
        <Paper sx={{ width: "50%", height: "100%", p: 2 }}>
          <BarChart
            data={weeklyData}
            loading={loading}
            title="Vendas por Categoria"
          />
        </Paper>
        <Paper sx={{ width: "50%", height: "100%", p: 2 }}>
          <BarChart
            data={weeklyData}
            loading={loading}
            title="Vendas por Período"
          />
        </Paper>
      </Box>
    </Box>
  );
};

export default DashboardCharts;

import React from "react";
import { Box } from "@mui/material";
import LineChart from "../moleculas/LineChart";
import BarChart from "../moleculas/BarChart";
import DistributionChart from "../moleculas/DistributionChart";

const DashboardCharts = ({ weeklyData, distributionData, loading }) => {
  return (
    <Box
      sx={{
        display: "none",
        flexDirection: "column",
        gap: 3,
        mt: 4,
        width: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: 3,
          width: "100%",
        }}
      >
        <Box sx={{ width: "50%" }}>
          <LineChart
            data={weeklyData}
            loading={loading}
            title="Faturamento Anual"
          />
        </Box>
        <Box sx={{ width: "50%" }}>
          <DistributionChart
            data={distributionData}
            loading={loading}
            title="Distribuição de Vendas"
          />
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          gap: 3,
          width: "100%",
        }}
      >
        <Box sx={{ width: "50%" }}>
          <BarChart
            data={weeklyData}
            loading={loading}
            title="Vendas por Categoria"
          />
        </Box>
        <Box sx={{ width: "50%" }}>
          <BarChart
            data={weeklyData}
            loading={loading}
            title="Vendas por Período"
          />
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardCharts;

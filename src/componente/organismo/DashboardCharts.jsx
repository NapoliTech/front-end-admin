import React from "react";
import { Box, Paper, useTheme, useMediaQuery } from "@mui/material";
import LineChart from "../moleculas/LineChart";
import BarChart from "../moleculas/BarChart";
import DistributionChart from "../moleculas/DistributionChart";

const DashboardCharts = ({ weeklyData, distributionData, loading }) => {
  const theme = useTheme();
  const isMediumScreen = useMediaQuery("(max-width:1366px)");

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "24px", // Aumentado de 16px para 24px
        mt: 5,
        // maxHeight: '210vh', 
        height: "calc(100vh - 180px)",
        width: "100%",
        overflow: "auto",
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: "24px", // Aumentado de 16px para 24px
          height: "calc(50% - 12px)", // Ajustado para considerar o gap
          width: "100%",
        }}
      >
        <Paper
          sx={{
            width: "50%",
            height: "100%",
            p: isMediumScreen ? 1.5 : 2,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <LineChart
            data={weeklyData}
            loading={loading}
            title="Faturamento Anual"
          />
        </Paper>
        <Paper
          sx={{
            width: "50%",
            height: "100%",
            p: isMediumScreen ? 1.5 : 2,
            display: "flex",
            flexDirection: "column",
          }}
        >
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
          gap: "24px", // Aumentado de 16px para 24px
          height: "calc(50% - 12px)", // Ajustado para considerar o gap
          width: "100%",
        }}
      >
        <Paper
          sx={{
            width: "50%",
            height: "100%",
            p: isMediumScreen ? 1.5 : 2,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <BarChart
            data={weeklyData}
            loading={loading}
            title="Vendas por Categoria"
          />
        </Paper>
        <Paper
          sx={{
            width: "50%",
            height: "100%",
            p: isMediumScreen ? 1.5 : 2,
            display: "flex",
            flexDirection: "column",
          }}
        >
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

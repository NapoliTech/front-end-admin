import { Typography, Box } from "@mui/material";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Tooltip,
  Cell,
  Legend,
} from "recharts";

const DistributionChart = ({ data, loading, title }) => {
  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#8884d8",
    "#FF99CC",
  ];

  const formatData = (vendasPorCategoria) => {
    if (!vendasPorCategoria) return [];

    return Object.entries(vendasPorCategoria).map(
      ([categoria, quantidade]) => ({
        name: categoria,
        value: quantidade,
      })
    );
  };

  return (
    <Box sx={{ height: "100%", width: "100%" }}>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Box sx={{ width: "100%", height: "calc(100% - 32px)" }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={formatData(data?.vendasPorCategoria)}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
            >
              {formatData(data?.vendasPorCategoria).map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend layout="vertical" align="right" verticalAlign="middle" />
          </PieChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
};

export default DistributionChart;

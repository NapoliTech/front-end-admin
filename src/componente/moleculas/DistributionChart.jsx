import { Typography, Box } from "@mui/material";
import { ResponsiveContainer, PieChart, Pie, Tooltip } from "recharts";

const DistributionChart = ({ data, loading, title }) => {
  return (
    <Box sx={{ height: "100%", width: "100%" }}>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Box sx={{ width: "100%", height: "calc(100% - 32px)" }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
            />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
};

export default DistributionChart;

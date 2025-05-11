import { Typography, Box } from "@mui/material";
import {
  ResponsiveContainer,
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const BarChart = ({ data, loading, title }) => {
  return (
    <Box sx={{ height: "100%", width: "100%" }}>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Box sx={{ width: "100%", height: "calc(100% - 32px)" }}>
        <ResponsiveContainer width="100%" height="100%">
          <RechartsBarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="valor" fill="#8884d8" />
          </RechartsBarChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
};

export default BarChart;

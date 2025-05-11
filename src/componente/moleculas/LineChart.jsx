import { Paper, Typography, Box } from "@mui/material";
import {
  ResponsiveContainer,
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const LineChart = ({ data, loading, title }) => {
  return (
    <Box sx={{ height: "100%", width: "100%" }}>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Box sx={{ width: "100%", height: "calc(100% - 32px)" }}>
        <ResponsiveContainer width="100%" height="100%">
          <RechartsLineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="valor" stroke="#8884d8" />
          </RechartsLineChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
};

export default LineChart;

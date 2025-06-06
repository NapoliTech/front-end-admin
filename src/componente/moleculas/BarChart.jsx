import { Typography, Box } from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const VendasPorCategoria = ({ data, loading, title }) => {
  const formatData = (data) => {
    if (!data) return [];

    // Para dados de vendas por categoria
    if (data.vendasPorCategoria) {
      return Object.entries(data.vendasPorCategoria).map(
        ([categoria, quantidade]) => ({
          categoria: categoria,
          quantidade: quantidade,
        })
      );
    }

    // Para dados dos últimos 7 dias
    if (data.vendasPorDia) {
      return data.vendasPorDia.map((item) => ({
        dia: `Dia ${item.dia}`,
        quantidade: item.quantidade,
      }));
    }

    return [];
  };

  const getDataKey = () => {
    if (data?.vendasPorCategoria) return "categoria";
    if (data?.vendasPorDia) return "dia";
    return "";
  };

  return (
    <Box sx={{ height: "100%", width: "100%" }}>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Box sx={{ width: "100%", height: "calc(100% - 32px)" }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={formatData(data)}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={getDataKey()} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="quantidade" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
};

export default VendasPorCategoria;

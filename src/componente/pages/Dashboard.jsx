import React, { useState } from "react";
import DashboardCards from "../moleculas/DashboardCards";
import DashboardCharts from "../organismo/DashboardCharts";

const Dashboard = () => {
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
    <>
    <h1>poiiiiiiiiiiii</h1>
      <DashboardCards cardsData={cardsData} loading={loading} />
      <DashboardCharts
        weeklyData={weeklyData}
        distributionData={distributionData}
        loading={loading}
      />
    </>
  );
};

export default Dashboard;

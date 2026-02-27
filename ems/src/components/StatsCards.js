import { useEffect, useState } from "react";
import api from "../api/axios";

function StatsCards() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get("/dashboard/stats");
        setStats(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchStats();
  }, []);

  if (!stats) return <p>Loading stats...</p>;

  return (
    <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
      <div style={cardStyle}>
        <h4 style={{ color: "#64748b" }}>Total Employees</h4>
        <p style={{ fontSize: "24px", fontWeight: "600", color: "#0f172a" }}>{stats.totalEmployees}</p>
      </div>

      <div style={cardStyle}>
        <h4 style={{ color: "#64748b" }}>Total Salary</h4>
        <p style={{ fontSize: "24px", fontWeight: "600", color: "#0f172a" }}>₹ {stats.salaryStats?.totalSalary || 0}</p>
      </div>

      <div style={cardStyle}>
        <h4 style={{ color: "#64748b" }}> Average Salary</h4>
        <p  style={{ fontSize: "24px", fontWeight: "600", color: "#0f172a" }}>₹ {Math.round(stats.salaryStats?.averageSalary || 0)}</p>
      </div>
    </div>
  );
}

const cardStyle = {
  background: "#ffffff",
  padding: "25px",
  borderRadius: "14px",
  width: "230px",
  boxShadow: "0 6px 24px rgba(0,0,0,0.08)",
  textAlign: "center"
};

export default StatsCards;
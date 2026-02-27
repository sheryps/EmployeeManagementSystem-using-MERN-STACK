import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import api from "../api/axios";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function DepartmentChart() {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get("/dashboard/stats");

        const labels = res.data.departmentStats.map(d => d._id);
        const values = res.data.departmentStats.map(d => d.count);

        setChartData({
          labels,
          datasets: [
            {
              label: "Employees by Department",
              data: values,
              backgroundColor: [
                "#3b82f6",
                "#10b981",
                "#f59e0b",
                "#ef4444",
                "#8b5cf6"
              ],
              borderRadius: 8
            }
          ]
        });

      } catch (error) {
        console.log(error);
      }
    };

    fetchStats();
  }, []);

  if (!chartData) return <p>Loading chart...</p>;

  return (
    <div
      style={{
        background: "white",
        padding: "25px",
        borderRadius: "14px",
        boxShadow: "0 6px 24px rgba(0,0,0,0.08)",
        marginTop: "30px"
      }}
    >
      <h3 style={{ marginBottom: "20px" }}>
        Department Distribution
      </h3>

      <Bar data={chartData} />
    </div>
  );
}

export default DepartmentChart;
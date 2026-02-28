
import StatsCards from "../components/StatsCards";
import DepartmentChart from "../components/departmentChart"

function DashboardPage() {
  return (
    <>
      <div
        style={{
          background: "linear-gradient(135deg, #3b82f6, #9333ea)",
          padding: "30px",
          borderRadius: "12px",
          color: "white",
          marginBottom: "30px"
        }}
      >
        <h2>Welcome, {localStorage.getItem("name")} 👋</h2>
      </div>

      <h3 style={{ marginBottom: "20px" }}>Dashboard Overview</h3>

      <StatsCards />
      <DepartmentChart />
    </>
  );
}

export default DashboardPage;
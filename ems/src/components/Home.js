import EmployeeList from "./Employee";
import Sidebar from "./Sidebar";
import StatsCards from "./StatsCards";
import DepartmentChart from "./departmentChart";

function Home() {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div
        style={{
          flex: 1,
          padding: "40px",
          background: "#f8fafc"
        }}
      >
        
        {/* Top Welcome Banner */}
        <div
          style={{
            background: "linear-gradient(135deg, #3b82f6, #9333ea)",
            padding: "30px",
            borderRadius: "12px",
            color: "white",
            marginBottom: "30px"
          }}
        >
          <h2 style={{ margin: 0 }}>
            Welcome, {localStorage.getItem("name")} 👋
          </h2>
          <p style={{ marginTop: "8px", opacity: 0.9 }}>
            Here’s what’s happening in your organization today.
          </p>
        </div>
          <div
          style={{
    background: "white",
    padding: "30px",
    borderRadius: "16px",
    boxShadow: "0 6px 24px rgba(0,0,0,0.05)"
  }}
          >

                  {/* Dashboard Overview */}
                  <h3 style={{ marginBottom: "20px",color:"#1e293b",fontWeight:"600" }}>Dashboard Overview</h3>
                  <StatsCards />
                  <DepartmentChart/>
                          {/* Employee Section */}

                  <div style={{ marginTop: "40px" }}>
                    <EmployeeList />
                  </div>
          </div>



      </div>
    </div>
  );
}

export default Home;

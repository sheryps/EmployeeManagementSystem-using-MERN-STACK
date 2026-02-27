import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />

      <div
        style={{
          flex: 1,
          padding: "40px",
          background: "#f8fafc"
        }}
      >
        <Outlet />
      </div>
    </div>
  );
}

export default MainLayout;
import { NavLink } from "react-router-dom";

function Sidebar() {
  const role = localStorage.getItem("role");
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  const linkStyle = {
    display: "block",
    padding: "10px 14px",
    borderRadius: "6px",
    marginBottom: "10px",
    textDecoration: "none",
    color: "white"
  };

  const activeStyle = {
    background: "#334155"
  };

  return (
    <div
      style={{
        width: "240px",
        background: "#0f172a",
        color: "white",
        padding: "30px 20px",
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh"
      }}
    >
      <h2 style={{ marginBottom: "30px" }}>EMS Panel</h2>

{/* Dashboard */}
<NavLink
  to="/dashboard"
  style={({ isActive }) =>
    isActive ? { ...linkStyle, ...activeStyle } : linkStyle
  }
>
  Dashboard
</NavLink>

{/* Employees - ADMIN & MANAGER */}
{(role === "ADMIN" || role === "MANAGER") && (
  <NavLink
    to="/employees"
    style={({ isActive }) =>
      isActive ? { ...linkStyle, ...activeStyle } : linkStyle
    }
  >
    Employees
  </NavLink>
)}

{/* Users - ADMIN only */}
{role === "ADMIN" && (
  <NavLink
    to="/users"
    style={({ isActive }) =>
      isActive ? { ...linkStyle, ...activeStyle } : linkStyle
    }
  >
    Users
  </NavLink>
)}

      {/* Logout */}
      <button
        onClick={handleLogout}
        style={{
          marginTop: "auto",
          padding: "10px",
          borderRadius: "6px",
          border: "none",
          background: "#ef4444",
          color: "white",
          cursor: "pointer"
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default Sidebar;
import { useEffect, useState } from "react";
import api from "../api/axios";

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "EMPLOYEE"
  });
const loggedInUser = localStorage.getItem("name");
  const fetchUsers = async () => {
    try {
      const res = await api.get("/users");
      setUsers(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRoleChange = async (id, newRole) => {
  try {
    await api.put(`/users/${id}/role`, { role: newRole });
    fetchUsers();
  } catch (error) {
    alert("Role update failed");
  }
};

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAddUser = async (e) => {
    e.preventDefault();

    try {
      await api.post("/auth/register", newUser);
      setShowModal(false);
      setNewUser({
        name: "",
        email: "",
        password: "",
        role: "EMPLOYEE"
      });
      fetchUsers();
    } catch (error) {
      alert(error.response?.data?.message || "Add failed");
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/users/${id}`);
      fetchUsers();
    } catch (error) {
      alert("Delete failed");
    }
  };

  return (
    <div
  style={{
    background: "white",
    padding: "30px",
    borderRadius: "16px",
    boxShadow: "0 6px 24px rgba(0,0,0,0.06)"
  }}
>
<div
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px"
  }}
>
  <h2 style={{ margin: 0 }}>User Management</h2>

  <button
    onClick={() => setShowModal(true)}
    style={{
      padding: "8px 16px",
      borderRadius: "8px",
      border: "none",
      background: "#3b82f6",
      color: "white",
      fontWeight: "500",
      cursor: "pointer"
    }}
  >
    + Add User
  </button>
</div>

<table
  style={{
    width: "100%",
    borderCollapse: "collapse",
    borderRadius: "12px",
    overflow: "hidden"
  }}
>
        <thead
  style={{
    background: "#f8fafc",
    textAlign: "left"
  }}
>
          <tr>
<th style={thStyle}>Name</th>
<th style={thStyle}>Email</th>
<th style={thStyle}>Role</th>
<th style={thStyle}>Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td style={tdStyle}>{user.name}</td>
              <td style={tdStyle}>{user.email}</td>
              <td style={tdStyle}>
                <select
                disabled={user.name===loggedInUser}
                  value={user.role}
                  onChange={(e) =>
                    handleRoleChange(user._id, e.target.value)
                  }
                    style={{
                    padding: "6px 10px",
                    borderRadius: "6px",
                    border: "1px solid #cbd5e1",
                    background: "#f8fafc"
                  }}
                >
                  <option value="ADMIN">ADMIN</option>
                  <option value="MANAGER">MANAGER</option>
                  <option value="EMPLOYEE">EMPLOYEE</option>
                </select>
              </td>
              <td>
                <button 
                                style={{
                  padding: "6px 12px",
                  borderRadius: "6px",
                  border: "none",
                  background: "#ef4444",
                  color: "white",
                  cursor: "pointer"
                }}

                onClick={() => handleDelete(user._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div style={overlay}>
          <div style={modal}>
            <h3>Add User</h3>

            <form onSubmit={handleAddUser}>
              <input
                type="text"
                placeholder="Name"
                value={newUser.name}
                onChange={(e) =>
                  setNewUser({ ...newUser, name: e.target.value })
                }
                required
              />
              <br /><br />

              <input
                type="email"
                placeholder="Email"
                value={newUser.email}
                onChange={(e) =>
                  setNewUser({ ...newUser, email: e.target.value })
                }
                required
              />
              <br /><br />

              <input
                type="password"
                placeholder="Password"
                value={newUser.password}
                onChange={(e) =>
                  setNewUser({ ...newUser, password: e.target.value })
                }
                required
              />
              <br /><br />

              <select
                value={newUser.role}
                onChange={(e) =>
                  setNewUser({ ...newUser, role: e.target.value })
                }
              >
                <option value="ADMIN">ADMIN</option>
                <option value="MANAGER">MANAGER</option>
                <option value="EMPLOYEE">EMPLOYEE</option>
              </select>

              <br /><br />

              <button type="submit">Save</button>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                style={{ marginLeft: "10px" }}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>

  );
}

const overlay = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(0,0,0,0.4)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
};

const modal = {
  background: "white",
  padding: "30px",
  borderRadius: "12px",
  width: "350px"
};

const thStyle = {
  padding: "14px",
  borderBottom: "2px solid #e2e8f0",
  fontWeight: "600",
  color: "#334155"
};

const tdStyle = {
  padding: "14px",
  borderBottom: "1px solid #f1f5f9",
  color: "#475569"
};
export default UserManagement;
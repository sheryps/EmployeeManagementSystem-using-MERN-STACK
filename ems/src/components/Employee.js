import { useEffect, useState,useCallback } from "react";
import api from "../api/axios";

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("");
  const [loading, setLoading] = useState(false);
//new employee
  const [showModal, setShowModal] = useState(false);
const [newEmployee, setNewEmployee] = useState({
  name: "",
  email: "",
  department: "IT",
  salary: ""
});

//edit employee
const [isEditing, setIsEditing] = useState(false);
const [editingId, setEditingId] = useState(null);


  const role = localStorage.getItem("role");

const fetchEmployees = useCallback(async () => {
  try {
    setLoading(true);

    const res = await api.get(
      `/employees?page=${page}&limit=${limit}&search=${search}&department=${department}`
    );

    setEmployees(res.data.employees);
    setTotalPages(res.data.pages);
  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
}, [page, limit, search, department]);
//new employee
  const handleInputChange = (e) => {
  setNewEmployee({
    ...newEmployee,
    [e.target.name]: e.target.value
  });
};

//edit employee
const handleEditClick = (employee) => {
  setIsEditing(true);
  setEditingId(employee._id);
  setNewEmployee({
    name: employee.name,
    email: employee.email,
    department: employee.department,
    salary: employee.salary
  });
  setShowModal(true);
};
//new or editemployee
const handleSubmitEmployee = async (e) => {
  e.preventDefault();

  try {
    if (isEditing) {
      await api.put(`/employees/${editingId}`, newEmployee);
    } else {
      await api.post("/employees", newEmployee);
    }

    setShowModal(false);
    setIsEditing(false);
    setEditingId(null);
    setNewEmployee({
      name: "",
      email: "",
      department: "IT",
      salary: ""
    });

    fetchEmployees();

  } catch (error) {
    alert(error.response?.data?.message || "Operation failed");
  }
};

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this employee?"))
      return;

    try {
      await api.delete(`/employees/${id}`);
      fetchEmployees();
    } catch (error) {
      alert(error.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div style={{ marginTop: "40px" }}>
      <h3
  style={{
    marginBottom: "20px",
    color: "#1e293b",
    fontWeight: "600"
  }}
>
  Employee List
</h3>

      {/* Filters */}
      <div style={{ marginBottom: "20px", display: "flex", gap: "10px" }}>
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => {
            setPage(1);
            setSearch(e.target.value);
          }}
        />

        <select
          value={department}
          onChange={(e) => {
            setPage(1);
            setDepartment(e.target.value);
          }}
        >
          <option value="">All Departments</option>
          <option value="IT">IT</option>
          <option value="HR">HR</option>
          <option value="Finance">Finance</option>
        </select>
      </div>
      {/* //add emplyee */}
      {role === "ADMIN" && (
  <button
    onClick={() => setShowModal(true)}
    style={{
      padding: "8px 14px",
      borderRadius: "6px",
      background: "#3b82f6",
      color: "white",
      border: "none",
      cursor: "pointer",
      marginBottom: "15px"
    }}
  >
    + Add Employee
  </button>
)}
      {/* Table */}
      {loading ? (
        <p>Loading employees...</p>
      ) : employees.length === 0 ? (
        <p>No employees found.</p>
      ) : (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            background: "white"
          }}
        >
          <thead
  style={{
    background: "#f8fafc",
    fontWeight: "600",
    color: "#334155"
  }}
>
            <tr>
              <th style={thStyle}>Name</th>
              <th style={thStyle}>Email</th>
              <th style={thStyle}>Department</th>
              <th style={thStyle}>Salary</th>
              {(role === "ADMIN" || role === "MANAGER") && (
                <th style={thStyle}>Actions</th>
              )}
            </tr>
          </thead>

          <tbody>
            {employees.map((emp) => (
              <tr key={emp._id}>
                <td style={tdStyle}>{emp.name}</td>
                <td style={tdStyle}>{emp.email}</td>
                <td style={tdStyle}>{emp.department}</td>
                <td style={tdStyle}>₹ {emp.salary}</td>

                {(role === "ADMIN" || role === "MANAGER") && (
                  <td style={tdStyle}>
                    <button
                      onClick={() => handleEditClick(emp)}
                      style={{ marginRight: "8px",color:"white",background:"green",padding:"5px"}}
                    >
                      Edit
                    </button>
                    {role === "ADMIN" && (
                      <button
                        style={{ marginRight: "8px",color:"white",background:"red",padding:"5px" }}
                        onClick={() => handleDelete(emp._id)}
                      >
                        Delete
                      </button>
                    )}

                    
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Pagination */}
      <div style={{ marginTop: "20px" }}>
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Previous
        </button>

        <span style={{ margin: "0 10px" }}>
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>

          {/* //add employee modal */}
    {showModal && (
  <div style={modalOverlay}>
    <div style={modalBox}>
      <h3 style={{color:"black"}}>{isEditing ? "Edit Employee" : "Add Employee"}</h3>

      <form onSubmit={handleSubmitEmployee}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={newEmployee.name}
          onChange={handleInputChange}
          required
        />
        <br /><br />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={newEmployee.email}
          onChange={handleInputChange}
          required
        />
        <br /><br />

        <select
          name="department"
          value={newEmployee.department}
          onChange={handleInputChange}
        >
          <option value="IT">IT</option>
          <option value="HR">HR</option>
          <option value="Finance">Finance</option>
        </select>
        <br /><br />

        <input
          type="number"
          name="salary"
          placeholder="Salary"
          value={newEmployee.salary}
          onChange={handleInputChange}
          required
        />
        <br /><br />

        <button type="submit" style={{color:"white",background:"green"}}>{isEditing ? "Update" : "Save"}</button>
        <button
          type="button"
          onClick={() => setShowModal(false)}
          style={{ marginLeft: "10px",color:"white",background:"red" }}
        >
          Cancel
        </button>
      </form>
    </div>
  </div>
)}
    </div>
  )
}

const thStyle = {
  padding: "14px",
  textAlign: "left",
  borderBottom: "2px solid #e2e8f0"
};

const tdStyle = {
  padding: "14px",
  borderBottom: "1px solid #f1f5f9",
  color: "#334155"
};

const modalOverlay = {
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

const modalBox = {
  background: "white",
  padding: "30px",
  borderRadius: "12px",
  width: "350px"
};

export default EmployeeList;
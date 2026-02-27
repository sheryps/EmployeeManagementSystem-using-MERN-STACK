// controllers/employee.controller.js
const Employee = require("../models/Employee");

exports.getEmployees = async (req, res) => {
  try {
    const { page = 1, limit = 5, search = "", department } = req.query;

    // Build query object
    const query = {};

    // Search by name (case-insensitive)
    if (search) {
      query.name = { $regex: search, $options: "i" };
    }

    // Filter by department
    if (department) {
      query.department = department;
    }

    // Count total documents
    const total = await Employee.countDocuments(query);

    // Apply pagination
    const employees = await Employee.find(query)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.json({
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
      employees
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addEmployee = async (req, res) => {
  const employee = new Employee(req.body);
  await employee.save();
  res.json(employee);
};

exports.updateEmployee = async (req, res) => {
  const updated = await Employee.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
};

exports.deleteEmployee = async (req, res) => {
  await Employee.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted successfully" });
};
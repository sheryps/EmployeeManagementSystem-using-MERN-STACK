const Employee = require("../models/Employee");

exports.getDashboardStats = async (req, res) => {
  try {
    // Total employees
    const totalEmployees = await Employee.countDocuments();

    // Department-wise count
    const departmentStats = await Employee.aggregate([
      {
        $group: {
          _id: "$department",
          count: { $sum: 1 }
        }
      }
    ]);

    // Salary summary
    const salaryStats = await Employee.aggregate([
      {
        $group: {
          _id: null,
          totalSalary: { $sum: "$salary" },
          averageSalary: { $avg: "$salary" },
          maxSalary: { $max: "$salary" },
          minSalary: { $min: "$salary" }
        }
      }
    ]);

    res.json({
      totalEmployees,
      departmentStats,
      salaryStats: salaryStats[0] || {}
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
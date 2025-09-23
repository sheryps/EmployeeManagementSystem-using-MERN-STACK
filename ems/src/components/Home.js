import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaUserTimes, FaUserPlus, FaUserEdit } from "react-icons/fa"
import axios from 'axios'

function Home() {
  const [allEmployees, setAllEmployees] = useState([])
  const history = useNavigate()

  const fetchdata = async () => {
    const result = await axios.get('http://localhost:8000/allemployees')
    setAllEmployees(result.data.employees)
  }

  useEffect(() => {
    fetchdata()
  }, [])

  const handleDelete = async (id) => {
    const result = await axios.delete('http://localhost:8000/deleteemployees/' + id)
    alert(result.data.message)
    fetchdata()
    history('/')
  }

  const handleEdit = (id, empname, age, designation, salary) => {
    localStorage.setItem('ID', id)
    localStorage.setItem('NAME', empname)
    localStorage.setItem('AGE', age)
    localStorage.setItem('DESIGNATION', designation)
    localStorage.setItem('SALARY', salary)
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-yellow-500 text-center mb-4">
        Employee Management System
      </h1>

      <p className="mb-6 text-gray-700">
        EMS helps to eliminate the manual process and saves a lot of time and money.
        This system maintains the professional and personal details of the employees
        and the company in a safe manner. The employee management system lowers the
        burden and the pressure on HRs and the business managers. Thanks to the technology
        which offers us a plethora of solutions which makes the work easier and faster.
      </p>

      <div className="mb-6">
        <Link to={'/Add'}>
          <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded flex items-center gap-2">
            Add <FaUserPlus />
          </button>
        </Link>
      </div>

      <h3 className="text-xl font-semibold mb-3">List of Employees</h3>

      {/* Responsive Card Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {allEmployees?.map((item) => (
          <div
            key={item.id}
            className="bg-gray-900 text-gray-200 p-4 rounded-lg shadow-md flex flex-col justify-between"
          >
            <div className="flex justify-center mb-3">
              <img
                src="/default-avatar.png" // <-- replace with your default image path
                alt="Employee"
                className="w-20 h-20 rounded-full object-cover border-2 border-gray-600"
              />
            </div>

            {/* employee info */}
            <div className="mb-2">
              <p><span className="font-semibold">ID:</span> {item.id}</p>
              <p><span className="font-semibold">Name:</span> {item.empname}</p>
              <p><span className="font-semibold">Age:</span> {item.age}</p>
              <p><span className="font-semibold">Designation:</span> {item.designation}</p>
              <p><span className="font-semibold">Salary:</span> {item.salary}</p>
            </div>

            <div className="flex flex-wrap gap-2 mt-2">
              <Link to={'/Edit/' + item.id} className='w-full sm:w-auto'>
                <button
                  onClick={() =>
                    handleEdit(item.id, item.empname, item.age, item.designation, item.salary)
                  }
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded flex items-center justify-center gap-1 w-full sm:w-auto"
                >
                  <FaUserEdit /> Edit
                </button>
              </Link>
              <button
                onClick={() => handleDelete(item.id)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded flex items-center justify-center gap-1 w-full sm:w-auto"
              >
                <FaUserTimes /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home


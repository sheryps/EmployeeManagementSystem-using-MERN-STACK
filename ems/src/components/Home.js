import React from 'react'
import Employee from './Employee'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserTimes,FaUserPlus,FaUserEdit } from "react-icons/fa";
import axios from 'axios';
import { useState,useEffect } from 'react';
function Home() {
  const [allEmployees,setAllEmployees]=useState([])

  const fetchdata=async()=>{
    const result=await axios.get('http://localhost:8000/allemployees')
    setAllEmployees(result.data.employees)
  }
  console.log(allEmployees);
  useEffect(()=>{
    fetchdata()
  },[])
  const history=useNavigate()
  const handleDelete=async(id)=>{
    const result=await axios.delete('http://localhost:8000/deleteemployees/'+id)
    console.log(result);
    alert(result.data.message)
    fetchdata()
    history('/')
  }
  const handleEdit=async(id,empname,age,designation,salary)=>{
    localStorage.setItem('ID',id)
    localStorage.setItem('NAME',empname)
    localStorage.setItem('AGE',age)
    localStorage.setItem('DESIGNATION',designation)
    localStorage.setItem('SALARY',salary)
  }

  return (
    <>
    <h1 className='text-warning text-center'>Employee Management System</h1>
    <p className='p-3'>EMS helps to eliminate the manual process and saves a lot of time and money. This system maintains the professional and personal details of the employees and the company in a safe manner. The employee management system lowers the burden and the pressure on HRs and the business managers. Thanks to the technology which offers us a plethora of solutions which makes the work easier and faster.</p>
    <Link to={'/Add'}>
    <Button variant="success ms-2">Add <FaUserPlus/></Button>
    </Link>
    
    <h3 className='ms-2'>List of Employees</h3>
    <Table bordered hover variant="dark">
      <thead>
        <tr>
          <th>id</th>
          <th>Employee Name</th>
          <th>Age</th>
          <th>Designation</th>
          <th>Salary</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {
            allEmployees?.map((item)=>(
                <tr>
                    <td>{item.id}</td>
                    <td>{item.empname}</td>
                    <td>{item.age}</td>
                    <td>{item.designation}</td>
                    <td>{item.salary}</td>
                    <td>
                      <Link to={'/Edit/'+item.id}>
                      <Button onClick={()=>handleEdit(item.id,item.empname,item.age,item.designation,item.salary)} variant="info"><FaUserEdit/></Button>
                      </Link>
                    
                    <Button onClick={()=>handleDelete(item.id)} variant="primary"><FaUserTimes/></Button>
                    
                    </td>
                </tr>
            ))
        }
      </tbody>
    </Table>
    </>
  )
}

export default Home
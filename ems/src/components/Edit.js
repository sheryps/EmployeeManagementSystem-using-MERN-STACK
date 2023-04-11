import React from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {useState,useEffect} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Employee from './Employee';
import axios from 'axios';
function Edit() {
    const [id,setId]=useState('')
    const [empname,setEmpname]=useState('')
    const [age,setAge]=useState('')
    const [designation,setDesignation]=useState('')
    const [salary,setSalary]=useState()

    //api call to get particular employee
    const params=useParams()
    console.log(id);
    const fetchEmployee=async()=>{
        const result = await axios.get('http://localhost:8000/getemployee/'+params.id)
        const details=result.data.employee;
        setId(details.id)
        setEmpname(details.empname)
        setAge(details.age)
        setDesignation(details.designation)
        setSalary(details.salary)
    }


    useEffect(()=>{
        fetchEmployee()

        
    },[])

    var index = Employee.map(item=>item.id).indexOf(id)
    console.log(index);
    let history=useNavigate()
    const handleUpdate=async(e)=>{
        e.preventDefault()//avoid refreshing
        const body={
            id,
            empname,
            age,
            designation,
            salary
          }
          const result = await axios.post('http://localhost:8000/editemployees',body)  
          alert(result.data.message)
        history('/')
    }
  return (
    <>
    <h1 className='text-warning text-center'>Update Management System</h1>
    <p className="p-3">EMS helps to eliminate the manual process and saves a lot of time and money. This system maintains the professional and personal details of the employees and the company in a safe manner. The employee management system lowers the burden and the pressure on HRs and the business managers. Thanks to the technology which offers us a plethora of solutions which makes the work easier and faster.</p>
    <Row>
        <Col md={6} className="ps-5">
        <img src="https://th.bing.com/th/id/OIP.wvsWCcDJgQxCgX9wVmHZpAHaHa?pid=ImgDet&rs=1" width="80%" height="80%"></img>
        </Col>
        
        <Col md={6} className="pe-5">
        <Form className='border border-3 p-1'>
        <Form.Group className="mb-2">
            <Form.Label>ID</Form.Label>
            <Form.Control type="text" placeholder="Enter your id" value={id} onChange={(e)=>setId(e.target.value)} required/>
        </Form.Group>
        <Form.Group className="mb-2">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Enter your Name" value={empname} onChange={(e)=>setEmpname(e.target.value)} required/>
        </Form.Group>
        <Form.Group className="mb-2">
            <Form.Label>Age</Form.Label>
            <Form.Control type="text" placeholder="Enter your Age" value={age} onChange={(e)=>setAge(e.target.value)} required/>
        </Form.Group>
        <Form.Group className="mb-2">
            <Form.Label>Designation</Form.Label>
            <Form.Control type="text" placeholder="Enter your Designation" value={designation} onChange={(e)=>setDesignation(e.target.value)} required/>
        </Form.Group>
        <Form.Group className="mb-2">
            <Form.Label>Salary</Form.Label>
            <Form.Control type="text" placeholder="Enter your Salary" value={salary} onChange={(e)=>setSalary(e.target.value)} required/>
        </Form.Group>
        <Button variant="primary" type="submit" onClick={(e)=>handleUpdate(e)}>
            Update
        </Button>
    </Form>
        </Col>
      </Row>
    </>
  )
}

export default Edit
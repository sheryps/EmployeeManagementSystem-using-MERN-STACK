//import express
const express=require('express')

//import cors

const cors=require('cors')
//import logic
const logic=require('./services/logic')
//create server
const server=express()

//connections

server.use(cors({
    origin:'http://localhost:3000'
}))

server.use(express.json());

server.listen(8000,()=>{
    console.log('listening on port 8000');
})

//api call to get allemployee details

server.get('/allemployees',(req,res)=>{
    logic.allEmployees().then(
        (result)=>{
            res.status(result.statusCode).json(result)
        }
        
    )
})
//api call to add employee details

server.post('/addemployees',(req,res)=>{
    logic.addEmployees(req.body.id,req.body.empname,req.body.age,req.body.designation,req.body.salary).then(
        (result)=>{
            res.status(result.statusCode).json(result)
        }
        
    )
})

server.post('/editemployees',(req,res)=>{
    logic.editEmployees(req.body.id,req.body.empname,req.body.age,req.body.designation,req.body.salary).then(
        (result)=>{
            res.status(result.statusCode).json(result)
        }
        
    )
})

server.delete('/deleteemployees/:id',(req,res)=>{
    logic.deleteEmployees(req.params.id).then(
        (result)=>{
            res.status(result.statusCode).json(result)
        }
        
    )
})

//api call to get getemployee details

server.get('/getemployee/:id',(req,res)=>{
    console.log(req.params.id);
    logic.getEmployee(req.params.id).then(
        (result)=>{
            res.status(result.statusCode).json(result)
        }
        
    )
})

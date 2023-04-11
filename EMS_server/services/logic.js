const db=require('./db')

//get all employees

const allEmployees=()=>{
    return db.Employee.find().then(
        (result)=>{
            if(result){
                return{
                    statusCode:200,
                    employees:result
                }
            }else{
                return{
                    statusCode:404,
                    message:'Employees not found'
                }
            }
        }
    )
}
//add employees
const addEmployees=(id,empname,age,designation,salary)=>{
    return db.Employee.findOne({id}).then(
        (result)=>{
            if(result){
                return{
                    statusCode:400,
                    message:'Employee already exists'
                }
            }else{
                const newEmployee=new db.Employee({id,empname,age,designation,salary})
                newEmployee.save()
                return{
                    statusCode:200,
                    message:'Employee sucessfully added'
                }
            }
        }
    )
}
//add employees
const editEmployees=(id,empname,age,designation,salary)=>{
    return db.Employee.findOne({id}).then(
        (result)=>{
            if(result){
                result.id=id,
                result.empname=empname,
                result.age=age,
                result.designation=designation,
                result.salary=salary
                result.save()
                return{

                    statusCode:200,
                    message:'Employee details edited sucessfullt'
                }
            }
        }
    )
}
//delete employees
const deleteEmployees=(id)=>{
    return db.Employee.deleteOne({id}).then(
        (result)=>{
            if(result){
                return{
                    statusCode:200,
                    message:'Deleted sucessfully'
                }
            }else{
                return{
                    statusCode:400,
                    message:'No data'
                }
            }
        }
    )
}

//get employees
const getEmployee=(id)=>{
    return db.Employee.findOne({id}).then(
        (result)=>{
            if(result){
                return{
                    statusCode:200,
                    employee:result,
                    message:'Got data'
                }
            }else{
                return{
                    statusCode:400,
                    message:'No data'
                }
            }
        }
    )
}
module.exports={
    allEmployees,
    addEmployees,
    editEmployees,
    deleteEmployees,
    getEmployee
}
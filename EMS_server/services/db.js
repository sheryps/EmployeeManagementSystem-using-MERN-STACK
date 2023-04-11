const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/EMS')

//create model

const Employee=mongoose.model('Employee',{
    //schema creation
    id:String,
    empname:String,
    age:String,
    designation:String,
    salary:String
})

module.exports={
    Employee
}
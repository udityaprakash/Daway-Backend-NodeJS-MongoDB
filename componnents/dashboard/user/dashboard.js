const express=require("express");
const bcrypt = require("bcrypt");
const student = require("../../databasevariables/studentdb");
const mysql = require("mysql2");
// import '../../server.js';
const result={
get: async (req,res)=>{
    const id=req.params['id'];
    // console.log(id);
    // var query= "SELECT * FROM user WHERE id = '"+id+"';";
    // sqlcon.query(query, function (err, result) {
      try{
        const  result = await student.find({_id:id});
        if(result.length!=0){
          res.send("<center><h1>Dashboard</h1><p>email  -  "+result[0].email+"</p><p>fname  -  "+result[0].fname+"</p><p>lname  -  "+result[0].lname+"</p><p>password  -  "+result[0].password+"</center>");
        }else{
          res.json({
            success:false,
            msg:"no such user found"
          });
        }
      }catch(err){
        res.json({status:"Internel server error",
            msg:"something wrong in backend"});
  
      }
    // });
    
  
  }


}

module.exports = result;
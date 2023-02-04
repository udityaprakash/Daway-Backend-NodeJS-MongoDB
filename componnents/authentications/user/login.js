const express=require("express");
const bcrypt = require("bcrypt");
const sqlcon=require("../../databasevariables/studentdb");
const mysql = require("mysql2");
const path=require("../../../path");
const student= require("../../databasevariables/studentdb"); 



const result={
post: async (req,res)=>{
    console.log(req.body);
    let {email , password} = req.body;
    // var hashedpassword;
    if(email && password){
      email = email.toLowerCase();
      const result = await student.find({ email: email });
      console.log(result);
      if(result != null){
            const match =await bcrypt.compare(password, result[0].password);
            if(match){
              console.log(result[0].verified);
              if(result[0].verified == true){
                // res.status(200).json({
                //   status:true,
                //   msg:"User Exist"
                // });
                res.redirect("dashboard/"+ result[0]._id);

              }else{
                res.redirect("signup/verifyotp/" + email );
              }

            }else{
              res.status(401).json({
                success:false,
                msg:"Password incorrect"
              });

            }


          }else{
            res.status(404).json({
              success:false,
              msg:"Email ID don't exist"
            });
          }
        // }else{
        //   res.status(500).json({success:false,
        //       msg:"Internal Server Database error",
        //       err:err});
  
        // }
      // });
  
  
    }else{
      res.status(400).json({success:false,
      msg:"One of the field Found Missing"});
  }
  },
  get:(req,res)=>{
    // res.json({
    //   status:200,
    //   msg:"ready to login"
    // })
    res.sendFile(path+"/public/login.html");
  }
}

module.exports = result;
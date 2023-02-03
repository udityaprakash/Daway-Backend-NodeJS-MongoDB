const express = require("express");
var mysql = require('mysql2');
const sqlcon=require("./sqlcon");
const app = express();

require('dotenv').config();
const mongoose = require("mongoose");


const connectDB =  {
  connection: async () => {
            await mongoose.set("strictQuery", false);
            await mongoose.connect("mongodb+srv://udityaprakash01:"+process.env.MONGODBPASS+"@cluster0.za5wk8j.mongodb.net/?retryWrites=true&w=majority", (err) => {   
              if (!err) {
                  console.log("db connected successfully");
                  try{
                    connectDB.studentschema;

                  }catch(err){
                    console.log("error in schema: "+err);
                  }
              } else {
                  console.log("Retrying connecting to database");
                  connectDB.connection();
              }
          });
    },
  studentschema: new mongoose.Schema({
    fname : {
     type:String,
     min:8,
     required:true
    },
    lname : {
      type:String,
      min:8,
     },
    password: {
        type:String,
        min:8,
        require:true
       },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      validate: {
          validator: function(v) {
              return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
          },
          message: "Please enter a valid email"
      },
      required: [true, "Email required"]
    },
    otp:{
      type:Number,
    },
    verified:{
      type:Boolean
    }
})

}


module.exports=connectDB;
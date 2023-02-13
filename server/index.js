import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import User from "./schema/userSchema.js"

const app = express();

app.use(express.json());

app.use(cors());

const connection = async() => {
    try{
        await mongoose.connect("mongodb://localhost:27017/curd-application");
        console.log("Database Connected")
    }
    catch(error){
        console.log(error)
    }
}

connection();


app.get("/users", async(req,res) => {
    try{
      const users = await User.find();
      
      res.json(users)
    }catch(error){
        console.log(error)
        console.log(error.message)
        res.status(404).json("Trouble Fetching Data Try Again")
    }
})

app.get("/users/:id",async(req,res) => {
    try{
        const user = await User.findById(req.params.id)
        res.status(200).json(user)
    }catch(error){
        res.status(404).json(error)
    }
})

app.post("/add", async(req,res) => {
    try{
        const newUser = User(req.body)
        await newUser.save()
        res.status(201).json(newUser)
    }catch(error){
        res.status(400).json(error)
    }
    
})

app.patch("/users/:id" , async(req,res) => {
    try{
        const user = await User.findByIdAndUpdate(req.params.id,req.body)
        console.log(user)
        res.status(200).json(user)
    }catch(error){
        res.status(400).json(error)
    }
})


app.delete("/users/:id",async(req,res) => {
    try{
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json("user deleted")
    }catch(error){
        res.status(400).json("cannot delete user")
    }
    
})

app.listen(3001,() => {
    console.log("Server Running On Port 3001")
})
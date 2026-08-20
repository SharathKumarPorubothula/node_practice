import express from 'express';
import dotenv from 'dotenv';
import fs from 'fs/promises';
import bcrypt from 'bcrypt';

dotenv.config();

var app=express();

app.use(express.json());

var middleware=(req,res,next)=>{
    console.log("middleware is running")
    next()
}

app.get('/:age',middleware,async(req,res)=>{
 var name=req.query.name
 var pass=req.query.password
 var age=req.params.age
 var body=req.body
 var header=req.headers["content-type"]

var hash=await bcrypt.hash(pass,10)
await fs.writeFile('data.txt',`${hash}`)
var pass1=await fs.readFile('data.txt','utf-8')
var data=await bcrypt.compare(pass,pass1)

 res.status(200).send(data)

})

app.listen(process.env.PORT,()=>{
    console.log("server is running on port 3000")
})
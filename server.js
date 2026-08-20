import express from 'express';
import dotenv from 'dotenv';
import fs from 'fs/promises';

dotenv.config();

var app=express();

app.use(express.json());

var middleware=(req,res,next)=>{
    console.log("middleware is running")
    next()
}

app.get('/:age',middleware,async(req,res)=>{
 var name=req.query.name
 var age=req.params.age
 var body=req.body
 var header=req.headers["content-type"]

await fs.writeFile('data.txt',`name:${name},age:${age},body:${JSON.stringify(body)},header:${header}`) 
var data=await fs.readFile('data.txt','utf-8')

 res.status(200).send(data)

})

app.listen(process.env.PORT,()=>{
    console.log("server is running on port 3000")
})
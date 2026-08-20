import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

var app=express();

app.use(express.json());

var middleware=(req,res,next)=>{
    console.log("middleware is running")
    next()
}

app.get('/:age',middleware,(req,res)=>{
 var name=req.query.name
 var age=req.params.age
 var body=req.body
 var header=req.headers["content-type"]

 res.status(200).json({
    name:name,
    age:age,
    body:body,
    header:header
 })

})

app.listen(process.env.PORT,()=>{
    console.log("server is running on port 3000")
})
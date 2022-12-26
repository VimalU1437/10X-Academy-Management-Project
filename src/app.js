// const { urlencoded } = require("express");
const express = require("express");

const app = express();

//middlewere

app.use(express.json());
app.use(express.urlencoded());

//routes
const classRouter = require("./routes/classes");

app.use("/v1/myClass",classRouter);





app.use("*",(req,res)=>{
    res.sendStatus(404);
})

// app.get("/",(req,res)=>{
//     res.send("hello world");
// })

module.exports =app;
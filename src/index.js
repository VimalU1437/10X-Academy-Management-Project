const mongoose = require("mongoose");
const app = require("./app");
require("dotenv").config();

mongoose.set("strictQuery",true);
mongoose.connect(process.env.DATABASE_URL,(err)=>{
    if(err){
        console.log(err);
    }else{
        console.log("connected toi database");
    }
});

app.listen(5000,()=>{
    console.log("server is up at 5000....");
})
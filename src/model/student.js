const mongoose = require("mongoose");


const studentSchema = mongoose.Schema({
    name:{type:String},
    classId:{type:mongoose.Types.ObjectId},
    studentId:{type:Number}
})


const studentModel = mongoose.model("student",studentSchema);


module.exports = studentModel;
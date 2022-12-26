const  mongoose = require("mongoose");

const classSchema = mongoose.Schema({
    class:{type:String},
    studentsCount:{type:Number}
})

const classModel  = mongoose.model("classes",classSchema);

module.exports = classModel;
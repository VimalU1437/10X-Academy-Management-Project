const express = require("express");
const router = express.Router();
const app = express();
const classModel = require("../model/classes")


router.route("/").post(async(req,res)=>{
    try{
        const body = req.body;
        const create = await classModel.create(body);
        // console.log(create);
        res.status(201).json({id:create._id});
        // console.log(body);
    }
    catch(e){
        res.status(500).json({
            status:"failed",
            message:e.message
        })
    }
})

.get(async(req,res)=>{
    try{
        const find = await classModel.find();
        res.json(find);
    }
    catch(e){
        res.status(500).json({
            status:"failed",
            message:e.message
        })
    }
})


// -------myClassId parames-------------


router.route("/:myClassId").get(async(req,res)=>{
    try{
        const id = req.params.myClassId;
        // console.log(id); 
        const findOne = await classModel.findOne({_id:id});
        if(findOne){
            res.json(findOne);
        }else{
            res.status(400).json({
                error:"There is no class at that id"
            })
        }

    }
    catch(e){
        res.status(500).json({
            status : "failed",
            message:e.message
        })
    }
})
.delete(async(req,res)=>{
    try{
        const id = req.params.myClassId;
        // console.log(id);
        const deleteOne = await classModel.deleteOne({_id:id});
        if(deleteOne.deletedCount > 0){
            res.sendStatus(204);
        }else{
            res.status(404).json({
                error:"There is no task at that id"
            })
        }
        

    }
    catch(e){
        res.status(500).json({
            status : "failed",
            message:e.message
        })
    }
})

// -------------------studentrouts---------------------------
const studentModel = require("../model/student");


router.route("/:myClassId/students")
.get(async(req,res)=>{
    try{
        const id = req.params.myClassId;
        const find = await studentModel.find({classId:id});
        if(find.length > 0 ){
            res.json(find);
        }else{
            res.status(404).json({
                error:"There are no students at this class"
            })
        }
    }
    catch(e){
        res.status(500).json({
            status : "failed",
            message:e.message
        })
    }

})
.post(async(req,res)=>{
    try{
        const id = req.params.myClassId;
        const length = (await studentModel.find()).length
        const create = await studentModel.create({
            name:req.body.name,
            classId: id,
            studentId:length+1
        })
        res.status(201).json({
            studentId:create.studentId,
        })



    }
    catch(e){
        res.status(500).json({
            status : "failed",
            message:e.message
        })
    }
})

router.route("/:myClassId/students/:studentId")
.get(async (req,res)=>{
    try{

        const studentId = req.params.studentId;
        const classId = req.params.myClassId;
        const findOne = await studentModel.findOne({studentId:studentId});
        if(findOne){
            res.json(findOne);
        }else{
            res.status(404).json({
                error:"There is no student of that id"
            })
        }
    }  
      catch(e){
        res.status(500).json({
            status : "failed",
            message:e.message
        })
    }
})

.put(async(req,res)=>{
    try{
        const studentId = req.params.studentId;
        const classId = req.params.myClassId;
        const updateOne = studentModel.updateOne({studentId:studentId});
        res.sendStatus(204);

    }
    catch(e){
        res.status(500).json({
            status : "failed",
            message:e.message
        })
    }
})
.delete(async(req,res)=>{
    try{
        const studentId = req.params.studentId;
        const classId = req.params.myClassId;
        const deleteOne =await studentModel.deleteOne({studentId:studentId});
        if(deleteOne.deletedCount > 0 ){
            res.sendStatus(204);
        }else{
            res.status(404).json({
                error:"There is no task at that id",
            })
        }
    }
    catch(e){
        res.status(500).json({
            status : "failed",
            message:e.message
        })
    }
})




module.exports = router;
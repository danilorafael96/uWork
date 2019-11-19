var express=require("express");
var UtilizadoresDao = require("../models/UtilizadoresDAO");
var router = express.Router();

router.get("/", function(req,res,next){
    UtilizadoresDao.getUtilizadores(function(err,result){
        if(err){
            res.status(result.code).json(err);
            return;
        }
        res.status(result.code).send(result.data);
    },next)

   // res.status(200).send({msg:"ok"});
})

module.exports=router;
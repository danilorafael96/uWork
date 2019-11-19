var express=require("express");
var UtilizadoresDao = require("../models/UtilizadoresDAO");
var router = express.Router();

router.get("/", function(res,next){
    UtilizadoresDao.getUtilizadores(function(err,result){
        if(err){
            res.status(result.code).json(err)
            return
        }
        res.status(result.code).json(result)
    },next)
})

module.exports=router;
var express = require('express');
var ServicosDao = require('../models/ServicosDAO');
var router = express.Router();

router.get('/',function(req,res,next){
    ServicosDao.getServicos(function(err,result){
        if(err){
            res.status(result.code).json(err);
            return;
        }
        res.status(result.code).send(result.data);
    },next)
})

router.get('/:servId/pts/:ptId',function(req,res,next){
    ServicosDao.getServicos(req.params.pts_id,req.params.serv_id,function(err,result){
        if(err){
            res.status(result.code).json(err);
            return;
        }
        res.status(result.code).send(result.data);
    },next)
})

module.exports=router;
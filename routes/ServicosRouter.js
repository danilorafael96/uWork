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

router.get('/servicos/:servId/pts',function(req,res,next){
    ServicosDao.getFiltroPts(req.params.servId,function(err,result){
        if(err){
            res.status(result.code).json(err);
            return;
        }
        res.status(result.code).send(result.data);
    },next)
})

module.exports=router;
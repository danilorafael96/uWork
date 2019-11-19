var express = require('express');
var ServicosDao = require('../models/ServicosDao');
var router = express.Router();



router.get('/',function(req,res,next){
    ServicosDao.getServNome(function(err,result){
        if(err){
            res.status(result.code).json(err);
            return;
        }
        res.status(result.code).send(result.data);
    },next)
});

/*router.post('/',function(req,res,next){
    ServicosDao.getSaveServ(req.body,function(err,result){
        if(err){
            res.status(result.code).json(err);
            return;
        }
        res.status(result.code).send(result);
    },next)
})*/


module.exports=router;

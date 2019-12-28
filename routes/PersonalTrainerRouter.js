var express = require('express');
var PersonalTrainerDao=  require ('../models/PersonalTrainerDAO');
var router = express.Router();

router.get('/',function(req,res,next){
    PersonalTrainerDao.getPts(function(err,result){
        if(err){
            res.status(result.code).json(err);
            return;
        }
        res.status(result.code).send(result.data);
    },next)
})

router.get('/:id',function(req,res,next){
    PersonalTrainerDao.getPt(req.params.id,function(err,result){
        if(err){
            res.status(result.code).json(err);
            return;
        }
        res.status(result.code).send(result.data);
    },next)
})

router.get('/:id/subscricoes',function(req,res,next){
    PersonalTrainerDao.getPtSubs(req.params.id,function(err,result){
        if(err){
            res.status(result.code).json(err);
            return;
        }
        res.status(result.code).send(result.data);
    },next)
})

module.exports = router;
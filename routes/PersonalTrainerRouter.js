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

module.exports = router;
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
})

router.get("/clientes", function(req,res,next){
    UtilizadoresDao.getClientes(function(err,result){
        if(err){
            res.status(result.code).json(err);
            return;
        }
        res.status(result.code).send(result.data);
    },next)
})

router.post('/clientes', function (req, res, next) {
    UtilizadoresDao.addRegistroCliente(req.body, function (status, result) {
        res.send(result);
    });
});

router.get("/personalTrainers/:id", function(req,res,next){
    UtilizadoresDao.getPts(req.params.id,function(err,result){
        if(err){
            res.status(result.code).json(err);
            return;
        }
        res.status(result.code).send(result.data);
    },next)
})

router.post('/personalTrainers', function (req, res, next) {
    UtilizadoresDao.addRegistroPT(req.body, function (status, result) {
        res.send(result);
    });
});

module.exports=router;
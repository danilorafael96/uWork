var express = require('express');
var ClienteDAO=  require ('../models/ClienteDAO');
var router = express.Router();

router.get('/', function(req, res, next) {
    ClienteDAO.getClientes(function(err,result){
        if (err) {
            res.status(result.code).json(err);
            return;
        }
        res.status(result.code).send(result.data);
    },next)
});

router.get('/:id',function(req,res,next){
    ClienteDAO.getClienteId(req.params.id,function(err,result){
        if(err){
            res.status(result.code).json(err);
            return;
        }
        res.status(result.code).send(result.data);
    },next)
})

router.post('/:id/subscricoes',function(req,res,next){
    console.log(req.body)
    ClienteDAO.addSubscricao(req.body.cliId,req.body.servPt,function(err,result){
        if(err){
            res.status(result.code).json(err);
            return;
        }
        res.status(result.code).send(result.data);
    },next)
})

router.get('/:id/subscricoes',function(req,res,next){
    console.log(req.body)
    ClienteDAO.getSubscricao(req.params.id,function(err,result){
        if(err){
            res.status(result.code).json(err);
            return;
        }
        res.status(result.code).send(result.data);
    },next)
})

module.exports = router;
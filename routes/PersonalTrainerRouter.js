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

router.get('/servicos/:servId',function(req,res,next){
    PersonalTrainerDao.getFiltroPts(req.params.servId,function(err,result){
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

router.get('/:id/servicos',function(req,res,next){
    PersonalTrainerDao.getPtServicos(req.params.id,function(err,result){
        if(err){
            res.status(result.code).json(err);
            return;
        }
        res.status(result.code).send(result.data);
    },next)
})

router.get('/:id/servicosporadicionar',function(req,res,next){
    PersonalTrainerDao.getPtServicosDiffs(req.params.id,function(err,result){
        if(err){
            res.status(result.code).json(err);
            return;
        }
        res.status(result.code).send(result.data);
    },next)
})

//////dúvida por tirar
router.post('/:id/servicos',function(req,res,next){
    console.log(req.body)
    PersonalTrainerDao.addServico(req.body.ptId,req.body.servico,function(err,result){
        if(err){
            res.status(result.code).json(err);
            return;
        }
        res.status(result.code).send(result.data);
    },next)
})

router.delete('/:id/servicos',function(req,res,next){
    console.log(req.body)
    PersonalTrainerDao.removeServico(req.body.servicoPt,function(err,result){
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


router.get('/:ptId/servicos/clientes/:cliId',function(req,res,next){
    PersonalTrainerDao.getSubsAtiva(req.params.ptId,req.params.cliId,req.params.ptId,req.params.cliId,function(err,result){
        if(err){
            res.status(result.code).json(err);
            return;
        }
        res.status(result.code).send(result.data);
    },next)
})

module.exports = router;
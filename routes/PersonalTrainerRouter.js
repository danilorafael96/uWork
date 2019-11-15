   var express = require('express');
var personal_trainerDAO=  require ('../models/PersonalTrainerDAO');
var router = express.Router();

router.get('/', function(req, res, next) {
    personal_trainerDAO.getPtsId(function(err,result){
        if (err) {
            // sending error because its for learning/debugging
            // real project would only send a general message
            res.status(result.code).json(err);
            return;
        }
        res.status(result.code).send(result.data);
    },next)
});

module.exports = router;
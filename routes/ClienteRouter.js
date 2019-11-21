var express = require('express');
var ClienteDAO=  require ('../models/ClienteDAO');
var router = express.Router();

router.get('/', function(req, res, next) {
    ClienteDAO.getClienteId(function(err,result){
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
var express = require('express');
var RegisterDAO = require('../models/RegisterDAO');
var router = express.Router();

/*router.get('/', function (req, res, next) {
    RegisterDAO.getAll(function (result) {
        res.send(result);
    });
});*/

router.post('/Register', function (req, res, next) {
    RegisterDAO.saveRegister(req.body, function (status, result) {
        if (status.code == 200)
            res.send(result);
        else {
            res.statusMessage = status.status;
            res.status(status.code).send({});
        }
    });
});

module.exports = router;
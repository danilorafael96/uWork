var express = require('express');
var RegisterDAO = require('../models/RegisterDAO');
var router = express.Router();

/*router.get('https://maps.googleapis.com/maps/api/geocode/json?', function (req, res, next) {
    RegisterDAO.Convert(function (result) {
        res.send(result);
    });
});*/

router.post('/', function (req, res, next) {
    console.log("START")
    RegisterDAO.saveRegister(req.body, function (status, result) {
        res.send(result);
    });
});



router.get('/', function (req, res, next) {
    RegisterDAO.getLatLong(function (err, result) {
        if (err) {
            // sending error because its for learning/debugging
            // real project would only send a general message
            res.status(result.code).json(err);
            return;
        }
        res.status(result.code).send(result.data);
    }, next)
});

module.exports = router;
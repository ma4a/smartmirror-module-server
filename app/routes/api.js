'use strict';

var express = require('express');
var router = express.Router();
var Module = require('./../models/modules');
var modulesController = require('./../controllers/modules');


router.route('/getModules')
    .get((req, res) => {
        modulesController.getModules()
        .then((modules) => {
            res.json(modules);
        });
});

module.exports = router;
'use strict';

var express = require('express');
var router = express.Router();
var Module = require('./../models/modules');
var modulesController = require('./../controllers/modules');


router.route('/getModules')
  .get((req, res) => {
    modulesController.getModules(req, res)
    .then((modules) => {
      res.json(modules);
    });
});

/* GET landing page. */
router.get('/', (req, res, next) => {
  res.json();
});

module.exports = router;
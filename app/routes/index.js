'use strict';

var express = require('express');
var router = express.Router();
var Module = require('./../models/modules');
var modulesController = require('./../controllers/modules');
var config = require('../../config');
var auth = require('http-auth');


/* define authentication */
var basic = auth.basic({
  realm: "Module Server",
  msg401: "Unauthorized access is denied ;)"
}, function(user, pass, callback) {
   callback(user === config.user && pass === config.pass)
});


/* ROUTES */
router.route('/list')
  .get((req, res) => {
    modulesController.getModules(req, res)
    .then((modules) => {
      res.render('module_list', {
        modules: modules,
        params: req.query
      });
    }); //.catch()
});

/* POST save new module */
router.route('/new/save')
  .post(modulesController.saveModule);

/* GET and POST insert new module and edit details */
router.route('/new')
  .get(modulesController.getModuleCreateForm)
  .post(modulesController.createModule);

/* GET delete module */
router.route('/:_id/delete')
  .get(auth.connect(basic), modulesController.deleteModuleById);

/* GET module edit page */
router.route('/:_id/edit')
  .get(auth.connect(basic), (req, res) => {
    modulesController.getModuleById(req)
    .then((module) => {
      res.render('module_update', {
        title: 'SmartMirror edit module',
        message: 'Edit your details and press save.',
        module: module
      });
    })
  });

/* POST save module edits */
router.route('/edit/save')
  .post(auth.connect(basic), modulesController.updateModule);

/* GET landing page. */
router.get('/', (req, res, next) => {

  /* Query for finding all modules */
  let query = Module.find({}).exec();

  /* Query Promise */
  query.then((modules) => {
    res.render('index', {
      title: 'SmartMirror Module Landingpage',
      modules: modules,
    });
  })
  /* Error Handling */
  .catch((err) => {
    console.error(err);
    res.send(404);
  });

});

module.exports = router;

'use strict';

var express = require('express');
var router = express.Router();
var Module = require('./../models/modules');
var modulesController = require('./../controllers/modules');

  

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


router.route('/new/save')
  .post(modulesController.saveModule);

router.route('/new')
  .get(modulesController.getModuleCreateForm)
  .post(modulesController.createModule);

router.route('/:_id/delete')
  .get(modulesController.deleteModuleById);

router.route('/:_id/edit')
  .get((req, res) => {
    modulesController.getModuleById(req)
    .then((module) => {
      res.render('module_update', {
        title: 'SmartMirror edit module',
        message: 'Edit your details and press save.',
        module: module
      });
    })
  });

router.route('/edit/save')
  .post(modulesController.updateModule);

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

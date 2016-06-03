'use strict';

var express = require('express');
var router = express.Router();
var Module = require('./../models/modules');
var modulesController = require('./../controllers/modules');

  

router.route('/list')
  .get(modulesController.getModules);

router.route('/new/save')
  .post(modulesController.saveModule);

router.route('/new')
  .get(modulesController.getModuleCreateForm)
  .post(modulesController.createModule);

router.route('/:module/delete')
  .get(modulesController.deleteModuleById);

router.route('/:id/edit')
  .get(modulesController.getModuleById)
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

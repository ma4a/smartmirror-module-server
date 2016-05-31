'use strict';

var Module = require('./../models/modules');
var https = require('https');
var fs = require('fs');
var path = require('path');

exports.getModules = function(req, res) {
	/* Query for finding all users */
  let query = Module.find({}).exec();

  /* Query Promise */
  query.then((modules) => {
      res.render('module_list', {
        modules: modules,
      });
    })
    /* Error Handling */
    .catch((err) => {
      console.error(err);
      res.send(404);
    });
};
exports.getModuleCreateForm = function(req, res) {
	res.render('backend_module_insert', {
    title: 'SmartMirror insert module',
  });
};
exports.createModule = function(req, res) {};
exports.deleteModuleById = function(req, res) {};
exports.getModuleById = function(req, res) {};
exports.updateModule = function(req, res) {};


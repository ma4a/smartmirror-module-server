'use strict';

var Module = require('./../models/modules');
var https = require('https');
var fs = require('fs');
var path = require('path');

exports.getModules = function (req, res) {
  /* Query for finding all users */
  let query = Module.find({}).lean();

  return query.exec();
};

exports.getModuleCreateForm = function (req, res) {
  res.render('module_insert', {
    title: 'SmartMirror insert new module',
  });
};

exports.createModule = function (req, res) {
  let enhancedGitUrl = req.body.git.replace("github.com", "raw.githubusercontent.com") + '/master/package.json';
  loadFileFromServer({url: enhancedGitUrl})
    .then((data) => {
      let modulePackage = JSON.parse(data);
      modulePackage.git = req.body.git;
      res.render('module_create', {
        title: 'SmartMirror create module',
        module: modulePackage
      });
    })
};

exports.saveModule = function (req, res) {
  let newModule = Module(req.body);
  let resultMessage;
  newModule.save(function (err, data) {
    if (err) {
      if (err.code === 11000) {
        resultMessage = 'Module ' + req.body.name + ' exists already!';
      } //else if(err.code == 123) {}
      else {
        resultMessage = 'Error occured on saving module!';
      }
    }
    else {
      resultMessage = 'Yeah! Module ' + req.body.name + ' saved!';

    }
    res.render('module_change', {
      title: 'Module save',
      message: resultMessage,
      module: data
    });
  });
  //.catch((err) => {
  //    console.log(err);
  //});
};

exports.deleteModuleById = function (req, res) {
  Module.findByIdAndRemove(req.params._id, function(err, data) {
    let resultMessage = 'The module is deleted!';
    res.render('module_change', {
      title: 'Module delete',
      message: resultMessage,
      module: data
    });
  });
};

exports.getModuleById = function (req, res) {
  let query = Module.findById(req.params._id).lean();

  return query.exec();
};

exports.updateModule = function (req, res) {
  console.log(req.body);
  Module.findByIdAndUpdate(req.body._id, {
    version: req.body.version,
    homepage: req.body.homepage,
    git: req.body.git,
    name: req.body.name,
    description: req.body.description,
    author: req.body.author
  },{
    new: true
  },(err, data) => {
    console.log(data);
    let resultMessage = 'Yeah! Module ' + req.body.name + ' saved!';
    res.render('module_change', {
      title: 'Module save',
      message: resultMessage,
      module: data
    });
  })
};

function loadFileFromServer(params) {

  return new Promise((resolve, reject) => {

    // Fire the get request
    const request = https.get(params.url, (response) => {

      // Handle http errors
      if (response.statusCode < 200 || response.statusCode > 299) {
        console.log('Failed to load page "' + params.url + '", status code: ' + response.statusCode);
        reject(new Error('Failed to load page: ' + response.statusCode));
      }

      // Temporary data holder
      const body = [];

      // On every content chunk, push it to the data array
      response.on('data', (chunk) => {
        body.push(chunk);
      });

      // We are done, resolve promise with those joined chunks
      response.on('end', () => {
        let data = body.join();
        resolve(data);
      });
    });

  // Handle connection errors of the request
  request.on('error', (err) => {
    console.log(err);
    reject(err);
  });
});
}
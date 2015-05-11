'use strict';

var _ = require('lodash');
var Ingred = require('./ingred.model');

// Get list of ingreds
exports.index = function(req, res) {
  Ingred.find(function (err, ingreds) {
    if(err) { return handleError(res, err); }
    return res.json(200, ingreds);
  });
};

// Get a single ingred
exports.show = function(req, res) {
  Ingred.findById(req.params.id, function (err, ingred) {
    if(err) { return handleError(res, err); }
    if(!ingred) { return res.send(404); }
    return res.json(ingred);
  });
};

// Creates a new ingred in the DB.
exports.create = function(req, res) {
  Ingred.create(req.body, function(err, ingred) {
    if(err) { return handleError(res, err); }
    return res.json(201, ingred);
  });
};

// Updates an existing ingred in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Ingred.findById(req.params.id, function (err, ingred) {
    if (err) { return handleError(res, err); }
    if(!ingred) { return res.send(404); }
    var updated = _.merge(ingred, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, ingred);
    });
  });
};

// Deletes a ingred from the DB.
exports.destroy = function(req, res) {
  Ingred.findById(req.params.id, function (err, ingred) {
    if(err) { return handleError(res, err); }
    if(!ingred) { return res.send(404); }
    ingred.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
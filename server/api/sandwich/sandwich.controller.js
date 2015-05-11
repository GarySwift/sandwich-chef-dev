'use strict';

var _ = require('lodash');
var Sandwich = require('./sandwich.model');

// Get list of sandwichs
exports.index = function(req, res) {
  Sandwich.find(function (err, sandwichs) {
    if(err) { return handleError(res, err); }
    return res.json(200, sandwichs);
  });
};

// Get a single sandwich
exports.show = function(req, res) {
  Sandwich.findById(req.params.id, function (err, sandwich) {
    if(err) { return handleError(res, err); }
    if(!sandwich) { return res.send(404); }
    return res.json(sandwich);
  });
};

// Creates a new sandwich in the DB.
exports.create = function(req, res) {
  Sandwich.create(req.body, function(err, sandwich) {
    if(err) { return handleError(res, err); }
    return res.json(201, sandwich);
  });
};

// Updates an existing sandwich in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Sandwich.findById(req.params.id, function (err, sandwich) {
    if (err) { return handleError(res, err); }
    if(!sandwich) { return res.send(404); }
    var updated = _.merge(sandwich, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, sandwich);
    });
  });
};

// Deletes a sandwich from the DB.
exports.destroy = function(req, res) {
  Sandwich.findById(req.params.id, function (err, sandwich) {
    if(err) { return handleError(res, err); }
    if(!sandwich) { return res.send(404); }
    sandwich.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
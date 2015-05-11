/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Sandwich = require('./sandwich.model');

exports.register = function(socket) {
  Sandwich.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Sandwich.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('sandwich:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('sandwich:remove', doc);
}
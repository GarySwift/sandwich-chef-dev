/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Ingred = require('./ingred.model');

exports.register = function(socket) {
  Ingred.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Ingred.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('ingred:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('ingred:remove', doc);
}
'use strict';

var express = require('express');
var controller = require('./item.controller');

var router = express.Router();

// router.get('/', controller.index);
// router.get('/:id', controller.show);
// router.post('/', controller.create);
// router.put('/:id', controller.update);
// router.put('/img-edit/:id', controller.updateWithImage);
// router.patch('/:id', controller.update);
router.delete('/:id/:type', controller.destroy);
router.get('/name/:name/:type/:category', controller.checkForDuplicateName);
router.post('/upload/image', controller.postImage);
router.post('/edit/image', controller.updateImage);
// router.post('/upload/image__', controller.postImage__);

module.exports = router;
'use strict';

// var Item = require('./item.model');
// var _ = require('lodash');
// var Item = require('./item.model');
// var Ingred = require('../ingred/ingred.model');

var _ = require('lodash'),
    formidable = require('formidable'),
    util = require('util'),
    cloudinary = require('cloudinary');

// console.log('process.env.cloudinary_cloud_name', process.env.cloudinary_cloud_name);
// console.log('process.env.cloudinary_api_key', process.env.cloudinary_api_key);

// console.log('process.env', process.env);
cloudinary.config({ 
  cloud_name: process.env.cloudinary_cloud_name,
  api_key: process.env.cloudinary_api_key,
  api_secret: process.env.cloudinary_api_secret
});

// var getModel = function (model, category) {
//   var item;
//   console.log('model', model);
//   switch(model) {
//       case "item":
//           item = require('./item.model');
//           return item;
//           break;    
//       case "ingred":
//           item = require('../ingred/ingred.model');
//           return item;    
//           break;
//       case "product":
//           item = require('../product/product.model');
//           return item;
//           break; 
//       case "sandwich":
//             item = require('../sandwich/sandwich.model');
//             return item;
//           break;                      
//       default:
//           return false;
//           break;         
//   }
// }
// Location where we want to copy the uploaded file
var image_location = 'client/assets/images/';

function createImageFilename(item) {
  return item.category + '-'+ item.name.replace(/\s+/g, '-').toLowerCase() + '.jpg';
}

//************ Custom Function *************/
// Check if an name exists - ensures no duplicate names will exist
exports.checkForDuplicateName = function(req, res) {
  console.log('req.params.type',req.params.type);
  // var item = getModel(req.params.type, req.params.category);
  var item = require('../'+ decodeURIComponent(req.params.type) +'/'+ decodeURIComponent(req.params.type) +'.model');
  if(item) {
    item.findOne({"name": decodeURIComponent(req.params.name) }, function (err, item) {
      console.log('reached server', req.params.name);
      if(err) { return handleError(res, err); }
      if(!item) { return res.send(false); }
      return res.json(item);
    });    
  }
  else {
    return handleError(res, "Model not found");
  }
 
};

exports.getSingleItem = function(req, res) {
  console.log('req.params.type',req.params.type);
  console.log('req.params.id',req.params.id);
  // var item = getModel(req.params.type, req.params.category);
  var item = require('../'+ decodeURIComponent(req.params.type) +'/'+ decodeURIComponent(req.params.type) +'.model');
  if(item) {
    // item.findOne({"id": req.params.id }, function (err, item) {
    item.findById(req.params.id, function (err, thing) {
      console.log('reached server', req.params.id);
      if(err) { return handleError(res, err); }
      if(!thing) { return res.send(false); }
      return res.json(thing);
    });    
  }
  else {
    return handleError(res, "Model not found");
  }
 
};
// Updates an existing item in the DB.
// exports.update = function(req, res) {
//   if(req.body._id) { delete req.body._id; }
//   Item.findById(req.params.id, function (err, item) {
//     if (err) { return handleError(res, err); }
//     if(!item) { return res.send(404); }
//     var updated = _.merge(item, req.body);
//     updated.save(function (err) {
//       if (err) { return handleError(res, err); }
//       return res.json(200, item);
//     });
//   });
// };

// Creates a new item in the DB.
exports.postImage = function(req, res, next) {
  var form = new formidable.IncomingForm();
  var formBody, formFiles;

  // Use formidable to parse the form
  form.parse(req, function(err, fields, files) {
    res.params =(util.inspect({fields: fields, files: files}));
    // Spilt the data up betwween files and and regular
    formBody=fields;
    formFiles=files;
  });
  // console.log('formBody',formBody);
  form
    .on('end', function(fields, files) {
      /* Temporary location of our uploaded file */
      var temp_path = this.openedFiles[0].path;
        //The file name of the uploaded file
        //var file_name = this.openedFiles[0].name;

       cloudinary.uploader.upload(temp_path, function(result) { 
        var item = require('../'+formBody.type+'/'+formBody.type+'.model');
        console.log(util.inspect(result, {showHidden: false, depth: null}));    
        formBody.imageUrl = result.url;
        formBody.imageId = result.public_id;
        
        if(formBody.type==='sandwich'){
          var data = JSON.parse(formBody.sandwich);
          formBody.bread = data.bread;
          formBody.filling = data.filling;
          formBody.salad = data.salad;
          formBody.extra = data.extra;
          console.log(util.inspect(formBody, {showHidden: false, depth: null}));  
        }

        item.create(formBody, function(err, item) {
          if(err) { 
            console.error('err',err); 
            return handleError(res, err); 
          }
          // All ok, return 201
          return res.json(201, item);
        });         
        
      });// cloudinary.uploader    
  });
};

// Deletes a item from the DB.
exports.destroy = function(req, res) {
  var item = require('../'+req.params.type+'/'+req.params.type+'.model');
  item.findById(req.params.id, function (err, item) {
    if(err) { return handleError(res, err); }
    if(!item) { return res.send(404); }
console.log('destroy');
    cloudinary.api.delete_resources([item.imageId], function(deleteResult){
      console.log(util.inspect('deleteResult', deleteResult, {showHidden: false, depth: null}));    
    });    
    item.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

// Updates an existing item in the DB
// Only used when image is being changed
// This is being requested by a POST request so we take the item id out
// of the formBody (and not the params as would be usual)
exports.updateImage = function(req, res, next) {
  var form = new formidable.IncomingForm();
  var formBody, formFiles;
  console.log('Sever updateImage');
  
  form.parse(req, function(err, fields, files) {
    res.params =(util.inspect({fields: fields, files: files}));
    formBody=fields;
    formFiles=files;
    console.log(formBody)
  });

  form
    .on('end', function(fields, files) {
      // Temporary location of our uploaded file
      var temp_path = this.openedFiles[0].path;
      
      cloudinary.uploader.upload(temp_path, function(result) { 
        var item = require('../'+formBody.type+'/'+formBody.type+'.model');
        console.log(util.inspect(result, {showHidden: false, depth: null}));    

        
        if(formBody.type==='sandwich'){
          var data = JSON.parse(formBody.sandwich);
          formBody.bread = data.bread;
          formBody.filling = data.filling;
          formBody.salad = data.salad;
          formBody.extra = data.extra;
          console.log(util.inspect(formBody, {showHidden: false, depth: null}));  
        }

          item.findById(formBody._id, function (err, item) {
            if (err) { return handleError(res, err); }
            if(!item) { return res.send(404); }

            //if the name was also changed, the old image must be deleted
            // if(item.name !== formBody.name) {

              cloudinary.api.delete_resources([item.imageId], function(deleteResult){
                console.log(util.inspect('deleteResult', deleteResult, {showHidden: false, depth: null}));    

                        formBody.imageUrl = result.url;
        formBody.imageId = result.public_id;
                   var updated = _.merge(item, formBody);
            updated.save(function (err) {
              if (err) { return handleError(res, err); }
              return res.json(200, item);
            }); 
              });
              // fse.unlink(image_location + createImageFilename(item), function (err) {
              //   if (err) throw err;
              //   console.log('successfully deleted ' +createImageFilename(item));
              // });
            // } 

            //Uodate the item in the database
         
          });        
        
      });// cloudinary.uploader 


  });
};

// Get list of items
// exports.index = function(req, res) {
//   Item.find(function (err, items) {
//     if(err) { return handleError(res, err); }
//     return res.json(200, items);
//   });
// };

// Get list of items
// exports.index = function(req, res) {
//   Item.find(function (err, items) {
//     if(err) { return handleError(res, err); }
//     return res.json(200, items);
//   });
// };

// Get a single item
// exports.show = function(req, res) {
//   Item.findById(req.params.id, function (err, item) {
//     if(err) { return handleError(res, err); }
//     if(!item) { return res.send(404); }
//     return res.json(item);
//   });
// };

// Creates a new item in the DB.
// exports.create = function(req, res) {
//   Item.create(req.body, function(err, item) {
//     if(err) { return handleError(res, err); }
//     return res.json(201, item);
//   });
// };

// Updates an existing item in the DB.
// exports.update = function(req, res) {
//   if(req.body._id) { delete req.body._id; }
//   Item.findById(req.params.id, function (err, item) {
//     if (err) { return handleError(res, err); }
//     if(!item) { return res.send(404); }
//     var updated = _.merge(item, req.body);
//     updated.save(function (err) {
//       if (err) { return handleError(res, err); }
//       return res.json(200, item);
//     });
//   });
// };

// Deletes a item from the DB.
// exports.destroy = function(req, res) {
//   Item.findById(req.params.id, function (err, item) {
//     if(err) { return handleError(res, err); }
//     if(!item) { return res.send(404); }
//     item.remove(function(err) {
//       if(err) { return handleError(res, err); }
//       return res.send(204);
//     });
//   });
// };

function handleError(res, err) {
  return res.send(500, err);
}
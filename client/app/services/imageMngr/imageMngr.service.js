'use strict';

angular.module('sandwichChefApp')
  .service('imageMngr', function () {
      this.getImageUrl = function (file, size) {



// console.log('fileSplit',fileSplit);
// console.log('uploadUrl', uploadUrl);
// console.log('uploadId', uploadId);
// console.log('thumbnailSetting', thumbnailSetting);
// console.log('uploadUrl', uploadUrl);

        // console.log('file',file);
        // return file;
        // var temp = 'http://res.cloudinary.com/gary-swift/image/upload/v1431341146/bm7q60mnf93xlo5xj0ap.png'
        if(file!==undefined){
          var fileSplit = file.split('/');
          var uploadUrl = fileSplit.splice(0, 6).join('/');
          var uploadId = fileSplit.splice(0, 8).join('/');
          var thumbnailSetting = '/c_fill,h_'+size+',w_'+size+'/';
          thumbnailSetting = encodeURI(thumbnailSetting );
          var uploadUrl = uploadUrl + thumbnailSetting + uploadId;          
          // file = '';
          return uploadUrl;
        }
        else
          return 'http://placehold.it/'+size;
       //  console.log(item.imageUrl);
      	// return "assets/images/" + item.category + '-'+ item.name.replace(/\s+/g, '-').toLowerCase() +".jpg";
      }
  });

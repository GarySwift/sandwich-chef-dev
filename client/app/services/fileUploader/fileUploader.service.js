'use strict';

// angular.module('sandwichChefApp')
//   .service('fileUploader', function () {
//     // AngularJS will instantiate a singleton by calling "new" on this function
//   });

// 'use strict';

angular.module('sandwichChefApp')
  .service('fileUploader', function () {

  this.uploadHandler = function (uploader, $scope){
    var uploaderDebugMode = false;
    /**
     * Upload Blob (cropped image) instead of file.
     * @see
     *   https://developer.mozilla.org/en-US/docs/Web/API/FormData
     *   https://github.com/nervgh/angular-file-upload/issues/208
     */
    uploader.onBeforeUploadItem = function(item) {
      // console.log('$scope.sandwich.getModelForServer()',$scope.sandwich.getModelForServer());
      // If the user is submitting an edit that changes the image
      // POST to: item.controller -> exports.postImage()
      if($scope.uploadingEdit){
        item.url = 'api/items/edit/image';
        item.formData = [{
                          '_id'         : $scope.item._id, 
                          'name'        : $scope.item.name, 
                          'notes'       : $scope.item.notes ? $scope.item.notes : '',
                          'category'    : $scope.initialData.category ? $scope.initialData.category : $scope.initialData.category,
                          'subCategory' : $scope.subCategory ? $scope.subCategory : $scope.item.subCategory,
                          'price'       : $scope.item.price ? $scope.item.price : 0,
                          'inStock'     : $scope.stockSwitch.inStock ? true : false,
                          'type'        : $scope.type
                        }]; 
        $scope.uploadingEdit = false;       
      }
      // Else the user is submittimg a new item
      // POST to: item.controller -> exports.updateImage()
      else {
        item.url = 'api/items/upload/image';
        item.formData = [{
                          'name'        : $scope.item.name,
                          'notes'       : $scope.item.notes ? $scope.item.notes : '',
                          'category'    : $scope.initialData.category ? $scope.initialData.category : $scope.initialData.category,
                          'subCategory' : $scope.subCategory ? $scope.subCategory : $scope.item.subCategory,
                          'price'       : $scope.item.price ? $scope.item.price : 0,
                          'inStock'     : $scope.stockSwitch.inStock ? true : false,
                          'type'        : $scope.initialData.type,
                          'category'    : $scope.initialData.category,
                          'sandwich'    : $scope.sandwich.getModelForServer($scope.initialData.category)
                        }];        
      }

      var blob = dataURItoBlob(item.croppedImage);
      item._file = blob;
      console.log('onBeforeUploadItem');
      $scope.uploadInProgress=true;
    };
   
    /**
     * Converts data uri to Blob. Necessary for uploading.
     * @see
     *   http://stackoverflow.com/questions/4998908/convert-data-uri-to-file-then-append-to-formdata
     * @param  {String} dataURI
     * @return {Blob}
     */
    var dataURItoBlob = function(dataURI) {
      var binary = atob(dataURI.split(',')[1]);
      var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
      var array = [];
      for(var i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i));
      }
      return new Blob([new Uint8Array(array)], {type: mimeString});
    };
    
    // FILTERS
    uploader.filters.push({
        name: 'imageFilter',
        fn: function(item /*{File|FileLikeObject}*/, options) {
            var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
            return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
        }
    });

    // CALLBACKS
    /**
     * Show preview with cropping
     */
    uploader.onAfterAddingFile = function(item) {
      item.croppedImage = '';
      var reader = new FileReader();
      reader.onload = function(event) {
        $scope.$apply(function(){
          item.image = event.target.result;
        });
      };
      reader.readAsDataURL(item._file);
      console.log('onAfterAddingFile');      
    };

    uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
    if(uploaderDebugMode)
      console.info('onWhenAddingFileFailed', item, filter, options);
    };
    uploader.onAfterAddingAll = function(addedFileItems) {
      $scope.imageIsSelected = true;
    if(uploaderDebugMode)
      console.info('onAfterAddingAll', addedFileItems);
    };
    uploader.onProgressItem = function(fileItem, progress) {
    if(uploaderDebugMode)
      console.info('onProgressItem', fileItem, progress);
    };
    uploader.onProgressAll = function(progress) {
    if(uploaderDebugMode)
      console.info('onProgressAll', progress);
    };
    uploader.onSuccessItem = function(fileItem, response, status, headers) {
    if(uploaderDebugMode)
      console.info('onSuccessItem', fileItem, response, status, headers);
    };
    uploader.onErrorItem = function(fileItem, response, status, headers) {
    if(uploaderDebugMode)
      console.info('onErrorItem', fileItem, response, status, headers);
    };
    uploader.onCancelItem = function(fileItem, response, status, headers) {
    if(uploaderDebugMode)
      console.info('onCancelItem', fileItem, response, status, headers);
    };
    uploader.onCompleteItem = function(fileItem, response, status, headers) {
    if(uploaderDebugMode)
      console.info('onCompleteItem', fileItem, response, status, headers);
    };
    uploader.onCompleteAll = function() {
      if(uploaderDebugMode)
        console.info('onCompleteAll');
      $scope.deselect();
    };
    if(uploaderDebugMode) { console.info('uploader', uploader); }
  }
});

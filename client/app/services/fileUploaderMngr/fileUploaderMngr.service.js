'use strict';

angular.module('sandwichChefApp')
  .service('fileUploaderMngr', function (errorReport, msgReport) {

  this.uploadHandler = function (uploader, $scope){
    var uploaderDebugMode = true;
	// Declare File Uploader
	

    /**
     * Upload Blob (cropped image) instead of file.
     * @see
     *   https://developer.mozilla.org/en-US/docs/Web/API/FormData
     *   https://github.com/nervgh/angular-file-upload/issues/208
     */
    uploader.onBeforeUploadItem = function(item) {
      console.log('$scope.item.notes', $scope.item.notes);
      console.log('item', item);
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
    	console.log('response.name', response.name);
    	console.log('response.category', response.category);
    	console.log('response.imageUrl', response.imageUrl);
    	console.log('response.imageId', response.imageId);
      if(response._id===undefined){
    //     { type: 'danger', msg: 'Oh snap! Change a few things up and try submitting again.' },
    // { type: 'success', msg: 'Well done! You successfully read this important alert message.' }

        var msg = 'onCompleteItem - Oh snap! We had some trouble saving this item. We recommend you try to submit it again.';
        $scope.addError(msg);
        errorReport.setError(msg); 
        // return false
      }      
    	else if(response.imageUrl===undefined){
        var msg = 'onCompleteItem - Oh snap! We had some trouble saving the image. You can fix this issue by selecting edit on the itme and adding another image.';
    		$scope.addError(msg);
        errorReport.setError(msg); 
        // $rootScope.error = msg;
        // errorReport.setError(msg); 
        $scope.addError({ 'type': 'danger', 'msg': msg});
    	}

	    if(uploaderDebugMode){
	      console.info('onCompleteItem', fileItem, response, status, headers);
      }
      $scope.item = response;
      $scope.deselect();
      // msgReport.setMsg('onCompleteItem - Well done! You successfully saved this item.');
    };
    uploader.onCompleteAll = function() {
      if(uploaderDebugMode)
        console.info('onCompleteAll');
     
      
    };
    uploader.onComplete = function(response, status, headers) {
    	console.log('response', response);
    	console.log(JSON.stringify(response));
    };    
    if(uploaderDebugMode) { console.info('uploader', uploader); }
  }
  });

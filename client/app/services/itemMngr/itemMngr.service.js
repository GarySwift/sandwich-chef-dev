'use strict';

// angular.module('sandwichChefApp')
//   .service('itemMngr', function () {

//   });
// 'use strict';

angular.module('sandwichChefApp')
  .service('itemMngr', function ($http, socket) {

  this.getItems = function ($scope, item) {
    $http.get('/api/'+item+'s').success(function(res) { //*************** gets all ingreds
      $scope.items = res;
// console.log(res);  
// console.log(JSON.stringify($scope.items));    
      socket.syncUpdates(item, $scope.items);
    });
  }

  this.checkForDupName = function($scope, serverLocation, thing) {
    console.log('1 checkForDupName');
    if ($scope.itemForm.name !== undefined ) {
      console.log('2 checkForDupName');
      if ($scope.itemForm.name.$valid && $scope.item.name !== $scope.itemForm.name) {
        console.log('3 checkForDupName');
        console.log('serverLocation',serverLocation);
        console.log('$scope.itemForm.name.$viewValue',$scope.itemForm.name.$viewValue);
        console.log('thing',thing);
        //send a get request to the server using the user input name
        $http.get('api/items/name/'+ $scope.itemForm.name.$viewValue+'/'+thing+'/'+$scope.category).success(function(res) {
          console.log('res', res);
          console.log('4 checkForDupName');
          if( res.name === $scope.itemForm.name.$viewValue) {
            console.log('5 checkForDupName');
              //inform user that the name already exists
              $scope.dupName=true;
              $scope.settings.dupName=true;
              $scope.itemForm.name.$valid = false;
              $scope.itemForm.$valid = false;
              console.log('Duplicate name detected in DB.');
          }
        });  
      }
    }
  };
  
  this.prepareUpdate = function($scope, itemID, serverLocation) { 
    console.log('itemMngr ... prepareUpdate', itemID);
    
    // Get a single item from the DB
    $http.get(serverLocation +'/'+ itemID)
    .success(function(item) {
      //Convert string to number to avoid vvalidation error on input type number
      item.price = parseFloat(item.price);  
      //Set the stock switch based on item.inStock value
      if(!item.inStock) { $scope.stockSwitch.inStock='false'; }
      // Assign that new object to $scope.<item>
      $scope.item = item;
      // This reveals the an input box where the user can edit an item
      $scope.updating=true
      //  $scope.itemForm.name.$pristine = false;
      // this.itemForm.name.$pristine
      $scope.updatingActive=true;
      // (Adding new items is temporarily disabled)
      // A user must use the update button to push the changes        
      // $scope.isCollapsed = false;
    });  
  };

  this.updateWithoutImage = function($scope, serverLocation, syncUpdatesID, item) {
    $http.put(serverLocation +'/'+ item._id, item).success(function(response) {
      socket.syncUpdates(syncUpdatesID, $scope.items );
      $scope.deselect();
    });
  }
  this.updateWithImage = function ($scope, uploader) {
    $scope.uploadingEdit = true;
    uploader.uploadAll();
  } 
  this.resetImage = function (uploader) {
    console.log('itemMngr ... resetImage');
    uploader.clearQueue();
    document.getElementById("form-image").value = "";    
  }

  this.delete = function (item, serverLocation) {
        console.log('deleteItemNew', item);
     $http.delete(serverLocation+'/'+ item._id);
  }
  this.deselect = function ($scope) {
    $scope.updating = false;
    $scope.item = "";               // non-generic
    $scope.itemForm.$setPristine(); // non-generic
    $scope.resetImage();            // Uploader callback function
    $scope.updatingActive=false;
    $scope.uploadInProgress=false;
    if($scope.formDebugMode)
      console.log('deselect');    
  }
});

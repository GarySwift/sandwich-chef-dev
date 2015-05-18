'use strict';

// angular.module('sandwichChefApp')
//   .service('itemMngr', function () {

//   });
// 'use strict';

angular.module('sandwichChefApp')
  .service('itemMngr', function ($http, socket, $location) {
    this.serverLocation;

  this.getItems = function ($scope, item) {
    // if(item==='sandwich') item='sandwiche';
    $http.get(this.serverLocation).success(function(res) { //*************** gets all item based on type
      $scope.items = res;
// console.log(res);  
// console.log(JSON.stringify($scope.items));    
      socket.syncUpdates(item, $scope.items);
    });
  }

  this.checkForDupName = function($scope) {
    // console.log('1 checkForDupName');
    if ($scope.itemForm.name !== undefined ) {
      // console.log('2 checkForDupName');
      if ($scope.itemForm.name.$valid && $scope.item.name !== $scope.itemForm.name) {
        // console.log('3 checkForDupName');
        // console.log('serverLocation',serverLocation);
        // console.log('$scope.itemForm.name.$viewValue',$scope.itemForm.name.$viewValue);
        // console.log('item',item);
        //send a get request to the server using the user input name
        $http.get('api/items/name/'+ $scope.itemForm.name.$viewValue+'/'+$scope.type+'/'+$scope.category).success(function(res) {
          console.log('res', res);
          // console.log('4 checkForDupName');
          if( res.name === $scope.itemForm.name.$viewValue) {
            // console.log('5 checkForDupName');
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
  
  this.prepareUpdate = function($scope, itemID) { 
    console.log('itemMngr ... prepareUpdate', itemID);
    
    // Get a single item from the DB
    $http.get(this.serverLocation +'/'+ itemID)
    .success(function(item) {
      //Convert string to number to avoid vvalidation error on input type number
      item.price = parseFloat(item.price);  
      //Set the stock switch based on item.inStock value
      if(!item.inStock) { $scope.stockSwitch.inStock='false'; }
      // Assign that new object to $scope.<item>
      $scope.item = item;
      console.log('$scope.item', $scope.item);
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

  this.updateWithoutImage = function($scope, item) {
    $http.put(this.serverLocation +'/'+ item._id, item).success(function(response) {
      socket.syncUpdates($scope.type, $scope.items );
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

  //Deleting for everything is handled in item.controller.js
  this.delete = function (item, type) {
    console.log('deleteItemNew', item);
    $http.delete('api/items/'+ item._id+'/'+type);
     // $http.delete(this.serverLocation+'/'+ item._id);
  }
  this.deselect = function ($scope) {
    var category = $scope.item.category;
  var type = $scope.type;
    var id = $scope.item._id;
    $scope.updating = false;
    $scope.item = "";
    $scope.itemForm.$setPristine(); 
    $scope.resetImage();          
    $scope.updatingActive=false;
    $scope.uploadInProgress=false;
    $location.path('/item/'+type+'/'+id);
    if($scope.formDebugMode){
      console.log('deselect');  
    }
  }
});

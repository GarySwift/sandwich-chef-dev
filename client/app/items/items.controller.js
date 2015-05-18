'use strict';

// angular.module('sandwichChefApp')
//   .controller('ItemsCtrl', function ($scope, initialData) {
//   $scope.initialData = initialData;
//   $scope.message = 'ItemsCtrl';
//   $scope.category = $scope.initialData.category;
//   $scope.title = $scope.initialData.subCategory ? $scope.initialData.subCategory : $scope.category;
//   $scope.subCategory = $scope.initialData.subCategory;
// });

'use strict';
angular.module('sandwichChefApp').controller('AlertDemoCtrl', function ($scope) {

});




angular.module('sandwichChefApp')
  .controller('ItemsCtrl', ['$scope', '$http', 'socket', 'Auth', 'FileUploader', 'imageMngr', 'categoryList', 'itemMngr', 'stockSwitch', 'fileUploaderMngr', 'defaultFormSettings', 'initialData', 'sandwich', 'errorReport', 'msgReport',
                   function ($scope, $http, socket, Auth, FileUploader, imageMngr, categoryList, itemMngr, stockSwitch, fileUploaderMngr, defaultFormSettings, initialData, sandwich, errorReport, msgReport, $location) {    
 
    // $scope.isLoggedIn = Auth.isLoggedIn;
    // $scope.isAdmin = Auth.isAdmin;
    // $scope.getCurrentUser = Auth.getCurrentUser;
      
    $scope.initialData = initialData;
  // console.log('  $scope.initialData ',  $scope.initialData );
  // console.log('$scope.initialData.category',$scope.initialData.category);
  $scope.message = 'ItemsCtrl';

  $scope.sandwich = sandwich;

$scope.dynamicPopover = {
    content: 'Hello, World!',
    templateUrl: 'myPopoverTemplate.html',
    title: 'Title'
  };
$scope.regex = true;

$scope.formCollapsed=false;
  // $scope.isCollapsed = false;
  $scope.alerts = [
    // { type: 'danger', msg: 'Oh snap! Change a few things up and try submitting again.' },
    // { type: 'success', msg: 'Well done! You successfully read this important alert message.' }
  ];
  $scope.addError = function(msg) {
    $scope.alerts.push({type: 'danger', 'msg': msg});
  };
  $scope.addAlert = function() {
    $scope.alerts.push({msg: 'Another alert!'});
  };

  $scope.closeAlert = function(index) {
    $scope.alerts.splice(index, 1);
  };


$scope.testing = function () {
console.log("testing...")  ;
}
$scope.uploadInProgress = false;
  //Server Parameters
  var type = $scope.type =  $scope.initialData.type;// LynchPin
  // var serverLocation =  $scope.initialData.serverLocation ? $scope.initialData.serverLocation : '/api/'+type+'s';
  var syncUpdatesID = type;         
  $scope.uploadUrl = 'api/items/upload/image'; // All uploads with images go to the same function

  // $scope.message = initialData.someMethod();
  // console.log('ItemsCtrl - $scope.message', $scope.message);
    // $scope.greeting = initialData.greeting;

  // Declare services
  $scope.itemMngr = itemMngr;
  $scope.stockSwitch = stockSwitch;
  $scope.fileUploaderMngr = fileUploaderMngr;///////////////////
  $scope.defaultFormSettings =defaultFormSettings
 
  // User authentication
  $scope.isLoggedIn = Auth.isLoggedIn;
  $scope.isAdmin = Auth.isAdmin;
  $scope.getCurrentUser = Auth.getCurrentUser;

  // Set default settings
  $scope.defaultFormSettings.setDefaults($scope);

  //init itemMnger
  itemMngr.serverLocation = $scope.initialData.serverLocation ? $scope.initialData.serverLocation : '/api/'+type+'s';
  itemMngr.syncUpdatesID = $scope.initialData.type;
  // itemMngr.type = $scope.initialData.type;
  //Set items in $scope
  $scope.itemMngr.getItems($scope, type);




$scope.category = $scope.initialData.category;
$scope.subCategory = $scope.initialData.subCategory;
$scope.title = $scope.initialData.subCategory ? $scope.initialData.subCategory : $scope.category;
$scope.showPriceInput = $scope.initialData.price!==undefined ? $scope.initialData.price : true;
$scope.showNotesInput = $scope.initialData.notes!==undefined ? $scope.initialData.notes : true;

// $scope.item='';
if($scope.initialData.chef!==undefined && $scope.initialData.chef){
  $scope.item =  $scope.sandwich.getItem();
  $scope.isCollapsed = true;
  $scope.formCollapsed=true;

   $scope.$watch(function () { return $scope.sandwich.toString(); }, function (newValue, oldValue) {
        if (newValue !== oldValue) {
           // $scope.regex = newValue;

          if($scope.item!==undefined){
                 $scope.item.notes = newValue;
          console.log('toString newValue', newValue);
          document.getElementById('notes').value=newValue;
          // document.getElementById('name').value=$scope.sandwich.getName();     
          }

        }
    });

    $scope.$watch(function () { return $scope.sandwich.getReadyToSave(); }, function (newValue, oldValue) {
  // $scope.formCollapsed=newValue;
        if (newValue !== oldValue) {
          // $scope.item.notes = newValue;
          console.log('getReadyToSave newValue', newValue);

          console.log('1 $scope.formCollapsed', $scope.formCollapsed);
           // $scope.formCollapsed=newValue;
           $scope.formCollapsed=!$scope.formCollapsed;
           console.log('2 $scope.formCollapsed', $scope.formCollapsed);
        }
    });

}
// $scope.item.name = 'Gary'
// $scope.uploader = new FileUploader();
// $scope.itemForm.name="Test";

// $scope.test.that = 'Help';
$scope.testing = function () {
  console.log('testing');
  // $scope.item.name =  $scope.sandwich.getName();
  console.log('$scope.item', $scope.item);
}
  // Declare File Uploader
  var uploader = $scope.uploader = new FileUploader();
  // ...And init the service that handles uploader
  fileUploaderMngr.uploadHandler(uploader, $scope);//********************************

  // Check for duplicate iwth name.on-blur
  $scope.checkForDupName = function() {   // non-generic
    itemMngr.checkForDupName($scope);
  };




  // Get a new object back from the server using the scope item id.
  $scope.prepareUpdate = function(itemID) {
    itemMngr.prepareUpdate($scope, itemID);       
  }
  $scope.getImageUrl = function(item, size) {
    return imageMngr.getImageUrl(item, size);
  }      
  $scope.deleteItem = function(item) {
    itemMngr.delete(item, $scope.type);
  };
  $scope.resetImage = function () {
    itemMngr.resetImage(uploader);
  }
  $scope.deselect = function(item) {
    itemMngr.deselect($scope);
    if($scope.category ==='sandwich'){
      $scope.sandwich.deselect();

    }    
  }
  //setCategory is used in sandwich chef loop to show ingredients
  $scope.setCategory = function(category) {
    $scope.category = category;
  }
  // Update an existing item in the DB.
  $scope.update = function(item) {
    // Simple update without effecting image
    if(!uploader.getNotUploadedItems().length)
      itemMngr.updateWithoutImage($scope, item);
    // Else image will also be changed or renamed
    else 
      itemMngr.updateWithImage($scope, uploader);
  };        
}]);

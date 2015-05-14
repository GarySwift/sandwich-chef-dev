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
  .controller('ItemsCtrl', ['$scope', '$http', 'socket', 'Auth', 'FileUploader', 'imageMngr', 'categoryList', 'itemMngr', 'stockSwitch', 'fileUploaderMngr', 'defaultFormSettings', 'initialData', 'sandwich',
                   function ($scope, $http, socket, Auth, FileUploader, imageMngr, categoryList, itemMngr, stockSwitch, fileUploaderMngr, defaultFormSettings, initialData, sandwich) {    
 
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
if($scope.category ==='sandwich'){
  $scope.item =  $scope.sandwich.getItem();
  $scope.isCollapsed = true;
  $scope.formCollapsed=true;
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
    //$scope.item.notes = $scope.sandwich.toString();//$scope.item.name;
    console.log('$scope.sandwich', $scope.sandwich);
    console.log(' $scope.sandwich.getName()',  $scope.sandwich.getName());

    console.log('$scope.isAdmin', $scope.isAdmin);
  };

 $scope.$watch(function () { return $scope.sandwich.toString(); }, function (newValue, oldValue) {
        if (newValue !== oldValue) {
           // $scope.regex = newValue;
          // $scope.item.notes = newValue;
          console.log('toString newValue', newValue);
          document.getElementById('notes').value=newValue;
          // document.getElementById('name').value=$scope.sandwich.getName();
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

  // $scope.item.notes = $scope.sandwich.toString();
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
  $scope.deselect = function() {
    itemMngr.deselect($scope);
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
//// ******************************* Sandwicch
// function sandwich() {
//     this.name = "";
//     this.bread = [];
//     this.salad = [];
//     this.filling = [];
//     this.coldCut = [];
//     this.hotMeat = [];
//     this.seaFood = [];
//     this.allIngred = [];
//     this.extra = [];
// }
// sandwich.prototype.getModelForServer = function(category) {
// 	// console.log('scope', scope);
//     var getIds = function(array) {
//         var ids = [];
//         for (var i = 0; i < array.length; i++) {
//             ids.push(array[i]._id);
//         };
//         return ids;
//     }
//     if(category==='sandwich'){
// 	    return JSON.stringify({
// 	  //       'name': scope.item.name,
// 	  //       'notes'		  	: scope.item.notes!=='' ? scope.item.notes : this.toString(),
// 			// 'category'    	: scope.initialData.category,
// 			// 'subCategory' 	: scope.subCategory ? scope.subCategory : scope.item.subCategory,
// 			// 'price'       	: scope.item.price ? scope.item.price : 0,
// 			// 'inStock'     	: scope.stockSwitch.inStock ? true : false,
// 			'type'        	: 'sandwich',
// 			'category'    	: 'sandwich',	      
// 	        'bread'			: this.salad[0]._id,
// 	        'salad'			: getIds(this.salad),
// 	        'filling'		: getIds(this.filling),
// 	        'extra'			: getIds(this.extra)
// 	    })
// 	}
// 	return false;
// }
// sandwich.prototype.getBreadID = function(scope) {
//     if (scope.initialData.category === 'sandwich') return this.bread[0]._id;
// }
// sandwich.prototype.toString = function() {
//     var all = this.bread.concat(this.filling).concat(this.salad).concat(this.extra);
//     var getNames = function(array) {
//         var notes = '';
//         for (var i = 0; i < array.length; i++) {
//             if (i === 0) notes = notes + array[i].name;
//             else if (i > 0 && i < array.length - 1) notes = notes + ', ' + array[i].name;
//             else if (i === array.length - 1) notes = notes + ' & ' + array[i].name;
//         };
//         return notes;
//     }
//     var string = getNames(all);
//     // console.log(string);
//     return string;
// }
// sandwich.prototype.addItem = function(item) {
//     switch (item.category) {
//         case 'bread':
//             this.bread[0] = item;
//             // console.log('this.bread',this.bread[0].name );
//             //  console.log('this.bread', this.bread)
//             break;
//         case 'salad':
//             for (var i = 0; i < this.salad.length; i++) {
//                 if (this.salad[i]._id === item._id) {
//                     //Unselect item
//                     this.salad.splice(i, 1);
//                     return "You have already selected me!"
//                 }
//             }
//             this.salad.push(item);
//             break;
//         case 'cold-cut':
//             for (var i = 0; i < this.coldCut.length; i++) {
//                 if (this.coldCut[i]._id === item._id) {
//                     //Unselect item
//                     this.coldCut.splice(i, 1);
//                     return "You have already selected me!"
//                 }
//             }
//             this.hotMeat.length = 0;
//             this.seaFood.length = 0;
//             this.coldCut.push(item);
//             this.filling = this.coldCut;
//             break;
//         case 'hot-meat':
//             this.coldCut.length = 0;
//             this.seaFood.length = 0;
//             this.hotMeat[0] = item;
//             this.filling = this.hotMeat;
//             // this.hotMeat.push(item);  
//             break;
//         case 'seafood':
//             this.coldCut.length = 0;
//             this.hotMeat.length = 0;
//             this.seaFood[0] = item;
//             this.filling = this.seaFood;
//             // this.seaFood.push(item); 
//             break;
//         case 'extra':
//             for (var i = 0; i < this.extra.length; i++) {
//                 if (this.extra[i]._id === item._id) {
//                     //Unselect item
//                     this.extra.splice(i, 1);
//                     return "You have already selected me!"
//                 }
//             }
//             this.extra.push(item);
//             break;
//     }
// }
// sandwich.prototype.ifBread = function() {
//     if (this.bread.length > 0) return true;
// }
// sandwich.prototype.ifSalad = function() {
//     if (this.salad.length > 0) return true;
// }
// sandwich.prototype.ifColdCut = function() {
//     if (this.coldCut.length > 0) return true;
// }
// sandwich.prototype.ifFilling = function() {
//     if (this.coldCut.length > 0 || (this.hotMeat.length > 0)) return true;
// }
// sandwich.prototype.getIngred = function(item) {
//     return this.bread.concat(this.filling).concat(this.salad).concat(this.extra);
// }
// sandwich.prototype.getCategory = function(category) {
//     switch (category) {
//         case "bread":
//             return this.bread;
//             break;
//         case "cold-cut":
//             return this.coldCut;
//             break;
//         case "hot-meat":
//             return this.hotMeat;
//             break;
//         case "seafood":
//             return this.seaFood;
//             break;
//         case "salad":
//             return this.salad;
//             break;
//         case "extra":
//             return this.extra;
//             break;
//         case "filling":
//             return this.filling;
//             break;
//     }
// }
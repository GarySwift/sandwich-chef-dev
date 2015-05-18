'use strict';

// angular.module('sandwichChefApp')
//   .controller('ItemCtrl', function ($scope) {
//     $scope.message = 'Hello';
//   });

angular.module('sandwichChefApp')
  .controller('ItemCtrl', ['$scope', '$http','$routeParams', 'imageMngr', 'errorReport', 'msgReport', function($scope, $http, $routeParams, imageMngr, errorReport, msgReport) {
  // $http.get('js/data.json').success(function(data) {
    // $scope.artists = data;
    $scope.id = $routeParams.id;
    $scope.type = $routeParams.type;
    $scope.errors = errorReport;
    console.log('$scope.errors', $scope.errors);
    console.log('$scope.type ', $scope.type );
    console.log('$scope.id', $scope.id);

    // if ($scope.itemForm.name !== undefined ) {
      // console.log('2 checkForDupName');
      // if ($scope.itemForm.name.$valid && $scope.item.name !== $scope.itemForm.name) {
        // console.log('3 checkForDupName');
        // console.log('serverLocation',serverLocation);
        // console.log('$scope.itemForm.name.$viewValue',$scope.itemForm.name.$viewValue);
        // console.log('item',item);
        //send a get request to the server using the user input name
        $http.get('api/items/single/'+$scope.type+'/'+$scope.id).success(function(res) {
          console.log('res', res);
          $scope.item = res;
          // console.log('4 checkForDupName');
          // if( res.name === $scope.itemForm.name.$viewValue) {
            // console.log('5 checkForDupName');
              //inform user that the name already exists
              // $scope.dupName=true;
              // $scope.settings.dupName=true;
              // $scope.itemForm.name.$valid = false;
              // $scope.itemForm.$valid = false;
              // console.log('Duplicate name detected in DB.');
          // }
        });  
      // }
    // }
$scope.getImageUrl = function(item, size) {
    return imageMngr.getImageUrl(item, size);
  } 


  $scope.alerts = [
    // { type: 'danger', msg: 'Oh snap! Change a few things up and try submitting again.' },
    // { type: 'success', msg: 'Well done! You successfully read this important alert message.' }
  ];
  $scope.addError = function(msg) {
    $scope.alerts.push({'type': 'danger', 'msg': msg});
  };
  $scope.addAlert = function(msg) {
    $scope.alerts.push({'msg': msg});
  };

  $scope.closeAlert = function(index) {
    $scope.alerts.splice(index, 1);
  };
console.log('$scope.errors.getErrors', $scope.errors.getErrors());
  for (var i = 0; i < $scope.errors.getErrors().length; i++) {
    $scope.addError($scope.errors.getErrors()[i]);
    console.log('$scope.errors.getErrors[i]', $scope.errors.getErrors[i]);
  };

  for (var i = 0; i < msgReport.getMsgs().length; i++) {
    $scope.addAlert(msgReport.getMsgs()[i]);
    console.log('msgReport.getMsgs()[i]', msgReport.getMsgs()[i]);
  };
  // if($rootScope.error!==undefined) {
  //     $scope.addError($rootScope.error);
  //     console.log('$rootScope.error', $rootScope.error);
  //     $rootScope.error='';
  // }
    // if ($routeParams.itemId > 0) {
    //   $scope.prevItem = Number($routeParams.itemId)-1;
    // } else {
    //   $scope.prevItem = $scope.artists.length-1;
    // }

    // if ($routeParams.itemId < $scope.artists.length-1) {
    //   $scope.nextItem = Number($routeParams.itemId)+1;
    // } else {
    //   $scope.nextItem = 0;
    // }

  // });
}]);
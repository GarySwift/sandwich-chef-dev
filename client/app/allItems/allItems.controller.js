'use strict';

angular.module('sandwichChefApp')
  .controller('AllItemsCtrl', function ($scope, categoryList) {
    $scope.message = 'Hello';


    $scope.categoryList  = categoryList;// Gets the categories to to loop over (bread, fillind, salad etc)
    $scope.fillingList   = categoryList.getFilling();// Nested loop for filling (cold-cut, hot-meat, seafood)
    $scope.sandwichList  = categoryList.getListWithoutFilling();
    $scope.allIngred = categoryList.getList();
    console.log('$scope.sandwichList', $scope.sandwichList);
    console.log('$scope.allIngred ', $scope.allIngred );

     $scope.setCategory = function(category) {
      $scope.category = category;
    }

  });

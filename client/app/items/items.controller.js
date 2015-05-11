'use strict';

angular.module('sandwichChefApp')
  .controller('ItemsCtrl', function ($scope, initialData) {
  $scope.initialData = initialData;
  // console.log('  $scope.initialData ',  $scope.initialData );
  // console.log('$scope.initialData.category',$scope.initialData.category);
  $scope.message = 'ItemsCtrl';
  $scope.category = $scope.initialData.category;
  $scope.title = $scope.initialData.subCategory ? $scope.initialData.subCategory : $scope.category;
  $scope.subCategory = $scope.initialData.subCategory;

});


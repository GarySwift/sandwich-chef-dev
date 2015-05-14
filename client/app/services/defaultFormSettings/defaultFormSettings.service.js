'use strict';

angular.module('sandwichChefApp')
  .service('defaultFormSettings', function () {
    this.setDefaults = function ($scope) {
      //Helper settings
      $scope.msg = 'ItemsCtrl';
      $scope.items = [];
      $scope.dupName=false;
      $scope.updating = false;
      $scope.isCollapsed = true;
      $scope.updatingActive=false;
      $scope.formDebugMode = true;
      // $scope.showPriceInput = true;
      $scope.uploadingEdit = false;
      $scope.imageIsSelected = false;
      $scope.uploaderDebugMode = false;      
    }
  });

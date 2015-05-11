'use strict';

angular.module('sandwichChefApp')
  .directive('itemForm', function () {
    return {
      templateUrl: 'app/directives/itemForm/itemForm.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });
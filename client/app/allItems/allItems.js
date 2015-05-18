'use strict';

angular.module('sandwichChefApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('all-items', {
        templateUrl: 'app/allItems/allItems.html',
        controller: 'AllItemsCtrl'
      });
  });

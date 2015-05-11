'use strict';

angular.module('sandwichChefApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth) {
    $scope.menu = [
      {
      'title': 'Home',
      'link': '/'
    }, {
    //   'title': 'products',
    //   'link': '/products'
    // }, {
    //   'title': 'ingreds',
    //   'link': '/ingreds'
    // }, {
      'title': 'Sandwiches',
      'link': '/sandwiches'
    }
    ];

    $scope.productMenu = [
    { 
      'title': 'Crisps',
      'link': '/snacks/crisps'
    }, {
      'title': 'Bars',
      'link': '/snacks/bars'
    }   
    ];
    $scope.adminMenu = [
    { 
      'title': 'Cold Cuts',
      'link': '/ingred/cold-cuts'
    }, { 
      'title': 'Salad',
      'link': '/ingred/salad'
    }, { 
      'title': 'Bread',
      'link': '/ingred/bread'
    }, { 
      'title': 'Hot Meats',
      'link': '/ingred/hot-meat'
    }, { 
      'title': 'Seafood',
      'link': '/ingred/seafood'
    }, { 
      'title': 'Extras',
      'link': '/ingred/extra'
    }];

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.logout = function() {
      Auth.logout();
      $location.path('/login');
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });
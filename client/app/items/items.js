'use strict';

angular.module('sandwichChefApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/items', {
        templateUrl: 'app/items/items.html',
        controller: 'ItemsCtrl'
      })
      .when('/products', {
        templateUrl: 'app/items/items.html',
        controller: 'ItemsCtrl',
        // authenticate: true,
        resolve: {
          initialData: function(){
        	return {'type':'product',
        			'category':'snacks',
        			'subCategory':'crisps'};
          }
        } 
      })
      .when('/snacks/crisps', {
        templateUrl: 'app/items/items.html',
        controller: 'ItemsCtrl'
        ,resolve: {
        	initialData: function(){
            	return {'type':'product',
            			'category':'snacks',
            			'subCategory':'crisps'};
	        }
	    }
      })
      .when('/snacks/bars', {
        templateUrl: 'app/items/items.html',
        controller: 'ItemsCtrl'
        ,resolve: {
        	initialData: function(){
            	return {'type':'product',
            			'category':'snacks',
            			'subCategory':'bars'};
	        }
	    }
      })      
	  // .when('/ingreds', {
   //      templateUrl: 'app/items/items.html',
   //      controller: 'ItemsCtrl',
   //      // authenticate: true,
   //      resolve: {
   //        initialData: function(){
   //            return {'type':'ingred',
   //                    'category':'hot-meat'};
   //        }
   //      } 
   //    }) 

     .when('/ingreds', {
        templateUrl: 'app/items/items.html',
        controller: 'ItemsCtrl',
       resolve: {
          initialData: function(){
              return {'type':'ingred',
                      'category':'all'};
          }
        }
      })
      .when('/items-view', {
        templateUrl: 'app/items/items.html',
        controller: 'ItemsCtrl'
      })
      .when('/out-of-stock', {
        templateUrl: 'app/items/items.html',
        controller: 'ItemsCtrl',
        authenticate: true,
        resolve: {
          initialData: function(){
              return {'type':'ingred',
                      'category':'out-of-stock'};
          }
        }         
      })      
      .when('/ingred/cold-cuts', {
        templateUrl: 'app/items/items.html',
        controller: 'ItemsCtrl',
        authenticate: true,
        resolve: {
          initialData: function(){
              return {'type':'ingred',
                      'category':'cold-cut'};
          }
        }
      })
      .when('/ingred/salad', {
        templateUrl: 'app/items/items.html',
        controller: 'ItemsCtrl',
        authenticate: true,
        resolve: {
          initialData: function(){
              return {'type':'ingred',
                      'category':'salad'};
          }
        }        
      })         
      .when('/ingred/bread', {
        templateUrl: 'app/items/items.html',
        controller: 'ItemsCtrl',
        authenticate: true,
        resolve: {
          initialData: function(){
              return {'type':'ingred',
                      'category':'bread'};
          }
        }        
      }) 
      .when('/ingred/hot-meat', {
        templateUrl: 'app/items/items.html',
        controller: 'ItemsCtrl',
        authenticate: true,
        resolve: {
          initialData: function(){
              return {'type':'ingred',
                      'category':'hot-meat'};
          }
        }         
      }) 
      .when('/ingred/seafood', {
        templateUrl: 'app/items/items.html',
        controller: 'ItemsCtrl',
        authenticate: true,
        resolve: {
          initialData: function(){
              return {'type':'ingred',
                      'category':'seafood'};
          }
        }         
      })    
      .when('/ingred/extra', {
        templateUrl: 'app/items/items.html',
        controller: 'ItemsCtrl',
        authenticate: true,
        resolve: {
          initialData: function(){
              return {'type':'ingred',
                      'category':'extra'};
          }
        }         
      })   
      .when('/ingred/all', {
        templateUrl: 'app/items/items.html',
        controller: 'ItemsCtrl',
        authenticate: true,
        resolve: {
          initialData: function(){
              return {'type':'ingred',
                      'category':'ingredients'};
          }
        }         
      })           
      .when('/sandwiches', {
        templateUrl: 'app/items/items.html',
        controller: 'ItemsCtrl',
        // authenticate: true,
        resolve: {
          initialData: function(){
              return {'type':'sandwich',
                      'category':'sandwich',
                      'serverLocation':'/api/sandwiches'};
          }
        }         
      })
      ;
  });


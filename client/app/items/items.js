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
      .when('/snacks/fruit', {
        templateUrl: 'app/items/items.html',
        controller: 'ItemsCtrl'
        ,resolve: {
          initialData: function(){
              return {'type':'product',
                  'category':'snacks',
                  'subCategory':'fruit'};
          }
      }
      })
      .when('/snacks/nuts', {
        templateUrl: 'app/items/items.html',
        controller: 'ItemsCtrl'
        ,resolve: {
          initialData: function(){
              return {'type':'product',
                  'category':'snacks',
                  'subCategory':'nuts'};
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
                      'category':'cold-cut',
                      'price':false,
                      'notes':false};
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
                      'category':'salad',
                      'price':false,
                      'notes':false};
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
                      'category':'bread',
                      'price':false,
                      'notes':false};
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
                      'category':'hot-meat',
                      'price':false,
                      'notes':false};
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
                      'category':'seafood',
                      'price':false,
                      'notes':false};
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
                      'category':'extra',
                      'price':false,
                      'notes':false};
          }
        }         
      })   
      .when('/ingred/all', {
        templateUrl: 'app/allItems/allItems.html',
        controller: 'ItemsCtrl',
        authenticate: true,
        resolve: {
          initialData: function(){
              return {'type':'ingred',
                      'category':'',
                      'price':false,
                      'notes':false};
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
      .when('/sandwich/:id', {
        templateUrl: 'app/items/item.html',
        controller: 'DetailsController',
        // authenticate: true,
        resolve: {
          initialData: function(){
              return {'type':'sandwich',
                      'category':'sandwich',
                      'serverLocation':'/api/sandwiches'};
          }
        }         
      })
      .when('/item/:type/:id', {
        templateUrl: 'app/item/item.html',
        controller: 'ItemCtrl'
      })            
      .when('/chef', {
        templateUrl: 'app/sandwiches/sandwiches.html',
        controller: 'ItemsCtrl',
        // authenticate: true,
        resolve: {
          initialData: function(){
              return {'type':'sandwich',
                      'category':'sandwich',
                      'serverLocation':'/api/sandwiches',
                      'price':3.95,
                      'chef':true};
          }
        }         
      })      
      ;
  });


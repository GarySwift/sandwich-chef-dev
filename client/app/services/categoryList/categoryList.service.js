'use strict';

angular.module('sandwichChefApp')
  .service('categoryList', function () {
    // AngularJS will instantiate a singleton by calling "new" on this function
	this.category = [{"name" :"bread", "title" : "Bread"},
	    {"name" :"cold-cut", "title" : "Cold Cuts"},
	    {"name" :"hot-meat", "title" : "Hot Meats"},                       
	    {"name" :"seafood", "title" : "Seafood"},
	    {"name" :"salad", "title" : "Salad"},
	    {"name" :"extra", "title" : "Extras"}
	    ];
	this.getList = function () {
	  return this.category;
	}  
	this.getFilling = function () {
	  return this.category.slice(1, 4) ;
	}  
	this.getListWithoutFilling = function () {
	  return this.category.slice(0,1).concat([{"name" :"filling", "title" : "Filling"}]).concat(this.category.slice(4,this.category.length));
	}      
  });

'use strict';

angular.module('sandwichChefApp')
  .service('errorReport', function () {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var errors=[]

// errors = [
//     'Oh snap! Change a few things up and try submitting again.',
//     'Lorem ipsum dipsum mishum' 
//   ];    
    return {
    	setError: function(error) {
    		errors.push(error)
    	},
    	getErrors: function() {
    		return errors;
    	}
    }
  }); 

'use strict';

angular.module('sandwichChefApp')
  .service('msgReport', function () {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var msgs=[];
    return {
    	setMsg: function(msg) {
    		msgs.push(msg)
    	},
    	getMsgs: function() {
    		return msgs;
    	}
    }    
  });

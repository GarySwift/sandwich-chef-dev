'use strict';

angular.module('sandwichChefApp')
  .service('sandwich', function ($http, haiku) {
    // AngularJS will instantiate a singleton by calling 'new' on this function

    var name = haiku.getHaiku();
    var bread = [];
    var salad = [];
    var filling = [];
    var coldCut = [];
    var hotMeat = [];
    var seaFood = [];
    var allIngred = [];
    var extra = [];
var readyToSave = false;
   var data = {
        FirstName: ''
    };

    return {
        getName: function () {
            return name;
        },
        setName: function (input) {
            name=input;
        },
        // addItem: function (item){
        // 	addItems(item);
        // },
        getItems: function() {
        	return this.toString;
        },
		addItem: function(item) {
		    switch (item.category) {
		        case 'bread':
		            bread[0] = item;
		            // console.log('bread',bread[0].name );
		            //  console.log('bread', bread)
		            break;
		        case 'salad':
		            for (var i = 0; i < salad.length; i++) {
		                if (salad[i]._id === item._id) {
		                    //Unselect item
		                    salad.splice(i, 1);
		                    return 'You have already selected me!'
		                }
		            }
		            salad.push(item);
		            break;
		        case 'cold-cut':
		            for (var i = 0; i < coldCut.length; i++) {
		                if (coldCut[i]._id === item._id) {
		                    //Unselect item
		                    coldCut.splice(i, 1);
		                    return 'You have already selected me!'
		                }
		            }
		            hotMeat.length = 0;
		            seaFood.length = 0;
		            coldCut.push(item);
		            filling = coldCut;
		            break;
		        case 'hot-meat':
		            coldCut.length = 0;
		            seaFood.length = 0;
		            hotMeat[0] = item;
		            filling = hotMeat;
		            // hotMeat.push(item);  
		            break;
		        case 'seafood':
		            coldCut.length = 0;
		            hotMeat.length = 0;
		            seaFood[0] = item;
		            filling = seaFood;
		            // seaFood.push(item); 
		            break;
		        case 'extra':
		            for (var i = 0; i < extra.length; i++) {
		                if (extra[i]._id === item._id) {
		                    //Unselect item
		                    extra.splice(i, 1);
		                    return 'You have already selected me!'
		                }
		            }
		            extra.push(item);
		            break;
		    }
		},
		toString: function() {
		    var all = bread.concat(filling).concat(salad).concat(extra);
		    var getNames = function(array) {
		        var notes = '';
		        for (var i = 0; i < array.length; i++) {
		            if (i === 0) notes = notes + array[i].name;
		            else if (i > 0 && i < array.length - 1) notes = notes + ', ' + array[i].name;
		            else if (i === array.length - 1) notes = notes + ' & ' + array[i].name;
		        };
		        return notes;
		    }
		    var string = getNames(all);
		    // console.log(string);
		    return string;
		},
		getCategory: function(category) {
		    switch (category) {
		        case 'bread':
		            return bread;
		            break;
		        case 'cold-cut':
		            return coldCut;
		            break;
		        case 'hot-meat':
		            return hotMeat;
		            break;
		        case 'seafood':
		            return seaFood;
		            break;
		        case 'salad':
		            return salad;
		            break;
		        case 'extra':
		            return extra;
		            break;
		        case 'filling':
		            return filling;
		            break;
		    }
		},	
		getModelForServer: function(category) {
			// console.log('scope', scope);
		    var getIds = function(array) {
		        var ids = [];
		        for (var i = 0; i < array.length; i++) {
		            ids.push(array[i]._id);
		        };
		        return ids;
		    }
		    if(category==='sandwich'){
			    return JSON.stringify({
			  //       'name': scope.item.name,
			  //       'notes'		  	: scope.item.notes!=='' ? scope.item.notes : toString(),
					// 'category'    	: scope.initialData.category,
					// 'subCategory' 	: scope.subCategory ? scope.subCategory : scope.item.subCategory,
					// 'price'       	: scope.item.price ? scope.item.price : 0,
					// 'inStock'     	: scope.stockSwitch.inStock ? true : false,
					'type'        	: 'sandwich',
					'category'    	: 'sandwich',	      
			        'bread'			: salad[0]._id,
			        'salad'			: getIds(salad),
			        'filling'		: getIds(filling),
			        'extra'			: getIds(extra)
			    })
			}
			return false;
		},
		getIngred: function(item) {
		    return bread.concat(filling).concat(salad).concat(extra);
		},
		getItem: function() {
			return {
				name: name,
				price: 4,
				notes: '',
				category: 'sandwich',
				autoName: true

			}
		},
		setReadyToSave: function(bool){
			readyToSave = bool;
		},
		getReadyToSave: function(){
			return readyToSave;
		},
		ifBread: function() {
		    if (bread.length > 0) 
		    	return true;
		    return false;
		},
		ifSalad: function() {
		    if (salad.length > 0) 
		    	return true;
		    return false;
		},	
		ifExtra: function() {
		    if (extra.length > 0) 
		    	return true;
		    return false;
		}									
    };// End return

    // this.addItem = function (item) {
    // 	this.bread.push(item);
    // }

// this.getModelForServer = function(category) {
// 	// console.log('scope', scope);
//     var getIds = function(array) {
//         var ids = [];
//         for (var i = 0; i < array.length; i++) {
//             ids.push(array[i]._id);
//         };
//         return ids;
//     }
//     if(category==='sandwich'){
// 	    return JSON.stringify({
// 	  //       'name': scope.item.name,
// 	  //       'notes'		  	: scope.item.notes!=='' ? scope.item.notes : this.toString(),
// 			// 'category'    	: scope.initialData.category,
// 			// 'subCategory' 	: scope.subCategory ? scope.subCategory : scope.item.subCategory,
// 			// 'price'       	: scope.item.price ? scope.item.price : 0,
// 			// 'inStock'     	: scope.stockSwitch.inStock ? true : false,
// 			'type'        	: 'sandwich',
// 			'category'    	: 'sandwich',	      
// 	        'bread'			: this.salad[0]._id,
// 	        'salad'			: getIds(this.salad),
// 	        'filling'		: getIds(this.filling),
// 	        'extra'			: getIds(this.extra)
// 	    })
// 	}
// 	return false;
// }
// this.getBreadID = function(scope) {
//     if (scope.initialData.category === 'sandwich') return this.bread[0]._id;
// }
///***********

// this.toString = function() {
//     var all = this.bread.concat(this.filling).concat(this.salad).concat(this.extra);
//     var getNames = function(array) {
//         var notes = '';
//         for (var i = 0; i < array.length; i++) {
//             if (i === 0) notes = notes + array[i].name;
//             else if (i > 0 && i < array.length - 1) notes = notes + ', ' + array[i].name;
//             else if (i === array.length - 1) notes = notes + ' & ' + array[i].name;
//         };
//         return notes;
//     }
//     var string = getNames(all);
//     // console.log(string);
//     return string;
// }

///***********

// var addItems = function(item) {
//     switch (item.category) {
//         case 'bread':
//             this.bread[0] = item;
//             // console.log('this.bread',this.bread[0].name );
//             //  console.log('this.bread', this.bread)
//             break;
//         case 'salad':
//             for (var i = 0; i < this.salad.length; i++) {
//                 if (this.salad[i]._id === item._id) {
//                     //Unselect item
//                     this.salad.splice(i, 1);
//                     return 'You have already selected me!'
//                 }
//             }
//             this.salad.push(item);
//             break;
//         case 'cold-cut':
//             for (var i = 0; i < this.coldCut.length; i++) {
//                 if (this.coldCut[i]._id === item._id) {
//                     //Unselect item
//                     this.coldCut.splice(i, 1);
//                     return 'You have already selected me!'
//                 }
//             }
//             this.hotMeat.length = 0;
//             this.seaFood.length = 0;
//             this.coldCut.push(item);
//             this.filling = this.coldCut;
//             break;
//         case 'hot-meat':
//             this.coldCut.length = 0;
//             this.seaFood.length = 0;
//             this.hotMeat[0] = item;
//             this.filling = this.hotMeat;
//             // this.hotMeat.push(item);  
//             break;
//         case 'seafood':
//             this.coldCut.length = 0;
//             this.hotMeat.length = 0;
//             this.seaFood[0] = item;
//             this.filling = this.seaFood;
//             // this.seaFood.push(item); 
//             break;
//         case 'extra':
//             for (var i = 0; i < this.extra.length; i++) {
//                 if (this.extra[i]._id === item._id) {
//                     //Unselect item
//                     this.extra.splice(i, 1);
//                     return 'You have already selected me!'
//                 }
//             }
//             this.extra.push(item);
//             break;
//     }
// }
this.ifBread = function() {
    if (this.bread.length > 0) return true;
}
this.ifSalad = function() {
    if (this.salad.length > 0) return true;
}
this.ifColdCut = function() {
    if (this.coldCut.length > 0) return true;
}
this.ifFilling = function() {
    if (this.coldCut.length > 0 || (this.hotMeat.length > 0)) return true;
}
// this.getIngred = function(item) {
//     return this.bread.concat(this.filling).concat(this.salad).concat(this.extra);
// }
this.getCategory = function(category) {
    switch (category) {
        case 'bread':
            return this.bread;
            break;
        case 'cold-cut':
            return this.coldCut;
            break;
        case 'hot-meat':
            return this.hotMeat;
            break;
        case 'seafood':
            return this.seaFood;
            break;
        case 'salad':
            return this.salad;
            break;
        case 'extra':
            return this.extra;
            break;
        case 'filling':
            return this.filling;
            break;
    }
}
  });

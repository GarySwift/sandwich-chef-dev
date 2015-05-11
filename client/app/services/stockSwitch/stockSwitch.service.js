'use strict';

angular.module('sandwichChefApp')
  .service('stockSwitch', function () {

  // // // Bootstrap slider button // // //
  return {
    inStock: 'true'
    ,onText: 'Yes, Show This To Customers'
    ,offText: 'No, Hide This For Now'
    ,onColor: 'info'
    ,offColor: 'danger'
    ,size: 'normal'
    ,animate: true
    ,handleWidth: "auto"
    ,labelWidth: "auto"
    ,isActive: true
    // ,radioOff: true
    // inverse: false      
  };
  // $scope.$watch('stockSwitch.inStock', function() {
  //     console.log('Selection changed.');
  //     console.log('$scope.stockSwitch.inStock',$scope.stockSwitch.inStock);
  // }); 

  });

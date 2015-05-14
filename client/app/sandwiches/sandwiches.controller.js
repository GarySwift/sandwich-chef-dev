'use strict';

angular.module('sandwichChefApp')
  .controller('SandwichesCtrl', function ($scope, $http, socket, Auth, categoryList, itemMngr, imageMngr, sandwich, haiku) {
    $scope.message = 'ChefCtrl';

    // Declare services
    $scope.sandwich = sandwich;
    $scope.itemMngr = itemMngr;
    //init itemMnger
    itemMngr.serverLocation =  '/api/ingreds';
    itemMngr.syncUpdatesID = 'ingred';
    // itemMngr.type = $scope.initialData.type;
    //Set items in $scope
    $scope.itemMngr.getItems($scope, 'ingred');



    //Get list
    $scope.categoryList  = categoryList;// Gets the categories to to loop over (bread, fillind, salad etc)
    $scope.fillingList   = categoryList.getFilling();// Nested loop for filling (cold-cut, hot-meat, seafood)
    $scope.sandwichList  = categoryList.getListWithoutFilling();
    console.log('$scope.sandwichList', $scope.sandwichList);

  $scope.isCollapsed = false;
  $scope.chefCollapsed=false;
  $scope.started=false;

    $scope.getImageUrl = function(item, size) {
      return imageMngr.getImageUrl(item, size);
    }  
    //setCategory is used in sandwich chef loop to show ingredients
    $scope.setCategory = function(category) {
      $scope.category = category;
    }



    $scope.addToChef = function (item) {
      $scope.started=true;
      console.log('$scope.sandwichList', $scope.sandwichList);
      $http.get('/api/ingreds' +'/'+ item._id).success(function(item) {
        $scope.sandwich.addItem(item);
        console.log('$scope.sandwich.bread', $scope.sandwich.toString());
      });
    }

    ////////// ChefCtrl //////////
    // $scope.selected = function(tab) {
    //     console.log('tab', tab);
    // };
    $scope.nextSection = function(current) {
      console.log('current+1', current+1 );
      console.log('$scope.sandwichList.length', $scope.sandwichList.length);
      if(current+1===$scope.sandwichList.length && sandwich.ifBread() && ( sandwich.ifSalad() || sandwich.ifExtra() )) {
        $scope.isCollapsed = !$scope.isCollapsed;
      $scope.chefCollapsed=!$scope.chefCollapsed;
      $scope.sandwich.setReadyToSave($scope.isCollapsed);
      console.log('$scope.sandwich.setReadyToSave(true);');
      return;
      }

      //   $scope.isCollapsed=true;
      $scope.sandwichList[current+1 < $scope.sandwichList.length ? current+1 : 0].active = true;

    };
    $scope.previousSection = function(current) {
      $scope.sandwichList[current-1 > 0 ? current-1 : $scope.sandwichList.length-1].active = true;
    };
    $scope.nextFilling = function(current) {
      $scope.fillingList[current+1 < $scope.fillingList.length ? current+1 : 0].active = true;
      if(current === $scope.fillingList.length-1)
        $scope.sandwichList[2].active = true;
    };
    $scope.previousFilling = function(current) {
      $scope.fillingList[current-1 >0 ? current-1 : $scope.fillingList.length-1].active = true;
      if(current === 0)
        $scope.sandwichList[0].active = true;
    };
    $scope.goToTab = function(i) {
      if(!$scope.started)
        return false;
      $scope.sandwichList[i].active = true;
    };
});

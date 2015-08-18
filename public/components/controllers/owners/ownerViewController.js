angular.module('propman').controller('ownerViewController',
    function($rootScope, $scope, $window, $http, $sce, $filter, $compile, $timeout, $state, $stateParams, ownerFactory){

        /*
         |-----------------------------------
         |   Loaders
         |-----------------------------------
         |
         |
         */

        $scope.getOwner = function(){
            requestData = {};
            requestData.id = $scope.id;
            ownerFactory.getShow(requestData)
                .success(function(dataResponse){
                    $scope.owner = dataResponse.data;
                })
                .error(function(error){
                    errorHandler(error)
                });
        };

        /*
        |------------------------------
        | Tabs
        |------------------------------
        |
         */

        $scope.tabs = [
            {heading: "Properties", route: "viewOwner.properties", active: false},
            {heading: "Transactions", route: "viewOwner.transactions", active: false},
        ];

        $scope.go = function(route){
            $state.go(route);
        };

        $scope.active = function(route){
            return $state.is(route);
        };

        $scope.$on("$stateChangeSuccess", function() {
            $scope.tabs.forEach(function(tab) {
                tab.active = $scope.active(tab.route);
            });
        });


        /*
         |-----------------------------------
         |   Initialize
         |-----------------------------------
         |
         |
         */

        $scope.id = $stateParams.owner_id;

        if($scope.id){
            $scope.getOwner()
            $scope.go("viewOwner.properties");
        }

    });
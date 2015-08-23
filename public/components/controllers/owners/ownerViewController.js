angular.module('propman').controller('ownerViewController',
    function($rootScope, $state, $scope, $window, $http, $sce, $filter, $compile, $timeout, $state, $stateParams, ownerFactory){

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
         |-----------------------------------
         |   Initialize
         |-----------------------------------
         |
         |
         */

        $scope.id = $stateParams.owner_id;
        $scope.owner_view = true;

        if($scope.id){
            $scope.getOwner();
        }

    });
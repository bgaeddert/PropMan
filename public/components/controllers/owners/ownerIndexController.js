angular.module('propman').controller('ownerIndexController',
    function($rootScope, $state, $scope, $window, $http, $sce, $filter, $compile, $timeout, ownerFactory){


    $scope.onGetOwners = function(){
        requestData = {};
        ownerFactory.getOwners(requestData)
            .success(function(dataResponse){
                $scope.owners = dataResponse.data;
            })
            .error(function(error){
                errorHandler(error)
            });
    };

    $scope.onGetOwners();

});
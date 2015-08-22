angular.module('propman').controller('propertyIndexController',
    function($rootScope, $state, $scope, $window, $http, $sce, $filter, $compile, $timeout, $stateParams, propertyFactory){

    $scope.owner_id = $stateParams.owner_id;

    $scope.onGetProperties = function(){
        requestData = {};
        requestData.owner_id = $scope.owner_id;
        propertyFactory.getProperties(requestData)
            .success(function(dataResponse){
                $scope.properties = dataResponse.data;
            })
            .error(function(error){
                errorHandler(error)
            });
    };

    $scope.createRoute = function(){
        if($stateParams.owner_id){
            return 'viewOwner.createProperty';
        }else{
            return 'createProperty';
        }
    };

    $scope.onGetProperties();
});
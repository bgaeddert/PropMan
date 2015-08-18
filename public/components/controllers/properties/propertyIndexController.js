angular.module('propman').controller('propertyIndexController',
    function($rootScope, $scope, $window, $http, $sce, $filter, $compile, $timeout, $stateParams, propertyFactory){

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

    $scope.onGetProperties();
});
angular.module('propman').controller('propertyIndexController',
    function($rootScope, $scope, $window, $http, $sce, $filter, $compile, $timeout, $stateParams, propertyFactory){

    //console.log($stateParams);

    $scope.onGetProperties = function(){
        requestData = {};
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
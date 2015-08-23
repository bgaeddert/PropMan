angular.module('propman').controller('unitIndexController',
    function($rootScope, $state, $scope, $window, $http, $sce, $filter, $compile, $timeout, $stateParams, unitFactory){

    $scope.property_id = $stateParams.property_id;

    $scope.onGetUnits = function(){
        requestData = {};
        requestData.property_id = $scope.property_id;
        unitFactory.getAll(requestData)
            .success(function(dataResponse){
                $scope.units = dataResponse.data;
            })
            .error(function(error){
                errorHandler(error)
            });
    };

    $scope.createUnitRoute = function(){
        if($stateParams.property_id){
            return 'viewProperty.createUnit';
        }else{
            return 'createUnit';
        }
    };

    $scope.onGetUnits();
});
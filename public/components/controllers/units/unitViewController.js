angular.module('propman').controller('unitViewController',
    function($rootScope, $state, $scope, $window, $http, $sce, $filter, $compile, $timeout, $stateParams, unitFactory){

        
        if($stateParams.unit_id){
            requestData = {};
            requestData.id = $stateParams.unit_id;
            unitFactory.getShow(requestData)
                .success(function(dataResponse){
                    $scope.unit = dataResponse.data;
                })
                .error(function(error){
                    errorHandler(error)
                });
        }

    });
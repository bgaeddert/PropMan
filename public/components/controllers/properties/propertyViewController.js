angular.module('propman').controller('propertyViewController',
    function($rootScope, $state, $scope, $window, $http, $sce, $filter, $compile, $timeout, $state, $stateParams, propertyFactory){

        if($stateParams.property_id){
            requestData = {};
            requestData.id = $stateParams.property_id;
            propertyFactory.getShow(requestData)
                .success(function(dataResponse){
                    $scope.property = dataResponse.data;
                })
                .error(function(error){
                    errorHandler(error)
                });
        }

    });
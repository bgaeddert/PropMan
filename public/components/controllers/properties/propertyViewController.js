angular.module('propman').controller('propertyViewController',
    function($rootScope, $state, $scope, $window, $http, $sce, $filter, $compile, $timeout, $state, $stateParams, propertyFactory){

        $scope.getProperty = function(){
            requestData = {};
            requestData.id = $stateParams.property_id;
            propertyFactory.getShow(requestData)
                .success(function(dataResponse){
                    $scope.property = dataResponse.data;
                    console.log(dataResponse.data);
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

        $scope.property_view = true;
        if($stateParams.property_id){
            $scope.getProperty()
        }

    });
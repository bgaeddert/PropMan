angular.module('propman').controller('propertyCreateEditController',
    function($rootScope, $scope, $window, $http, $sce, $filter, $compile, $timeout, $stateParams, propertyFactory){

        $scope.id = $stateParams.property_id;

        if($scope.id){
            requestData = {};
            requestData.id = $scope.id;
            propertyFactory.getEdit(requestData)
                .success(function(dataResponse){
                    $scope.property = dataResponse.data;
                })
                .error(function(error){
                    errorHandler(error)
                });
        }

        $scope.onUpdate = function(){
            requestData = $scope.property;
            propertyFactory.putUpdate(requestData)
                .success(function(dataResponse){
                    $scope.property = dataResponse.data;
                    toastr.success('Property ' + $scope.property.name + ' updated!')
                })
                .error(function(error){
                    errorHandler(error)
                });
        };

        $scope.onCreate = function(){
            requestData = $scope.property;
            propertyFactory.getCreate(requestData)
                .success(function(dataResponse){
                    console.log(dataResponse);
                    $scope.property = dataResponse.data;
                    toastr.success('Property ' + $scope.property.name + ' created!')
                    history.go(-1);
                })
                .error(function(error){
                    errorHandler(error)
                });
        };

    });
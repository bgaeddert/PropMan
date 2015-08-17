angular.module('propman').controller('ownerCreateEditController',
    function($rootScope, $scope, $window, $http, $sce, $filter, $compile, $timeout, $stateParams, ownerFactory){

        $scope.id = $stateParams.owner_id;

        if($scope.id){
            requestData = {};
            requestData.id = $scope.id;
            ownerFactory.getEdit(requestData)
                .success(function(dataResponse){
                    $scope.owner = dataResponse.data;
                })
                .error(function(error){
                    errorHandler(error)
                });
        }

        $scope.onUpdate = function(){

            if ($scope.ownerForm.$invalid) {
                return;
            }

            requestData = $scope.owner;
            ownerFactory.putUpdate(requestData)
                .success(function(dataResponse){
                    $scope.owner = dataResponse.data;
                    toastr.success('Owner ' + $scope.owner.name + ' updated!')
                })
                .error(function(error){
                    errorHandler(error)
                });
        };

        $scope.onCreate = function(){

            if ($scope.ownerForm.$invalid) {
                return;
            }

            requestData = $scope.owner;
            ownerFactory.getCreate(requestData)
                .success(function(dataResponse){
                    $scope.owner = dataResponse.data;
                    toastr.success('Owner ' + $scope.owner.name + ' created!')
                    history.go(-1);
                })
                .error(function(error){
                    errorHandler(error)
                });
        };

    });
angular.module('propman').controller('propertyCreateEditController',
    function($rootScope, $scope, $window, $http, $sce, $filter, $compile, $timeout, $stateParams, propertyFactory){

        /*
        |-----------------------------------
        |   Events
        |-----------------------------------
        |
        |
         */

        $scope.onUpdate = function(){

            if ($scope.propertyForm.$invalid) {
                return;
            }

            var newProperty = $scope.property;
            newProperty.owner_id = $scope.selected.id;
            delete newProperty.owners;

            requestData = newProperty;
            propertyFactory.putUpdate(requestData)
                .success(function(dataResponse){
                    $scope.property = dataResponse.data;
                    $scope.loadOwnerOptions();
                    toastr.success('Property ' + $scope.property.property_name + ' updated!');
                })
                .error(function(error){
                    errorHandler(error)
                });
        };

        $scope.onStore = function(){

            if ($scope.propertyForm.$invalid) {
                return;
            }

            var newProperty = $scope.property;
            newProperty.owner_id = $scope.selected.id;
            delete newProperty.owners;

            requestData = newProperty;
            propertyFactory.postStore(requestData)
                .success(function(dataResponse){
                    console.log(dataResponse);
                    $scope.property = dataResponse.data;
                    toastr.success('Property ' + $scope.property.property_name + ' created!');
                    history.go(-1);
                })
                .error(function(error){
                    errorHandler(error)
                });
        };

        /*
        |-----------------------------------
        |   Loaders
        |-----------------------------------
        |
        |
         */

        $scope.getProperty = function(){
            requestData = {};
            requestData.id = $scope.id;
            propertyFactory.getEdit(requestData)
                .success(function(dataResponse){
                    $scope.property = dataResponse.data;
                })
                .error(function(error){
                    errorHandler(error)
                });
        };

        $scope.loadOwnerOptions = function(){
            propertyFactory.getOwnerOptions()
                .success(function(dataResponse){
                    $scope.property.owners = dataResponse.data;

                    if($scope.property.hasOwnProperty('owner_id')){
                        $scope.selected = where($scope.property.owners, 'id', $scope.property.owner_id);
                    }
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

        // Get params from router
        $scope.id = $stateParams.property_id;

        if($scope.id){
            // Edit property
            $scope.getProperty();
            $scope.loadOwnerOptions();

        }else{
            // Create property
            $scope.property = {};
            $scope.property.owner_id = $stateParams.owner_id;
            $scope.loadOwnerOptions();

        }

    });
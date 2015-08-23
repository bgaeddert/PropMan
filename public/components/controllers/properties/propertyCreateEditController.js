angular.module('propman').controller('propertyCreateEditController',
    function($rootScope, $state, $scope, $window, $http, $sce, $filter, $compile, $timeout, $stateParams, propertyFactory, handlerFactory){

        /*
         |-----------------------------------
         |   Events
         |-----------------------------------
         |
         |
         */

        $scope.onUpdate = function(){

            if($scope.propertyForm.$invalid){
                return;
            }

            var newProperty = $scope.property;
            newProperty.owner_id = $scope.owner.id;
            delete newProperty.owners;

            requestData = newProperty;
            propertyFactory.putUpdate(requestData)
                .success(function(dataResponse){
                    $scope.property = dataResponse.data;
                    $scope.loadOwnerOptions();
                    handlerFactory.successHandler('Property ' + $scope.property.property_name + ' updated!');
                })
                .error(function(error){
                    handlerFactory.errorHandler(error)
                });
        };

        $scope.onStore = function(){

            if($scope.propertyForm.$invalid){
                return;
            }

            var newProperty = $scope.property;
            newProperty.owner_id = $scope.owner.id;
            delete newProperty.owners;

            requestData = newProperty;
            propertyFactory.postStore(requestData)
                .success(function(dataResponse){
                    $scope.property = dataResponse.data;
                    handlerFactory.successHandler('Property ' + $scope.property.property_name + ' created!');
                    $state.go('viewProperty', {property_id: $scope.property.id});
                })
                .error(function(error){
                    handlerFactory.errorHandler(error)
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
            requestData.id = $stateParams.property_id;
            propertyFactory.getEdit(requestData)
                .success(function(dataResponse){
                    $scope.property = dataResponse.data;
                    $scope.loadOwnerOptions();
                })
                .error(function(error){
                    handlerFactory.errorHandler(error)
                });
        };

        $scope.loadOwnerOptions = function(){
            propertyFactory.getOwnerOptions()
                .success(function(dataResponse){

                    var allOwners = dataResponse.data;

                    $scope.property.owners = $filter('filter')(allOwners, {owner_active: 1});

                    if($scope.property.hasOwnProperty('owner_id') && $scope.owner_view !== true){
                        var propertyOwners = $filter('filter')(allOwners, {id: $scope.property.owner_id});
                        $scope.owner = propertyOwners[0];
                    }

                    // Warn if no owners have been created
                    if(allOwners.length === 0){
                        handlerFactory.warningHandler($scope, "You must create an owner first.");
                    }

                    // Warn if property owner is inactive
                    if($scope.hasOwnProperty('owner')){
                        if($scope.owner.owner_active === '0'){
                            handlerFactory.warningHandler($scope, "The owner of this property is inactive.");
                        }
                    }

                    // Show form is in opposite state of warn
                    $scope.tmp.showForm = !$scope.tmp.warn;

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

        // Create template state variable
        $scope.tmp = {};
        $scope.tmp.warn = false;
        $scope.tmp.showForm = false;

        if($stateParams.property_id){
            // Edit property
            $scope.getProperty();
            $scope.tmp.edit = true;
        } else {
            // Create property
            $scope.property = {};
            if($stateParams.owner_id){
                $scope.property.owner_id = $stateParams.owner_id;
            }
            $scope.property.property_active = '1';
            $scope.loadOwnerOptions();
            $scope.tmp.create = true;
        }

    });
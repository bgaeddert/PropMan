angular.module('propman').controller('unitCreateEditController',
    function($rootScope, $state, $scope, $window, $http, $sce, $filter, $compile, $timeout, $stateParams, unitFactory, handlerFactory){

        /*
         |-----------------------------------
         |   Events
         |-----------------------------------
         |
         |
         */

        $scope.onUpdate = function(){

            if($scope.unitForm.$invalid){
                return;
            }

            var newProperty = $scope.unit;
            newProperty.property_id = $scope.property.id;
            delete newProperty.properties;

            requestData = newProperty;
            unitFactory.putUpdate(requestData)
                .success(function(dataResponse){
                    $scope.unit = dataResponse.data;
                    $scope.loadPropertyOptions();
                    handlerFactory.successHandler('Property ' + $scope.unit.unit_name + ' updated!');
                })
                .error(function(error){
                    handlerFactory.errorHandler(error)
                });
        };

        $scope.onStore = function(){

            if($scope.unitForm.$invalid){
                return;
            }

            var newProperty = $scope.unit;
            newProperty.property_id = $scope.property.id;
            delete newProperty.properties;

            requestData = newProperty;
            unitFactory.postStore(requestData)
                .success(function(dataResponse){
                    $scope.unit = dataResponse.data;
                    handlerFactory.successHandler('Property ' + $scope.unit.unit_name + ' created!');
                    $state.go('viewProperty', {unit_id: $scope.unit.id});
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
            requestData.id = $stateParams.unit_id;
            unitFactory.getEdit(requestData)
                .success(function(dataResponse){
                    $scope.unit = dataResponse.data;
                    $scope.loadPropertyOptions();
                })
                .error(function(error){
                    handlerFactory.errorHandler(error)
                });
        };

        $scope.loadPropertyOptions = function(){
            unitFactory.getPropertyOptions()
                .success(function(dataResponse){

                    var allProperties = dataResponse.data;

                    $scope.unit.properties = $filter('filter')(allProperties, {property_active: 1});

                    if($scope.unit.hasOwnProperty('property_id') && $scope.property_view !== true){
                        var unitProperties = $filter('filter')(allProperties, {id: $scope.unit.property_id});
                        $scope.property = unitProperties[0];
                    }

                    // Warn if no properties have been created
                    if(allProperties.length === 0){
                        handlerFactory.warningHandler($scope, "You must create an property first.");
                    }

                    // Warn if unit property is inactive
                    if($scope.hasOwnProperty('property')){
                        if($scope.property.property_active === '0'){
                            handlerFactory.warningHandler($scope, "The property of this unit is inactive.");
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

        if($stateParams.unit_id){
            // Edit unit
            $scope.getProperty();
            $scope.tmp.edit = true;
        } else {
            // Create unit
            $scope.unit = {};
            if($stateParams.property_id){
                $scope.unit.property_id = $stateParams.property_id;
            }
            $scope.unit.unit_active = '1';
            $scope.loadPropertyOptions();
            $scope.tmp.create = true;
        }

    });
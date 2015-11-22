angular.module('propman').controller('unitCreateEditController',
    function($rootScope, $state, $scope, $window, $http, $sce, $filter, $compile, $timeout, $stateParams, unitFactory, handlerFactory, property, properties, unit, unit_create){

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

            var newUnit = $scope.unit;
            newUnit.property_id = $scope.property.id;
            delete newUnit.properties;

            unitFactory.putUpdate(newUnit).then(function(){
                handlerFactory.successHandler('Unit ' + $scope.unit.unit_name + ' updated!');
            })
        };

        $scope.onStore = function(){

            if($scope.unitForm.$invalid){
                return;
            }

            var newUnit = $scope.unit;
            newUnit.property_id = $scope.property.id;
            delete newUnit.properties;

            unitFactory.postStore(newUnit).then(function(unit){
                handlerFactory.successHandler('Unit ' + $scope.unit.unit_name + ' created!');
                $state.go('units.viewUnit', {unit_id: unit.id});
            })
        };

        $scope.onDelete = function(){
            bootbox.confirm("Are you sure you want to DELETE this unit and all it's tenants and transactions?", function(result) {

                if(result){

                    unitFactory.delete($scope.unit).then(function(){
                        handlerFactory.successHandler('Unit deleted!');
                        $state.go('properties.viewProperty', {property_id: $scope.property.id});
                    })
                }
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
        $scope.unit = unit;
        $scope.property = property;
        $scope.properties = properties;
        $scope.unit_create = unit_create;

        if($scope.property === false){
            $scope.property = $scope.unit.property;
        }

        if($scope.property){
            // Warn if property in inactive
            if($scope.property.property_active === '0'){
                $scope.tmp.warn = true;
                handlerFactory.warningHandler($scope, "The property of this unit is inactive.");
            }
        }

        // Warn if no properties have been created
        if($scope.properties.length === 0){
            $scope.tmp.warn = true;
            handlerFactory.warningHandler($scope, "You must create an property first.");
        }




    });
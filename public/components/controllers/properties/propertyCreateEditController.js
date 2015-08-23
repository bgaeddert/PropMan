angular.module('propman').controller('propertyCreateEditController',
    function($rootScope, $state, $scope, $window, $http, $sce, $filter, $compile, $timeout, $stateParams, propertyFactory, handlerFactory, owner, owners, property, property_create){

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

            propertyFactory.putUpdate(newProperty).then(function(){
                handlerFactory.successHandler('Property ' + $scope.property.property_name + ' updated!');
            })
        };

        $scope.onStore = function(){

            if($scope.propertyForm.$invalid){
                return;
            }

            var newProperty = $scope.property;
            newProperty.owner_id = $scope.owner.id;
            delete newProperty.owners;

            propertyFactory.postStore(newProperty).then(function(property){
                handlerFactory.successHandler('Property ' + $scope.property.property_name + ' created!');
                $state.go('properties.viewProperty', {property_id: property.id});
            })
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
        $scope.property = property;
        $scope.owner = owner;
        $scope.owners = owners;
        $scope.property_create = property_create;

        if($scope.owner === false){
            $scope.owner = $scope.property.owner;
        }

        if($scope.owner){
            // Warn if owner in inactive
            if($scope.owner.owner_active === '0'){
                $scope.tmp.warn = true;
                handlerFactory.warningHandler($scope, "The owner of this property is inactive.");
            }
        }

        // Warn if no owners have been created
        if($scope.owners.length === 0){
            $scope.tmp.warn = true;
            handlerFactory.warningHandler($scope, "You must create an owner first.");
        }




    });
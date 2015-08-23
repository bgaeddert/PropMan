angular.module('propman').controller('propertyViewController',
    function($rootScope, $state, $scope, $window, $http, $sce, $filter, $compile, $timeout, $state, $stateParams, propertyFactory, property, property_view){

        /*
         |-----------------------------------
         |   Initialize
         |-----------------------------------
         |
         |
         */

        $scope.property_view = property_view;
        $scope.property = property;

    });
angular.module('propman').controller('unitViewController',
    function($rootScope, $state, $scope, $window, $http, $sce, $filter, $compile, $timeout, $state, $stateParams, unitFactory, unit, unit_view){

        /*
         |-----------------------------------
         |   Initialize
         |-----------------------------------
         |
         |
         */

        $scope.unit_view = unit_view;
        $scope.unit = unit;

    });
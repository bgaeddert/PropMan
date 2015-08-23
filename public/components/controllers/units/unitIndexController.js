angular.module('propman').controller('unitIndexController',
    function($rootScope, $state, $scope, $window, $http, $sce, $filter, $compile, $timeout, $stateParams, unitFactory, property_view, units, createRoute){

        $scope.property_view = property_view;
        $scope.units = units;
        $scope.createRoute = createRoute;

    });
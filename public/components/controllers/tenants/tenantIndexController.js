angular.module('propman').controller('tenantIndexController',
    function($rootScope, $state, $scope, $window, $http, $sce, $filter, $compile, $timeout, $stateParams, tenantFactory, unit_view, tenants, createRoute){

        $scope.unit_view = unit_view;
        $scope.tenants = tenants;
        $scope.createRoute = createRoute;

    });
angular.module('propman').controller('propertyIndexController',
    function($rootScope, $state, $scope, $window, $http, $sce, $filter, $compile, $timeout, $stateParams, propertyFactory, owner_view, properties, createRoute){

        $scope.owner_view = owner_view;
        $scope.properties = properties;
        $scope.createRoute = createRoute;

    });
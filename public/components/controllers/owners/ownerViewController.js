angular.module('propman').controller('ownerViewController',
    function($rootScope, $state, $scope, $window, $http, $sce, $filter, $compile, $timeout, $stateParams, ownerFactory, owner){
        $scope.owner = owner;
        $scope.owner_view = true;
    });
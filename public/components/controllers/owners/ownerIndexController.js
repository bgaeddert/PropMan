angular.module('propman').controller('ownerIndexController',
    function($rootScope, $state, $scope, $window, $http, $sce, $filter, $compile, $timeout, ownerFactory, owners ){

        $scope.owners = owners;

});
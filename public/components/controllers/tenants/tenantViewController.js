angular.module('propman').controller('tenantViewController',
    function($rootScope, $state, $scope, $window, $http, $sce, $filter, $compile, $timeout, $stateParams, tenantFactory, tenant, tenant_view){

        /*
         |-----------------------------------
         |   Initialize
         |-----------------------------------
         |
         |
         */

        $scope.tenant_view = tenant_view;
        $scope.tenant = tenant;

    });
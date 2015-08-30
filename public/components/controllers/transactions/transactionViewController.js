angular.module('propman').controller('transactionViewController',
    function($rootScope, $state, $scope, $window, $http, $sce, $filter, $compile, $timeout, $state, $stateParams, transactionFactory, transaction, transaction_view){

        /*
         |-----------------------------------
         |   Initialize
         |-----------------------------------
         |
         |
         */

        $scope.transaction_view = transaction_view;
        $scope.transaction = transaction;

    });
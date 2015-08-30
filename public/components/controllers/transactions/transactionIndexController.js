angular.module('propman').controller('transactionIndexController',
    function($rootScope, $state, $scope, $window, $http, $sce, $filter, $compile, $timeout, $stateParams, transactionFactory, property_view, tenant_view, transactions, createRoute, sort){

        $scope.property_view = property_view;
        $scope.tenant_view = tenant_view;
        $scope.transactions = transactions;
        $scope.createRoute = createRoute;
        $scope.sort = sort;

        var startDate = new Date();
        startDate.setDate (startDate.getDate() - 90);
        $scope.startDate = startDate;

        var endDate = new Date();
        endDate.setDate (endDate.getDate() + 1);
        $scope.endDate = endDate;

        //$scope.dateOptions = {"init-date": $scope.startDate};

        $scope.openStart = function($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.startOpened = true;
        };

        $scope.openEnd = function($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.endOpened = true;
        };

        $scope.format = 'MMM dd, yyyy';

        $scope.dateOptions = {
            formatYear: 'yy',
            startingDay: 1
        };

    });

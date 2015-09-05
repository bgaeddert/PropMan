angular.module('propman').controller('transactionIndexController',
    function($rootScope, $state, $scope, $window, $http, $sce, $filter, $compile, $timeout, $stateParams, transactionFactory, property_view, tenant_view, transaction_view, transactions, createRoute, editRoute, sort){

        $scope.property_view = property_view;
        $scope.tenant_view = tenant_view;
        $scope.transaction_view = transaction_view;
        $scope.transactions = $filter('num')(transactions,'id');
        $scope.transactions = $filter('num')(transactions,'paid_at');
        $scope.transactions = $filter('num')(transactions,'trans_num');



        $scope.createRoute = createRoute;
        $scope.editRoute = editRoute;
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

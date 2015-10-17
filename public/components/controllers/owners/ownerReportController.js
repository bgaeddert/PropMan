angular.module('propman').controller('ownerReportController',
    function($rootScope, $state, $scope, $window, $http, $sce, $filter, $compile, $timeout, owner, org ){

        $scope.owner = owner;
        $scope.org = org;
        $scope.colones = {};


        var array = [];
        mergeDeepNested($scope.owner,'transactions',array);
        console.log(array);

        var startDate = new Date();
        startDate.setDate (startDate.getDate() - 90);
        $scope.startDate = startDate;

        var endDate = new Date();
        endDate.setDate (endDate.getDate() + 1);
        $scope.endDate = endDate;

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

        $scope.format = 'dd/MM/yyyy';

        $scope.dateOptions = {
            formatYear: 'yy',
            startingDay: 1
        };
});
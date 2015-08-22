angular.module('propman').controller('propertyViewController',
    function($rootScope, $state, $scope, $window, $http, $sce, $filter, $compile, $timeout, $state, $stateParams, propertyFactory){

        $scope.id = $stateParams.property_id;

        if($scope.id){
            requestData = {};
            requestData.id = $scope.id;
            propertyFactory.getShow(requestData)
                .success(function(dataResponse){
                    $scope.property = dataResponse.data;
                })
                .error(function(error){
                    errorHandler(error)
                });
        }

        /*
        |------------------------------
        | Tabs
        |------------------------------
        |
         */

        //$scope.tabs = [
        //    {heading: "Units", route: "viewProperty.Units", active: false},
        //    {heading: "Transactions", route: "viewProperty.transactions", active: false}
        //];

        //$scope.go = function(route){
        //    $state.go(route);
        //};
        //
        //$scope.active = function(route){
        //    return $state.is(route);
        //};
        //
        //$scope.$on("$stateChangeSuccess", function() {
        //    $scope.tabs.forEach(function(tab) {
        //        tab.active = $scope.active(tab.route);
        //    });
        //});

    });
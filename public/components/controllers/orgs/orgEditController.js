angular.module('propman').controller('orgEditController',
    function($sce,
             $http,
             $state,
             $scope,
             $filter,
             $window,
             $compile,
             $timeout,
             $rootScope,
             $stateParams,
             orgFactory,
             handlerFactory,
             org){

        /*
         |-----------------------------------
         |   Events
         |-----------------------------------
         |
         |
         */
        $scope.onUpdate = function(){

            if($scope.orgForm.$invalid){
                return;
            }

            orgFactory.putUpdate($scope.org).then(function(org){
                handlerFactory.successHandler('Organization ' + org.name + ' Updated!');
            })
        };

        /*
         |-----------------------------------
         |   Initialize
         |-----------------------------------
         |
         |
         */

        $scope.org = org;

    });
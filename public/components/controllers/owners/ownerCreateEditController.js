angular.module('propman').controller('ownerCreateEditController',
    function($rootScope, $state, $scope, $window, $http, $sce, $filter, $compile, $timeout, $stateParams, ownerFactory, handlerFactory){

        /*
         |-----------------------------------
         |   Events
         |-----------------------------------
         |
         |
         */

        /**
         * Update Owner with new owner model.
         *
         * Success :
         *  - Load current model with returned data.
         *  - Display success.
         *
         * Error :
         *  - Display error.
         *
         * Any :
         *  - No redirect.
         */
        $scope.onUpdate = function(){

            if ($scope.ownerForm.$invalid) {
                return;
            }

            requestData = $scope.owner;
            ownerFactory.putUpdate(requestData)
                .success(function(dataResponse){
                    $scope.owner = dataResponse.data;
                    handlerFactory.successHandler('Owner ' + $scope.owner.owner_name + ' Updated!');
                })
                .error(function(error){
                    handlerFactory.errorHandler(error)
                });
        };

        /**
         * Store New Owner with new owner model.
         *
         * Success :
         *  - Load current model with returned data.
         *  - Display success.
         *  - Redirect to Owner's view
         *
         * Error :
         *  - Display error.
         *  - No redirect
         */
        $scope.onStore = function(){

            if ($scope.ownerForm.$invalid) {
                return;
            }

            requestData = $scope.owner;
            ownerFactory.postStore(requestData)
                .success(function(dataResponse){
                    $scope.owner = dataResponse.data;
                    handlerFactory.successHandler('Owner ' + $scope.owner.owner_name + ' created!');
                    $state.go('viewOwner',{owner_id:$scope.owner.id});
                })
                .error(function(error){
                    handlerFactory.errorHandler(error)
                });
        };

        /*
         |-----------------------------------
         |   Loaders
         |-----------------------------------
         |
         |
         */

        /**
         * Get owner's data.
         *
         * Success :
         *  - Load current model with returned data.
         *
         * Error :
         *  - Display error.
         */
        $scope.getOwner =  function(){
            requestData = {};
            requestData.id = $stateParams.owner_id;
            ownerFactory.getEdit(requestData)
                .success(function(dataResponse){
                    $scope.owner = dataResponse.data;
                })
                .error(function(error){
                    handlerFactory.errorHandler(error)
                });
        };

        /*
         |-----------------------------------
         |   Initialize
         |-----------------------------------
         |
         |
         */

        // Create template state variable
        $scope.tmp = {};

        /**
         * If owner_id pass in by router
         *
         * true : ( Edit mode )
         *  - Load current model with returned data.
         *  - Set template state to edit
         *
         * false : ( Create mode )
         *  - Create empty owner model.
         *  - Add org_id and owner_active properties
         *  - Set owner_active to true as default
         *  - Set template state to create
         *
         */
        if($stateParams.owner_id){
            // Edit
            $scope.getOwner();
            $scope.tmp.edit = true;
        }else{
            // Create
            $scope.owner = {};
            $scope.owner.org_id = $rootScope.user.org_id;
            $scope.owner.owner_active = '1';
            $scope.tmp.create = true;
        }

    });
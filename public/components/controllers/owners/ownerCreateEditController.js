angular.module('propman').controller('ownerCreateEditController',
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
             ownerFactory,
             handlerFactory,
             owner,
             owner_create){

        /*
         |-----------------------------------
         |   Events
         |-----------------------------------
         |
         |
         */
        $scope.onUpdate = function(){

            if($scope.ownerForm.$invalid){
                return;
            }

            ownerFactory.putUpdate($scope.owner)
        };

        $scope.onStore = function(){

            if($scope.ownerForm.$invalid){
                return;
            }

            ownerFactory.postStore($scope.owner).then(function(owner){
                $state.go('owners.viewOwner', {owner_id: owner.id});
            });
        };

        $scope.onDelete = function(){
            bootbox.confirm("Are you sure you want to DELETE this owner and all it's properties, units, tenants and transactions?", function(result) {

                if(result){

                    ownerFactory.delete($scope.owner).then(function(){
                        $state.go('owners');
                    })
                }
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
            $scope.owner = owner;
            $scope.owner_create = owner_create;
        } else {
            // Create
            $scope.owner = {};
            $scope.owner.org_id = $rootScope.user.org_id;
            $scope.owner.owner_active = '1';
            $scope.owner_create = owner_create;
        }

    });
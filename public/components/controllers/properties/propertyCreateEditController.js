angular.module('propman').controller('propertyCreateEditController',
    function($rootScope, $scope, $window, $http, $sce, $filter, $compile, $timeout, $stateParams, propertyFactory){

        $scope.id = $stateParams.property_id;

        if($scope.id){
            requestData = {};
            requestData.id = $scope.id;
            propertyFactory.getEdit(requestData)
                .success(function(dataResponse){
                    $scope.property = dataResponse.data;
                })
                .error(function(error){
                    errorHandler(error)
                });
        }else{
            // instantiate for create
            $scope.property = {};
        }



        $scope.loadOwnerOptions = function(){
            propertyFactory.getOwnerOptions()
                .success(function(dataResponse){
                    $scope.property.owners = dataResponse.data;

                    if($scope.property.hasOwnProperty('owner_id')){
                        $scope.selected = where($scope.property.owners, 'id', $scope.property.owner_id);
                    }
                })
                .error(function(error){
                    errorHandler(error)
                });
        };

        $scope.loadOwnerOptions();

        $scope.onUpdate = function(){

            if ($scope.propertyForm.$invalid) {
                return;
            }

            var newProperty = $scope.property;
            newProperty.owner_id = $scope.selected.id;
            delete newProperty.owners;

            requestData = newProperty;
            propertyFactory.putUpdate(requestData)
                .success(function(dataResponse){
                    $scope.property = dataResponse.data;
                    $scope.loadOwnerOptions();
                    toastr.success('Property ' + $scope.property.name + ' updated!')
                })
                .error(function(error){
                    errorHandler(error)
                });
        };

        $scope.onCreate = function(){

            if ($scope.propertyForm.$invalid) {
                return;
            }

            var newProperty = $scope.property;
            newProperty.owner_id = $scope.selected.id;
            delete newProperty.owners;

            requestData = newProperty;
            propertyFactory.getCreate(requestData)
                .success(function(dataResponse){
                    console.log(dataResponse);
                    $scope.property = dataResponse.data;
                    toastr.success('Property ' + $scope.property.name + ' created!')
                    history.go(-1);
                })
                .error(function(error){
                    errorHandler(error)
                });
        };

    });
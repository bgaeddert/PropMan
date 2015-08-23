angular.module('propman').controller('tenantCreateEditController',
    function($rootScope, $state, $scope, $window, $http, $sce, $filter, $compile, $timeout, $stateParams, tenantFactory, handlerFactory, unit, units, tenant, tenant_create){

        /*
         |-----------------------------------
         |   Events
         |-----------------------------------
         |
         |
         */

        $scope.onUpdate = function(){

            if($scope.tenantForm.$invalid){
                return;
            }

            var newTenant = $scope.tenant;
            newTenant.unit_id = $scope.unit.id;
            delete newTenant.units;

            tenantFactory.putUpdate(newTenant).then(function(){
                handlerFactory.successHandler('Tenant ' + $scope.tenant.tenant_name + ' updated!');
            })
        };

        $scope.onStore = function(){

            if($scope.tenantForm.$invalid){
                return;
            }

            var newTenant = $scope.tenant;
            newTenant.unit_id = $scope.unit.id;
            delete newTenant.units;

            tenantFactory.postStore(newTenant).then(function(tenant){
                handlerFactory.successHandler('Tenant ' + $scope.tenant.tenant_name + ' created!');
                $state.go('tenants.viewTenant', {tenant_id: tenant.id});
            })
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
        $scope.tmp.warn = false;
        $scope.tmp.showForm = false;
        $scope.tenant = tenant;
        $scope.unit = unit;
        $scope.units = units;
        $scope.tenant_create = tenant_create;

        if($scope.unit === false){
            $scope.unit = $scope.tenant.unit;
        }

        if($scope.unit){
            // Warn if unit in inactive
            if($scope.unit.unit_active === '0'){
                $scope.tmp.warn = true;
                handlerFactory.warningHandler($scope, "The unit of this tenant is inactive.");
            }
        }

        // Warn if no units have been created
        if($scope.units.length === 0){
            $scope.tmp.warn = true;
            handlerFactory.warningHandler($scope, "You must create an unit first.");
        }




    });
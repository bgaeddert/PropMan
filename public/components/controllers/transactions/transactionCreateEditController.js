angular.module('propman').controller('transactionCreateEditController',
    function($rootScope, $state, $scope, $window, $http, $sce, $filter, $compile, $timeout, $stateParams, transactionFactory, handlerFactory, tenant, tenants, transaction, transaction_create, property, property_view, tenant_view ){

        /*
         |-----------------------------------
         |   Events
         |-----------------------------------
         |
         |
         */

        $scope.onUpdate = function(){

            if($scope.transactionForm.$invalid){
                return;
            }

            if($scope.transaction.payer ===  $scope.transaction.payee){

                handlerFactory.errorHandler($scope,'FROM and TO can not be the same!');

                return;
            }

            if($scope.transaction.payee !==  'outside_name'){

                $scope.transaction.outside_name = '';

            }

            transactionFactory.putUpdate($scope.transaction).then(function(){
                handlerFactory.successHandler('Transaction updated!');
                history.back();
            })
        };

        $scope.onStore = function(){

            if($scope.transactionForm.$invalid){
                return;
            }

            if($scope.transaction.payer ===  $scope.transaction.payee){

                handlerFactory.errorHandler($scope,'FROM and TO can not be the same!');

                return;
            }

            if($scope.transaction.payee !==  'outside_name'){

                $scope.transaction.outside_name = '';

            }

            transactionFactory.postStore($scope.transaction).then(function(transaction){
                handlerFactory.successHandler('Transaction created!');
                if(property_view === true){
                    $state.go('properties.viewProperty.transactions', {property_id: $scope.property.id});
                }

                if(tenant_view === true){
                    $state.go('tenants.viewTenant.transactions', {tenant_id: $scope.tenant.id});
                }
            })
        };

        $scope.onPayChange = function(){

            if($scope.transaction.payer ===  $scope.transaction.payee){

                handlerFactory.errorHandler($scope,'FROM and TO can not be the same!');

                return;
            }

        };


        // Date

        $scope.openStart = function($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.startOpened = true;
        };

        $scope.format = 'MMM dd, yyyy';

        $scope.dateOptions = {
            formatYear: 'yy',
            startingDay: 1
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

        // Imports
        $scope.transaction = transaction;
        $scope.tenant = tenant;
        $scope.tenants = tenants;
        $scope.transaction_create = transaction_create;
        $scope.property = property;
        $scope.property_view = property_view;
        $scope.tenant_view = tenant_view;

        if($scope.tenant === false){
            $scope.tenant = $scope.transaction.tenant;
        }

        if($scope.property === false){
            $scope.property = $scope.tenant.unit.property;
        }

        $scope.transaction.property_id = $scope.property.id;


        // sanitize
        if(typeof $scope.transaction.paid_at == 'number'){
            $scope.transaction.paid_at = new Date(moment.utc($scope.transaction.paid_at, 'X').format('MMM DD, YYYY'));
        }


        if($scope.property){
            // Warn if tenant in inactive
            if($scope.property.property_active === '0'){
                $scope.tmp.warn = true;
                handlerFactory.warningHandler($scope, "The property of this transaction is inactive.");
            }
        }

        if($scope.tenant){
            // Warn if tenant in inactive
            if($scope.tenant.tenant_active === '0'){
                $scope.tmp.warn = true;
                handlerFactory.warningHandler($scope, "The tenant of this transaction is inactive.");
            }
        }

        // Warn if no tenants have been created
        if($scope.tenants.length === 0){
            $scope.tmp.warn = true;
            handlerFactory.warningHandler($scope, "You must create an tenant first.");
        }




    });
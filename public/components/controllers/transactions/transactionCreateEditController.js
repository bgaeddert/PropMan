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

            transactionFactory.putUpdate($scope.transaction).then(function(){
                handlerFactory.successHandler('Transaction updated!');
            })
        };

        $scope.onStore = function(){

            if($scope.transactionForm.$invalid){
                return;
            }

            if(property_view === true){
                if($scope.propertyPayee === $scope.propertyPayer){

                    handlerFactory.errorHandler($scope, 'FROM and TO can not be the same!');

                    return;
                }
            }

            if(tenant_view === true){
                if($scope.tenantPayee === $scope.tenantPayer){

                    handlerFactory.errorHandler($scope, 'FROM and TO can not be the same!');

                    return;
                }
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

        $scope.onPropertyPayChange = function(){

            //1 property.org.name
            //2 property.property_name
            //3 Third Party

            if($scope.propertyPayee ===  $scope.propertyPayer){

                handlerFactory.errorHandler($scope,'FROM and TO can not be the same!');

                return;
            }

            if($scope.propertyPayer === "1"){

                $scope.transaction.payer = 'org_id';


                if($scope.propertyPayee === "2"){

                    $scope.transaction.payee = 'property_id';
                    console.log(transaction);
                    return;
                }

                if($scope.propertyPayee === "3"){

                    $scope.transaction.payee = 'outside_name';
                    console.log(transaction);
                    return;
                }

                handlerFactory.errorHandler($scope,'Property payer error!');

            }

            if($scope.propertyPayer === "2"){

                $scope.transaction.payer = 'property_id';

                if($scope.propertyPayee === "1"){

                    $scope.transaction.payee = 'org_id';
                    console.log(transaction);
                    return;
                }


                if($scope.propertyPayee === "3"){

                    $scope.transaction.payee = 'outside_name';
                    console.log(transaction);
                    return;
                }

                handlerFactory.errorHandler($scope,'Property payee error!');

            }

            handlerFactory.errorHandler($scope,'Property PAY error!');

        };

        $scope.onTenantPayChange = function(){

            //1 tenant.tenant_name
            //2 tenant.org.name
            //3 tenant.unit.property.property_name

            if($scope.tenantPayee ===  $scope.tenantPayer){

                handlerFactory.errorHandler($scope,'FROM and TO can not be the same!');

                return;
            }

            if($scope.tenantPayer === "1"){

                $scope.transaction.payer = 'tenant_id';


                if($scope.tenantPayee === "2"){

                    $scope.transaction.payee = 'org_id';
                    console.log(transaction);
                    return;
                }

                if($scope.tenantPayee === "3"){

                    $scope.transaction.payee = 'property_id';
                    console.log(transaction);
                    return;
                }

                handlerFactory.errorHandler($scope,'Tenant payer error!');

            }else{

                handlerFactory.errorHandler($scope,'Tenant payer not found!');

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
        $scope.transaction = transaction;
        $scope.tenant = tenant;
        $scope.tenants = tenants;
        $scope.transaction_create = transaction_create;
        $scope.property = property;
        $scope.property_view = property_view;
        $scope.tenant_view = tenant_view;
        $scope.transaction.property_id = tenant.unit.property.id;

        if($scope.property_view == true){
            $scope.propertyPayer = "1"; // Default from organization
            $scope.propertyPayee = "2"; // Default to property
            $scope.onPropertyPayChange();
        }

        if($scope.tenant_view == true){
            $scope.tenantPayer = "1"; // Default from tenant
            $scope.tenantPayee = "3"; // Default to property
            $scope.onTenantPayChange();
        }


        if($scope.tenant === false){
            $scope.tenant = $scope.transaction.tenant;
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
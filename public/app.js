/* scripts/app.js */

(function(){

    'use strict';

    var propman = angular.module('propman', [
        'ngResource',
        'ui.bootstrap',
        'ui.router',
        'angular-loading-bar',
        'ngAnimate',
        'pascalprecht.translate'
    ]);

    propman.config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider){
        cfpLoadingBarProvider.includeSpinner = false;
        cfpLoadingBarProvider.latencyThreshold = 50;
    }]);

    propman.config(['$httpProvider', function($httpProvider){
        $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';


        $httpProvider.interceptors.push(function($q){

            return {

                'responseError': function(rejection){

                    var defer = $q.defer();

                    if(rejection.status == 401){
                        window.location.replace("/");
                    }

                    defer.reject(rejection);

                    return defer.promise;

                }
            };
        });

    }]);

    propman.config(function($stateProvider, $urlRouterProvider, $locationProvider){

        //
        // For any unmatched url, redirect to /home
        $urlRouterProvider.otherwise(function($injector, $location){
            return "/";
        });

        //
        // Now set up the states
        $stateProvider

            /*-----------------------------
             |   HOME
             ----------------------------*/
            .state('home', {
                url: "/",
                templateUrl: "/shared/home.html"
            })

            .state('settings', {
                url: "/settings",
                templateUrl: "/shared/settings.html",
                controller: 'orgEditController',
                resolve: {
                    org: function(orgFactory){
                        return orgFactory.getEdit()
                    }
                }
            })

            /*-----------------------------
             |  Owners
             ----------------------------
             |
             |  *************************
             |     ROUTE ORDER MATTERS
             |  *************************
             |
             */

            /*Owner BASE*/
            .state('owners', {
                url: "/owners",
                templateUrl: "/shared/owners/base.html",
                redirectTo: 'owners.listOwners'
            })

            /*Owner BASE --> Report*/
            .state('owners.viewOwner.report', {
                url: "/report",
                templateUrl: "/shared/owners/report.html",
                controller: 'ownerReportController',
                resolve: {
                    owner: function($stateParams, ownerFactory){
                        return ownerFactory.getShow({id: $stateParams.owner_id})
                    },
                    org: function(orgFactory){
                        return orgFactory.getEdit()
                    }
                }
            })

            /*Owner BASE --> INDEX*/
            .state('owners.listOwners', {
                url: "/index",
                templateUrl: "/shared/owners/index.html",
                controller: 'ownerIndexController',
                resolve: {
                    owners: function(ownerFactory){
                        return ownerFactory.getOwners()
                    }
                }
            })

            /*Owner BASE --> CREATE*/
            .state('owners.createOwner', {
                url: "/create",
                templateUrl: '/shared/owners/create_edit.html',
                controller: 'ownerCreateEditController',
                resolve: {
                    owner: function(){
                        return {};
                    },
                    owner_create: function(){
                        return true;
                    }
                }
            })

            /*Owner BASE --> EDIT*/
            .state('owners.editOwner', {
                url: "/:owner_id/edit",
                templateUrl: '/shared/owners/create_edit.html',
                controller: 'ownerCreateEditController',
                resolve: {
                    owner: function($stateParams, ownerFactory){
                        return ownerFactory.getEdit({id: $stateParams.owner_id})
                    },
                    owner_create: function(){
                        return false;
                    }
                }
            })

            /*Owner BASE --> VIEW*/
            .state('owners.viewOwner', {
                url: "/:owner_id",
                templateUrl: '/shared/owners/view.html',
                controller: 'ownerViewController',
                resolve: {
                    owner: function($stateParams, ownerFactory){
                        return ownerFactory.getShow({id: $stateParams.owner_id})
                    }
                },
                redirectTo: 'owners.viewOwner.properties'
            })

            /*Owner BASE --> VIEW --> PROPERTY CREATE*/
            .state('owners.viewOwner.createProperty', {
                url: "/properties/create",
                templateUrl: '/shared/properties/create_edit.html',
                controller: 'propertyCreateEditController',
                resolve: {
                    owner_view: function(){
                        return true;
                    },
                    owners: function(ownerFactory){
                        return ownerFactory.getOwners({onlyActive: true})
                    },
                    owner: function($stateParams, ownerFactory){
                        return ownerFactory.getShow({id: $stateParams.owner_id})
                    },
                    property: function($stateParams, propertyFactory){
                        return {
                            owner_id: $stateParams.owner_id,
                            property_active: '1'
                        };
                    },
                    property_create: function(){
                        return true;
                    }
                }
            })

            /*Owner BASE --> VIEW --> PROPERTY INDEX*/
            .state('owners.viewOwner.properties', {
                url: "/properties",
                templateUrl: '/shared/properties/index.html',
                controller: 'propertyIndexController',
                resolve: {
                    owner_view: function(){
                        return true;
                    },
                    properties: function($stateParams, propertyFactory){
                        return propertyFactory.getProperties({owner_id: $stateParams.owner_id})
                    },
                    createRoute: function(){
                        return 'owners.viewOwner.createProperty'
                    }
                }
            })


            /*-----------------------------
             |  Properties
             ----------------------------*/
            /*Properties BASE*/
            .state('properties', {
                url: "/properties",
                templateUrl: "/shared/properties/base.html",
                redirectTo: 'properties.listProperties'
            })

            /*Properties BASE --> INDEX*/
            .state('properties.listProperties', {
                url: "/index",
                templateUrl: "/shared/properties/index.html",
                controller: 'propertyIndexController',
                resolve: {
                    owner_view: function(){
                        return false;
                    },
                    properties: function($stateParams, propertyFactory){
                        return propertyFactory.getProperties({owner_id: $stateParams.owner_id})
                    },
                    createRoute: function(){
                        return 'properties.createProperty'
                    }
                }
            })

            /*Properties BASE --> CREATE*/
            .state('properties.createProperty', {
                url: "/create",
                templateUrl: '/shared/properties/create_edit.html',
                controller: 'propertyCreateEditController',
                resolve: {
                    owner_view: function(){
                        return false;
                    },
                    owners: function(ownerFactory){
                        return ownerFactory.getOwners({onlyActive: true});
                    },
                    owner: function($stateParams, ownerFactory){
                        return false;
                    },
                    property: function($stateParams, propertyFactory){
                        return {
                            owner_id: $stateParams.owner_id,
                            property_active: '1'
                        };
                    },
                    property_create: function(){
                        return true;
                    }
                }
            })

            /*Properties BASE --> CREATE*/
            .state('properties.editProperty', {
                url: "/:property_id/edit",
                templateUrl: '/shared/properties/create_edit.html',
                controller: 'propertyCreateEditController',
                resolve: {
                    owner_view: function(){
                        return false;
                    },
                    owners: function(ownerFactory){
                        return ownerFactory.getOwners({onlyActive: true});
                    },
                    owner: function($stateParams, ownerFactory){
                        return false
                    },
                    property: function($stateParams, propertyFactory){
                        return propertyFactory.getEdit({id: $stateParams.property_id})
                    },
                    property_create: function(){
                        return false;
                    }
                }
            })

            /*Properties BASE --> VIEW*/
            .state('properties.viewProperty', {
                url: "/:property_id",
                templateUrl: '/shared/properties/view.html',
                controller: 'propertyViewController',
                redirectTo: 'properties.viewProperty.units',
                resolve: {
                    property_view: function(){
                        return true;
                    },
                    property: function($stateParams, propertyFactory){
                        return propertyFactory.getShow({id: $stateParams.property_id})
                    }
                }
            })

            /*Properties BASE --> VIEW --> UNIT INDEX*/
            .state('properties.viewProperty.units', {
                url: "/units",
                templateUrl: '/shared/units/index.html',
                controller: 'unitIndexController',
                resolve: {
                    property_view: function(){
                        return true;
                    },
                    property: function($stateParams, propertyFactory){
                        return propertyFactory.getShow({id: $stateParams.property_id})
                    },
                    units: function($stateParams, unitFactory){
                        return unitFactory.getUnits({property_id: $stateParams.property_id})
                    },
                    createRoute: function(){
                        return 'properties.viewProperty.createUnit'
                    }
                }
            })

            /*Properties BASE --> VIEW --> Create UNIT*/
            .state('properties.viewProperty.createUnit', {
                url: "/units/create",
                templateUrl: '/shared/units/create_edit.html',
                controller: 'unitCreateEditController',
                resolve: {
                    property_view: function(){
                        return true;
                    },
                    properties: function(propertyFactory){
                        return propertyFactory.getProperties({onlyActive: true});
                    },
                    unit: function($stateParams, propertyFactory){
                        return {
                            property_id: $stateParams.property_id,
                            unit_active: '1'
                        };
                    },
                    unit_create: function(){
                        return true;
                    }
                }
            })

            /*Properties BASE --> VIEW --> transaction INDEX*/
            .state('properties.viewProperty.transactions', {
                url: "/transactions",
                templateUrl: '/shared/transactions/index.html',
                controller: 'transactionIndexController',
                resolve: {
                    tenant_view: function(){
                        return false;
                    },
                    property_view: function(){
                        return true;
                    },
                    transaction_view: function(){
                        return false;
                    },
                    tenant: function($stateParams, tenantFactory){
                        return false;
                    },
                    transactions: function($stateParams, transactionFactory){
                        return transactionFactory.getTransactions({property_id: $stateParams.property_id})
                    },
                    sort: function(){
                        return {type: 'id', reverse: 'true'}
                    },
                    createRoute: function(){
                        return 'properties.viewProperty.createTransaction'
                    },
                    editRoute: function(){
                        return 'properties.viewProperty.editTransaction({transaction_id: transaction.id})';
                    }
                }
            })

            /*Properties BASE --> VIEW --> transaction CREATE*/
            .state('properties.viewProperty.createTransaction', {
                url: "/transactions/create",
                templateUrl: '/shared/transactions/create_edit.html',
                controller: 'transactionCreateEditController',
                resolve: {
                    tenant_view: function(){
                        return false;
                    },
                    property_view: function(){
                        return true;
                    },
                    tenant: function(){
                        return false;
                    },
                    tenants: function(){
                        return false;
                    },
                    transaction: function($stateParams, propertyFactory){
                        return {
                            property_id: $stateParams.property_id,
                            payer: 'property_id',
                            payee: 'org_id',
                            paid_at: new Date()
                        };
                    },
                    transaction_create: function(){
                        return true;
                    },
                    property: function($stateParams, propertyFactory){
                        return propertyFactory.getShow({id: $stateParams.property_id});
                    }
                }
            })

            /*Properties BASE --> VIEW --> transaction Edit*/
            .state('properties.viewProperty.editTransaction', {
                url: "/transactions/:transaction_id/edit/",
                templateUrl: '/shared/transactions/create_edit.html',
                controller: 'transactionCreateEditController',
                resolve: {
                    tenant_view: function(){
                        return false;
                    },
                    property_view: function(){
                        return true;
                    },
                    tenant: function(){
                        return false;
                    },
                    tenants: function(){
                        return false;
                    },
                    transaction: function($stateParams, transactionFactory){
                        return transactionFactory.getShow({id: $stateParams.transaction_id});
                    },
                    transaction_create: function(){
                        return false;
                    },
                    property: function($stateParams, propertyFactory){
                        return propertyFactory.getShow({id: $stateParams.property_id});
                    }
                }
            })

            /*-----------------------------
             |  Units
             ----------------------------*/

            /*Units BASE*/
            .state('units', {
                url: "/units",
                templateUrl: "/shared/units/base.html",
                redirectTo: 'units.listUnits'
            })

            /*Units BASE --> INDEX*/
            .state('units.listUnits', {
                url: "/index",
                templateUrl: "/shared/units/index.html",
                controller: 'unitIndexController',
                resolve: {
                    property_view: function(){
                        return false;
                    },
                    units: function($stateParams, unitFactory){
                        return unitFactory.getUnits()
                    },
                    createRoute: function(){
                        return 'units.createUnit'
                    }
                }
            })

            /*Units BASE --> CREATE*/
            .state('units.createUnit', {
                url: "/create",
                templateUrl: '/shared/units/create_edit.html',
                controller: 'unitCreateEditController',
                resolve: {
                    property_view: function(){
                        return false;
                    },
                    properties: function(propertyFactory){
                        return propertyFactory.getProperties({onlyActive: true});
                    },
                    property: function($stateParams, propertyFactory){
                        return false;
                    },
                    unit: function($stateParams, unitFactory){
                        return {
                            property_id: $stateParams.property_id,
                            unit_active: '1'
                        };
                    },
                    unit_create: function(){
                        return true;
                    }
                }
            })

            /*Units BASE --> EDIT*/
            .state('units.editUnit', {
                url: "/:unit_id/edit",
                templateUrl: '/shared/units/create_edit.html',
                controller: 'unitCreateEditController',
                resolve: {
                    unit_view: function(){
                        return false;
                    },
                    properties: function(propertyFactory){
                        return propertyFactory.getProperties({onlyActive: true});
                    },
                    property: function($stateParams, propertyFactory){
                        return false
                    },
                    unit: function($stateParams, unitFactory){
                        return unitFactory.getEdit({id: $stateParams.unit_id})
                    },
                    unit_create: function(){
                        return false;
                    }
                }
            })

            /*Units BASE --> VIEW*/
            .state('units.viewUnit', {
                url: "/:unit_id",
                templateUrl: '/shared/units/view.html',
                controller: 'unitViewController',
                redirectTo: 'units.viewUnit.tenants',
                resolve: {
                    unit_view: function(){
                        return true;
                    },
                    unit: function($stateParams, unitFactory){
                        return unitFactory.getShow({id: $stateParams.unit_id})
                    }
                }
            })

            /*Units BASE --> VIEW --> UNIT INDEX*/
            .state('units.viewUnit.tenants', {
                url: "/tenants",
                templateUrl: '/shared/tenants/index.html',
                controller: 'tenantIndexController',
                resolve: {
                    unit_view: function(){
                        return true;
                    },
                    tenants: function($stateParams, tenantFactory){
                        return tenantFactory.getTenants({unit_id: $stateParams.unit_id})
                    },
                    createRoute: function(){
                        return 'units.viewUnit.createTenant'
                    }
                }
            })

            /*Units BASE --> VIEW --> CREATE TENANT*/
            .state('units.viewUnit.createTenant', {
                url: "/tenants/create",
                templateUrl: '/shared/tenants/create_edit.html',
                controller: 'tenantCreateEditController',
                resolve: {
                    unit_view: function(){
                        return true;
                    },
                    unit: function($stateParams, unitFactory){
                        return unitFactory.getShow({id: $stateParams.unit_id})
                    },
                    units: function(unitFactory){
                        return unitFactory.getUnits({onlyActive: true});
                    },
                    tenant: function($stateParams){
                        return {
                            unit_id: $stateParams.unit_id,
                            tenant_active: '1'
                        };
                    },
                    tenant_create: function(){
                        return true;
                    }
                }
            })

            /*-----------------------------
             |  Tenants
             ----------------------------*/

            /*Tenants BASE*/
            .
            state('tenants', {
                url: "/tenants",
                templateUrl: "/shared/tenants/base.html",
                redirectTo: 'tenants.listTenants'
            })

            /*Tenants BASE --> INDEX*/
            .state('tenants.listTenants', {
                url: "/index",
                templateUrl: "/shared/tenants/index.html",
                controller: 'tenantIndexController',
                resolve: {
                    unit_view: function(){
                        return false;
                    },
                    tenants: function($stateParams, tenantFactory){
                        return tenantFactory.getTenants()
                    },
                    createRoute: function(){
                        return 'tenants.createTenant'
                    }
                }
            })

            /*Tenants BASE --> CREATE*/
            .state('tenants.createTenant', {
                url: "/create",
                templateUrl: '/shared/tenants/create_edit.html',
                controller: 'tenantCreateEditController',
                resolve: {
                    unit_view: function(){
                        return false;
                    },
                    units: function(unitFactory){
                        return unitFactory.getUnits({onlyActive: true});
                    },
                    unit: function(){
                        return false;
                    },
                    tenant: function($stateParams){
                        return {
                            unit_id: $stateParams.unit_id,
                            tenant_active: '1'
                        };
                    },
                    tenant_create: function(){
                        return true;
                    }
                }
            })

            /*Tenants BASE --> EDIT*/
            .state('tenants.editTenant', {
                url: "/:tenant_id/edit",
                templateUrl: '/shared/tenants/create_edit.html',
                controller: 'tenantCreateEditController',
                resolve: {
                    tenant_view: function(){
                        return false;
                    },
                    units: function(unitFactory){
                        return unitFactory.getUnits({onlyActive: true});
                    },
                    unit: function(){
                        return false
                    },
                    tenant: function($stateParams, tenantFactory){
                        return tenantFactory.getEdit({id: $stateParams.tenant_id})
                    },
                    tenant_create: function(){
                        return false;
                    }
                }
            })

            /*Tenants BASE --> VIEW*/
            .state('tenants.viewTenant', {
                url: "/:tenant_id",
                templateUrl: '/shared/tenants/view.html',
                controller: 'tenantViewController',
                redirectTo: 'tenants.viewTenant.transactions',
                resolve: {
                    tenant_view: function(){
                        return true;
                    },
                    tenant: function($stateParams, tenantFactory){
                        return tenantFactory.getShow({id: $stateParams.tenant_id});
                    }
                }
            })

            /*Tenants BASE --> VIEW --> transaction INDEX*/
            .state('tenants.viewTenant.transactions', {
                url: "/transactions",
                templateUrl: '/shared/transactions/index.html',
                controller: 'transactionIndexController',
                resolve: {
                    tenant_view: function(){
                        return true;
                    },
                    property_view: function(){
                        return false;
                    },
                    transaction_view: function(){
                        return false;
                    },
                    tenant: function($stateParams, tenantFactory){
                        return tenantFactory.getShow({id: $stateParams.tenant_id})
                    },
                    transactions: function($stateParams, transactionFactory){
                        return transactionFactory.getTransactions({tenant_id: $stateParams.tenant_id})
                    },
                    sort: function(){
                        return {type: 'id', reverse: 'true'}
                    },
                    createRoute: function(){
                        return 'tenants.viewTenant.createTransaction'
                    },
                    editRoute: function(){
                        return 'tenants.viewTenant.editTransaction({transaction_id: transaction.id})';
                    }
                }
            })

            /*Tenant BASE --> VIEW --> transaction CREATE*/
            .state('tenants.viewTenant.createTransaction', {
                url: "/transactions/create",
                templateUrl: '/shared/transactions/create_edit.html',
                controller: 'transactionCreateEditController',
                resolve: {
                    tenant_view: function(){
                        return true;
                    },
                    property_view: function(){
                        return false;
                    },
                    tenant: function($stateParams, tenantFactory){
                        return tenantFactory.getShow({id: $stateParams.tenant_id});
                    },
                    tenants: function(){
                        return false;
                    },
                    transaction: function($stateParams, propertyFactory){
                        return {
                            tenant_id: $stateParams.tenant_id,
                            payer: 'tenant_id',
                            payee: 'property_id',
                            paid_at: new Date()
                        };
                    },
                    transaction_create: function(){
                        return true;
                    },
                    property: function($stateParams, propertyFactory){
                        return false;
                    }
                }
            })

            /*tenants BASE --> VIEW --> transaction Edit*/
            .state('tenants.viewTenant.editTransaction', {
                url: "/transactions/:transaction_id/edit/",
                templateUrl: '/shared/transactions/create_edit.html',
                controller: 'transactionCreateEditController',
                resolve: {
                    tenant_view: function(){
                        return true;
                    },
                    property_view: function(){
                        return false;
                    },
                    tenant: function($stateParams, tenantFactory){
                        return tenantFactory.getShow({id: $stateParams.tenant_id});
                    },
                    tenants: function(){
                        return false;
                    },
                    transaction: function($stateParams, transactionFactory){
                        return transactionFactory.getShow({id: $stateParams.transaction_id});
                    },
                    transaction_create: function(){
                        return false;
                    },
                    property: function($stateParams, propertyFactory){
                        return false;
                    }
                }
            })

            /*-----------------------------
             |  Transactions
             ----------------------------*/

            /*Transactions BASE*/
            .
            state('transactions', {
                url: "/transactions",
                templateUrl: "/shared/transactions/base.html",
                redirectTo: 'transactions.listTransactions'
            })

            /*Transactions BASE --> INDEX*/
            .state('transactions.listTransactions', {
                url: "/index",
                templateUrl: "/shared/transactions/index.html",
                controller: 'transactionIndexController',
                resolve: {
                    tenant_view: function(){
                        return false;
                    },
                    property_view: function(){
                        return false;
                    },
                    transaction_view: function(){
                        return true;
                    },
                    transactions: function($stateParams, transactionFactory){
                        return transactionFactory.getTransactions()
                    },
                    sort: function(){
                        return {type: 'id', reverse: 'true'}
                    },
                    createRoute: function(){
                        return 'transactions.createTransaction'
                    },
                    editRoute: function(){
                        return false;
                    }
                }
            })

            /*Transactions BASE --> CREATE*/
            .state('transactions.createTransaction', {
                url: "/create",
                templateUrl: '/shared/transactions/create_edit.html',
                controller: 'transactionCreateEditController',
                resolve: {
                    tenant_view: function(){
                        return false;
                    },
                    property_view: function(){
                        return false;
                    },
                    tenants: function(tenantFactory){
                        return tenantFactory.getUnits({onlyActive: true});
                    },
                    tenant: function(){
                        return false;
                    },
                    transaction: function($stateParams){
                        return {
                            tenant_id: $stateParams.tenant_id,
                            transaction_active: '1'
                        };
                    },
                    transaction_create: function(){
                        return true;
                    }
                }
            })

            /*Transactions BASE --> EDIT*/
            .state('transactions.editTransaction', {
                url: "/:transaction_id/edit",
                templateUrl: '/shared/transactions/create_edit.html',
                controller: 'transactionCreateEditController',
                resolve: {
                    transaction_view: function(){
                        return false;
                    },
                    tenants: function(tenantFactory){
                        return tenantFactory.getUnits({onlyActive: true});
                    },
                    tenant: function(){
                        return false
                    },
                    transaction: function($stateParams, transactionFactory){
                        return transactionFactory.getEdit({id: $stateParams.transaction_id})
                    },
                    transaction_create: function(){
                        return false;
                    }
                }
            })

            /*Transactions BASE --> VIEW*/
            .state('transactions.viewTransaction', {
                url: "/:transaction_id",
                templateUrl: '/shared/transactions/view.html',
                controller: 'transactionViewController',
                redirectTo: 'transactions.viewTransaction.transactions',
                resolve: {
                    transaction_view: function(){
                        return true;
                    },
                    transaction: function($stateParams, transactionFactory){
                        return transactionFactory.getShow({id: $stateParams.transaction_id})
                    }
                }
            })

            /*Transactions BASE --> VIEW --> UNIT INDEX*/
            .state('transactions.viewTransaction.transactions', {
                //url: "/transactions",
                //templateUrl: '/shared/transactions/index.html',
                //controller: 'transactionIndexController',
                //resolve: {
                //    transaction_view: function(){
                //        return true;
                //    },
                //    transaction: function($stateParams, transactionFactory){
                //        return transactionFactory.getShow({id: $stateParams.transaction_id})
                //    }
                //}
            })

            /*Transactions BASE --> VIEW --> CREATE TENENT*/
            .state('transactions.viewTransaction.createTransaction', {
                //url: "/transactions/create",
                //templateUrl: '/shared/transactions/create_edit.html',
                //controller: 'transactionCreateEditController',
                //resolve: {
                //    transaction_view: function(){
                //        return true;
                //    },
                //    transaction: function($stateParams, transactionFactory){
                //        return transactionFactory.getShow({id: $stateParams.transaction_id})
                //    }
                //}
            })
        ;

        $locationProvider
            .html5Mode({
                enabled: true,
                requireBase: false
            })
    });

    propman.run(['$rootScope', '$state', function($rootScope, $state){

        $rootScope.$on('$stateChangeStart', function(evt, to, params){
            if(to.redirectTo){
                evt.preventDefault();
                $state.go(to.redirectTo, params)
            }
        });
    }]);

    propman.config(function ($translateProvider) {
        $translateProvider.translations('en', {
            Owners: 'Owners',
            Properties: 'Properties',
            Units: 'Units',
            Tenants: 'Tenants',
            Transactions: 'Transactions',
            Logout: 'Logout',
            Settings: 'Settings',
            Create: 'Create',
            Edit: 'Edit',
            View: 'View',
            INACTIVE: 'INACTIVE',
            Notes: 'Notes',
        });
        $translateProvider.translations('es', {
            Owners: 'Dueños',
            Properties: 'Propiedades',
            Units: 'Unidades',
            Tenants: 'Inquilinos',
            Transactions: 'Transacciones',
            Logout: 'Cerrar sesion',
            Settings: 'Ajustes',
            Create: 'Crear',
            Edit: 'Editar',
            View: 'Ver',
            INACTIVE: 'INACTIVO',
            Notes: 'Notas',
        });
        $translateProvider.preferredLanguage('en');
    });

})();

/*Javascript filter - Using angular instead*/
/**
 * Returns a object in an array of objects
 * that has a property whose value matches
 * a string (find)
 *
 * @param objectArray
 * @param property
 * @param find
 * @returns {*}
 */
//function where(objectArray, property, find){
//
//    if( ! objectArray )      throw 'Argument 1 is required.';
//    if( ! property )    throw 'Argument 2 is required.';
//    if( ! find )        throw 'Argument 3 is required.';
//    if( typeof objectArray !== 'object' ) throw 'Argument 1 requires an objectArray but a ' + typeof object + ' provided.';
//    if( typeof property !== 'string' ) throw 'Argument 2 requires a string but a ' + typeof property + ' provided.';
//    if( typeof find !== 'string' ) throw 'Argument 3 requires a string but a ' + typeof find + ' provided.';
//
//    var index = null;
//
//    objectArray.map(function (value, key) {
//        if(value.hasOwnProperty(property)){
//            if(value.id == find){
//                index = key;
//            }
//        }else{
//            return -1;
//        }
//    });
//
//    return objectArray[index];
//}


var mergeDeepNested = function(object, str){

    var mergeArray = [];

    var pushDeep = function(object, str){
        if (typeof object === 'object') {
            angular.forEach(object,function(value, key){
                if(key == str){
                    angular.forEach(value,function(v, k){
                        mergeArray.push(v);
                    });
                }else if(typeof value === 'object'){
                    pushDeep(value,str)
                }
            });
        }
    };

    pushDeep(object, str);

    return mergeArray;

};




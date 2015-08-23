/* scripts/app.js */

(function(){

    'use strict';

    var propman = angular.module('propman', [
        'ngResource',
        'ui.bootstrap',
        'ui.router'
    ]);

    propman.config(['$httpProvider', function($httpProvider){
        $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';


            $httpProvider.interceptors.push(function($q) {

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
             |  Owners
             ----------------------------*/
            .state('owners', {
                url: "/owners/",
                templateUrl: "/shared/owners/index.html",
                controller: 'ownerIndexController'
            })
            .state('editOwner', {
                url: "/owners/:owner_id/edit/",
                templateUrl: '/shared/owners/create_edit.html',
                controller: 'ownerCreateEditController'
            })
            .state('createOwner', {
                url: "/owners/create/",
                templateUrl: '/shared/owners/create_edit.html',
                controller: 'ownerCreateEditController'
            })
            .state('viewOwner', {
                url: "/owners/:owner_id/",
                templateUrl: '/shared/owners/view.html',
                controller: 'ownerViewController',
                redirectTo: 'viewOwner.properties',
            })
            .state('viewOwner.properties', {
                url: "properties/",
                templateUrl: '/shared/properties/index.html',
                controller: 'propertyIndexController'
            })
            .state('viewOwner.createProperty', {
                url: "properties/create/",
                templateUrl: '/shared/properties/create_edit.html',
                controller: 'propertyCreateEditController'
            })

            /*-----------------------------
             |  Properties
             ----------------------------*/
            .state('properties', {
                url: "/properties/",
                templateUrl: "/shared/properties/index.html",
                controller: 'propertyIndexController'
            })
            .state('createProperty', {
                url: "/properties/create/",
                templateUrl: '/shared/properties/create_edit.html',
                controller: 'propertyCreateEditController'
            })
            .state('editProperty', {
                url: "/properties/:property_id/edit/",
                templateUrl: '/shared/properties/create_edit.html',
                controller: 'propertyCreateEditController'
            })
            .state('viewProperty', {
                url: "/properties/:property_id/",
                templateUrl: '/shared/properties/view.html',
                controller: 'propertyViewController',
                redirectTo: 'viewProperty.units'
            })
            .state('viewProperty.units', {
                url: "units/",
                templateUrl: '/shared/units/index.html',
                controller: 'unitIndexController'
            })
            .state('viewProperty.createUnit', {
                url: "units/create/",
                templateUrl: '/shared/units/create_edit.html',
                controller: 'unitCreateEditController'
            })

            /*-----------------------------
             |  Units
             ----------------------------*/
            .state('units', {
                url: "/units/",
                templateUrl: "/shared/units/index.html",
                controller: 'unitIndexController'
            })
            .state('createUnit', {
                url: "/units/create/",
                templateUrl: '/shared/units/create_edit.html',
                controller: 'unitCreateEditController'
            })
            .state('editUnit', {
                url: "/units/:unit_id/edit/",
                templateUrl: '/shared/units/create_edit.html',
                controller: 'unitCreateEditController'
            })
            .state('viewUnit', {
                url: "/units/:unit_id/",
                templateUrl: '/shared/units/view.html',
                controller: 'unitViewController'
            })

            /*-----------------------------
             |   Users
             ----------------------------*/
            .state('users', {
                url: "/users/",
                templateUrl: "/shared/users/index.html"
            })

            /*-----------------------------
             |   HOME
             ----------------------------*/
            .state('home', {
                url: "/",
                templateUrl: "/shared/home.html"
            })
        ;

        $locationProvider
            .html5Mode({
                enabled: true,
                requireBase: false
            })
    });

    propman.run(['$rootScope', '$state', function($rootScope, $state) {

        $rootScope.$on('$stateChangeStart', function(evt, to, params) {
            if (to.redirectTo) {
                evt.preventDefault();
                $state.go(to.redirectTo, params)
            }
        });
    }]);

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
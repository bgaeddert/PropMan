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
            return "home";
        });

        //
        // Now set up the states
        $stateProvider
            .state('home', {
                url: "/",
                templateUrl: "/shared/home.html"
            })

            /*-----------------------------
             |  Owners
             ----------------------------*/
            .state('owners', {
                url: "/owners",
                templateUrl: "/shared/owners/index.html",
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
                controller: 'ownerViewController'
            })
            .state('viewOwner.properties', {
                url: "properties/",
                templateUrl: '/shared/properties/index.html',
                controller: 'propertyIndexController'
            })
            // TODO BRIAN - fix outside route
            .state('viewOwner.createProperty', {
                url: "properties/create/",
                templateUrl: '/shared/properties/create_edit.html',
                controller: 'propertyCreateEditController'
            })

            /*-----------------------------
             |  Properties
             ----------------------------*/
            .state('properties', {
                url: "/properties",
                templateUrl: "/shared/properties/index.html",
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
                url: "/property/:property_id/",
                templateUrl: '/shared/properties/view.html',
                controller: 'propertyViewController'
            })

            /*-----------------------------
             |   Users
             ----------------------------*/
            .state('users', {
                url: "/users",
                templateUrl: "/shared/users/index.html"
            })
        ;

        $locationProvider
            .html5Mode({
                enabled: true,
                requireBase: false
            })
    });

})();


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
function where(objectArray, property, find){

    if( ! objectArray )      throw 'Argument 1 is required.';
    if( ! property )    throw 'Argument 2 is required.';
    if( ! find )        throw 'Argument 3 is required.';
    if( typeof objectArray !== 'object' ) throw 'Argument 1 requires an objectArray but a ' + typeof object + ' provided.';
    if( typeof property !== 'string' ) throw 'Argument 2 requires a string but a ' + typeof property + ' provided.';
    if( typeof find !== 'string' ) throw 'Argument 3 requires a string but a ' + typeof find + ' provided.';

    var index = null;

    objectArray.map(function (value, key) {
        if(value.hasOwnProperty(property)){
            if(value.id == find){
                index = key;
            }
        }else{
            return -1;
        }
    });

    return objectArray[index];
}
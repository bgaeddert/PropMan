angular.module('propman').factory('propertyFactory', function($http,$sce,$q,handlerFactory){
    return {
        getProperties: function(requestData){
            var deferred = $q.defer();
            var url = '/api/properties';

            $http({
                method: "get",
                url: url,
                params: requestData
            })
            .success(function(data, status) {
                deferred.resolve(data.data);
            }).error(function(data, status) {
                deferred.reject(data);
                handlerFactory.errorHandler(data)
            });

            return deferred.promise;
        },
        getShow: function(requestData){
            var deferred = $q.defer();
            var url = '/api/properties/'+ requestData.id;
            $http({
                method: "get",
                url: url
            })
            .success(function(data, status) {
                deferred.resolve(data.data);
            }).error(function(data, status) {
                deferred.reject(data);
                handlerFactory.errorHandler(data)
            });

            return deferred.promise;
        },
        postStore: function(requestData){
            var deferred = $q.defer();
            var url = '/api/properties/' ;
            $http({
                method: "post",
                url: url,
                data: requestData
            })
            .success(function(data, status) {
                deferred.resolve(data.data);
            }).error(function(data, status) {
                deferred.reject(data);
                handlerFactory.errorHandler(data)
            });

            return deferred.promise;
        },
        getEdit: function(requestData){
            var deferred = $q.defer();
            var url = '/api/properties/'+ requestData.id + '/edit/' ;
            $http({
                method: "get",
                url: url
            })
            .success(function(data, status) {
                deferred.resolve(data.data);
            }).error(function(data, status) {
                deferred.reject(data);
                handlerFactory.errorHandler(data)
            });

            return deferred.promise;
        },
        putUpdate: function(requestData){
            var deferred = $q.defer();
            var url = '/api/properties/'+ requestData.id ;
            $http({
                method: "put",
                url: url,
                data: requestData
            })
            .success(function(data, status) {
                deferred.resolve(data.data);
            }).error(function(data, status) {
                deferred.reject(data);
                handlerFactory.errorHandler(data)
            });

            return deferred.promise;
        },
        delete: function(requestData){
            var deferred = $q.defer();
            var url = '/api/properties/'+ requestData.id ;
            $http({
                method: "delete",
                url: url,
                data: requestData
            })
                .success(function(data, status) {
                    deferred.resolve(data.data);
                }).error(function(data, status) {
                deferred.reject(data);
                handlerFactory.errorHandler(data)
            });

            return deferred.promise;
        }
    }
});
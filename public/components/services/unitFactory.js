angular.module('propman').factory('unitFactory', function($http,$sce,$q,handlerFactory){
    return {
        getUnits: function(requestData){
            var deferred = $q.defer();
            var url = '/api/units';

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
            var url = '/api/units/'+ requestData.id;
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
            var url = '/api/units/' ;
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
            var url = '/api/units/'+ requestData.id + '/edit/' ;
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
            var url = '/api/units/'+ requestData.id ;
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
        }
    }
});
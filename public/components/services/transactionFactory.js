angular.module('propman').factory('transactionFactory', function($http,$sce,$q,handlerFactory){
    return {
        getTransactions: function(requestData){
            var deferred = $q.defer();
            var url = '/api/transactions';

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
            var url = '/api/transactions/'+ requestData.id;
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
            var url = '/api/transactions/' ;
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
            var url = '/api/transactions/'+ requestData.id + '/edit/' ;
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
            var url = '/api/transactions/'+ requestData.id ;
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
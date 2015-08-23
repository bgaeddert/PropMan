angular.module('propman').factory('ownerFactory', function($http,$sce,$q,handlerFactory){
    return {
        getOwners: function(requestData){
            var deferred = $q.defer();
            var url = '/api/owners';
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
            var url = '/api/owners/'+ requestData.id;
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
        postStore: function(requestData){
            var deferred = $q.defer();
            var url = '/api/owners/' ;
            $http({
                method: "post",
                url: url,
                data: requestData
            })
            .success(function(data, status) {
                deferred.resolve(data.data);
                handlerFactory.successHandler('Owner ' + data.data.owner_name + ' Created!');
            }).error(function(data, status) {
                deferred.reject(data);
                handlerFactory.errorHandler(data)
            });

            return deferred.promise;
        },
        getEdit: function(requestData){
            var deferred = $q.defer();
            var url = '/api/owners/'+ requestData.id + '/edit/' ;
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
            var url = '/api/owners/'+ requestData.id ;
            $http({
                method: "put",
                url: url,
                data: requestData
            })
                .success(function(data, status) {
                    deferred.resolve(data.data);
                    handlerFactory.successHandler('Owner ' + data.data.owner_name + ' Updated!');
                }).error(function(data, status) {
                    deferred.reject(data);
                    handlerFactory.errorHandler(data)
                });

            return deferred.promise;
        }
    }
});
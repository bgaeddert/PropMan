angular.module('propman').factory('orgFactory', function($http,$sce,$q,handlerFactory){
    return {
        getEdit: function(requestData){
            var deferred = $q.defer();
            var url = '/api/orgs/0/edit/' ;
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
            var url = '/api/orgs/0' ;
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
angular.module('propman').factory('ownerFactory', function($http){
    return {
        getOwners: function(requestData){
            var url = '/api/owners';
            var response = $http({
                method: "get",
                url: url,
                params: requestData
            });
            return response;
        },
        getShow: function(requestData){
            var url = '/api/owners/'+ requestData.id;
            var response = $http({
                method: "get",
                url: url,
                params: requestData
            });
            return response;
        },
        postStore: function(requestData){
            var url = '/api/owners/' ;
            var response = $http({
                method: "post",
                url: url,
                data: requestData
            });
            return response;
        },
        getEdit: function(requestData){
            var url = '/api/owners/'+ requestData.id + '/edit/' ;
            var response = $http({
                method: "get",
                url: url
            });
            return response;
        },
        putUpdate: function(requestData){
            var url = '/api/owners/'+ requestData.id ;
            var response = $http({
                method: "put",
                url: url,
                data: requestData
            });
            return response;
        }
    }
});
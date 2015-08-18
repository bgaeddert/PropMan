angular.module('propman').factory('propertyFactory', function($http){
    return {
        getProperties: function(requestData){
            var url = '/api/properties';
            var response = $http({
                method: "get",
                url: url,
                params: requestData
            });
            return response;
        },
        getShow: function(requestData){
            var url = '/api/properties/'+ requestData.id;
            var response = $http({
                method: "get",
                url: url
            });
            return response;
        },
        getCreate: function(requestData){
            var url = '/api/properties/create/' ;
            var response = $http({
                method: "get",
                url: url,
                params: requestData
            });
            return response;
        },
        getEdit: function(requestData){
            var url = '/api/properties/'+ requestData.id + '/edit/' ;
            var response = $http({
                method: "get",
                url: url
            });
            return response;
        },
        putUpdate: function(requestData){
            var url = '/api/properties/'+ requestData.id ;
            var response = $http({
                method: "put",
                url: url,
                data: requestData
            });
            return response;
        },
        getOwnerOptions: function(requestData){
            var url = '/api/owners';
            var response = $http({
                method: "get",
                url: url,
                params: requestData
            });
            return response;
        }
    }
});
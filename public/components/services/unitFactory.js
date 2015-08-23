angular.module('propman').factory('unitFactory', function($http,$sce){
    return {
        getAll: function(requestData){
            var url = '/api/units';
            var response = $http({
                method: "get",
                url: url,
                params: requestData
            });
            return response;
        },
        getShow: function(requestData){
            var url = '/api/units/'+ requestData.id;
            var response = $http({
                method: "get",
                url: url
            });
            return response;
        },
        postStore: function(requestData){
            var url = '/api/units/' ;
            var response = $http({
                method: "post",
                url: url,
                data: requestData
            });
            return response;
        },
        getEdit: function(requestData){
            var url = '/api/units/'+ requestData.id + '/edit/' ;
            var response = $http({
                method: "get",
                url: url
            });
            return response;
        },
        putUpdate: function(requestData){
            var url = '/api/units/'+ requestData.id ;
            var response = $http({
                method: "put",
                url: url,
                data: requestData
            });
            return response;
        },
        getPropertyOptions: function(requestData){
            var url = '/api/properties/';
            var response = $http({
                method: "get",
                url: url,
                params: requestData
            });
            return response;
        }
    }
});
angular.module('propman').factory('userFactory', function($http){
    return {
        getUsers: function(requestData){
            var url = '/api/users';
            var response = $http({
                method: "get",
                url: url,
                params: requestData
            });
            return response;
        },
        postTest: function(requestData){
            var url = '/api/users/test';
            var response = $http({
                method: "post",
                url: url,
                data: requestData
            });
            return response;
        }
    }
});
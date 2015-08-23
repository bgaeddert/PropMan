angular.module('propman').factory('handlerFactory', function($http, $sce){
    return {
        errorHandler: function(error, message){

            if(!message){
                message = error.message;
            }

            toastr.error(message);
            console.log(error);
        },

        successHandler: function(message){

            if(!message){
                message = 'Success!';
            }

            toastr.success(message);
        },

        warningHandler: function(scope, message){
            scope.tmp.warning = {};
            scope.tmp.warning.title = $sce.trustAsHtml(message);
            scope.tmp.warn = true;
        }
    }
});
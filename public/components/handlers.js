function errorHandler(error,message){

    if( ! message){
        message = error.message;
    }

    toastr.error(message);
    console.log(error);
}

function successHandler(message){

    if( ! message){
        message = 'Success!';
    }

    toastr.success(message);
}

function warningHandler(scope,message){
    scope.tmp.warn = true;
    scope.tmp.warning = {};
    scope.tmp.warning.title = $sce.trustAsHtml(message);
    console.log(scope);
}
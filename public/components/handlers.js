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
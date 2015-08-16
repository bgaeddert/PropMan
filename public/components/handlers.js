function errorHandler(error,message){

    if( ! message){
        message = error.message;
    }

    toastr.error(message);
    console.log(error);
}


const ErrorResponse = require('../utils/errorResponse');


const errorHandler = (err,req,res,next)=>{
    let error = {...err};
       error.message = err.message;
       console.log(err.message);
       console.log(err.errors);
        //console.log(typeof err);
        // console.log(err.name);

// moongoose bad objectId 
if(err.name==='CastError'){
    const message = `resource not found with id ${req.params.id} and ${err.value}`;
    error = new ErrorResponse(message,404);
}

// mongoose duplicate key

if(err.code===11000){
    const message='duplicate entries found';
    error = new ErrorResponse(message,400);
}

// monngosse validation error

if(err.name==='ValidationError'){
const message = Object.values(err.errors).map(val=>val.message);
error = new ErrorResponse(message,400);
}

res.status(error.statusCode||500).json({
    success:false,
    error:error.message || "server error "
})
}

module.exports = errorHandler;



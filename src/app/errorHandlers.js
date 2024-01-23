
const notFoundHandler = (_req,_res,next)=>{
    const error = new Error('Resource not found!')
    error.status = 404
    next(error)
}

const globalErrorHandler = (error,_req,res,_next)=>{
    const message = error.message? error.message : 'Server Error Ocurred!';
    const status = error.status? error.status : 500;
    res.status(status).json({message:message});
}

module.exports = {
    notFoundHandler,globalErrorHandler
}
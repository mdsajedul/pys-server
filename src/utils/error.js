const error = (message = "Something went wrong",status=500)=>{
    const err = new Error(message);
    err.status = status;
    return err;
}
module.exports = error;
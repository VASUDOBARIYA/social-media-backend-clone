class ApiError extends Error {
    constructor(
        statuscode,
        message = "Something went wrong",
        error = [],
        stack = ""
    ){
        super(message)
        this.statuscode = statuscode
        this.errors = error
        this.stack = stack
        this.data = null
        this.success = false

        if(stack){
            this.stack = stack
        }
        else{
            Error.captureStackTrace(this,this.constructor)
        }
    }
}

export default ApiError
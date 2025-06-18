import asyncHandler from '../utils/asyncHandler.js'

const RegisterUser = asyncHandler( (req ,res) => {
    res.status(200).json({
        messeage : "Welcome!"
    })
})

export default RegisterUser
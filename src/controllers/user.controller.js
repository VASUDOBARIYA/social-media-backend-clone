import asyncHandler from '../utils/asyncHandler.js'
import Apierror from '../utils/ApiError.js'
import {User} from '../models/user.model.js'
import uploadOnCloudinary from '../utils/cloudinary.js'
import ApiResponse from '../utils/ApiResponse.js'


const RegisterUser = asyncHandler( async (req ,res) => {
    const {username,fullname,email,password} = req.body

    if(fullname === "" || username === "" || email === "" || password == ""){
        throw new Apierror(400,"All fields are required")
    }

    const existedUser = User.findOne({
        $or : [{username},{email}]
    })

    if(existedUser) {
        throw new Apierror(409,"Username or email is already exist!") 
    }

    const avatarLocalPath = req.files?.avatar[0]?.path

    const coverImageLocalPath = req.files?.coverImage[0]?.path

    if(!avatarLocalPath) {
        throw new Apierror(400,"Avatar file is required!")
    }
    
    const avatar = await uploadOnCloudinary(avatarLocalPath)

    const converImage = await uploadOnCloudinary(coverImageLocalPath)

    if(!avatar){
        throw new Apierror(400,"Avatar file is required!")
    }

    const user = await User.create({
        fullname,
        avatar : avatar.url,
        coverImage : converImage?.url || "",
        email,
        password,
        username : username.toLowerCase() 
    })

    const createduser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!createduser){
        throw new Apierror(500,"Something went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200,createduser,"user created successfully")
    )
})


export default RegisterUser

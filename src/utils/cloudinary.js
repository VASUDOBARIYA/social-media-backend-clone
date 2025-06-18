import { v2 } from "cloudinary";
import fs from 'fs'

v2.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilepath) => {
    try {
        if(!localFilepath) return null;
        const response = await v2.uploader.upload(localFilepath,{
            resource_type : "auto"
        })
        console.log("file is uploaded successfully",response.url)
        return response
    } catch (error) {
        fs.unlinkSync(localFilepath) // remove locally saved temporary file 
        return null
    }
}

export default uploadOnCloudinary;
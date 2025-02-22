import { v2 as cloudinary } from "cloudinary"
import fs from "fs"

// Cloudinary Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilepath) => {

    try {
        if (!localFilepath) return null;

        // Uploading the file on Cloudinary
        const uploadResult = await cloudinary.uploader
            .upload(
                localFilepath,
                {
                    resource_type: 'auto',
                }
            )

        fs.unlinkSync(localFilepath);

        return uploadResult;
    }
    catch (error) {

        // remove the locally saved temporary file from the server as the upload operation failed
        fs.unlinkSync(localFilepath);

        return null;
    }
}

export default uploadOnCloudinary
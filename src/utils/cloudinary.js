import { v2 as cloudinary } from "cloudinary"
import fs from "fs"

// Cloudinary Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath) => {

    try {
        if (!localFilePath) return null;

        // Uploading the file on Cloudinary
        const uploadResult = await cloudinary.uploader
            .upload(
                localFilePath,
                {
                    resource_type: 'auto',
                }
            );

        fs.unlinkSync(localFilePath);

        return uploadResult;
    }
    catch (error) {

        // remove the locally saved temporary file from the server as the upload operation failed
        fs.unlinkSync(localFilePath);

        return null;
    }
}

const deleteOnCloudinary = async (public_id, resource_type = "image") => {

    try {
        if (!public_id) {
            return null;
        }

        const deleteResult = await cloudinary.uploader
            .destroy(
                public_id,
                {
                    resource_type: `${resource_type}`
                }
            );
    }
    catch (err) {
        console.log("Delete on cloudinary failed", err);
    }
}

export { uploadOnCloudinary, deleteOnCloudinary }
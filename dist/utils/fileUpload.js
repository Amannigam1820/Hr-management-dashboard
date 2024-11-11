import { v2 as cloudinary } from 'cloudinary';
async function uploadToCloudinary(file, folder) {
    //console.log(file);
    if (!file || !file.tempFilePath) {
        throw new Error('No file provided or file path is empty');
    }
    try {
        // Upload the file to the specified folder in Cloudinary
        const cloudinaryResponse = await cloudinary.uploader.upload(file.tempFilePath, {
            folder: folder,
        });
        // Return the secure URL of the uploaded file
        // public_id: cloudinaryResponse.public_id,
        //   url: cloudinaryResponse.secure_url
        const cloudinarys = {
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url
        };
        //console.log(cloudinarys);
        return cloudinarys;
    }
    catch (error) {
        console.error('Error uploading file to Cloudinary:', error);
        throw new Error('Failed to upload file to Cloudinary');
    }
}
export { uploadToCloudinary };

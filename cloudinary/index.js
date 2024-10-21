import { v2 as cloudinary } from 'cloudinary'; // v2 import for cloudinary
import dotenv from 'dotenv';
import { CloudinaryStorage } from 'multer-storage-cloudinary'; // Correct import path for CloudinaryStorage

// Load environment variables
dotenv.config({
    path: "../.env"
})


// Cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});



// Multer storage configuration using Cloudinary
const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'SocialMediaTask', // Specify folder in Cloudinary
        allowed_formats: ['jpeg', 'png', 'jpg'], // Specify allowed formats
    },
});

// Export cloudinary and storage
export { cloudinary, storage };

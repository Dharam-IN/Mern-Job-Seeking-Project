import app from "./app.js";
import cloudinary from 'cloudinary';

const PORT = 5000; // process.env.PORT ||

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLIENT_NAME,
    api_key: process.env.CLOUDINARY_CLIENT_API,
    api_secret: process.env.CLOUDINARY_CLIENT_SECRET
})

app.listen(PORT, () => {
    console.log(`Server Running on port number ${PORT}`)
})

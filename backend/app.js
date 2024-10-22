import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
import { storage } from '../cloudinary/index.js';

dotenv.config({
    path: "../.env"
})


const app = express();
app.use(cors());

app.use(express.json());

// Connect to MongoDB
const url=process.env.MONGODB_URL;
console.log(url)
mongoose.connect(url)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log(err));

// Schema and Model for storing user data
const userSchema = new mongoose.Schema({
    name: String,
    socialHandle: String,
    images: [String]
});
const User = mongoose.model('User', userSchema);

// Setup Multer for image uploads
const upload = multer({ storage }); 

// API to handle form submission
app.post('/submit', upload.array('images', 10), async (req, res) => {
    const { name, socialHandle } = req.body;
    const images = req.files.map(file => file.path);
    try {
        const user = new User({ name, socialHandle, images });
        await user.save();
        res.status(200).json({ message: 'Submission successful!' });
    } catch (err) {
        res.status(500).json({ message: 'Error saving user data', error: err });
    }
});

app.get('/', (req, res) => {
    res.send('Hello World!');
})
// API to fetch submitted data
app.get('/submissions', async (req, res) => {
    try {
        const submissions = await User.find();
        res.status(200).json(submissions);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching submissions', error: err });
    }
});

// Serve uploaded images
app.use('/uploads', express.static('uploads'));

// Start the server
const PORT = process.env.PORT || 5000;
console.log(process.env.PORT);
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

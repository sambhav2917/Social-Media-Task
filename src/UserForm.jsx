// src/components/UserForm.js
import React, { useState } from 'react';
import axios from 'axios';
import './UserForm.css';
import { useNavigate } from 'react-router-dom';

const UserForm = () => {
    const [name, setName] = useState('');
    const [socialHandle, setSocialHandle] = useState('');
    const [images, setImages] = useState([]);

    const handleImageChange = (e) => {
        console.log(e.target.files);
        setImages(e.target.files);
    };

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('socialHandle', socialHandle);
        for (let i = 0; i < images.length; i++) {
            formData.append('images', images[i]);
        }

        try {
            const response = await axios.post('http://localhost:5000/submit', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(response.data.message);
            // Redirect user to the home page after successful submission
            navigate('/');
        } catch (error) {
            console.error('There was an error submitting the form', error);
        }
    };

    return (
        <>
            <h1>User Submission Form</h1>
             <form onSubmit={handleSubmit}>
            <div>
                <label>Name:</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
                <label>Social Media Handle:</label>
                <input type="text" value={socialHandle} onChange={(e) => setSocialHandle(e.target.value)} />
            </div>
            <div>
                <label>Upload Images:</label>
                <input type="file" multiple onChange={handleImageChange} />
            </div>
            <button type="submit">Submit</button>
            </form>
        </>
       
    );
};

export default UserForm;

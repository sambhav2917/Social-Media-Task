// src/components/AdminDashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
    const [submissions, setSubmissions] = useState([]);

    useEffect(() => {
        const fetchSubmissions = async () => {
            try {
                const response = await axios.get('http://localhost:5000/submissions');
                setSubmissions(response.data);
            } catch (error) {
                console.error('Error fetching submissions', error);
            }
        };
        fetchSubmissions();
    }, []);

    return (
        <div>
            <h2>User Submissions</h2>
            <ul>
                {submissions.map(submission => (
                    <li key={submission._id}>
                        <p>Name: {submission.name}</p>
                        <p>Social Handle: {submission.socialHandle}</p>
                        <div>
                            {submission.images.map((image, index) => (
                                <img key={index} src={image} alt="submission" width="100" />
                            ))}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminDashboard;

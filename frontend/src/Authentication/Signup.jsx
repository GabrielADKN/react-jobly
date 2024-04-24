import React, { useState } from 'react';
import JoblyApi from '../api';

function SignupForm({ setToken }) {
    const [formData, setFormData] = useState({ username: '', password: '', firstName: '', lastName: '', email: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(data => ({ ...data, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = await JoblyApi.signup(formData);
            setToken(token);
            JoblyApi.token = token;
        } catch (errors) {
            console.error("Signup failed:", errors);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input name="username" value={formData.username} onChange={handleChange} placeholder="Username" />
            <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" />
            <input name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" />
            <input name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" />
            <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
            <button type="submit">Sign Up</button>
        </form>
    );
}

export default SignupForm;

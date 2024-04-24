import React, { useState } from 'react';
import JoblyApi from '../api';

function LoginForm({ setToken }) {
    const [formData, setFormData] = useState({ username: '', password: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(data => ({ ...data, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = await JoblyApi.login(formData);
            setToken(token);
            JoblyApi.token = token;
        } catch (errors) {
            console.error("Login failed:", errors);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input name="username" value={formData.username} onChange={handleChange} placeholder="Username" />
            <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" />
            <button type="submit">Log In</button>
        </form>
    );
}

export default LoginForm;

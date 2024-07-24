import React, { useState } from 'react';
import './AdminRegister.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminRegister = () => {
  // Logic for registration
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    const response = await axios.post('http://localhost:3000/Admin/register', {
      username,
      email,
      password,
    });
    try {
      setError('');
      console.log(response.data);
      // Redirect to login page after successful registration
      navigate('/');
    } catch (error) {
      console.error(error);
      setError(error.response.data.error);
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <h3>Admin Register</h3>
        <form onSubmit={handleSubmit}>
          <label>Username</label> <br />
          <input
            type="text"
            name="username"
            required
            onChange={(e) => setUsername(e.target.value)}
          />
          <br />
          <label>Email</label> <br />
          <input
            type="email"
            name="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <label>Password</label> <br />
          <input
            type="password"
            name="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <label>confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <br />
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default AdminRegister;

import React, { useState } from 'react';
import './ForgotPassword.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = `http://localhost:3000/Admin/forgotpassword`;
    const response = await axios.post(url, {
      email,
    });
    console.log(response);
    try {
      navigate('/');
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };

  return (
    <div className="forgotpassword-container" onSubmit={handleSubmit}>
      <h3>Input Valid Email</h3>
      <form className="forgotpassword-form">
        <label>
          Email:
          <input
            type="email"
            name="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <input type="submit" value="Submit" />
        <p>
          <a href="/">Back to Login</a>
        </p>
      </form>
    </div>
  );
};

export default ForgotPassword;

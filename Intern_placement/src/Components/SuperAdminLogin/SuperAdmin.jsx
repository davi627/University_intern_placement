import React, { useState } from 'react';
import './SuperAdmin.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SuperAdmin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;
  const handlesubmit = async (e) => {
    e.preventDefault();
    // API call to login user
    const response = await axios.post('http://localhost:3000/Admin/login', {
      email,
      password,
    });
    try {
      setError('');
      console.log(response.data);
      // Redirect to Dashboard after successful registration
      navigate('/dashboard');
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to register. Please try again.');
    }
  };

  return (
    <div className="superadmin-container">
      <div className="superadmin-form-container">
        <form className="superadmin-form" onSubmit={handlesubmit}>
          <h3>Login</h3>
          <label>Email</label> <br />
          <input
            type="email"
            name="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <label>Password</label>
          <br />
          <input
            type="password"
            name="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <button type="submit">Login</button>
          <br />
          <p>
            Don't have an account? Sign Up <a href="/adminreg">here</a>
          </p>
          <p>
            Forgot Password? <a href="/aforgotpassword">Reset</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SuperAdmin;

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
const Reset = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = `http://localhost:3000/Admin/resetpassword`;
    try {
      const response = await axios.post(url, {
        password,
      });
      console.log(response);
      navigate('/');
    } catch (error) {
      console.log(error);
      setError('Failed to reset password');
    }
  };
  return (
    <div>
      <form className="reset-form" onSubmit={handleSubmit}>
        <label>Input New Password</label>
        <input
          type="password"
          placeholder="New Password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
};

export default Reset;

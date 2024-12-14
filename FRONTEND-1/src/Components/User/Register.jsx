
import { useState } from 'react';
import axios from 'axios';
import {Link, useNavigate } from 'react-router-dom';
import './styles.css'
import Navbar from '../home/Navbar';

const Register = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '', role: 'model' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/register', formData);
      navigate('/login');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Navbar/>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
        <select name="role" value={formData.role} onChange={handleChange}>
          <option value="model">Model</option>
          <option value="photographer">Photographer</option>
        </select>
        <button type="submit">Register</button>
        <p>Have an Account? <Link to ="/login">Login</Link></p>
      </form>
      <button><Link to="/asignup">Admin Login</Link></button><br />
    </div>
  );
};

export default Register;

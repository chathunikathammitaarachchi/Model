//Login.jsx//
import { useState } from 'react';
import axios from 'axios';
import { Link,useNavigate } from 'react-router-dom';
import Navbar from '../home/Navbar';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', formData);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('role', response.data.role);
      navigate('/profile');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Navbar/>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
        <Link to="/forgotPassword">Forgot Password?</Link>
        <p>Do not have Account? <Link to ="/">Register</Link></p>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;


import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';


const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

 
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios
        .get('http://localhost:5000/api/auth/profile', {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setUserData(response.data);
        })
        .catch((err) => {
          console.log('Error fetching profile:', err);
        });
    }
  }, []);

  return (
    <div className="user-profile">
      {userData ? (
        <div>
          <h2>Welcome, {userData.username}</h2>
          <p>Email: {userData.email}</p>
          <p>Role: {userData.role}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <div className="profile-links">
        <button><Link to="/scheduling">Scheduling</Link></button><br />
        <button><Link to="/updateprofile">Update Profile</Link></button>
      </div>
    </div>
  );
};

export default UserProfile;

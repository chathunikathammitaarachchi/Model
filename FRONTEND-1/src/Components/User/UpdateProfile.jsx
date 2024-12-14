import { useState } from 'react';
import axios from 'axios';

const UserProfileForm = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [district, setDistrict] = useState('');
  const [qualification, setQualification] = useState('');
  const [educationLevel, setEducationLevel] = useState('');
  const [introduction, setIntroduction] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Form data setup
    const formData = new FormData();
    formData.append('name', name);
    formData.append('address', address);
    formData.append('district', district);
    formData.append('qualification', qualification);
    formData.append('educationLevel', educationLevel);
    formData.append('introduction', introduction);
  
    if (profilePicture) {
      formData.append('profilePicture', profilePicture);
    }
  
    try {
      const response = await axios.post('http://localhost:5000/api/update', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Profile updated successfully');
      console.log(response.data);
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Error updating profile: ' + error.response?.data?.message || error.message);
    }
  };
  
  return (
    <div>
      <h2>Update Profile</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <textarea
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <input
          type="text"
          placeholder="District"
          value={district}
          onChange={(e) => setDistrict(e.target.value)}
        />
        <input
          type="text"
          placeholder="Qualification"
          value={qualification}
          onChange={(e) => setQualification(e.target.value)}
        />
        <input
          type="text"
          placeholder="Education Level"
          value={educationLevel}
          onChange={(e) => setEducationLevel(e.target.value)}
        />
        <textarea
          placeholder="Introduction"
          value={introduction}
          onChange={(e) => setIntroduction(e.target.value)}
        />
        <input
          type="file"
          onChange={(e) => setProfilePicture(e.target.files[0])}
        />
        <button type="submit">Update Profile</button>
       
      </form>
    </div>
  );
};

export default UserProfileForm;

import { useState } from 'react';
import Axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function ResetPassword() {
  const [password, setPassword] = useState(''); 
  const [errorMessage, setErrorMessage] = useState(''); 
  const { token } = useParams(); 
  const navigate = useNavigate(); 
  const handleSubmit = (e) => {
    e.preventDefault();

   
    if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters long.");
      return;
    }

    
    Axios.post(`http://localhost:5000/api/auth/reset-password/${token}`, { password })
      .then((response) => {
        if (response.data.status) {
          navigate('/login'); 
        } else {
          setErrorMessage(response.data.message || "Something went wrong.");
        }
        console.log(response.data);
      })
      .catch((err) => {
        console.error(err);
        setErrorMessage("Something went wrong. Please try again."); 
      });
  };

  return (
    <div className="reset-password-container">
      <form className="reset-password-form" onSubmit={handleSubmit}>
        <h2>Reset Password</h2>

       
        {errorMessage && (
          <div className="error-message">{errorMessage}</div>
        )}

        <label htmlFor="password">New Password:</label>
        <input
          type="password"
          placeholder="Enter your new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} 
        />

        <button type="submit">Reset</button>
      </form>
    </div>
  );
}

export default ResetPassword;

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/home/Home";
import Register from './Components/User/Register';
import Login from './Components/User/Login';
import ForgotPassword from './Components/User/ForgotPassword';
import ResetPassword from './Components/User/ResetPassword';
import UserProfile from "./Components/User/UserProfile";
import UpdateProfile from "./Components/User/UpdateProfile"
import UserProfileView from "./Components/User/UserProfileView";
import Scheduling from "./Components/sheduling/Scheduling";  
import Review from "./Components/review/Review";







function App() {
  return (
    <div>
      <BrowserRouter>
  
        <Routes>
     
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/resetpassword/:token" element={<ResetPassword />} />
          <Route path="/profile" element={<UserProfile/>} />
          <Route path="/updateprofile" element={<UpdateProfile/>} />
          <Route path="/viewprofile" element={<UserProfileView/>} />
          <Route path="/scheduling" element={<Scheduling/>} />
          <Route path="/review" element={<Review/>} />
          
          
          
          
        </Routes>
      </BrowserRouter>
    
    </div>
  );
}

export default App;
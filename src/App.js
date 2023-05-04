import './App.css';
import Signin from './pages/Signin';
import SignUp from './pages/Signup';
import PropertyDetails from './pages/PropertyDetails';
import { Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import Profile from './pages/Profile';
import PlaceAd from './pages/PlaceAd';
import MyListings from './pages/MyListings';
import EditProperty from './pages/EditProperty';
import OtherUsersListing from './pages/OtherUsersListing';
import Messenger from './pages/Messenger';
import Recommendations from './pages/Recommendations';
import AdminDashboard from './pages/AdminDashboard';
import MonitorListings from './pages/MonitorListings';


function App() {
  return (
    
     <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/property/:id" element={<PropertyDetails/>} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/profile" element ={<Profile/>} />
      <Route path="/postAd" element={<PlaceAd/>} />
      <Route path="/myListings" element={<MyListings/>} />
      <Route path="/editProperty/:id" element={<EditProperty/>} />
      <Route path="/otherUsersListing/:id" element={<OtherUsersListing/>} />
      <Route path="/messenger" element={<Messenger/>} />
      <Route path="/recommendations" element = {<Recommendations/>}/>
      <Route path="/adminDashboard" element={<AdminDashboard/>} />
      <Route path ="/adminDashboard/userProperties/:id" element={<MonitorListings/>} />

    </Routes>
   
    
    
  );
}

export default App;

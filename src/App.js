import './App.css';
import Signin from './pages/Signin';
import SignUp from './pages/Signup';
import PropertyDetails from './pages/PropertyDetails';
import { Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import Profile from './pages/Profile';
import PlaceAd from './pages/PlaceAd';

function App() {
  return (
    
     <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/property/:id" element={<PropertyDetails/>} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/profile" element ={<Profile/>} />
      <Route path="/postAd" element={<PlaceAd/>} />
      
      
    </Routes>
   
    
    
  );
}

export default App;

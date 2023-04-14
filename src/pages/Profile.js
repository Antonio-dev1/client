import {useState , useEffect , useCallback , useContext} from 'react';
import {useDropzone} from 'react-dropzone';
import axios from 'axios';
import {UserContext} from '../components/UserContext';
import jwt_decode from 'jwt-decode';
const Profile = () => {
    const [imagefileUrl, setImageFileUrl] = useState([]);
    const [userData , setUserData] = useState({});
    const [isUploading, setIsUploading] = useState(false);
    const [phoneNumber  , setPhoneNumber] = useState('');
    const [profilePicture , setProfilePicture] = useState('');
    const [email , setEmail] = useState('');
    const [password , setPassword] = useState('');
    const {jwt} = useContext(UserContext);
    console.log(jwt);
    const decoded = jwt_decode(jwt);
    console.log(decoded)

    const handlePhoneNumberChange = (event) => {
        setPhoneNumber(event.target.value);
      };
    
      const handleProfilePictureChange = (event) => {
        setProfilePicture(event.target.value);
      };

      const handleEmailChange = (event) => {
        setEmail(event.target.value);
      };

      const handleSave = (event) => {

      };
    
    useEffect(() => {
        //get the user data based on the user id decoded.id
        axios.get('http://localhost:3001/api/users/'+decoded.id , {
            headers: {
                Authorization: `Bearer ${jwt}`
            }}).then((response) => {
                setUserData(response.data);
                setPhoneNumber(response.data.phoneNumber);
                setEmail(response.data.email);
                setImageFileUrl(response.data.profilePicture);
            })
            .catch((error) => {
                console.log(error);
            });
        
    } , []);

    return ( 
        <div className="flex flex-col items-center">
        <div className="mt-4">
          <img
            src={profilePicture}
            alt="Profile Picture"
            className="rounded-full h-20 w-20 object-cover"
          />
          <input
            type="file"
            onChange={handleProfilePictureChange}
            className="mt-2"
            value={imagefileUrl}
          />
        </div>
        <div className="mt-4">
          <label htmlFor="phone-number">Phone Number:</label>
          <input
            type="text"
            id="phone-number"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
            className="border-2 border-gray-300 p-2 rounded-md mt-2"
          />
        </div>
        <div className="mt-4">
          <label htmlFor="email">Email:</label>
          <textarea
            id="email"
            value={email}
            onChange={handleEmailChange}
            className="border-2 border-gray-300 p-2 rounded-md mt-2"
          ></textarea>
        </div>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-md mt-4"
          onClick={handleSave}
        >
          Save
        </button>
      </div>
     );
}
 
export default Profile;
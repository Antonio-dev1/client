import {useState , useEffect , useCallback , useContext} from 'react';
import {useDropzone} from 'react-dropzone';
import axios from 'axios';
import {UserContext} from '../components/UserContext';
import jwt_decode from 'jwt-decode';
import UserSettingsForm from '../components/UserSettingsForm';
import NavBar from '../components/navbar.js';
const Profile = () => {
    const [imagefileUrl, setImageFileUrl] = useState([]);
    const [userData , setUserData] = useState({});
    const [isUploading, setIsUploading] = useState(false);
    const [phoneNumber  , setPhoneNumber] = useState('');
    const [profilePicture , setProfilePicture] = useState('');
    const [email , setEmail] = useState('');
    const [password , setPassword] = useState('');
    const {jwt , decodedJWT} = useContext(UserContext);

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
        axios.get('http://localhost:3001/api/users/'+decodedJWT.id , {
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
      <div>
      <NavBar> </NavBar>
      <div className="flex flex-col items-center justify-center w-full bg-gradient-to-t from-[#f6eef6] to-[#feeaff] rounded-lg">
        <UserSettingsForm></UserSettingsForm>
        </div>
        </div>
     );
}
 
export default Profile;
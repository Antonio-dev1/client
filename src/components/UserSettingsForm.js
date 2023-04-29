import {useState , useEffect , useCallback , useContext} from 'react';
import {useDropzone} from 'react-dropzone';
import axios from 'axios';
import {UserContext} from '../components/UserContext';
import jwtDecode from 'jwt-decode';
import avatar from '../assets/imgs/avatar.png';
import FormData from 'form-data';

//Need to fix the loading image functionality it does not load the image when the page is loaded

const UserSettingsForm  = () => {
  const [imagefile, setImageFile] = useState('');
  const [userData , setUserData] = useState([]);
  const [birthDate , setBirthDate] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [phoneNumber  , setPhoneNumber] = useState('');
  const [profilePicture , setProfilePicture] = useState('');
  const [gender , setGender] = useState('');
  const [email , setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [password , setPassword] = useState('');
  const [retypedPassword , setRetypedPassword] = useState('');
  const [noChange , setNoChange] = useState(false);
  const jwt = sessionStorage.getItem('jwt')
  console.log(jwt)
  const id = jwtDecode(sessionStorage.getItem('jwt')).id
  const {handleLogout} = useContext(UserContext);

  const handlePhoneNumberChange = (event) => {
      setPhoneNumber(event.target.value);
      
    };
  
    const handleProfilePictureChange = (event) => {
      const file = event.target.files[0];
      const reader = new FileReader();
      
      reader.onload = () => {
        setProfilePicture(URL.createObjectURL(file));
        setImageFile(file);
        console.log("I'm in the profile picture Change" , profilePicture);
      };

      reader.readAsDataURL(file);

    };

    const handleEmailChange = (event) => {
      setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
      setPassword(event.target.value);
    };

    const handleRetypedPasswordChange = (event) => {
      setRetypedPassword(event.target.value);
    };

    const handleDateChange = (event) => {
      setBirthDate(event.target.value);
    };

    const handleGenderChange = (event) => {
      setGender(event.target.value);
      console.log(gender);
    };

    



    const updateProfilePicture = (event) => {
      if(event){
        event.preventDefault();
      }
      const formdata = new FormData();
      formdata.append('profilePicture' , imagefile);
      axios.post('http://localhost:3001/api/users/profilePicture/'+id , formdata ,{
        headers: {
          Authorization: `Bearer ${jwt}`
        }
      }).then((response) => {
        console.log(response);  
      }).catch((error) => {
        console.log(error);
      })
    };

    const handleSave = (event) => {
       if(event){
        event.preventDefault();
       }
       axios.put('http://localhost:3001/api/users/'+id , {
       
        email : email,
        phoneNumber : phoneNumber,
        profilePicture : profilePicture,
        dateofBirth : birthDate,
        gender : gender
        
      } , {
        headers: {
          Authorization: `Bearer ${jwt}`
        }
      }).then((response) => {
        console.log(response);
       

      }).catch((error) => {
        console.log(error)
      });
       
    };

    const handleCancel  = (event) => {
      event.preventDefault();
      setPhoneNumber(userData.phoneNumber);
      setEmail(userData.email);
      setProfilePicture(userData.profilePicture);
      setBirthDate(userData.dateofBirth);
      setPassword('');
      setRetypedPassword('');
    };

    const handleResetPassword = (event) => {
      console.log(jwt)
      if(event){
        event.preventDefault();
      }
      if(password === retypedPassword){
      axios.put('http://localhost:3001/api/users/resetPassword/'+id , {
       
        password: password
      } , {
        headers: {
          Authorization: `Bearer ${jwt}`
        }
      }).then((response) => {
        console.log(response);
        handleLogout();

      }).catch((error) => {
        console.log(error)
      });
    };
    };

    useEffect(() => {
      if(phoneNumber === userData.phoneNumber && email === userData.email) {
        setNoChange(false);
       }

       else{
          setNoChange(true);
       }
    } , [phoneNumber , email]);
    const fetchUserData = async () => {
      try{
        const response = await axios.get('http://localhost:3001/api/users/'+id , {
            headers: {
              Authorization: `Bearer ${jwt}`
            }
        });
        setUserData(response.data);
        setEmail(response.data.email);
        setPhoneNumber(response.data.phoneNumber);
        setBirthDate(response.data.dateofBirth);
        setGender(response.data.gender);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

  
  useEffect(() => {
      //get the user data based on the user id decoded.id
      fetchUserData();
      
  } , []);  


  const fetchUserProfilePicture = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/users/profilePicture/'+id , {
        headers: {
          Authorization: `Bearer ${jwt}`
        }
      });
      if(response.data !== null){
      setProfilePicture(response.data.imageFileUrl);
      console.log(response.data.imageFileUrl)
      }
    }
    catch(error){
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserProfilePicture();
  } , [])
      


    if(isLoading){
      return <div>Loading...</div>;
    }
    
  


  return ( 


        <form className="mt-5 bg-white rounded-lg" encType="multipart/form-data" >
        <div className="space-y-12 mx-5 ">
          <div className="border-b border-gray-900/10 pb-12 mt-5">
            <h2 className="text-xl font-medium leading-7 text-gray-900"><span className= "text-violet-500 font-bold text-xl">{userData.fullName}'s </span> profile</h2>
            <p className="mt-1 font-medium text-black">
              This information will be displayed publicly so be careful what you share.
            </p>
  
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
              </div>
  
              
  
              <div className="col-span-full mx-5">
                <label htmlFor="photo" className=" font-medium leading-6 text-gray-900">
                  Photo
                </label>
                <div className="mt-2 flex items-center gap-x-3">
                    <label>Change Picture</label>
                  <input
                    type="file"
                    name="profilePicture"
                    defaultValue=''
                    onChange={handleProfilePictureChange}
                    
                    className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  />
                </div>
                <div className='mt-10 px-6 py-8 rounded-lg border-red-600 '>
                   {profilePicture ? (<img src={profilePicture}  alt='picture' className=" w-40 h-30 rounded-full mt-3 border-gray-100" />):(<img src={avatar} alt='picture' className="mt-3 border-r-[1/2] border-gray-100" />) } 
                </div>
                <div>
                  <button onClick={(e) => updateProfilePicture(e)} className= " mt-5 mx-5 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"> Update Image!</button>
                </div>
              </div>
            </div>
          </div>
  
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                  First name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="first-name"
                    defaultValue={userData.fullName.split(' ')[0]}
                    placeholder= {userData.fullName.split(' ')[0]}
                    id="first-name"
                    autoComplete="given-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                
              </div>
  
              <div className="sm:col-span-3">
                <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                  Last name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="last-name"
                    defaultValue={userData.fullName.split(' ')[1]}
                    id="last-name"
                    autoComplete="family-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
  
              <div className="sm:col-span-4">
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    defaultValue={userData.email}
                    onChange={(e) => handleEmailChange(e)}
                    autoComplete="email"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                
                <div className="mt-2">
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Phone Number
                </label>
                  <input
                    id="phoneNumber"
                    name="phoneNumber"
                    defaultValue={userData.phoneNumber}
                    onChange={(e) => handlePhoneNumberChange(e)}
                    type="number"
                    autoComplete="phoneNumber"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              
              <div className="sm:col-span-3 grid-cols-1">
                <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                  Gender
                </label>
                <div className="mt-2">
                  <select 
                    value={gender}
                    onChange={(e) => handleGenderChange(e)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    <option value= "Male" >Male</option>
                    <option value = "Female">Female</option>
                    <option value= "Other">Other</option>
                  </select>
                </div>
                <div className="mt-6">
                <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900"> Date of Birth</label>
                <input  type="date" defaultValue = {userData.dateofBirth} onChange={(e) => handleDateChange(e)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
              </div>
                
              </div>
              
  
            </div>
          </div>
          <h2 className="text-base font-semibold leading-7 text-gray-900">Reset Password</h2>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                  New Password 
                </label>
                <div className="mt-2">
                  <input
                    type="password"
                    name="password"
                    onChange={(e) => handlePasswordChange(e)}
                    id="pass"
                    autoComplete="password"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                
              </div>
  
              <div className="sm:col-span-3">
                <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                  Retyped Password
                </label>
                <div className="mt-2">
                  <input
                    type="password"
                    name="password"
                    id="retyped-pass"
                    onChange={(e) => handleRetypedPasswordChange(e)}
                    autoComplete="password"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <button className=" mx-3 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={(e) => handleResetPassword(e)}
              > Reset Password</button>
              </div>
        </div>

        
  
        <div className="mt-6 flex items-center justify-end gap-x-6 mb-5">
          <button onClick={(e) => handleCancel(e)} type="button" className="text-sm font-semibold leading-6 text-gray-900">
            Cancel
          </button>
          <button
            type="submit"
           
            onClick={(e) => handleSave(e)}
            className="mx-3 rounded-md cursor-pointer bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
        
      </form>
    );
}
 
export default UserSettingsForm ;
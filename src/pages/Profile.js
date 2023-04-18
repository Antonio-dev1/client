
import UserSettingsForm from '../components/UserSettingsForm';
import NavBar from '../components/navbar.js';
const Profile = () => {
   
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
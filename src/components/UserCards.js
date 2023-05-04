import Avatar from "../assets/imgs/avatar.png"
import { Link, useNavigate} from "react-router-dom";
import axios from "axios";
const UserCards = ({user , setIsLoading , jwt , setAllUsers}) => {
    const {_id,fullName , profilePicture } = user;

    const navigate = useNavigate();

    const handleDelete = async (e) => {
        setIsLoading(true);
        try {
            const reponse  = await axios.delete("http://localhost:3001/api/users/" + _id , {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            });
            setAllUsers(prevUsers => prevUsers.filter(user => user._id !== _id));
            setIsLoading(false);
        }
        catch(err){
            console.log(err.message);
        };
    }

    const onMonitorListingPressed = (e) => {
        e.preventDefault();
        navigate('/adminDashboard/userProperties/' + _id);

    }

    return ( 
        <div className="w-full max-w-sm bg-violet-100 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 cursor-pointer hover:shadow-2xl transition">
    <div className="flex justify-end px-4 pt-4">
        <button id="dropdownButton" data-dropdown-toggle="dropdown" className="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5" type="button">
            <span className="sr-only">Open dropdown</span>
            <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"></path></svg>
        </button>
        
        <div id="dropdown" className="z-10 hidden text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
            <ul className="py-2" aria-labelledby="dropdownButton">
            <li>
                <button  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Edit </button>
            </li>
            <li>
                <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Export Data</button>
            </li>
            <li>
                <button className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Delete</button>
            </li>
            </ul>
        </div>
    </div>
    <div className="flex flex-col items-center pb-10">
    <Link to = {`/adminDashboard/userProperties/${_id}`}>
        <div>
        {profilePicture? (<img className="" src={profilePicture} alt="profile of the user"/>) :(<img className="" src={Avatar} alt="profile of the user"/>)}
        </div>
        </Link>
        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{fullName}</h5>
        <span className="text-sm text-gray-500 dark:text-gray-400">Realtor</span>
        <div className="flex mt-4 space-x-3 md:mt-6">
        <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={(e) => onMonitorListingPressed(e)}>Monitor Listings</button>
            <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-red-500 border border-gray-300 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700" onClick={(e) => handleDelete(e)}>Delete</button>
        </div>
    </div>
</div>
     );
}
 
export default UserCards ;
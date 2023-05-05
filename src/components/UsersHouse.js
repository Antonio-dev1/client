import { BiBed , BiBath , BiArea } from "react-icons/bi";
import axios from "axios";
import { useNavigate , Link} from "react-router-dom";
import {useState} from "react";
import {ImSpinner2} from 'react-icons/im';

const UsersHouse = ({usershouse , houseid , filteredSearches , isAdmin}) => {

    const {_id , imageurls , complexType, listingType , location, bedrooms, bathrooms ,surface, price} = usershouse;
    const navigate = useNavigate();
    const jwt = sessionStorage.getItem("jwt");
    const [isDeleting , setIsDeleting] = useState(false);
    console.log(jwt)
    const config = {
        headers: { Authorization: `Bearer ${jwt}` }
    }
    const handleDelete = async (e) => {
        console.log("In Delete!")
        console.log("The id is: " + _id);
        try{
        setIsDeleting(true);
        const response = await axios.delete("http://localhost:3001/api/properties/" + _id , config);
        console.log(response);
        setIsDeleting(false);
        
        }
        catch(error){
            console.log(error);
        }
    };

    const handleEdit = async (e) => {
        navigate("/editProperty/" + houseid)
    };

    if(isDeleting){
        <div>
            <ImSpinner2 className="text-violet-500 animate-spin text-2xl"></ImSpinner2>
        </div>
    }

    return ( 

<div className="bg-white shadow-1 p-5 rounded-lg rounded-tl-[90px] w-full max-w-[352px] mx-auto curso-pointer
        hover:shadow-2xl transition">
            <form>
            <Link to = {`/property/${_id}`} >
            <img className= "mb-8" src ={imageurls[0]} alt="House"/>
            </Link>
            <div className="mb-4 flex gap-x-2 text-sm">
                <div className="bg-green-500 rounded-full text-white px-3">{complexType}</div>
                <div className= "bg-violet-500 rounded-full text-white px-3 ">{location.split(',')[0]}</div>
                <div className= "bg-pink-500 rounded-full text-white px-3 ">{listingType}</div>
            </div>
            <div className="txt-lg font-semibold max-w-[260px]">{location.split(',')[1]}</div>
            <div className="flex items-center gap-2">
                <div className='flex items-center text-gray-600 gap-x-4 my-4'>
                    <div className = "text-[20px]">
                        <BiBed/>                  
                    </div>
                    <div>
                        {bedrooms}
                    </div>
                </div>
                <div className='flex items-center text-gray-600 gap-1'>
                    <div className = "text-[20px]">
                        <BiBath/>                  
                    </div>
                    <div>
                        {bathrooms}
                    </div>
                </div>
                <div className='flex items-center text-gray-600 gap-1'>
                    <div className = "text-[20px]">
                        <BiArea/>                  
                    </div>
                    <div>
                        {surface}
                    </div>
                </div>
            </div>
            <div className="text-lg font-semibold text-violet-600 mb-4">$ {price}</div>
            <div>
                <div className=" flex items-center justify-end gap-x-6 mb-10">
                    <div>
                        {isAdmin ? (<div></div>):(<button onClick={handleEdit} className="text-white bg-violet-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Edit</button>)}
                        
                        </div>
                        <div>
                        <button  onClick={(e) => handleDelete(e)} className="text-white bg-pink-300 hover:bg-pink-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Delete</button>
                        </div>
                        </div>
            </div>
            </form>
        </div>


          
     );
}
 
export default UsersHouse; ;
import {useState , useEffect} from 'react';
import {useParams} from 'react-router-dom';
import AdminNav from '../components/AdminNav';
import { ImSpinner2 } from 'react-icons/im';
import UsersBanner from '../components/UsersBanner';
import HouseBanner from "../assets/imgs/recommendation-banner.jpg";
import axios from "axios";
import UsersHouse from '../components/UsersHouse';
const MonitorListings  = () => {
    const {id} = useParams();
    const [userProperties , setUserProperties] = useState([]);
    const [isLoading , setIsLoading] = useState(false);
    const [Owner , setOwner] = useState([{}]);
    const [error , setError] = useState(null);
    const jwt = sessionStorage.getItem("jwt");
    

    const fetchUserHouses = async () => {
       
        setError(null);
        try {
            const response = await axios.get("http://localhost:3001/api/properties/userproperty/" + id);
            setUserProperties(response.data.property);
            
        } catch (error) {
            setError(error.message);
        }
        
    };

    useEffect(() => {
        setIsLoading(true);
        fetchUserHouses();
        setIsLoading(false);
        
    }, []);

    if (isLoading) {
        return (
            
            <div className="flex justify-center items-center">
                <AdminNav/>
                <ImSpinner2 className="mx-auto animate-spin text-violet-700 text-4xl mt-[150px]"></ImSpinner2>
            </div>
        );
    }




    return ( 
        <div>
                <AdminNav/>
            <div className="bg-violet-300 "> 
            <section className="h-full max-h-[640px] mb-8 xl:mb-24 mt-5 ">
            <div className="flex flex-col lg:flex-row"> 
            <div className="lg:ml-8 xl:ml-[135px] flex flex-col items-center lg:items-start text-center lg:text-left justify-center flex-1 px-4
            lg:px-0"> 
            <h1 className="text-4xl lg:text-[58px] font-semibold leading-none mb-6"> 
            <span className="text-violet-500">Monitor</span> the users listings
            </h1>
            <div className='block w-1/2 text-violet-50 text-lg font-bold'>
                You are allowed to delete if the listings do not abide by the rules and regulations of the website
            </div>
             </div>
    <div className="hidden flex-1 lg:flex justify-end items-end ">
            <img  className='rounded-tl-lg w-full' src ={HouseBanner} alt= "House"/>
        </div>
        
    </div>
    </section>
            </div>

            <section className="mb-20">
            <div className="container mx-auto">
                <div className="py-20">
                <div className= "grid md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-14 ">
                {userProperties.map((house , index )=> {
                    return(
                     <UsersHouse  key = {index} usershouse= {house} houseid = {house._id} isAdmin={true}/> 
                    );
                })}
                </div>
                </div>
            </div>
        </section>
            
        </div>
     );
}
 
export default MonitorListings;
import { useState , useEffect } from "react";
import { useParams , Link } from "react-router-dom";
import axios from "axios";
import {ImSpinner2} from 'react-icons/im';
import NavBar from "../components/navbar";
import House from "../components/House";
import HouseBanner from "../assets/imgs/house-listing-page-banner.png";
import Search from "../components/Search";

const OtherUsersListing  = () => {
    const {id} = useParams();
    const [userProperties , setUserProperties] = useState([]);
    const [isLoading , setIsLoading] = useState(false);
    const [Owner , setOwner] = useState([{}]);
    const [error , setError] = useState(null);
    const jwt = sessionStorage.getItem("jwt");
    const config = {
        headers: {
            Authorization: `Bearer ${jwt}`
        }
    }

    const fetchUserHouses = async () => {
       
        setError(null);
        try {
            const response = await axios.get("http://localhost:3001/api/properties/userproperty/" + id);
            setUserProperties(response.data.property);
            
        } catch (error) {
            setError(error.message);
        }
        
    };

    const fetchUserData = async () => {
        
        setError(null);
        try {
            const response = await axios.get("http://localhost:3001/api/users/" + id  , config);
            if(response.data){
            setOwner(response.data);

            }
            
        } catch (error) {
            setError(error.message);
        }
    };

    useEffect(() => {
        setIsLoading(true);
        fetchUserHouses();
        fetchUserData();
        setIsLoading(false);
        
    }, []);

    if (isLoading) {
        <div>
            <NavBar/>
        <div className="flex justify-center items-center h-screen">
            <ImSpinner2 className="animate-spin text-violet-500 text-5xl"></ImSpinner2>
            </div>
    </div>
    }

    return ( 
        <div>
            <div>
            <NavBar/>
            </div>

            <div>
            <section className="h-full max-h-[640px] mb-8 xl:mb-24 mt-5 ">
            <div className="flex flex-col lg:flex-row"> 
            <div className="lg:ml-8 xl:ml-[135px] flex flex-col items-center lg:items-start text-center lg:text-left justify-center flex-1 px-4
            lg:px-0"> 
            <h1 className="text-4xl lg:text-[58px] font-semibold leading-none mb-6"> 
            <span className="text-violet-500">Find</span> {Owner.fullName}'s Listings
            </h1>
        
             </div>
    <div className="hidden flex-1 lg:flex justify-end items-end ">
            <img className='rounded-tl-lg' src ={HouseBanner} alt= "House"/>
        </div>
        
    </div>
    <Search/>
    </section>
            </div>

            <div>
            <section className="mb-20">
            <div className="container mx-auto">
                <div className="py-20">
                <div className= "grid md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-14 ">
                {userProperties.map((house , index )=> {
                    return(
                    <Link to = {`/property/${house._id}`} key={index}> <House house= {house}/> </Link>
                    );
                })}
                </div>
                </div>
            </div>
            
        </section>
            </div>

        </div>
     );
}
 
export default OtherUsersListing;
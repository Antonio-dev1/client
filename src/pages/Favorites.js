import { useState , useEffect } from "react";
import axios from 'axios';
import jwtDecode from "jwt-decode";
import {ImSpinner2} from 'react-icons/im';
import {Link} from 'react-router-dom';
import HouseBanner from "../assets/imgs/recommendation-banner.jpg";
import House from "../components/House";
import NavBar from "../components/navbar";
import Footer from "../components/Footer";
const Favorites = () => {
    const [userFavorites , setUserFavorites] = useState([]);
    const [isLoading , setIsLoading] = useState(false);
    const jwt = sessionStorage.getItem("jwt");
    const config = {
        headers: {
            Authorization: `Bearer ${jwt}`,
        }
    }
    const fetchFavorites = async () => {
        setIsLoading(true);
        try{
            const reponse = await axios.get('http://localhost:3001/api/favorites/user/' + jwtDecode(jwt).id , config);
            const favorites = reponse.data.favorites;
            let filteredProperties = [];
            for (let favorite in favorites){
                filteredProperties.push(favorites[favorite]['property_id'])
            }
            console.log(filteredProperties)
            setUserFavorites(filteredProperties);
            setIsLoading(false);

        }

        catch(error){
            console.log(error);
        }
    }

    useEffect(() => {
        fetchFavorites();
    } , []);

    if(isLoading){
        return(
            <div className="loading">
                <ImSpinner2 className="spinner"/>
            </div>
        )
    }

    if(userFavorites.length === 0){
        return(
            <div>
               <div>
            <NavBar/>
               </div>
            <div className="bg-violet-300 "> 
            No liked Properties
            </div>
            </div>
        )
        
        
    }

    return ( 
        <div>
            <div>
            <NavBar/>
            </div>
              <div className="bg-violet-300 "> 
            <section className="h-full max-h-[640px] mb-8 xl:mb-24 mt-5 ">
            <div className="flex flex-col lg:flex-row"> 
            <div className="lg:ml-8 xl:ml-[135px] flex flex-col items-center lg:items-start text-center lg:text-left justify-center flex-1 px-4
            lg:px-0"> 
            <h1 className="text-4xl lg:text-[58px] font-semibold leading-none mb-6"> 
            <span className="text-violet-500">Welcome</span> to the favorites section
            </h1>
            <div className='block w-1/2 text-violet-50 text-lg font-bold'>
                Find your liked listings here
            </div>
             </div>
    <div className="hidden flex-1 lg:flex justify-end items-end ">
            <img  className='rounded-tl-lg w-full' src ={HouseBanner} alt= "House"/>
        </div>
        
    </div>
    </section>
            </div>

            <div>
            <section className="mb-20">
            <div className="container mx-auto">
                <div className="py-20">
                <div className= "grid md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-14 ">
                {userFavorites.map((house , index )=> {
                    return(
                    <Link to = {`/property/${house._id}`} key={index}> <House house= {house}/> </Link>
                    );
                })}
                </div>
                </div>
            </div>
            
        </section>
            </div>
            <div>
                <Footer/>
            </div>
        </div>
     );
}
 
export default Favorites;
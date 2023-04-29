import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {ImSpinner2} from 'react-icons/im';
import jwtDecode from 'jwt-decode';
import UsersHouse from '../components/UsersHouse';
import UsersBanner from '../components/UsersBanner';
import NavBar from '../components/navbar';


const MyListings = () => {
    const [userHouses , setUserHouses] = useState([]);
    const [isLoading , setIsLoading] = useState(false);
   const [error , setError] = useState(null);




    const jwt = sessionStorage.getItem("jwt");
    const userID = jwtDecode(jwt).id;


    const fetchUserHouses = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await axios.get("http://localhost:3001/api/properties/userproperty/" + userID);
            setUserHouses(response.data.property);

        } catch (error) {
            setError(error.message);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        fetchUserHouses();
    }, []);






    if (isLoading) {
        <ImSpinner2 className="mx-auto animate-spin text-violet-700 text-4xl mt-[150px]"></ImSpinner2>
    }

    return ( <div>

            <div>
                <NavBar/>
            </div>
        <div>
            <UsersBanner/>
        </div>
        

        <section className="mb-20">
            <div className="container mx-auto">
                <div className="py-20">
                <div className= "grid md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-14 ">
                {userHouses.map((house , index )=> {
                    return(
                     <UsersHouse  key = {index} usershouse= {house} houseid = {house._id}/> 
                    );
                })}
                </div>
                </div>
            </div>
        </section>

    </div> );
}
 
export default MyListings ;
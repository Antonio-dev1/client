import UserCards from "../components/UserCards";
import {useEffect , useState} from "react";
import {ImSpinner2} from 'react-icons/im';
import { useNavigate , Link } from "react-router-dom";
import { ImSearch } from "react-icons/im";
import HouseBanner from "../assets/imgs/recommendation-banner.jpg";
import axios from "axios";
import AdminNav from "../components/AdminNav";

const AdminDashboard  = () => {
    const jwt = sessionStorage.getItem("jwt");
    const [allUsers , setAllUsers] = useState([]);
    const [isLoading , setIsLoading] = useState(false);
    const [error , setError] = useState(null);

    const fetchAllUsers = async () => {
        setIsLoading(true);
        try{
            const  response = await axios.get("http://localhost:3001/api/users/" , {
                headers:{
                    Authorization: `Bearer ${jwt}`
                }
            })

            const noneAdminUsers = response.data.filter(user => user.isAdmin === false);
            setAllUsers(noneAdminUsers);
            setIsLoading(false);
        }

        catch(err){
            console.log(err)
        };
        
    }

    


// Fetching all none admin users
    useEffect(() => {
        fetchAllUsers();
    } , []);

    if(isLoading){
        return(
            <div className="flex justify-center items-center h-screen">
                <ImSpinner2 className="animate-spin text-5xl text-violet-500"/>
            </div>
        )
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
            <span className="text-violet-500">Welcome</span> to the Admin Dashboard
            </h1>
        
             </div>
    <div className="hidden flex-1 lg:flex justify-end items-end ">
            <img  className='rounded-tl-lg w-full' src ={HouseBanner} alt= "House"/>
        </div>
        
    </div>
    </section>
            </div>
            <div>
            <section className="mb-20 flex-col">
            <div className="flex justify justify-center text-3xl font-semibold text-violet-700 gap-x-2 align-middle">
               <span> Browse through the users </span> <ImSearch/>
            </div>
            <div className="container mx-auto">
                <div className="py-20">
                <div className= "grid md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-14 ">
                {allUsers.map((user, index )=> {
                    return(
                     <UserCards user= {user} setIsLoading={setIsLoading} jwt={jwt} setAllUsers={setAllUsers} key={index}/> 
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
 
export default AdminDashboard ;
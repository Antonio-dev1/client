import NavBar from "../components/navbar";
import { housesData } from "../testdata";
import { useParams , Link} from "react-router-dom";
import { BiBed , BiBath , BiArea } from "react-icons/bi";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { ImSpinner2 } from "react-icons/im";
import { useEffect , useState , useContext} from "react";
import Footer from "../components/Footer";
import { AiOutlineHeart } from "react-icons/ai";
import {Carousel} from 'react-responsive-carousel';
import axios from "axios";

const  PropertyDetails = () => {
    const [specificHouse , setSpecificHouse] = useState({});
    const [isLoading , setIsLoading] = useState(true);
    //Get the id for the property based on the url
    // Get the property from the house data
    const {id} = useParams(); 


    const fetchSpecificHouse = async () => {
        try{
            const response = await axios.get(`http://localhost:3001/api/properties/${id}`);
            setSpecificHouse(response.data);
            setIsLoading(false);

        }
        catch(error){
            console.log(error);
        }
    };


    useEffect (() => {
        fetchSpecificHouse();
    },   //This is for loading the specific data of the property using the endpoint of the property. Another solution is to use the context and get them from the house context
    []);

    if(isLoading){
        return(
            <div className="min-h-screen">
                <NavBar/>
                <ImSpinner2 className="mx-auto animate-spin text-violet-700 text-4xl mt-[150px]"></ImSpinner2>
            </div>
        )
    }
    

   


    return ( <div>
        <NavBar/>
        <section className ="mt-7"> 
            <div className = "container mx-auto min-h-[800px] mb-14">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between ">
                    <div>
                        <h2 className="text-2xl font-semibold">{specificHouse.title}</h2>
                        <h3 className="text-lg mb-4 ">{specificHouse.location.split(',')[1]}</h3>
                    </div>
                    <div className="mb-4 lg:mb-0 flex gap-x-2 text-sm">
                        <div className="bg-green-500 text-white px-3 rounded-full ">{specificHouse.complexType}</div>
                        <div className="bg-violet-500 text-white px-3 rounded-full ">{specificHouse.location.split(',')[1]}</div>
                        <div className="bg-violet-500 text-white px-3 rounded-full ">{specificHouse.listingType}</div>

                    </div>
                    <div className = "text-3xl font-semibold text-violet-600">$ {specificHouse.price}</div>
                </div>
                <div className="flex flex-col items-start gap-8 lg:flex-row">
                    <div className="max-w-[769px]">
                        
                        <Carousel showArrows={true} showThumbs ={false}  infiniteLoop = {true}> 
                        {specificHouse.imageurls.map((image , index) => {
                            return(
                                <div key={index}> 
                                    <img src={image} />

                                </div>
                            )
                        })}
                        </Carousel>
                        
                        <div className="mt-7 flex gap-x-6 text-violet-500 mb-6 ">
                            <div className="flex gap-x-2 ">
                                <BiBed className="text-2xl"/>
                                <div>
                                    {specificHouse.bedrooms}
                                </div>
                                
                            </div>
                            <div className="flex gap-x-2 ">
                                <BiBath className="text-2xl"/>
                                <div>
                                    {specificHouse.bathrooms}
                                </div>
                                
                            </div>
                            <div className="flex gap-x-2">
                                <BiArea className="text-2xl"/>
                                <div>
                                    {specificHouse.surface}
                                </div>
                                
                            </div>
                            <div>
                                <button>
                                    <AiOutlineHeart className="text-3xl text-violet-400  hover:text-violet-700"/> 
                                </button>
                            </div>
                        </div>
                        <div>{specificHouse.description}</div>
                    </div>
                <div className="flex-1 bg-white w-full mb-8 border-gray-300 rounded-lg px-6 py-8 "> 
                    <div className="flex items-center gap-x-4 mb-8">
                        <div> 
                            <img src= {specificHouse.userId.profilePicture} alt=""/> 
                            </div>
                        <div className="w-20 h-20"> 
                            <div>{specificHouse.userId.fullName}</div>
                            <Link to="" className="text-violet-500 text-sm ">View Listings</Link>
                        </div>
                    </div>
                    <form className="flex flex-col gap-y-4">
                        <input className="border border-gray-300 focus:border-violet-700 outline-none rounded w-full px-4 h-14 text-sm" placeholder = "Email" type = 'text'/> 
                        <input className= "border border-gray-300 focus:border-violet-700 outline-none rounded w-full px-4 h-14 text-sm" placeholder = "Subject" type = 'text'/> 
                        <textarea className="border border-gray-300 focus:border-violet-700 outline-none resize-none rounded w-full p-4 h-36 text-sm text-gray-400" placeholder = "Message"/> 
                            <div className="flex gap-x-3">
                                <button className="bg-violet-500 hover:bg-violet-600 text-white rounded p-4 text-sm w-full transition">Send an Email!</button>
                                <button className="border border-violet-500 text-violet-600 hover:border-violet-300 hover:text-violet-300 rounded  p-4 text-sm w-full
                                transition">Chat!</button>
                            </div>
                        
                    </form>
                </div>
                </div>
            </div>
        </section>
        <Footer/>
    </div> );
}
 
export default PropertyDetails;
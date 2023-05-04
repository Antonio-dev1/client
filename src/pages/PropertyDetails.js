import NavBar from "../components/navbar";
import { housesData } from "../testdata";
import { useParams , Link , useNavigate} from "react-router-dom";
import { BiBed , BiBath , BiArea } from "react-icons/bi";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { ImSpinner2 } from "react-icons/im";
import { useEffect , useState , useContext} from "react";
import { UserContext } from "../components/UserContext";
import jwtDecode from "jwt-decode";
import Footer from "../components/Footer";
import { AiOutlineHeart , AiFillHeart} from "react-icons/ai";
import {Carousel} from 'react-responsive-carousel';
import axios, { AxiosHeaders } from "axios";


const  PropertyDetails = () => {
    const [specificHouse , setSpecificHouse] = useState({});
    const [isLoading , setIsLoading] = useState(true);
    const [isFavorite , setIsFavorite] = useState(false);
    const [favoriteID , setFavoriteID] = useState('');
    const [subject , setSubject] = useState('');
    const [message , setMessage] = useState('');
    const [creatingConversation , setCreatingConversation] = useState(false);
    //Get the id for the property based on the url
    // Get the property from the house data
    const {id} = useParams(); 
    const {isLoggedIn} = useContext(UserContext);
    const jwt =  sessionStorage.getItem('jwt');
    const navigate = useNavigate();
    const config = {
        headers: {
            Authorization: `Bearer ${jwt}`
        }
    }    

    const fetchisFavorite = async () => {
        try{
            const response  = await axios.post('http://localhost:3001/api/favorites/favoritesearch' , {
                user_id: jwtDecode(jwt).id,
                property_id: id
            } , config);
            if(response.data){
                if(response.data.message === "Favorited"){

                console.log(response.data.message)
                setFavoriteID(response.data.favorite._id);
                setIsFavorite(true);
                }
                else{
                    setIsFavorite(false);
                }
            }
            
        } catch(error){
            console.log(error);
        }
    }


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


    const onFavoritesPressed = async () => {

        if(!isFavorite){
        
        try {
            const response  = await axios.post('http://localhost:3001/api/favorites' , {
            
                user_id: jwtDecode(jwt).id,
                property_id: id
            } , config)

            if(response.data){
                console.log(response.data.message);
                setFavoriteID(response.data._id);
                setIsFavorite(true); 
            }

        }
        catch(error){
            console.log(error);

        }

    }
    else{
        try{
            console.log(favoriteID)
            const response = await axios.delete(`http://localhost:3001/api/favorites/${favoriteID}` , config);
            if(response.data){
                console.log(response.data);
                setIsFavorite(false);
            };
        } catch(error){
            console.log(error);
        }
    }
    }
   

    //This is for loading the specific data of the property using the endpoint of the property. Another solution is to use the context and get them from the house context
    // If loggedIn we will check if the property is favorited or not
    useEffect (() => {
        fetchSpecificHouse();
        
    },[]);


    useEffect(() => {
        if(isLoggedIn){
            console.log('We are logged in');
            fetchisFavorite();
            console.log('Function ran!')
        }
    } , [])

    const onSubjectChange = (event) => {
        setSubject(event.target.value);
    };

    const onMessageChange = (event) => {
        setMessage(event.target.value);
    }


    if(isLoading){
        return(
            <div className="min-h-screen">
                <NavBar/>
                <ImSpinner2 className="mx-auto animate-spin text-violet-700 text-4xl mt-[150px]"></ImSpinner2>
            </div>
        )
    }
    
    const onViewSpecificiListingsPressed = (id) => {
        if(!isLoggedIn){
            alert('You need to be logged in to view other users listings');
            navigate('/signin');
        }
        else{
            navigate(`/otherUsersListing/${id}`)
        }
    };

    const createConversation = async () => {
        try {
            const response = await axios.post('http://localhost:3001/api/conversations' , {
                members : [jwtDecode(jwt).id , specificHouse.userId._id]
            } , config);
        }

        catch(error){
            console.log(error)
        }
    };

    const onChatPressed = (e) => {
        e.preventDefault();
        if(!isLoggedIn){
            alert('You need to be logged in to chat with the owner');
            navigate('/signin');
        } else{
            if(jwtDecode(jwt).id === specificHouse.userId._id){
                alert('You cannot chat with yourself');
            }
            else{
                createConversation();
                setTimeout(() => {
                    return navigate('/messenger');
                } , 1000)
                
            }
        }
    };
   
    const emailLink = `mailto:${specificHouse.userId.email}?subject=${subject}&body=${message}`;

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
                                <button onClick={(e) => onFavoritesPressed()}>
                                    {isFavorite? (<AiFillHeart className="text-3xl text-violet-400  hover:text-violet-700"/>) : (<AiOutlineHeart className="text-3xl text-violet-400  hover:text-violet-700"/>)}
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
                            <button className="text-violet-500 text-sm " onClick={(e) => onViewSpecificiListingsPressed(specificHouse.userId._id)}>View Listings</button>
                        </div>
                    </div>
                    <form className="flex flex-col gap-y-4">
                        <input className="border border-gray-300 focus:border-violet-700 outline-none rounded w-full px-4 h-14 text-sm" placeholder = "Email" type = 'text'/> 
                        <input className= "border border-gray-300 focus:border-violet-700 outline-none rounded w-full px-4 h-14 text-sm" onChange={(e)=> onSubjectChange(e)} placeholder = "Subject" type = 'text'/> 
                        <textarea  onChange={(e) => onMessageChange(e)} className="border border-gray-300 focus:border-violet-700 outline-none resize-none rounded w-full p-4 h-36 text-sm text-gray-400" placeholder = "Message"/> 
                            <div className="flex gap-x-3">
                                <a href = {emailLink} className="bg-violet-500 hover:bg-violet-600 text-white text-center rounded p-4 text-sm w-full transition">Send an Email!</a>
                                <button className="border border-violet-500 text-violet-600 hover:border-violet-300 hover:text-violet-300 rounded  p-4 text-sm w-full
                                transition" onClick = {(e) => onChatPressed(e)}>Chat!</button>
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
import axios from "axios";
import { useEffect , useState } from "react";
import { Link } from "react-router-dom";
import jwtDecode from "jwt-decode";
import {ImSpinner2} from 'react-icons/im';
import NavBar from '../components/navbar';
import House from "../components/House";
import RecommendationsBanner from "../components/RecommendationsBanner";
import Footer from "../components/Footer";


const Recommendations = () => {

const [recommendations , setRecommendations] = useState([]);
const [isLoading , setIsLoading] = useState(true);
const jwt = sessionStorage.getItem("jwt");

const config = {
    headers: {
        Authorization: `Bearer ${jwt}`,
    }
}

const getRecommmendations = async () => {
    setIsLoading(true);
    try{
    const response = await axios.get('http://localhost:3001/api/recommendations/'+jwtDecode(jwt).id , config);
    if(response.data){
        setRecommendations(response.data);
        setIsLoading(false);
    };

    }
    catch(err){
        console.log(err.message);
    };
};


useEffect(() => {
    getRecommmendations();
} , [])



if(isLoading){
    <div>
        <ImSpinner2 className="text-violet-500 animate-spin text-2xl"/>
    </div>
}



    return (  
        <div>
            <div>
                <NavBar/>
            </div>
            <div>
                <RecommendationsBanner/>
            </div>
            <section className="mb-20">
            <div className="container mx-auto">
                <div className="py-20">
                <div className= "grid md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-14 ">
                {recommendations.map((house , index )=> {
                    return(
                <Link to = {`/property/${house._id}`} key={index}> <House house= {house}/> </Link> 
                    );
                })}
                </div>
                </div>
            </div>
        </section>

        <section>
            <Footer/>
        </section>

        </div>
    );
}
 
export default Recommendations;
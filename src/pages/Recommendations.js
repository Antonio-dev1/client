import axios from "axios";
import { useEffect , useState } from "react";
import { Link } from "react-router-dom";
import jwtDecode from "jwt-decode";
import {ImSpinner2} from 'react-icons/im';
import NavBar from '../components/navbar';
import House from "../components/House";
import RecommendationsBanner from "../components/RecommendationsBanner";
import Footer from "../components/Footer";
import OtherSearch from "../components/OtherSearch";


const Recommendations = () => {

const [recommendations , setRecommendations] = useState([]);
const [filteredRecommendations , setFilteredRecommendations] = useState(recommendations);
const [isLoading , setIsLoading] = useState(true);
const [query , setQuery] = useState('');
const [isSearching , setIsSearching] = useState(false);
const jwt = sessionStorage.getItem("jwt");

const config = {
    headers: {
        Authorization: `Bearer ${jwt}`,
    }
}

const searchByTitle = (e) => {
    e.preventDefault();
    let updatedList = [...recommendations];
        if(query === ""){
            console.log("We are in the if of the return search");
            updatedList = [...recommendations];
        } else{
            console.log("We are in the else of the return search");
            console.log("The query is: " + query);
           updatedList =  updatedList.filter((house) => {
                console.log("The house title is: " + house.title);
                return house.title.toLowerCase().includes(query.toLowerCase()) || house.location.toLowerCase().includes(query.toLowerCase());
            })
        }       


    
    setFilteredRecommendations(updatedList);


}

const getRecommmendations = async () => {
    setIsLoading(true);
    try{
    const response = await axios.get('http://localhost:3001/api/recommendations/'+jwtDecode(jwt).id , config);
    if(response.data){
        setRecommendations(response.data);
        setFilteredRecommendations(response.data);
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

if(isSearching){
    <div>
        <ImSpinner2 className="text-violet-500 animate-spin text-2xl"/>
    </div>
};

if(recommendations.length < 1 ){
    return(
        <div>
            <NavBar/>
            <RecommendationsBanner/>
            <OtherSearch setUserQuery={setQuery} onSearchPressed={searchByTitle} query={query} recommendations={recommendations} setFilteredRecommendations={setFilteredRecommendations}/>
            <div className="text-center text-2xl text-violet-500 mt-20">
                <h1> No recommendations found keep on liking! </h1>
            </div>
            <Footer/>
        </div>
    )
}


    return (  
        <div>
            <div>
                <NavBar/>
            </div>
            <div>
                <RecommendationsBanner/>
                <OtherSearch setUserQuery={setQuery} onSearchPressed={searchByTitle} query={query} recommendations={recommendations} setFilteredRecommendations={setFilteredRecommendations}/>
            </div>
            <section className="mb-20">
            <div className="container mx-auto">
                <div className="py-20">
                <div className= "grid md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-14 ">
                {filteredRecommendations.map((house , index )=> {
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
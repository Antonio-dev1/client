import NavBar from "../components/navbar";
import { housesData } from "../testdata";
import { useParams } from "react-router-dom";
import { BiBed , Bibath , BiArea } from "react-icons/bi";

const  PropertyDetails = () => {
    return ( <div>
        <NavBar/>
        Property Details
    </div> );
}
 
export default PropertyDetails;
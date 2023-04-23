import {useState , useEffect  ,useParams , useMemo} from 'react';
import NavBar from "../components/navbar";
import PhotoUploader from "../components/PhotoUploader";
import { BiBed , BiBath , BiArea} from "react-icons/bi";
import countryList from 'react-select-country-list';
import {BsHouse} from 'react-icons/bs';
import axios from "axios";
import jwtDecode from "jwt-decode";

const EditProperty = () => {
    const propertyId = useParams();
    const [savedPhotos  , setSavedPhotos] = useState([]);
    const [countryValue ,setCountryValue] = useState('');
    const [cityValue , setCityValue] = useState('');
    const [listingType , setListingType]  = useState('');
    const [complexType , setComplexType] = useState('');
    const [title , setTitle] = useState('');
    const [price , setPrice] = useState('');
    const [description , setDescription] = useState('');
    const [bathrooms , setBathrooms] = useState('');
    const [bedrooms , setBedrooms] = useState('');
    const [area , setArea] = useState('');
    const [isUploading , setIsUploading] = useState(false);
    const [buttonOff , setButtonOff] = useState(false);
    const [success , setSuccess] = useState(false);
    const options = useMemo(() => countryList().getData(), []);
    const jwt = sessionStorage.getItem('jwt');
    const config = {
        headers: { Authorization: `Bearer ${jwt}` }
    }

    // retrieve the property details
    const getPropertyDetails = async () => {
        try{
            const response = await axios.get('http://localhost:3001/api/properties/' + propertyId , config);
            console.log(response.data);
        }
        catch(error){
            console.log(error);
        };
    };
    useEffect(() => {

    } , [])

    return ( 
        <div> 
            <h1> Edit Property </h1>
        </div>
     );
}
 
export default EditProperty;
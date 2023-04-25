import {useState , useEffect, useMemo} from 'react';
import { useParams } from 'react-router-dom';
import NavBar from "../components/navbar";
import PhotoUploader from "../components/PhotoUploader";
import { BiBed , BiBath , BiArea} from "react-icons/bi";
import countryList from 'react-select-country-list';
import {BsHouse} from 'react-icons/bs';
import {ImSpinner2} from 'react-icons/im';
import {useNavigate} from 'react-router-dom';

import axios from "axios";
import jwtDecode from "jwt-decode";


const EditProperty = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    
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
    const [isLoading , setIsLoading] = useState(false);
    const [buttonOff , setButtonOff] = useState(false);
    const [success , setSuccess] = useState(false);
    const options = useMemo(() => countryList().getData(), []);
    const jwt = sessionStorage.getItem('jwt');
    const config = {
        headers: { Authorization: `Bearer ${jwt}` }
    }

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    }

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    }

    const handleCountryChange = (e) => {
        setCountryValue(e.target.value);
    }

    const handleCityChange = (e) => {
        setCityValue(e.target.value);
    }

    const handlePriceChange = (e) => {
        setPrice(e.target.value);
    }

    const handleBathroomsChange = (e) => {
        setBathrooms(e.target.value)
        
    }
    const handleBedroomsChange = (e) => {
        setBedrooms(e.target.value);

    }

    const handleAreaChange = (e) => {
        setArea(e.target.value);
    }
    
    const handleListingTypeChange = (e) => {
        setListingType(e.target.value);
    }

    const handleComplexTypeChange = (e) => {
        setComplexType(e.target.value);
    }



    // retrieve the property details
    const getPropertyDetails = async () => {
        setIsLoading(true);
        try{
            const response = await axios.get('http://localhost:3001/api/properties/' + id , config);
            console.log(response.data);
            if(response.data){
            setSavedPhotos(response.data.imageurls);
            setCountryValue(response.data.location.split(',')[0]);
            setCityValue(response.data.location.split(',')[1]);
            setListingType(response.data.listingType);
            setComplexType(response.data.complexType);
            setTitle(response.data.title);
            setPrice(response.data.price);
            setDescription(response.data.description);
            setBathrooms(response.data.bathrooms);
            setBedrooms(response.data.bedrooms);
            setArea(response.data.surface);
            setIsLoading(false);
            }
        }
        catch(error){
            console.log(error);
        };
    };

    const updateProperty  = async(e) => {
        setButtonOff(true);
        setIsUploading(true);
            axios.put('http://localhost:3001/api/properties/' + id , {
                title:title,
                description:description,
                location:countryValue + ',' + cityValue,
                listingType:listingType,
                complexType:complexType,
                price:price,
                bathrooms:bathrooms,
                bedrooms:bedrooms,
                surface:area,
            } , config).then((response) => {
                console.log(response.data);
                setSuccess(true);
                setIsUploading(false);
                navigate('/myListings');
            }).catch((error) => {
                console.log(error);
            });
        
    }

    useEffect(() => {
        getPropertyDetails();
    } , [])

    const handleUpdate = (e) => {
        e.preventDefault();
        updateProperty();
    }

    const handleCancel = (e) => {
        e.preventDefault();
        navigate('/myListings');
    }


    if(isLoading){
        return (
            <div>
                <NavBar/>
                <div className="flex justify-center items-center h-screen">
                    <ImSpinner2 className="animate-spin text-violet-500 text-5xl"></ImSpinner2>
                    </div>
            </div>
        )
    }

    if(isUploading){
        return (
            <div>
                <NavBar/>
                <div className="flex justify-center items-center h-screen">
                    <ImSpinner2 className="animate-spin text-green-500 text-5xl"></ImSpinner2>
                    </div>
            </div>
        )
    }

    return ( 
        <div>
            <div>
                <NavBar/>
            </div>
            <form className="mt-3 h-full w-full rounded-lg bg-white">
                <div className="mx-[700px] flex items-center align-middle lg:mx-[600px]">
                    <h1 className="text-violet-500 font-bold text-3xl mx-5 mt-5" >Edit Ad 
                    
                        </h1>
                        <BsHouse className="text-violet-700 bottom-2 text-xl"></BsHouse>
                </div>
                <div className="mx-5 mt-5 mb-6">
                    <label htmlFor= "title" className="block mb-2 text-md font-bold text-violet-400 dark:text-white ">Title</label>
                    <input type="text" defaultValue={title} onChange={(e) => handleTitleChange(e)} name="title" id="title" placeholder= {title} required className = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  focus:border-violet-500 block w-3/4 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-violet-500 dark:focus:border-blue-500"/>
                </div>

                <div className="mx-5 mb-6">
                    <label htmlFor="description" className="block mb-2 text-md font-bold text-violet-400 dark:text-white ">Description</label>
                    <input type="text" defaultValue={description} onChange={(e) => handleDescriptionChange(e)}  placeholder = {description} required className = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  focus:border-violet-500 block w-3/4 h-20 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-violet-500 dark:focus:border-blue-500"/>
                </div>
                <div className="mx-5 mt-5">
            <h1 className="text-violet-500 text-xl font-bold">Upload Property Images</h1>
            </div>
            <div className="mx-5 mt-5">
                
                <PhotoUploader savedPhotos={savedPhotos} setSavedPhotos={setSavedPhotos} changing ={success}/>
                </div>
                <div className="mx-5 mt-5">
                <span className="h-1 w-full bg-green-600 lg:w-1/3"></span>
                </div>
                <div className="mx-5 font-bold text-violet-500 border-rose-300">
                    
                <h1 className="border-gray-500 text-xl mx-1 mt-10">
                   Property Details 
                   
                </h1>
                <span className="w-full bg-green-400"></span>
                </div>
                <div className="mx-5 mt-5 grid gap-4 mb-6 md:grid-cols-3">
                    <div>
                        
                        <label htmlFor="bathroomsize" className="block mb-2 text-xl font-medium text-violet-400 dark:text-white"><BiBath></BiBath></label>
                        <input type="number" defaultValue={bathrooms} onChange={(e) => handleBathroomsChange(e)} required name="bathroomSize" id="bathroomSize" placeholder={bathrooms} className = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  focus:border-violet-500 block w-1/2 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-violet-500 dark:focus:border-blue-500"/>
                    </div>
                    <div>
                        <label htmlFor="bedroomsize" className="block mb-2 text-xl font-medium text-violet-400 dark:text-white"> <BiBed></BiBed></label>
                        <input type="number" defaultValue={bedrooms} onChange={(e) => handleBedroomsChange(e)} required name="bedroomSize" id="bedroomSize" placeholder={bedrooms} className = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  focus:border-violet-500 block w-1/2 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-violet-500 dark:focus:border-blue-500"/>
                    </div>
                    <div>
                        <label htmlFor="surfacesize" className="block mb-2 text-xl font-medium text-violet-400 dark:text-white"><BiArea></BiArea></label>
                        <input type="number" defaultValue={area} onChange={(e) => handleAreaChange(e)} required name="surfaceSize" id="surfaceSize" placeholder= {area} className = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  focus:border-violet-500 block w-1/2 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-violet-500 dark:focus:border-blue-500"/>
                    </div>

                </div>

        
                <div className=" mx-5 mt-7 flex md:gap-x-[280px] lg:gap-x-[218px]">
                    <div>
                        <label htmlFor="Country" className="block mb-2 text-medium font-bold text-violet-400 dark:text-white"> Country </label>
                        <select onChange={(e) => handleCountryChange(e)} defaultValue={countryValue} placeholder= {countryValue} required className="rounded-md border-gray-300 text-gray-500 text-sm">
                        {options.map((country , index) => {
                            return(
                                <option key={index} value={country.value}>{country.label}</option>
                            )
                        })}
                        </select>
                    </div>

                    <div>
                        <label htmlFor={'City'} className="block mb-2 text-medium font-bold text-violet-400 dark:text-white">City</label>
                        <input onChange={(e) => handleCityChange(e)} defaultValue={cityValue} type="text" name="city" id="city" placeholder={cityValue} required className = "bg-gray-50 border border-gray-300  text-gray-900 text-sm rounded-lg  focus:border-violet-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-violet-500 dark:focus:border-blue-500"/>
                    </div>

                </div>
                
                
                <div className="mx-5 mt-7 flex gap-x-[465px] lg:gap-x-[470px]">
                    <div>
                        <label htmlFor="listingType" className="block mb-2 text-medium font-bold text-violet-400 dark:text-white">Listing Type</label>
                        <select  onChange= {(e) => handleListingTypeChange(e)} required defaultValue={listingType} placeholder =  {listingType} className="rounded-md border-gray-300 text-gray-500 text-sm">
                        <option value={'Rent'}>Rent </option>
                        <option value={'Sell'}> Sell </option>
                        </select>
                    </div>

                    <div >
                        <label htmlFor="complexType" className="block mb-2 text-medium font-bold text-violet-400 dark:text-white">Property Type</label>
                        <select required  onChange={(e) => handleComplexTypeChange(e)} defaultValue={complexType} placeholder= {complexType} className="rounded-md border-gray-300 text-gray-500 text-sm">
                        <option value={'Villa'}>Villa</option>
                        <option value={'Apartment'}> Apartment</option>
                        <option value={'House'}> House</option>
                        </select>
                    </div>

                </div>
                <div className="mx-5 mt-7 ">
                    <label htmlFor= "price"  className="block mb-2 text-medium font-bold text-violet-400 dark:text-white">Price</label>
                    <input required type="number"  onChange={(e) => handlePriceChange(e)} placeholder= {price} className="rounded-md border-gray-300 text-gray-500 text-sm"/>

                </div>
                
            


            <div>
                <div className=" flex items-center justify-end gap-x-6 mb-10">
                    <div>
                        <button onClick = {(e) => handleUpdate(e)} className="text-white bg-violet-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Update</button>
                        </div>
                        <div>
                        <button onClick={(e) => handleCancel(e)} className="text-sm font-semibold leading-6 w-full text-black rounded-lg text-center ">Cancel</button>
                        </div>
                        </div>
            </div>
            <div className="flex items-center justify-end gap-x-6 ">

            </div>
            <div>
                {success ? (<div className="text-green-400 text-xl"> success </div>) : (<div></div>)}
            </div>
            </form>
        </div>
     );
}
 
export default EditProperty;
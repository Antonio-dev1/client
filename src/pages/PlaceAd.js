import NavBar from "../components/navbar";
import PhotoUploader from "../components/PhotoUploader";
import {useState , useMemo  } from 'react';
import { BiBed , BiBath , BiArea} from "react-icons/bi";
import countryList from 'react-select-country-list';
import {BsHouse} from 'react-icons/bs';

//Use memo since countries will not change on every render so that we do not have to recompute the value on every render
const PlaceAd  = () => {
    const [savedPhotos  , setSavedPhotos] = useState([]);
    const [countryValue ,setCountryValue] = useState('');
    const [listingType , setListingType]  = useState('');
    const [complexType , setComplexType] = useState('');
    const options = useMemo(() => countryList().getData(), []);

    return (  
        <div>
            <div>
                <NavBar/>
            </div>
            <form className="mt-3 h-full w-full rounded-lg bg-white">
                <div className="mx-[700px] flex items-center align-middle lg:mx-[600px]">
                    <h1 className="text-violet-500 font-bold text-3xl mx-5 mt-5 " >Place Ad 
                    
                        </h1>
                        <BsHouse className="text-violet-700 bottom-2 text-xl"></BsHouse>
                </div>
                <div className="mx-5 mt-5 mb-6">
                    <label for={'title'} className="block mb-2 text-md font-bold text-violet-400 dark:text-white ">Title</label>
                    <input type="text" name="title" id="title" placeholder="Title" className = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  focus:border-violet-500 block w-3/4 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-violet-500 dark:focus:border-blue-500"/>
                </div>

                <div className="mx-5 mb-6">
                    <label for={'description'} className="block mb-2 text-md font-bold text-violet-400 dark:text-white ">Description</label>
                    <input type="text" placeholder = {'Description'} className = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  focus:border-violet-500 block w-3/4 h-20 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-violet-500 dark:focus:border-blue-500"/>
                </div>
                <div className="mx-5 mt-5">
            <h1 className="text-violet-500 text-xl font-bold">Upload Property Images</h1>
            </div>
            <div className="mx-5 mt-5">
                
                <PhotoUploader savedPhotos={savedPhotos} setSavedPhotos={setSavedPhotos}/>
                </div>
                <div className="mx-5 mt-5">
                <span class="h-1 w-full bg-green-600 lg:w-1/3"></span>
                </div>
                <div className="mx-5 font-bold text-violet-500 border-rose-300">
                    
                <h1 className="border-gray-500 text-xl mx-1 mt-10">
                   Property Details 
                   
                </h1>
                <span className="w-full bg-green-400"></span>
                </div>
                <div className="mx-5 mt-5 grid gap-4 mb-6 md:grid-cols-3">
                    <div>
                        
                        <label for={'Bathroom Size'} className="block mb-2 text-xl font-medium text-violet-400 dark:text-white"><BiBath></BiBath></label>
                        <input type="number" name="bathroomSize" id="bathroomSize" placeholder="Number of Bathrooms" className = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  focus:border-violet-500 block w-1/2 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-violet-500 dark:focus:border-blue-500"/>
                    </div>
                    <div>
                        <label for={'Bedroom Size'} className="block mb-2 text-xl font-medium text-violet-400 dark:text-white"> <BiBed></BiBed></label>
                        <input type="number" name="bedroomSize" id="bedroomSize" placeholder="Number of Bedrooms" className = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  focus:border-violet-500 block w-1/2 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-violet-500 dark:focus:border-blue-500"/>
                    </div>
                    <div>
                        <label for={'Surface Size'} className="block mb-2 text-xl font-medium text-violet-400 dark:text-white"><BiArea></BiArea></label>
                        <input type="number" name="surfaceSize" id="surfaceSize" placeholder="Surface Size" className = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  focus:border-violet-500 block w-1/2 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-violet-500 dark:focus:border-blue-500"/>
                    </div>

                </div>

        
                <div className=" mx-5 mt-7 flex md:gap-x-[280px] lg:gap-x-[218px]">
                    <div>
                        <label for="Country" className="block mb-2 text-medium font-bold text-violet-400 dark:text-white"> Country </label>
                        <select value={countryValue} className="rounded-md border-gray-300 text-gray-500 text-sm">
                        {options.map((country , index) => {
                            return(
                                <option key={index} value={country.value}>{country.label}</option>
                            )
                        })}
                        </select>
                    </div>

                    <div>
                        <label for={'City'} className="block mb-2 text-medium font-bold text-violet-400 dark:text-white">City</label>
                        <input type="text" name="city" id="city" placeholder="City" required className = "bg-gray-50 border border-gray-300  text-gray-900 text-sm rounded-lg  focus:border-violet-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-violet-500 dark:focus:border-blue-500"/>
                    </div>

                </div>
                
                
                <div className="mx-5 mt-7 flex gap-x-[465px] lg:gap-x-[470px]">
                    <div>
                        <label for="listingType" className="block mb-2 text-medium font-bold text-violet-400 dark:text-white">Listing Type</label>
                        <select value={listingType} className="rounded-md border-gray-300 text-gray-500 text-sm">
                        <option value={'Rent'}>Rent</option>
                        <option value={'Sell'}> Sell</option>
                        </select>
                    </div>

                    <div >
                        <label for="complexType" className="block mb-2 text-medium font-bold text-violet-400 dark:text-white">Property Type</label>
                        <select  value={complexType} className="rounded-md border-gray-300 text-gray-500 text-sm">
                        <option value={'Villa'}>Villa</option>
                        <option value={'Apartment'}> Apartment</option>
                        <option value={'House'}> House</option>
                        </select>
                    </div>

                </div>
                <div className="mx-5 mt-7 ">
                    <label for = {'Price'} className="block mb-2 text-medium font-bold text-violet-400 dark:text-white">Price</label>
                    <input type="number" placeholder="Price in $" className="rounded-md border-gray-300 text-gray-500 text-sm"/>

                </div>
                
            


            <div>
                <div className=" flex items-center justify-end gap-x-6 mb-10">
                    <div>
                        <button className="text-white bg-violet-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Save</button>
                        </div>
                        <div>
                        <button className="text-sm font-semibold leading-6 w-full text-black rounded-lg text-center ">Cancel</button>
                        </div>
                        </div>
            </div>
            <div className="flex items-center justify-end gap-x-6 ">

            </div>
            </form>
        </div>
    );
}
 
export default PlaceAd ;
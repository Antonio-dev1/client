import NavBar from "../components/navbar";
import { housesData } from "../testdata";
import { useParams , Link} from "react-router-dom";
import { BiBed , BiBath , BiArea } from "react-icons/bi";
import { useEffect , useState , useContext} from "react";

const  PropertyDetails = () => {
    useEffect (() => {},   //This is for loading the specific data of the property using the endpoint of the property. Another solution is to use the context and get them from the house context
    []);

    //Get the id for the property based on the url
    // Get the property from the house data
    const {id} = useParams(); 
    

    const specificHouse = housesData.find((house) => {
    return house.id === parseInt(id);
})


    return ( <div>
        <NavBar/>
        <section className ="mt-7"> 
            <div className = "container mx-auto min-h-[800px] mb-14">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between ">
                    <div>
                        <h2 className="text-2xl font-semibold">{specificHouse.name}</h2>
                        <h3 className="text-lg mb-4 ">{specificHouse.address}</h3>
                    </div>
                    <div className="mb-4 lg:mb-0 flex gap-x-2 text-sm">
                        <div className="bg-green-500 text-white px-3 rounded-full ">{specificHouse.type}</div>
                        <div className="bg-violet-500 text-white px-3 rounded-full ">{specificHouse.country}</div>
                    </div>
                    <div className = "text-3xl font-semibold text-violet-600">$ {specificHouse.price}</div>
                </div>
                <div className="flex flex-col items-start gap-8 lg:flex-row">
                    <div className="max-w-[769px]">
                        <div className="mb-8">
                            <img src = {specificHouse.imageLg} alt =''/>
                        </div>
                        <div className="flex gap-x-6 text-violet-500 mb-6 ">
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
                        </div>
                        <div>{specificHouse.description}</div>
                    </div>
                <div className="flex-1 bg-white w-full mb-8 border-gray-300 rounded-lg px-6 py-8 "> 
                    <div className="flex items-center gap-x-4 mb-8">
                        <div> <img src= {specificHouse.agent.image} alt=""/> </div>
                        <div className="w-20 h-20"> 
                            <div>{specificHouse.agent.name}</div>
                            <Link to="" className="text-violet-500 text-sm ">View Listings</Link>
                        </div>
                    </div>
                    <form>
                        <input type = 'text'> </input>
                        <input type = 'text'> </input>
                        <input type = 'text'> </input>
                        <textarea>
                            <div>
                                <button>Send Message</button>
                                <button>Call Me</button>
                            </div>
                        </textarea>
                    </form>
                </div>
                </div>
            </div>
        </section>
    </div> );
}
 
export default PropertyDetails;
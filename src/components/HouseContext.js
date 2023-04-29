import {housesData} from '../testdata.js';
import {useState , useEffect , createContext} from 'react';
import axios from 'axios';
export const HouseContext = createContext();
const HouseContextProvider = ({children}) => {
    const [houses , setHouses] = useState([]);
    const [locations , setLocations] = useState([]);
    const [location , setLocation] = useState('Location (any)');
    const [property , setProperty] = useState('Property (any)');
    const [properties , setProperties] = useState([]);
    const [price , setPrice] = useState('Price range (any)');
    const [prices , setPrices] = useState([]);
    const [space , setSpace] = useState('Space range (any)');
    const[spaces , setSpaces] = useState([]);
    const [isLoading , setIsLoading] = useState(false);
    const [isDataLoaded , setIsDataLoaded] = useState(false);
    
    const jwt = sessionStorage.getItem("jwt");


    const config = {
        headers: {
            Authorization: `Bearer ${jwt}`,
        }
    }

    

    const fetchHouseData = async () => {
        setIsLoading(true);
        try{
        const response = await axios.get('http://localhost:3001/api/properties' , config);
        setHouses(response.data);
        console.log(houses);
        
        setIsDataLoaded(true);
        const locations = new Set();
        const properties = new Set();
        const prices = new Set();
        const areas = new Set();
        response.data.forEach((house) => {
            locations.add(house.location);
            properties.add(house.complexType);
            prices.add(house.price);
            areas.add(house.surface);
        });
        setLocations(['Location (any)' , ...locations]);
        setProperties(['Property (any)' , ...properties]);
        setPrices(['Price Range (any)' ,...prices]);
        setSpaces(['Space (any)' , ...areas]);
        setIsLoading(false);
        } catch (error) {
            console.log(error);
        }
    };
    
    useEffect(() => {
        fetchHouseData();
    },[]);

    const fetchSearch = async (data) => {
        setIsLoading(true);
        try{
            
            const response = await axios.post('http://localhost:3001/api/properties/search' , data);
            console.log(response.data.properties)
            const newHouses = response.data.properties;
            console.log(newHouses);
            setTimeout(() => {
                return newHouses.length < 1 ? setHouses([]) : setHouses(newHouses),
                setIsLoading(false)
           } , 1000)
        } catch (error) {
            console.log(error);
        }
        
    };

    const isDefault = (str) => {
        return str.split(' ').includes('(any)');
    }

    const createFilter = () => {
        const data = {}
        

        if(!isDefault(property)){
            data.complexType = property;
        }

        if(!isDefault(location)){
            data.location = location
        }

        if(!isDefault(price)){
            data.price = {
                $gte: price , $lte: price * 1.25
            }
        }

        if(!isDefault(String(space))){
            data.surface = {
                $gte: space , $lte: space * 1.25
            }
        }

        return data
    };
    

    const onSearchPressed = () => {
        const data = createFilter();
        console.log('Data Logged' , data)
        fetchSearch(data);
    };

    

    // Run the get all properties rest api in this useEffect Function which is going to update at every addition by the user or refresh of the page
    

    return (  
        <HouseContext.Provider value = {{
            location, setLocation , locations, property ,setProperty, properties, price,setPrice ,prices, space, setSpace,spaces, houses,isLoading, onSearchPressed
        }}> {children} </HouseContext.Provider>
    );
}
 
export default HouseContextProvider;
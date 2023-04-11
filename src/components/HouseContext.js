import {housesData} from '../testdata.js';
import {useState , useEffect , createContext} from 'react';
export const HouseContext = createContext();
const HouseContextProvider = ({children}) => {
    const [houses , setHouses] = useState(housesData);
    const [locations , setLocations] = useState([]);
    const [location , setLocation] = useState('Location (any)');
    const [property , setProperty] = useState('Property  (any)');
    const [properties , setProperties] = useState([]);
    const [price , setPrice] = useState('Price range (any)');
    const [prices , setPrices] = useState([]);
    const [space , setSpace] = useState('Space range (any)');
    const[spaces , setSpaces] = useState([]);
    const [isLoading , setIsLoading] = useState(false);
    const [isDataLoaded , setIsDataLoaded] = useState(false);

    useEffect(() => {

    },[]);


    const handleSearchClick = () => {
        //setIsLoading(true); //This is for the loading icon
        setIsLoading(true);

        //Function that checks if the string is empty (any)

        const isDefault = (str) => {
            return str.split(' ').includes('(any)');
        }
        //Still did not factor in the price and space range creating the function that does it, but if we have a range it will go as follows.
        const minPrice = parseInt(price.split(' ')[0]);
        // const maxPrice = parseInt(price.split(' ')[2]);

        const minSpace = parseInt(space.split(' ')[0]);

        // still did not factor in space range
        // const maxSpace = parseInt(space.split(' ')[2]);

        const newHouses = housesData.filter((house) => {
            const housePrice = parseInt(house.price);
            const houseSpace = parseInt(house.surface);
            if (house.country === location && house.type === property 
                && housePrice >= minPrice && housePrice <= minPrice * 2 && houseSpace >= minSpace && houseSpace <= minSpace * 2) {
                    return house;
        }

        if(isDefault(property) && isDefault(location) && isDefault(price) && isDefault(space)) {
            return house;
        }

        //If country is not default
        if(!isDefault(location) && isDefault(property) && isDefault(price) && isDefault(space)) {
            if(house.country === location) {
                return house;
            }
        }
        // if property is not default
        if(isDefault(location) && !isDefault(property) && isDefault(price) && isDefault(space)) {
            if(house.type === property) {
                return house;
            }

        }
        // if price is not default
        if(isDefault(location) && isDefault(property) && !isDefault(price) && isDefault(space)) {
            if(housePrice >= minPrice && housePrice <= minPrice * 2) {
                return house;
            }
        }
        // if space is not default
        if(isDefault(location) && isDefault(property) && isDefault(price) && !isDefault(space)) {
            if(houseSpace >= minSpace && houseSpace <= minSpace * 2) {
                return house;
            }
        }

        // if country and property are not default
        if(!isDefault(location) && !isDefault(property) && isDefault(price) && isDefault(space)) {
            if(house.country === location && house.type === property) {
                return house;
            }
        }

        // if country and price are not default
        if(!isDefault(location) && isDefault(property) && !isDefault(price) && isDefault(space)) {
            if(house.country === location && housePrice >= minPrice && housePrice <= minPrice * 2) {
                return house;
            }
        }

        // if country and space are not default
        if(!isDefault(location) && isDefault(property) && isDefault(price) && !isDefault(space)) {
            if(house.country === location && houseSpace >= minSpace && houseSpace <= minSpace * 2) {
                return house;
            }
        }
        // if property and price are not default
        if(isDefault(location) && !isDefault(property) && !isDefault(price) && isDefault(space)) {
            if(house.type === property && housePrice >= minPrice && housePrice <= minPrice * 2) {
                return house;
            }
        }
        // if property and space are not default
        if(isDefault(location) && !isDefault(property) && isDefault(price) && !isDefault(space)) {
            if(house.type === property && houseSpace >= minSpace && houseSpace <= minSpace * 2) {
                return house;
            }}
        // if price and space are not default
        if(isDefault(location) && isDefault(property) && !isDefault(price) && !isDefault(space)) {
            if(housePrice >= minPrice && housePrice <= minPrice * 2 && houseSpace >= minSpace && houseSpace <= minSpace * 2) {
                return house;
            }
        }
        // if country, property and price are not default
        if(!isDefault(location) && !isDefault(property) && !isDefault(price) && isDefault(space)) {
            if(house.country === location && house.type === property && housePrice >= minPrice && housePrice <= minPrice * 2) {
                return house;
            }}
        // if country, property and space are not default
        if(!isDefault(location) && !isDefault(property) && isDefault(price) && !isDefault(space)) {
            if(house.country === location && house.type === property && houseSpace >= minSpace && houseSpace <= minSpace * 2) {
                return house;
            }
        }
        // if country, price and space are not default
        if(!isDefault(location) && isDefault(property) && !isDefault(price) && !isDefault(space)) {
            if(house.country === location && housePrice >= minPrice && housePrice <= minPrice * 2 && houseSpace >= minSpace && houseSpace <= minSpace * 2) {
                return house;
            }
        }
        // if property, price and space are not default
        if(isDefault(location) && !isDefault(property) && !isDefault(price) && !isDefault(space)) {
            if(house.type === property && housePrice >= minPrice && housePrice <= minPrice * 2 && houseSpace >= minSpace && houseSpace <= minSpace * 2) {
                return house;
            }}
        // if country, property, price and space are not default
        if(!isDefault(location) && !isDefault(property) && !isDefault(price) && !isDefault(space)) {
            if(house.country === location && house.type === property && housePrice >= minPrice && housePrice <= minPrice * 2 && houseSpace >= minSpace && houseSpace <= minSpace * 2) {
                return house;
            }}

            
        });
        
       // Set the timeout 
       setTimeout(() => {
            return newHouses.length < 1 ? setHouses([]) : setHouses(newHouses),
            setIsLoading(false)
       } , 1000)

    };

    // Run the get all properties rest api in this useEffect Function which is going to update at every addition by the user or refresh of the page
    useEffect(() => {
        const locations = new Set();
        const properties = new Set();
        const prices = new Set();
        const areas = new Set();
        houses.forEach((house) => {
            locations.add(house.country);
            properties.add(house.type);
            prices.add(house.price);
            areas.add(house.surface);
        });
        setLocations(['Location (any)' , ...locations]);
        setProperties(['Property (any' , ...properties]);
        setPrices(['Price Range (any)' ,...prices]);
        setSpaces(['Space (any)' , ...areas]);
        console.log(locations)
    },[]);

    return (  
        <HouseContext.Provider value = {{
            location, setLocation , locations, property ,setProperty, properties, price,setPrice ,prices, space, setSpace,spaces, houses,isLoading,handleSearchClick
        }}> {children} </HouseContext.Provider>
    );
}
 
export default HouseContextProvider;
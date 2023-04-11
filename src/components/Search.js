import LocationDropdown from "./LocationDropdown";
import PriceDropdown from "./PriceDropdown";
import AreaDropdown from "./AreaDropdown";
import PropertDropdown from "./PropertyDropdown";
import {BsSearch} from "react-icons/bs";
import { useContext } from "react";
import { HouseContext } from "./HouseContext";
const Search = () => {
    const {handleSearchClick} = useContext(HouseContext);
    return ( 
        
        <div className="px-[20px] py-6 max-w-[1300px] mx-auto flex flex-col lg:flex-row justify-between gap-4 lg:-top-4 lg:shadow-1 
        bg-white lg:bg-transparent lg:backdrop-blur-3xl rounded-lg">
            <LocationDropdown/>
            <PriceDropdown/>
            <AreaDropdown/>
            <PropertDropdown/>
            <button onClick = {() => handleSearchClick()} className="bg-violet-500 hover:bg-violet-600 transition w-full lg:max-w-[162px] 
            h-16 rounded-lg flex justify-center items-center text-white text-lg"> <BsSearch/></button>
        </div>

     );
}
 
export default Search;
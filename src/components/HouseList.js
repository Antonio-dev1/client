import { useContext } from "react";
import { HouseContext } from "./HouseContext";
import House from "./House";
import { Link } from "react-router-dom";
//Import Icons
import {ImSpinner2} from 'react-icons/im';
const HouseList = () => {
    const {houses , isLoading} = useContext(HouseContext);
    if(isLoading) {
        return(
        <ImSpinner2 className="mx-auto animate-spin text-violet-700 text-4xl mt-[150px]"></ImSpinner2>
        )
    }

    if(houses.length < 1){
        return(
            <h2 className="text-2xl text-gray-400 text-center mt-[150px]">No Houses to display</h2>
        )
    }
    return (  
        <section className="mb-20">
            <div className="container mx-auto">
                <div className="py-20">
                <div className= "grid md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-14 ">
                {houses.map((house , index )=> {
                    return(
                    <Link to = {`/property/${house.id}`} key={index}> <House house= {house}/> </Link>
                    );
                })}
                </div>
                </div>
            </div>
        </section>
    );
}
 
export default HouseList;
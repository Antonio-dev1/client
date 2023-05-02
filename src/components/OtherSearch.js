import { BsSearch } from "react-icons/bs";
const OtherSearch = () => {
    return ( 
        <div>
        <div className="px-[20px] py-6 max-w-[1300px] mx-auto flex flex-col lg:flex-row justify-between gap-4 lg:-top-4 lg:shadow-1 
        bg-white lg:bg-transparent lg:backdrop-blur-3xl rounded-lg">
            <input className="w-full rounded-lg bg-violet-300 text-white cursor shadow-sm ring-1 ring-inset focus:bg-violet-500" placeholder=" Type in a title"/>
            <button onClick = {""} className="bg-violet-500 hover:bg-violet-600 transition w-full lg:max-w-[162px] 
            h-16 rounded-lg flex justify-center items-center text-white text-lg"> <BsSearch/></button>
        </div>
         </div>
     );
}
 
export default OtherSearch ;
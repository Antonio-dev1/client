import { BsSearch } from "react-icons/bs";
const OtherSearch = ({setUserQuery , onSearchPressed , query , setFilteredRecommendations , recommendations}) => {
    const handleQueryChange = (e) => {
        e.preventDefault();
        setUserQuery(e.target.value);
        
    }
    let timer;
    const onSmoothSearch = (e) => {
        setUserQuery(e.target.value);
        let updatedList = [...recommendations];
        timer = setTimeout(() => {
            if(query === ""){
                console.log("We are in the if of the return search");
                updatedList = [...recommendations];
            } else{
                console.log("We are in the else of the return search");
                console.log("The query is: " + query);
               updatedList =  updatedList.filter((house) => {
                    console.log("The house title is: " + house.title);
                    return house.title.toLowerCase().includes(query.toLowerCase()) || house.location.toLowerCase().includes(query.toLowerCase());
                })
            } 

            setFilteredRecommendations(updatedList);
    } , 500)}
    
    return ( 
        <div>
        <div className="px-[20px] py-6 max-w-[1300px] mx-auto flex flex-col lg:flex-row justify-between gap-4 lg:-top-4 lg:shadow-1 
        bg-white lg:bg-transparent lg:backdrop-blur-3xl rounded-lg">
            <input  onChange={(e) => {handleQueryChange(e)}} className="w-full rounded-lg bg-gray-200 transition-opacity text-white cursor shadow-sm ring-1 ring-inset focus:bg-violet-500" placeholder="  Search"/>
            <button onClick = {(e) => {onSearchPressed(e)}} className="bg-violet-500 hover:bg-violet-600 transition w-full lg:max-w-[162px] 
            h-16 rounded-lg flex justify-center items-center text-white text-lg"> <BsSearch/></button>
        </div>
         </div>
     );
}
 
export default OtherSearch ;
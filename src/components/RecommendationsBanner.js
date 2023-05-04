import recommendation from '../assets/imgs/houses/hallway.jpg';
import OtherSearch from './OtherSearch';
const RecommendationsBanner = () => {
    return (  
        <section className="h-full max-h-[640px] mb-8 xl:mb-24 mt-5 ">
    <div className="flex flex-col lg:flex-row"> 
    <div className="lg:ml-8 xl:ml-[135px] flex flex-col items-center lg:items-start text-center lg:text-left justify-center flex-1 px-4
    lg:px-0"> 
        <h1 className="text-4xl lg:text-[58px] font-semibold leading-none mb-6"> 
            <span className="text-violet-500">This</span> is what we see fit for you!
        </h1>
    </div>
    <div className="hidden flex-1 lg:flex justify-end items-end ">
            <img className='rounded-tl-lg h-[500px]' src ={recommendation} alt= "House"/>
        </div>
    </div>
    </section>
    );
}
 
export default RecommendationsBanner;
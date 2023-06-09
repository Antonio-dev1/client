import HouseBanner from '../assets/imgs/modernhouse-1.jpg';
import Search from './Search';
const UsersBanner = () => {
    return (  <section className="h-full max-h-[640px] mb-8 xl:mb-24 mt-5 ">
    <div className="flex flex-col lg:flex-row"> 
    <div className="lg:ml-8 xl:ml-[135px] flex flex-col items-center lg:items-start text-center lg:text-left justify-center flex-1 px-4
    lg:px-0"> 
        <h1 className="text-4xl lg:text-[58px] font-semibold leading-none mb-6"> 
            <span className="text-violet-500">Find</span> Your Listings Here
        </h1>
        <p className="max-w-[480px] mb-8"> 
            Find your listings here! You can edit, delete, and add new listings.
        </p>
        
    </div>
    <div className="hidden flex-1 lg:flex justify-end items-end ">
            <img className='rounded-tl-lg' src ={HouseBanner} alt= "House"/>
        </div>
    </div>
    </section>
    );
}
 
export default UsersBanner;
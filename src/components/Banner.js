import HouseBanner from '../assets/imgs/house-banner.png';
import Search from './Search';
const Banner = () => {
    return ( 
        <section className="h-full max-h-[640px] mb-8 xl:mb-24 mt-5 ">
        <div className="flex flex-col lg:flex-row"> 
        <div className="lg:ml-8 xl:ml-[135px] flex flex-col items-center lg:items-start text-center lg:text-left justify-center flex-1 px-4
        lg:px-0"> 
            <h1 className="text-4xl lg:text-[58px] font-semibold leading-none mb-6"> 
                <span className="text-violet-500">Rent or Buy</span> Your Dream Home with Us
            </h1>
            <p className="max-w-[480px] mb-8"> 
                Everything you dream of can be found here. From high end homes to the low end ones. We are ready to serve you.
            </p>
            
        </div>
        <div className="hidden flex-1 lg:flex justify-end items-end ">
                <img src ={HouseBanner} alt= "House"/>
            </div>
        </div>
        <Search/>
        </section>
     );
}
 
export default  Banner;
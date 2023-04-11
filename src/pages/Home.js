import NavBar from '../components/navbar.js';
import Banner from '../components/Banner.js';
import HouseList from '../components/HouseList.js';
import Footer from '../components/Footer.js';

const Home = () => {
    return (  
        
        <div className="min-h-[1800px]:">
            <NavBar/>
            <Banner/>
            <HouseList/>
            <Footer/>
        </div>
        
    
     
    );
}
 
export default Home ;
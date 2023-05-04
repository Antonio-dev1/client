import { useContext, useState} from "react";
import { UserContext}  from "./UserContext";
import { useNavigate } from "react-router-dom";
import {AiOutlineMenu , AiOutlineClose} from 'react-icons/ai';
import { ImSpinner2 } from "react-icons/im";
import logo from '../assets/imgs/logo-text.png';

const AdminNav = () => {
    const [toggleMenu, setToggleMenu] = useState(false);
    const [logginOut , setLogginOut] = useState(false);
    const {isLoggedIn ,setIsLoggedIn , setJwt , setUser} = useContext(UserContext);
    const navigate = useNavigate();
    const handleLogout = () => {

        setLogginOut(true);
        setTimeout(() => {
        return sessionStorage.setItem('jwt' , ''),
        setJwt(''),
        setIsLoggedIn(false),
        setLogginOut(false),
        setUser({}),
        navigate('/')
        } , 1000)
        
    };

    const handleLogin = (
        ) => {
       navigate('/signin');
        };

        const homePressed =() => {
            navigate('/adminDashboard');
        }

        const navLinksClass = toggleMenu ? 'top-[9%] md:static absolute bg-[#f6eef6] md:min-h-fit min-h-[60vh] lef-0 w-full flex items-center px-5' : 'md:static absolute bg-[#f6eef6] md:min-h-fit min-h-[60vh] lef-0 top-[-100%] md:w-auto w-full flex items-center px-5';
        const handleMenu = (e) => {
            setToggleMenu(!toggleMenu);
        }


    return ( 
        <nav className="flex py-5 justify-between items-center w-[100%] mx-auto  font-[Poppins] bg-gradient-to-t from-[#f6eef6] to-[#feeaff]">

        <div> 
            <button onClick = {homePressed}>
            <img className = "w-40 pl-4 pt-2" src = {logo} alt=""/> 
            </button>
        </div>
        <div className={navLinksClass}>
            <ul className="flex md:flex-row flex-col md:items-center md:gap-[4vw] gap-8">
                
            </ul>

        </div>
        <div className=" ml-5 flex items-center gap-6 pt-2 ">
            
        {isLoggedIn? (
                <button className="bg-[#a6c1ee] text-white pr-4 px-5 py-2 rounded-full mr-1 hover:bg-[#87acec]" onClick = {handleLogout} disabled = "">Logout</button>
            ): (<button className="bg-[#a6c1ee] text-white pr-4 px-5 py-2  rounded-full mr-1 hover:bg-[#87acec]" onClick={handleLogin}>Login</button>)}
            {logginOut? (<ImSpinner2 className="mx-auto animate-spin text-violet-700 text-4xl mt-[150px]"></ImSpinner2>): (null)}

            {toggleMenu? <AiOutlineClose onClick= {handleMenu} className="text-3xl cursor-pointer md:hidden"></AiOutlineClose>:
            <AiOutlineMenu onClick= {handleMenu} className="text-3xl cursor-pointer md:hidden"></AiOutlineMenu>}

        </div>

        </nav>
     );
}
 
export default AdminNav ;
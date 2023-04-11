import { useState } from 'react';
import logo from '../assets/imgs/logo-text.png';
import {AiOutlineMenu , AiOutlineClose} from 'react-icons/ai';
import {useNavigate, Link } from 'react-router-dom';

//Fix the toggle of using the useState

const NavBar = () => {
    const [toggleMenu, setToggleMenu] = useState(false);
    const [isLoggedIn , setIsLoggedIn] = useState(false);

    const navigate = useNavigate();

    const handleLogout = () => {};
    const handleLogin = (
         ) => {
        navigate('/signin');
         };

         const homePressed =() => {
            navigate('/');
        }
    const navLinks = document.querySelector('.nav-links');


    const navLinksClass = toggleMenu ? 'top-[9%] md:static absolute bg-[#f6eef6] md:min-h-fit min-h-[60vh] lef-0 w-full flex items-center px-5' : 'md:static absolute bg-[#f6eef6] md:min-h-fit min-h-[60vh] lef-0 top-[-100%] md:w-auto w-full flex items-center px-5';
    const handleMenu = (e) => {
        setToggleMenu(!toggleMenu);
    }

    
    return (
        <nav className="flex justify-between items-center w-[100%] mx-auto  font-[Poppins] bg-gradient-to-t from-[#f6eef6] to-[#feeaff]">

        <div> 
            <button onClick = {homePressed}>
            <img className = "w-40 pl-4 pt-2" src = {logo} alt=""/> 
            </button>
        </div>
        <div className= {navLinksClass}>
            <ul className="flex md:flex-row flex-col md:items-center md:gap-[4vw] gap-8">
                <li className="hover:text-gray-500">
                    <Link to= "/favorites">Favorites</Link>
                </li>

                <li className="hover:text-gray-500">
                    <Link to= "/postAd">Post Listing</Link>
                </li>

                <li className="hover:text-gray-500">
                    <Link to = "/chats">Messages</Link>
                </li>

                <li className="hover:text-gray-500">
                    <Link to = "/profile">Profile</Link>
                </li>
            </ul>

        </div>
        <div className=" ml-5 flex items-center gap-6 pt-2 ">
            {isLoggedIn? (
                <button className="bg-[#a6c1ee] text-white pr-4 px-5 py-2 rounded-full mr-1 hover:bg-[#87acec]" onClick = {handleLogout}>Logout</button>
            ): (<button className="bg-[#a6c1ee] text-white pr-4 px-5 py-2  rounded-full mr-1 hover:bg-[#87acec]" onClick={handleLogin}>Login</button>)}

            {toggleMenu? <AiOutlineClose onClick= {handleMenu} className="text-3xl cursor-pointer md:hidden"></AiOutlineClose>:
            <AiOutlineMenu onClick= {handleMenu} className="text-3xl cursor-pointer md:hidden"></AiOutlineMenu>}

        </div>

        </nav>
    );
}
export default NavBar; 
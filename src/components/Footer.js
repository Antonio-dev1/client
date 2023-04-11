import { useState } from 'react';
import { FcDoNotInsert } from 'react-icons/fc';
import {Link} from 'react-router-dom';



const Footer = () => {
    return (  
        <footer className="px-30 bg-gradient-to-t from-[#f6eef6] to-[#ffffff] rounded-lg shadow m-4 dark:bg-gray-800">
    <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
      <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <Link to ="/Home" className="hover:underline">HouseTech™</Link>. All Rights Reserved.
    </span>
    <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
        <li>
            <Link to="/About" className="mr-4 hover:underline md:mr-6 ">About</Link>
        </li>
        <li>
            <Link to="/privacy" className="mr-4 hover:underline md:mr-6">Privacy Policy</Link>
        </li>
        <li>
            <Link to="/Licensing" className="mr-4 hover:underline md:mr-6">Licensing</Link>
        </li>
        <li>
            <Link to="/Contact" className="hover:underline">Contact</Link>
        </li>
    </ul>
    </div>
</footer>

    );
}
 
export default Footer;
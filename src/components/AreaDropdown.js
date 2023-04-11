import { useState, useEffect ,useContext} from 'react';
import {RiWallet3Line, RiArrowDownSLine , RiArrowUpSLine} from 'react-icons/ri'
import {FaRuler} from 'react-icons/fa'
import { HouseContext } from './HouseContext';
import {Menu} from '@headlessui/react';
import { getPriceRange } from '../Functions/functions';
//Think about adding a type dropdown
const PriceDropdown = () => {
    const {space,  setSpace , spaces} = useContext(HouseContext);
    const [isOpen , setIsOpen] = useState(false);
    
    return ( 
        <Menu as ='div' className="dropdown relative ">
            <Menu.Button onClick = {() => setIsOpen(!isOpen)} className="dropdown-btn w-full text-left ">
                <FaRuler className="dropdown-icon-primary">
                    
                </FaRuler>
                <div>
                        <div className="text-[15px] font-medium leading-tight ">
                            {space}
                        </div>
                        <div className="text-[13px]">
                            Choose your price range!
                        </div>
                    </div>
                    {isOpen ? <RiArrowUpSLine className="dropdown-icon-secondary"/> : <RiArrowDownSLine className="dropdown-icon-secondary"/>}
            </Menu.Button>
            <Menu.Items  className="dropdown-menu">
                {spaces.map((space , index) => {
                    return (
                    <Menu.Item as='li'  onClick = {() => setSpace(space)} className="cursor-pointer hover:text-violet-500 transition " key={index}> {space} </Menu.Item>)
                 })}
                 
            </Menu.Items>
        </Menu>
     );
}
 
export default PriceDropdown;
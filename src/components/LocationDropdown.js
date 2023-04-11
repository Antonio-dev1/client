import { useState, useEffect ,useContext} from 'react';
import {RiMapPinLine , RiArrowDownSLine , RiArrowUpSLine} from 'react-icons/ri'
import { HouseContext } from './HouseContext';
import {Menu} from '@headlessui/react';

const LocationDropdown = () => {
    const {location,  setLocation , locations} = useContext(HouseContext);
    const [isOpen , setIsOpen] = useState(false);
    
    return ( 
        <Menu as ='div' className="dropdown relative ">
            <Menu.Button onClick = {() => setIsOpen(!isOpen)} className="dropdown-btn w-full text-left ">
                <RiMapPinLine className="dropdown-icon-primary">
                    
                </RiMapPinLine>
                <div>
                        <div className="text-[15px] font-medium leading-tight ">
                            {location}
                        </div>
                        <div className="text-[13px]">
                            Select your favorite location!
                        </div>
                    </div>
                    {isOpen ? <RiArrowUpSLine className="dropdown-icon-secondary"/> : <RiArrowDownSLine className="dropdown-icon-secondary"/>}
            </Menu.Button>
            <Menu.Items  className="dropdown-menu">
                {locations.map((location , index) => {
                    return (
                    <Menu.Item as='li'  onClick = {() => setLocation(location)} className="cursor-pointer hover:text-violet-500 transition " key={index}> {location} </Menu.Item>)
                 })}
                 
            </Menu.Items>
        </Menu>
     );
}
 
export default LocationDropdown;
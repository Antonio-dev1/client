import { useState, useEffect ,useContext} from 'react';
import {RiWallet3Line, RiArrowDownSLine , RiArrowUpSLine} from 'react-icons/ri'
import { HouseContext } from './HouseContext';
import {Menu} from '@headlessui/react';
import { getPriceRange } from '../Functions/functions';
//Think about adding a type dropdown
const PriceDropdown = () => {
    const {price,  setPrice , prices} = useContext(HouseContext);
    //const priceRange = getPriceRange(prices);
    const [isOpen , setIsOpen] = useState(false);
    
    return ( 
        <Menu as ='div' className="dropdown relative ">
            <Menu.Button onClick = {() => setIsOpen(!isOpen)} className="dropdown-btn w-full text-left ">
                <RiWallet3Line className="dropdown-icon-primary">
                    
                </RiWallet3Line>
                <div>
                        <div className="text-[15px] font-medium leading-tight ">
                            {price}
                        </div>
                        <div className="text-[13px]">
                            Choose your price range!
                        </div>
                    </div>
                    {isOpen ? <RiArrowUpSLine className="dropdown-icon-secondary"/> : <RiArrowDownSLine className="dropdown-icon-secondary"/>}
            </Menu.Button>
            <Menu.Items  className="dropdown-menu">
                {prices.map((range , index) => {
                    return (
                    <Menu.Item as='li'  onClick = {() => setPrice(range)} className="cursor-pointer hover:text-violet-500 transition " key={index}> {range} </Menu.Item>)
                 })}
                 
            </Menu.Items>
        </Menu>
     );
}
 
export default PriceDropdown;
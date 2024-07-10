import Image from 'next/image';
import React, { useState } from 'react';
import glass from '../glass.svg';
import { MenuSearch } from './MenuSearch';

interface MenuProps {
  isOpen: boolean;
  toggleMenu: () => void;
}

export const Menu: React.FC<MenuProps> = ({ isOpen, toggleMenu }) => {
  const [isClicked, setIsClicked] = useState<boolean>(false);

  const handleMenuClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleToggleMenu = () => {
    setIsClicked(false);
    toggleMenu();
  };

  const handleIsClicked = () => {
    setIsClicked(!isClicked);
  };


  return (
    <div
      className={`fixed top-20 right-0 w-full h-full bg-black bg-opacity-10 transition-opacity duration-300 ease-in-out ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      onClick={handleToggleMenu}
    >
      <div
        className={`bg-[#F9F9F9] p-5 absolute top-0 right-0 h-full w-[210px] transform transition-transform duration-1000 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
        onClick={handleMenuClick}
      >
        <nav onClick={handleMenuClick}>
          <ul className='text-lg -mt-7'>
            <li className="py-2 hover:font-medium">
              <div className='w-12 h-12 rounded-3xl bg-black' />
            </li>
            <li className="py-2 hover:font-medium transition-all duration-300">
              <a href="#services">Integration</a>
            </li>
            <li className="py-2">
              <button
                onClick={handleIsClicked}
                className='bg-transparent w-[109px] h-[33px] border border-[#C4C4C4] rounded-lg flex items-center justify-center'
              >
                <Image alt='glass' src={glass} className='mr-2' />
                Search
              </button>
            </li>
          </ul>
        </nav>
        <MenuSearch isClicked={isClicked} />
      </div>
    </div>
  );
};

export default Menu;

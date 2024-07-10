import Image from 'next/image';
import glass from '../glass.svg';
import styles from '../MenuSearch.module.css';
import { Tabs } from './Tabs';

export const MenuSearch = ({ isClicked }: { isClicked: boolean }) => {
  return (
    <div
      className={`w-44 border p-2 border-gray-400 rounded-md transition-all duration-500 ${isClicked ? 'opacity-100 h-fit' : 'opacity-0'
        }`}
    >
      <form className='w-full bg-transparent flex items-center justify-between border-b border-[#D9C4C4] -mt-2 '>
        <Image src={glass} alt='glass' className={styles['svg-file']} />
        <input
          type="text"
          className='w-full bg-transparent placeholder:text-gray-400 text-lg outline-none ml-2'
          placeholder='Search...'
        />
      </form>
      <Tabs />
    </div>
  );
};

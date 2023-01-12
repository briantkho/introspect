import React from 'react';
import {
  HiOutlineLightBulb,
  HiPlus,
  HiOutlineBookOpen,
  HiOutlineCheck,
  HiOutlineUserCircle,
} from 'react-icons/hi';

import { BsPlusSquare } from 'react-icons/bs';

const Sidebar = () => {
  return (
    <div className="shadow-lg sticky w-min h-min p-5 bg-white-bg rounded-xl top-5 left-5 dark:bg-dark-card dark:shadow-none">
      <div className="text-4xl dark:text-dark-text text-primary-900 flex flex-col gap-7">
        <div className="hover:text-primary-700 cursor-pointer">
          <BsPlusSquare />
        </div>
        <div className="hover:text-primary-700 cursor-pointer">
          <HiOutlineLightBulb />
        </div>
        <div className="hover:text-primary-700 cursor-pointer">
          <HiOutlineBookOpen />
        </div>
        <div className="hover:text-primary-700 cursor-pointer">
          <HiOutlineCheck />
        </div>
        <div className="hover:text-primary-700 cursor-pointer">
          <HiOutlineUserCircle />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

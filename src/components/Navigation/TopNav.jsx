import { useState } from 'react';
import ThemeToggle from './ThemeToggle';
import { IoSearchOutline, IoSettingsOutline, IoPersonCircle } from "react-icons/io5";

const TopNav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="flex items-center justify-between flex-wrap dark:bg-slate-800 w-full p-4">
      {/* Logo Section */}
      <div className="flex items-center flex-shrink-0 dark:text-white mr-6">
        <span className="font-semibold text-xl tracking-tight">
          Hallo <span className="font-extrabold">DAP THEWI</span>
        </span>
      </div>

      {/* Mobile Menu Toggle */}
      <div className="block lg:hidden">
        <button
          onClick={toggleMenu}
          className="flex items-center px-3 py-2 border rounded dark:bg-slate-800 border-slate-800 dark:border-white"
        >
          <svg
            className="fill-current h-5 w-5"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>

      {/* Main Navigation */}
      <div
        className={`w-full block flex-grow lg:flex lg:items-center lg:w-auto ${
          isMenuOpen ? 'block' : 'hidden'
        }`}
      >
        {/* Icons Section */}
        <div className="text-sm lg:flex-grow lg:flex lg:justify-end items-center">
          {/* Icon Links */}
          <a
            href="#"
            className="flex items-center gap-2 mt-4 lg:mt-0 lg:mx-4 text-xl dark:text-white"
          >
            <IoSearchOutline className="h-6 w-6" />
            <span className="lg:hidden text-base">Search</span>
          </a>
          <a
            href="#"
            className="flex items-center gap-2 mt-4 lg:mt-0 lg:mx-4 text-xl dark:text-white"
          >
            <IoSettingsOutline className="h-6 w-6" />
            <span className="lg:hidden text-base">Settings</span>
          </a>
          <a
            href="#"
            className="flex items-center gap-2 mt-4 lg:mt-0 lg:mx-4 text-xl dark:text-white"
          >
            <IoPersonCircle className="h-6 w-6" />
            <span className="lg:hidden text-base">Profile</span>
          </a>
        </div>

        {/* Theme Toggle */}
        <div className="flex items-center justify-left lg: justi mt-4 lg:mt-0 lg:ml-4">
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
};

export default TopNav;

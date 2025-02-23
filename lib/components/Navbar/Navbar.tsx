'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import CollectionsDropdown from './CollectionsDropdown';
import PagesDropDown from '../PagesDropDown/PagesDropDown';
const Navbar: React.FC = () => {
  const [isCollectionsOpen, setIsCollectionsOpen] = useState<boolean>(false);
  const [isPageOpen, setIsPageOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const closeAllDropdowns = () => {
    setIsCollectionsOpen(false);
    setIsPageOpen(false);
  };
  return (
    <div className="fixed top-4 left-0 right-0 z-50 px-4">
      <nav
        className={`
          max-w-[1400px] mx-auto rounded-full transition-all duration-300 text-black
          ${isScrolled ? 'bg-white/10 backdrop-blur-sm shadow-sm' : 'bg-white/60 backdrop-blur-sm'}
        `}
      >
        <div className="flex items-center justify-between h-16 px-8">
          <Link href="/" className="text-xl font-light hover:text-gray-800">
            Essancia Fashion
          </Link>
          <div className="flex items-center space-x-8">
            <Link href="/" className="hover:text-gray-800">
              Home
            </Link>
            <div className="relative">
              <button
                className="flex items-center hover:text-gray-800"
                onClick={() => {
                  setIsCollectionsOpen(!isCollectionsOpen);
                  setIsPageOpen(false);
                }}
              >
                Collections
                <svg
                  className={`ml-1 w-4 h-4 transition-transform ${
                    isCollectionsOpen ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            </div>
            <div className="relative">
              <button
                className="flex items-center hover:text-gray-800"
                onClick={() => {
                  setIsPageOpen(!isPageOpen);
                  setIsCollectionsOpen(false);
                }}
              >
                Pages
                <svg
                  className={`ml-1 w-4 h-4 transition-transform ${
                    isPageOpen ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            </div>
            <Link href="/blog" className="hover:text-gray-800">
              Blog
            </Link>
            <Link href="/contact" className="hover:text-gray-800">
              Contact
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/login" className="px-4 py-2 hover:text-gray-800">
              Login
            </Link>
            <Link
              href="/signup"
              className="px-6 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition-colors"
            >
              Sign up
            </Link>
          </div>
        </div>
      </nav>
      <CollectionsDropdown
        isOpen={isCollectionsOpen}
        onClose={closeAllDropdowns}
      />
      <PagesDropDown isOpen={isPageOpen} onClose={closeAllDropdowns} />
    </div>
  );
};
export default Navbar;

'use client';
import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import {
  TwitterIcon,
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
} from '../SocialIcons/SocialIcons';

const navigation = {
  home: [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ],
  collections: [
    { name: 'New Arrivals', href: '/collections/new-arrivals' },
    { name: 'Best Sellers', href: '/collections/best-sellers' },
    { name: 'Sale', href: '/collections/sale' },
  ],
  products: [
    { name: 'Clothing', href: '/products/clothing' },
    { name: 'Accessories', href: '/products/accessories' },
    { name: 'Shoes', href: '/products/shoes' },
  ],
  quickLinks: [
    { name: 'FAQs', href: '/faqs' },
    { name: 'Size Guide', href: '/size-guide' },
    { name: 'Shipping Info', href: '/shipping' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Returns Policy', href: '/returns' },
  ],
};

const Footer = () => {
  return (
    <footer className="bg-white text-black overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Newsletter Section */}
        <div className="py-12 sm:py-16 md:py-20 border-b border-gray-100">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
            <div className="max-w-md text-center md:text-left w-full md:w-auto">
              <h2 className="text-3xl sm:text-4xl font-light mb-2 sm:mb-3">
                Join Our Newsletter
              </h2>
              <p className="text-gray-500 text-sm leading-relaxed max-w-sm mx-auto md:mx-0">
                Subscribe to receive updates, access to exclusive deals, and
                more.
              </p>
            </div>
            <div className="w-full md:w-auto">
              <form className="flex flex-col sm:flex-row gap-3 sm:gap-2 max-w-md mx-auto md:mx-0">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-4 py-3 bg-gray-50 border border-gray-200 
                    text-gray-900 placeholder:text-gray-400 w-full md:w-80 
                    focus:outline-none focus:border-gray-900 hover:border-gray-300 
                    transition-colors duration-300 text-base"
                />
                <button
                  className="px-6 sm:px-8 py-3 bg-black text-white hover:bg-gray-900 
                    transition-all duration-300 hover:px-10 text-base whitespace-nowrap"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Navigation Grid */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 py-16 md:grid-cols-5">
          {Object.entries(navigation).map(([key, items]) => (
            <div key={key} className="group">
              <h3
                className="flex items-center gap-2 text-sm font-medium tracking-wider uppercase 
                cursor-pointer"
              >
                <span className="text-gray-900">{key}</span>
                <ArrowUpRight
                  className="h-3 w-3 transform group-hover:translate-x-1 
                  group-hover:-translate-y-1 transition-transform duration-300"
                />
              </h3>
              <ul className="mt-6 space-y-4">
                {items.map(item => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm text-gray-500 hover:text-black transition-all 
                        duration-300 flex items-center gap-1 group hover:pl-2"
                    >
                      {item.name}
                      <span
                        className="opacity-0 group-hover:opacity-100 transition-all 
                        duration-300 transform group-hover:translate-x-1"
                      >
                        →
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-100 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
              <Link href="/" className="group">
                <span
                  className="text-xl font-light tracking-wider hover:text-gray-600 
                  transition-colors duration-300"
                >
                  ESSENCIA
                </span>
              </Link>
              <p className="text-sm text-gray-500">
                © 2025 All rights reserved
              </p>
            </div>

            <div className="flex items-center gap-8">
              {/* Language Selector */}
              <select
                className="bg-transparent text-sm text-gray-500 hover:text-black 
                  focus:outline-none cursor-pointer border-none appearance-none 
                  hover:bg-gray-50 px-2 py-1 rounded transition-colors duration-300"
                defaultValue="EN"
              >
                <option value="EN" className="bg-white">
                  English
                </option>
                <option value="HN" className="bg-white">
                  Hindi
                </option>
                <option value="PU" className="bg-white">
                  Punjabi
                </option>
              </select>

              {/* Social Links */}
              <div className="flex items-center gap-8">
                {[
                  {
                    name: 'TWITTER',
                    icon: <TwitterIcon />,
                    href: 'https://twitter.com',
                  },
                  {
                    name: 'FACEBOOK',
                    icon: <FacebookIcon />,
                    href: 'https://facebook.com',
                  },
                  {
                    name: 'INSTAGRAM',
                    icon: <InstagramIcon />,
                    href: 'https://instagram.com',
                  },
                  {
                    name: 'LINKEDIN',
                    icon: <LinkedInIcon />,
                    href: 'https://linkedin.com',
                  },
                ].map(social => (
                  <Link
                    key={social.name}
                    href={social.href}
                    className="text-gray-400 hover:text-black transition-all duration-300 
                      group flex items-center gap-2"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span
                      className="opacity-80 group-hover:opacity-100 transition-all duration-300 
                      transform group-hover:scale-110"
                    >
                      {social.icon}
                    </span>
                    <span className="hidden sm:block text-xs tracking-wider group-hover:text-gray-500">
                      {social.name}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

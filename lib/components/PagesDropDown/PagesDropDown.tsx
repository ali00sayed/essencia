import React from 'react';
import Link from 'next/link';
const categories = [
  {
    title: 'About Us',
    link: '/about-us',
  },
  {
    title: 'Fusion Wear Clothes',
    link: '/faq',
  },
  {
    title: 'Terms & Conditions',
    link: '/terms-conditions',
  },
  {
    title: 'Privacy',
    link: '/privacy',
  },
  {
    title: 'Shipping Policy',
    link: '/shipping-policy',
  },
];
const PagesDropDown = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  return (
    <div
      className={`
        absolute top-[calc(100%+0.5rem)] left-1/2 -translate-x-1/2
        max-w-[1400px] w-[calc(100%-2rem)] bg-white rounded-3xl z-50
        transition-all duration-500 ease-in-out overflow-hidden shadow-lg
        ${isOpen ? 'w-[300px] max-h-[264px] opacity-100' : 'max-h-0 opacity-0'}
      `}
    >
      <div className="w-[300px] py-12 px-8">
        <div className="flex flex-col items-center justify-center gap-4">
          {categories.map((category, index) => (
            <div
              key={index}
              className="transition-all duration-500 ease-out"
              style={{
                transform: `translateY(${isOpen ? '0' : '-10px'})`,
                opacity: isOpen ? 1 : 0,
                transitionDelay: `${index * 50}ms`,
              }}
            >
              <ul className="space-y-3">
                <Link
                  href={category.link}
                  className="text-gray-600 hover:text-[#2D2422] transition-colors text-sm text-center"
                  onClick={onClose}
                >
                  {category.title}
                </Link>
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default PagesDropDown;

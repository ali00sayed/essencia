'use client';
import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { collectionsData } from '@/lib/constants/Collections';
import PageContainer from '@/lib/components/PageContainer/PageContainer';
import { Filter, SlidersHorizontal, ChevronDown, Search } from 'lucide-react';

// Define valid categories type
type Category = keyof typeof collectionsData;

type Props = {
  params: { category: string };
};

// Client component
export default function CategoryPage({ params }: Props) {
  const { category } = params;
  const collection = collectionsData[category as Category];
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState('featured');

  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const filterRef = useRef<HTMLDivElement>(null);

  // Register ScrollTrigger plugin
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Set up animations
  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Header animations
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: -30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
        }
      );

      gsap.fromTo(
        descriptionRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.8,
          delay: 0.3,
          ease: 'power2.out',
        }
      );

      // Filter controls animation
      gsap.fromTo(
        filterRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: 0.4,
          ease: 'power2.out',
        }
      );

      // Grid items animation with stagger
      gsap.fromTo(
        itemRefs.current,
        {
          opacity: 0,
          y: 40,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          delay: 0.5,
          ease: 'back.out(1.4)',
        }
      );

      // Set up hover animations for each item
      itemRefs.current.forEach(item => {
        if (!item) return;

        const image = item.querySelector('.product-image');
        const details = item.querySelector('.product-details');
        const price = item.querySelector('.price-tag');
        const viewDetails = item.querySelector('.view-details');

        // Create hover animation timeline
        const hoverTimeline = gsap.timeline({ paused: true });

        hoverTimeline
          .to(item, {
            y: -10,
            boxShadow:
              '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            duration: 0.3,
            ease: 'power2.out',
          })
          .to(
            image,
            {
              scale: 1.1,
              duration: 0.4,
              ease: 'power1.out',
            },
            0
          )
          .to(
            details,
            {
              y: -5,
              duration: 0.3,
              ease: 'power1.out',
            },
            0
          )
          .to(
            price,
            {
              scale: 1.05,
              duration: 0.3,
              ease: 'power1.out',
            },
            0
          )
          .to(
            viewDetails,
            {
              opacity: 1,
              x: 0,
              duration: 0.3,
              ease: 'power1.out',
            },
            0
          );

        // Add event listeners for hover
        item.addEventListener('mouseenter', () => hoverTimeline.play());
        item.addEventListener('mouseleave', () => hoverTimeline.reverse());
      });

      // Parallax effect for header background
      ScrollTrigger.create({
        trigger: headerRef.current,
        start: 'top top',
        end: 'bottom top',
        onUpdate: self => {
          if (headerRef.current) {
            gsap.to(headerRef.current.querySelector('.bg-pattern'), {
              y: self.progress * 50,
              ease: 'none',
              duration: 0.1,
            });
          }
        },
      });
    }, containerRef);

    return () => ctx.revert(); // Clean up animations
  }, []);

  // Set up item refs
  const setItemRef = (el: HTMLDivElement | null, index: number) => {
    itemRefs.current[index] = el;
  };

  if (!collection) {
    return (
      <PageContainer>
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Collection not found
          </h2>
          <p className="text-gray-600 mb-8">
            The collection you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link
            href="/collections"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
          >
            Browse all collections
          </Link>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <div ref={containerRef} className="w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Collection Header with Background */}
          <div
            ref={headerRef}
            className="relative mb-12 py-16 px-8 sm:px-12 rounded-3xl overflow-hidden"
          >
            {/* Background Image and Overlay */}
            <div className="absolute inset-0 z-0">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-indigo-900/85 to-purple-900/90 mix-blend-multiply"></div>
              <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
            </div>

            {/* Back Button */}
            <div className="relative z-10 mb-6">
              <Link
                href="/collections"
                className="inline-flex items-center text-white/90 hover:text-white transition-colors group"
              >
                <svg
                  className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                <span className="text-sm font-medium">Back to Collections</span>
              </Link>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-400 rounded-full opacity-20 blur-3xl -mr-20 -mt-20"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-purple-400 rounded-full opacity-20 blur-2xl -ml-10 -mb-10"></div>
            <div className="absolute top-1/2 left-1/4 w-20 h-20 bg-pink-400 rounded-full opacity-20 blur-xl"></div>

            {/* Content */}
            <div className="relative z-10">
              <h1
                ref={titleRef}
                className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 opacity-0 tracking-tight"
              >
                {collection.title}
              </h1>
              <p
                ref={descriptionRef}
                className="text-xl text-white/80 max-w-3xl opacity-0 leading-relaxed"
              >
                {collection.description}
              </p>

              {/* Search Bar */}
              <div className="mt-8 max-w-md">
                <div className="relative">
                  <input
                    type="text"
                    placeholder={`Search in ${collection.title.toLowerCase()}...`}
                    className="w-full pl-12 pr-4 py-3 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent"
                  />
                  <Search className="absolute left-4 top-3.5 text-white/70 w-5 h-5" />
                </div>
              </div>
            </div>
          </div>

          {/* Filter and Sort Controls */}
          <div
            ref={filterRef}
            className="flex flex-wrap justify-between items-center mb-10 opacity-0"
          >
            <div className="flex items-center space-x-2 text-gray-600 mb-4 sm:mb-0">
              <Filter className="w-4 h-4" />
              <span className="text-sm font-medium">
                Showing {collection.items.length} products
              </span>
            </div>
            <div className="flex flex-wrap gap-4">
              <div className="relative">
                <select
                  value={selectedSort}
                  onChange={e => setSelectedSort(e.target.value)}
                  className="appearance-none bg-white border border-gray-200 rounded-lg pl-4 pr-10 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[180px]"
                >
                  <option value="featured">Sort by: Featured</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="newest">Newest First</option>
                </select>
                <ChevronDown className="absolute right-3 top-3 w-4 h-4 text-gray-500 pointer-events-none" />
              </div>
              <button
                onClick={() => setFilterOpen(!filterOpen)}
                className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2.5 rounded-lg transition-colors"
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span className="text-sm font-medium">Filters</span>
              </button>
            </div>
          </div>

          {/* Expanded Filter Panel */}
          {filterOpen && (
            <div className="bg-white border border-gray-200 rounded-xl p-6 mb-8 shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">
                    Price Range
                  </h3>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="rounded text-blue-600 focus:ring-blue-500 mr-2"
                      />
                      <span className="text-sm text-gray-700">Under $50</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="rounded text-blue-600 focus:ring-blue-500 mr-2"
                      />
                      <span className="text-sm text-gray-700">$50 - $100</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="rounded text-blue-600 focus:ring-blue-500 mr-2"
                      />
                      <span className="text-sm text-gray-700">$100 - $200</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="rounded text-blue-600 focus:ring-blue-500 mr-2"
                      />
                      <span className="text-sm text-gray-700">Over $200</span>
                    </label>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Color</h3>
                  <div className="flex flex-wrap gap-2">
                    {['black', 'white', 'gray', 'red', 'blue', 'green'].map(
                      color => (
                        <button
                          key={color}
                          className={`w-8 h-8 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                          style={{ backgroundColor: color }}
                          aria-label={`Filter by ${color}`}
                        />
                      )
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Size</h3>
                  <div className="flex flex-wrap gap-2">
                    {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map(size => (
                      <button
                        key={size}
                        className="min-w-[40px] h-10 px-3 rounded-md border border-gray-300 text-sm font-medium hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-between mt-8 pt-6 border-t border-gray-100">
                <button className="text-sm text-gray-600 hover:text-gray-900">
                  Clear all filters
                </button>
                <button className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                  Apply Filters
                </button>
              </div>
            </div>
          )}

          {/* Product Grid */}
          <div
            ref={gridRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 md:gap-y-16"
          >
            {collection.items.map((item, index) => (
              <div
                key={item.id}
                ref={el => setItemRef(el, index)}
                className="opacity-0 bg-white rounded-xl overflow-hidden shadow-sm transition-all duration-300 group"
              >
                <Link
                  href={`/collections/${category}/${item.id}`}
                  className="block h-full"
                >
                  <div className="relative h-80 w-full overflow-hidden">
                    <Image
                      src={
                        Array.isArray(item.images)
                          ? item.images[0]
                          : item.images
                      }
                      alt={item.name}
                      fill
                      className="object-cover product-image transition-transform duration-300"
                    />
                    {item.discount && (
                      <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full">
                        {item.discount}
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="bg-white text-gray-900 px-4 py-2 rounded-full text-sm font-medium transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        Quick View
                      </span>
                    </div>
                  </div>
                  <div className="p-5 product-details">
                    <h2 className="text-lg font-medium text-gray-900 mb-2">
                      {item.name}
                    </h2>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2 price-tag">
                        <span className="font-bold text-gray-900">
                          {item.price}
                        </span>
                        {item.originalPrice && (
                          <span className="text-sm text-gray-500 line-through">
                            {item.originalPrice}
                          </span>
                        )}
                      </div>
                      <div className="text-blue-600 view-details opacity-80 transform translate-x-2">
                        <span className="text-sm font-medium">
                          View Details
                        </span>
                      </div>
                    </div>

                    {/* Rating Stars (if available) */}
                    {item.rating && (
                      <div className="flex items-center mt-3">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-4 h-4 ${i < Math.floor(item.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                        {item.reviews && (
                          <span className="text-xs text-gray-500 ml-2">
                            ({item.reviews})
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </Link>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {collection.items.length === 0 && (
            <div className="text-center py-20 bg-gray-50 rounded-xl">
              <div className="max-w-md mx-auto">
                <svg
                  className="w-16 h-16 text-gray-400 mx-auto mb-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <h3 className="text-xl font-medium text-gray-900 mb-2">
                  No products found
                </h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your filters or check back later for new
                  arrivals.
                </p>
                <button className="bg-blue-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                  Clear all filters
                </button>
              </div>
            </div>
          )}

          {/* Pagination */}
          {collection.items.length > 0 && (
            <div className="flex justify-center mt-16">
              <nav className="flex items-center space-x-2">
                <button className="px-3 py-2 rounded-md border border-gray-300 text-gray-500 hover:bg-gray-50">
                  Previous
                </button>
                <button className="px-3 py-2 rounded-md bg-blue-600 text-white">
                  1
                </button>
                <button className="px-3 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50">
                  2
                </button>
                <button className="px-3 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50">
                  3
                </button>
                <span className="px-2 text-gray-500">...</span>
                <button className="px-3 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50">
                  8
                </button>
                <button className="px-3 py-2 rounded-md border border-gray-300 text-gray-500 hover:bg-gray-50">
                  Next
                </button>
              </nav>
            </div>
          )}

          {/* Newsletter Section */}
          <div className="mt-24 mb-12 bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl overflow-hidden">
            <div className="px-8 py-12 md:p-12 flex flex-col md:flex-row items-center justify-between">
              <div className="mb-8 md:mb-0 md:max-w-md">
                <h3 className="text-2xl font-bold text-white mb-3">
                  Stay updated
                </h3>
                <p className="text-gray-300 mb-0">
                  Get notified about new products and exclusive offers
                </p>
              </div>
              <div className="w-full md:w-auto">
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[240px]"
                  />
                  <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors whitespace-nowrap">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
          .bg-grid-pattern {
            background-image: 
              linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px);
            background-size: 20px 20px;
          }
        `,
        }}
      />
    </PageContainer>
  );
}

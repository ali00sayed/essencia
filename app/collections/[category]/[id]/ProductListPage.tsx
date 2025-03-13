'use client';
import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import {
  Star,
  Share2,
  Heart,
  ShoppingCart,
  Truck,
  Shield,
  RotateCcw,
} from 'lucide-react';
import gsap from 'gsap';
import { collectionsData } from '@/lib/constants/Collections';
import ProductCarousel from '@/lib/components/Carousel/Carousel';
import ColorSelector from '@/lib/components/ColorSelector/ColorSelector';
import SizeSelector from '@/lib/components/SizeSelector/SizeSelector';
import PageContainer from '@/lib/components/PageContainer/PageContainer';
import Button from '@/lib/components/ui/Button';

// Define valid categories type
type Category = keyof typeof collectionsData;

type Props = {
  category: Category;
  id: string;
};

const ProductListPage = ({ category, id }: Props) => {
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState('description');

  // Animation refs
  const pageRef = useRef<HTMLDivElement>(null);
  const productInfoRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const priceRef = useRef<HTMLDivElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);

  // Find the product data
  const categoryData = collectionsData[category];
  const product = categoryData?.items.find(item => item.id === id);

  // Handle quantity changes
  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () =>
    setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  // Toggle wishlist
  const toggleWishlist = () => setIsWishlisted(prev => !prev);

  // Set up animations
  useEffect(() => {
    if (!pageRef.current) return;

    const ctx = gsap.context(() => {
      // Staggered entrance animations
      const tl = gsap.timeline();

      tl.fromTo(
        imageRef.current,
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' }
      );

      tl.fromTo(
        titleRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
        '-=0.4'
      );

      tl.fromTo(
        priceRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6, ease: 'power2.out' },
        '-=0.3'
      );

      const animateElements =
        productInfoRef.current?.querySelectorAll('.animate-in');
      if (animateElements && animateElements.length > 0) {
        tl.fromTo(
          animateElements,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power2.out',
          },
          '-=0.2'
        );
      }

      tl.fromTo(
        actionsRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'back.out(1.4)' },
        '-=0.1'
      );
    }, pageRef);

    return () => ctx.revert(); // Clean up animations
  }, []);

  if (!product) {
    return (
      <PageContainer>
        <div className="text-center">Product not found</div>
      </PageContainer>
    );
  }

  // Ensure images is an array
  const productImages = Array.isArray(product.images)
    ? product.images
    : [product.images];

  return (
    <PageContainer>
      <div ref={pageRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link
            href={`/collections/${category}`}
            className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors group"
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
            <span className="text-sm font-medium">
              Back to {categoryData.title}
            </span>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-10 lg:gap-16">
          {/* Product Images Carousel */}
          <div
            ref={imageRef}
            className="bg-gray-50 rounded-2xl overflow-hidden shadow-lg"
          >
            <ProductCarousel images={productImages} name={product.name} />

            {/* Image indicators */}
            <div className="flex justify-center mt-4 space-x-2 pb-4">
              {productImages.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full ${index === 0 ? 'bg-blue-600' : 'bg-gray-300'}`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div ref={productInfoRef} className="flex flex-col">
            <h1
              ref={titleRef}
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-3"
            >
              {product.name}
            </h1>

            <div className="flex items-center mb-4 animate-in">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating || 0)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'fill-gray-200 text-gray-200'
                    }`}
                  />
                ))}
              </div>
              {product.reviews && (
                <span className="ml-2 text-gray-600">
                  {product.reviews} review{product.reviews !== 1 ? 's' : ''}
                </span>
              )}
              <span className="mx-2 text-gray-300">|</span>
              <span className="text-green-600 flex items-center">
                <span className="inline-block w-2 h-2 rounded-full bg-green-600 mr-1"></span>
                In Stock
              </span>
            </div>

            <div ref={priceRef} className="flex items-center mb-6">
              <span className="text-3xl font-bold text-gray-900">
                {product.price}
              </span>
              {product.originalPrice && (
                <>
                  <span className="ml-2 text-gray-500 line-through">
                    {product.originalPrice}
                  </span>
                  <span className="ml-2 text-red-600 text-sm font-medium px-2 py-1 bg-red-50 rounded">
                    {product.discount}
                  </span>
                </>
              )}
            </div>

            <div className="border-t border-gray-100 pt-6 mb-6 animate-in">
              <p className="text-gray-700 leading-relaxed">
                {product.description}
              </p>
            </div>

            {product.colors && (
              <div className="mb-6 animate-in">
                <h2 className=" text-black text-lg font-medium mb-3">Color</h2>
                <ColorSelector colors={product.colors} />
              </div>
            )}

            {product.sizes && (
              <div className="mb-6 animate-in">
                <h2 className=" text-black text-lg font-medium mb-3">Size</h2>
                <SizeSelector sizes={product.sizes} />
              </div>
            )}

            <div className="mb-6 animate-in">
              <h2 className="text-black text-lg font-medium mb-3">Quantity</h2>
              <div className="flex items-center border border-gray-300 rounded-md w-36">
                <button
                  onClick={decrementQuantity}
                  className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="text-black flex-1 text-center font-medium">
                  {quantity}
                </span>
                <button
                  onClick={incrementQuantity}
                  className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            </div>

            <div
              ref={actionsRef}
              className="flex flex-col sm:flex-row gap-4 mb-8"
            >
              <Button
                variant="primary"
                fullWidth
                className="flex items-center justify-center"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to cart
              </Button>
              <Button variant="primary" fullWidth>
                Buy it now
              </Button>
              <button
                onClick={toggleWishlist}
                className={`p-3 rounded-md border ${isWishlisted ? 'bg-red-50 border-red-200 text-red-500' : 'bg-gray-50 border-gray-200 text-gray-600'} hover:bg-gray-100 transition-colors`}
              >
                <Heart
                  className={`w-5 h-5 ${isWishlisted ? 'fill-red-500' : ''}`}
                />
              </button>
            </div>

            {/* Product benefits */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 animate-in">
              <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                <Truck className="w-5 h-5 text-gray-700 mr-2" />
                <span className="text-sm text-black">Free Shipping</span>
              </div>
              <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                <Shield className="w-5 h-5 text-gray-700 mr-2" />
                <span className="text-sm text-black">2 Year Warranty</span>
              </div>
              <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                <RotateCcw className="w-5 h-5 text-gray-700 mr-2" />
                <span className="text-sm text-black">30 Day Returns</span>
              </div>
            </div>

            {/* Product tabs */}
            <div className="border-t border-gray-200 pt-8 animate-in">
              <div className="flex border-b border-gray-200">
                <button
                  onClick={() => setActiveTab('description')}
                  className={`pb-4 px-4 text-sm font-medium ${
                    activeTab === 'description'
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Description
                </button>
                <button
                  onClick={() => setActiveTab('features')}
                  className={`pb-4 px-4 text-sm font-medium ${
                    activeTab === 'features'
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Features
                </button>
                <button
                  onClick={() => setActiveTab('reviews')}
                  className={`pb-4 px-4 text-sm font-medium ${
                    activeTab === 'reviews'
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Reviews
                </button>
              </div>

              <div className="py-6">
                {activeTab === 'description' && (
                  <div>
                    <p className="text-gray-700">{product.description}</p>
                  </div>
                )}

                {activeTab === 'features' && (
                  <div>
                    {product.features ? (
                      <ul className="list-disc pl-5 space-y-2">
                        {product.features.map((feature, index) => (
                          <li key={index} className="text-gray-700">
                            {feature}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-500">
                        No features listed for this product.
                      </p>
                    )}
                  </div>
                )}

                {activeTab === 'reviews' && (
                  <div>
                    {product.reviews ? (
                      <div>
                        <div className="flex items-center mb-4">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-5 h-5 ${
                                  i < Math.floor(product.rating || 0)
                                    ? 'fill-yellow-400 text-yellow-400'
                                    : 'fill-gray-200 text-gray-200'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="ml-2 text-gray-700 font-medium">
                            {product.rating} out of 5
                          </span>
                        </div>
                        <p className="text-gray-600">
                          Based on {product.reviews} review
                          {product.reviews !== 1 ? 's' : ''}
                        </p>
                      </div>
                    ) : (
                      <p className="text-gray-500">
                        No reviews yet for this product.
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between animate-in">
              <button className="flex items-center text-gray-600 hover:text-gray-900 transition-colors">
                <Share2 className="w-5 h-5 mr-2" />
                Share
              </button>
              <span className="text-sm text-gray-500">SKU: {product.id}</span>
            </div>
          </div>
        </div>

        {/* Related products section could be added here */}
      </div>
    </PageContainer>
  );
};

export default ProductListPage;

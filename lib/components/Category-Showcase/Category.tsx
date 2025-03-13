'use client';
import React, { useState } from 'react';
import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';

type pos = {
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
};
const categories = [
  {
    id: 'new-arrival',
    title: 'New Arrivals',
    color: 'text-white/60 hover:text-white',
    images: [
      {
        src: '/images/showcaseCategory/bg-model-1.png',
        position: { top: '20%', left: '15%' },
      },
      {
        src: '/images/showcaseCategory/bg-model-1.png',
        position: { top: '20%', right: '15%' },
      },
    ],
  },
  {
    id: 'most popular',
    title: 'Most Popular',
    color: 'text-white/60 hover:text-white',
    images: [
      {
        src: '/images/showcaseCategory/bg-model-4.png',
        position: { top: '20%', left: '15%' },
      },
      {
        src: '/images/showcaseCategory/bg-model-3.png',
        position: { top: '20%', right: '15%' },
      },
    ],
  },
  {
    id: 'bestseller',
    title: 'Best Seller',
    color: 'text-white/60 hover:text-white',
    images: [
      {
        src: '/images/showcaseCategory/bg-model-5.png',
        position: { top: '20%', left: '15%' },
      },
      {
        src: '/images/showcaseCategory/bg-model-6.png',
        position: { top: '20%', right: '15%' },
      },
    ],
  },

  {
    id: 'summer',
    title: 'Summer',
    color: 'text-white/60 hover:text-white',
    images: [
      {
        src: '/images/showcaseCategory/bg-model-4.1.png',
        position: { top: '20%', left: '15%' },
      },
      {
        src: '/images/showcaseCategory/bg-model-4.png',
        position: { top: '20%', right: '15%' },
      },
    ],
  },
  {
    id: 'winter',
    title: 'Winter',
    color: 'text-white/60 hover:text-white',
    images: [
      {
        src: '/images/showcaseCategory/bg-model-7.png',
        position: { top: '20%', left: '15%' },
      },
      {
        src: '/images/showcaseCategory/bg-model-8.png',
        position: { top: '20%', right: '15%' },
      },
    ],
  },
];

const CategoryShowcase = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<Map<string, HTMLDivElement[]>>(new Map());
  const animationRef = useRef<gsap.Context | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useLayoutEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    animationRef.current = gsap.context(() => {}, containerRef);

    // Initial animation for the component
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current.querySelector('.section-title'),
        { opacity: 0, y: -50 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.3 }
      );

      gsap.fromTo(
        containerRef.current.querySelectorAll('.category-title'),
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power2.out',
          delay: 0.5,
        }
      );
    }

    return () => {
      window.removeEventListener('resize', checkMobile);
      animationRef.current?.revert();
    };
  }, []);

  const handleCategoryHover = (categoryId: string) => {
    setIsHovering(true);
    const images = imagesRef.current.get(categoryId) || [];

    // Enhanced title animations with better text handling
    categories.forEach((category, index) => {
      const element = document.getElementById(`category-${category.id}`);
      if (element) {
        const isActive = category.id === categoryId;
        const delay = isActive
          ? 0
          : Math.abs(categories.findIndex(c => c.id === categoryId) - index) *
            0.05;

        gsap.to(element, {
          opacity: isActive ? 1 : 0.15,
          y: isActive ? 0 : 20,
          scale: isActive ? 1.05 : 0.95,
          filter: `blur(${isActive ? 0 : 2}px)`,
          textShadow: isActive ? '0 0 30px rgba(255,255,255,0.4)' : 'none',
          letterSpacing: isActive ? '0.05em' : '0',
          duration: 0.4,
          delay,
          ease: 'power2.out',
          overwrite: true,
        });
      }
    });

    // Enhanced image reveal animation
    images.forEach((image, index) => {
      gsap.killTweensOf(image);
      gsap.killTweensOf(image.querySelector('img'));
      gsap.killTweensOf(image.querySelector('.image-overlay'));

      const isLeft = index === 0;
      const tl = gsap.timeline();

      // Initial setup
      gsap.set(image, {
        opacity: 0,
        scale: 0.9,
        rotationY: isLeft ? -15 : 15,
        y: isLeft ? 50 : -50,
      });

      // Main animation sequence
      tl.to(image, {
        opacity: 1,
        scale: 1,
        rotationY: 0,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
      })
        .from(
          image.querySelector('.image-overlay'),
          {
            opacity: 0,
            duration: 0.4,
          },
          '-=0.5'
        )
        .to(
          image.querySelector('img'),
          {
            scale: 1.1,
            duration: 15,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
          },
          '<'
        );

      // Add hover effect to images
      image.addEventListener('mouseenter', () => {
        gsap.to(image, {
          scale: 1.03,
          boxShadow: '0 20px 50px rgba(0,0,0,0.4)',
          duration: 0.4,
          ease: 'power2.out',
        });

        gsap.to(image.querySelector('.image-caption'), {
          opacity: 1,
          y: 0,
          duration: 0.3,
          ease: 'power2.out',
        });
      });

      image.addEventListener('mouseleave', () => {
        gsap.to(image, {
          scale: 1,
          boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
          duration: 0.4,
          ease: 'power2.out',
        });

        gsap.to(image.querySelector('.image-caption'), {
          opacity: 0,
          y: 10,
          duration: 0.3,
          ease: 'power2.out',
        });
      });
    });

    // Enhanced background transition
    if (containerRef.current) {
      gsap.to(containerRef.current.querySelector('.overlay'), {
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        duration: 0.8,
        ease: 'power2.inOut',
      });

      gsap.to(containerRef.current.querySelector('.bg-image'), {
        scale: 1.05,
        filter: 'grayscale(100%) brightness(0.4)',
        duration: 1.2,
        ease: 'power2.out',
      });

      gsap.to(containerRef.current.querySelector('.section-title'), {
        opacity: 0.3,
        y: -10,
        duration: 0.5,
        ease: 'power2.out',
      });
    }
  };

  const handleCategoryExit = (categoryId: string) => {
    setIsHovering(false);
    const currentImages = imagesRef.current.get(categoryId) || [];

    // Enhanced title reset animation
    categories.forEach((category, index) => {
      const element = document.getElementById(`category-${category.id}`);
      if (element) {
        gsap.to(element, {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: 'blur(0px)',
          textShadow: 'none',
          letterSpacing: '0',
          duration: 0.3,
          delay: index * 0.02,
          ease: 'power1.out',
          overwrite: true,
        });
      }
    });

    // Enhanced image exit animation
    currentImages.forEach((image, index) => {
      gsap.killTweensOf(image);
      gsap.killTweensOf(image.querySelector('img'));

      const isLeft = index === 0;

      gsap.to(image, {
        opacity: 0,
        scale: 0.95,
        rotationY: isLeft ? -15 : 15,
        y: isLeft ? -50 : 50,
        duration: 0.5,
        ease: 'power3.inOut',
      });
    });

    // Enhanced background reset
    if (containerRef.current) {
      gsap.to(containerRef.current.querySelector('.overlay'), {
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        duration: 0.6,
        ease: 'power2.inOut',
      });

      gsap.to(containerRef.current.querySelector('.bg-image'), {
        scale: 1,
        filter: 'grayscale(80%) brightness(0.5)',
        duration: 0.8,
        ease: 'power2.inOut',
      });

      gsap.to(containerRef.current.querySelector('.section-title'), {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'power2.out',
      });
    }
  };

  const handleCategoryClick = (categoryId: string) => {
    if (isMobile) {
      setActiveCategory(prevActive => {
        const isClosing = prevActive === categoryId;
        const targetCategory = document.getElementById(
          `category-${categoryId}`
        );
        const imageGrid = targetCategory?.nextElementSibling;

        if (targetCategory && imageGrid) {
          // Title animation
          gsap.to(targetCategory, {
            color: isClosing ? 'rgba(255, 255, 255, 0.6)' : '#ffffff',
            duration: 0.3,
            ease: 'power2.out',
          });

          // Arrow rotation and image grid animation
          if (isClosing) {
            gsap.to(targetCategory.querySelector('span:last-child'), {
              rotation: 0,
              duration: 0.3,
              ease: 'power2.inOut',
            });

            gsap.to(imageGrid, {
              height: 0,
              opacity: 0,
              duration: 0.3,
              ease: 'power2.inOut',
              onComplete: () => {
                (imageGrid as HTMLElement).style.display = 'none';
              },
            });
          } else {
            // Show grid first
            (imageGrid as HTMLElement).style.display = 'grid';

            // Get the auto height
            const autoHeight = (imageGrid as HTMLElement).scrollHeight;

            // Set initial state
            gsap.set(imageGrid, {
              height: 0,
              opacity: 0,
            });

            // Animate to auto height
            gsap.to(imageGrid, {
              height: autoHeight,
              opacity: 1,
              duration: 0.3,
              ease: 'power2.out',
            });

            gsap.to(targetCategory.querySelector('span:last-child'), {
              rotation: 180,
              duration: 0.3,
              ease: 'power2.inOut',
            });
          }
        }

        return isClosing ? null : categoryId;
      });
    }
  };

  return (
    <div
      id="category-showcase"
      ref={containerRef}
      className="relative min-h-[90vh] overflow-hidden py-16 sm:py-20"
    >
      {/* Enhanced background with better styling */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/showcaseCategory/hovercardbg.webp"
          alt="background"
          className="bg-image w-full h-full object-cover opacity-40 transform-gpu filter grayscale-[80%] brightness-50 transition-all duration-700"
        />
        <div className="overlay absolute inset-0 bg-black/75 transition-all duration-700" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/80" />
        <div className="absolute inset-0 backdrop-blur-[1px]" />

        {/* Animated particles effect */}
        <div className="absolute inset-0 opacity-30">
          <div
            className="absolute top-1/4 left-1/4 w-1 h-1 bg-white rounded-full animate-pulse"
            style={{ animationDelay: '0.5s', animationDuration: '3s' }}
          />
          <div
            className="absolute top-3/4 left-1/3 w-1 h-1 bg-white rounded-full animate-pulse"
            style={{ animationDelay: '1.2s', animationDuration: '4s' }}
          />
          <div
            className="absolute top-1/2 left-2/3 w-1 h-1 bg-white rounded-full animate-pulse"
            style={{ animationDelay: '0.7s', animationDuration: '3.5s' }}
          />
          <div
            className="absolute top-1/3 left-3/4 w-1 h-1 bg-white rounded-full animate-pulse"
            style={{ animationDelay: '2s', animationDuration: '4.5s' }}
          />
          <div
            className="absolute top-2/3 left-1/5 w-1 h-1 bg-white rounded-full animate-pulse"
            style={{ animationDelay: '1.5s', animationDuration: '5s' }}
          />
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="section-title text-center text-white text-3xl sm:text-4xl md:text-5xl font-light mb-16 tracking-wider">
          <span className="inline-block border-b border-white/20 pb-2">
            Discover the Styles.
          </span>
        </h1>

        <div
          className="relative flex flex-col items-center justify-center 
          min-h-[60vh] gap-5 sm:gap-6 md:gap-8 lg:gap-10 
          px-4 sm:px-6 md:px-8 max-w-4xl mx-auto"
        >
          {categories.map(category => (
            <div key={category.id} className="w-full md:w-auto">
              <h2
                id={`category-${category.id}`}
                className={`category-title text-3xl md:text-4xl lg:text-5xl font-extralight cursor-pointer transform-gpu
                  transition-all duration-300 ease-out select-none relative group
                  ${isMobile ? 'flex items-center justify-between border-b border-white/10 pb-3' : ''}
                  ${activeCategory === category.id ? 'text-white' : 'text-white/70'}
                  ${!isMobile ? 'hover:text-white' : ''}`}
                onClick={() => handleCategoryClick(category.id)}
                onMouseEnter={() =>
                  !isMobile && handleCategoryHover(category.id)
                }
                onMouseLeave={() =>
                  !isMobile && handleCategoryExit(category.id)
                }
              >
                <span className="relative inline-block tracking-wide">
                  {category.title}
                  {!isMobile && (
                    <span
                      className="absolute left-0 right-0 bottom-0 h-[1px] 
                      bg-gradient-to-r from-transparent via-white to-transparent 
                      transform scale-x-0 group-hover:scale-x-100 
                      transition-transform duration-500 ease-out"
                    />
                  )}
                </span>
                {isMobile && (
                  <span className="transform transition-transform duration-300 text-2xl">
                    ↓
                  </span>
                )}
              </h2>

              {/* Mobile Image Grid */}
              {isMobile && (
                <div
                  className={`grid grid-cols-2 gap-4 sm:gap-5 mt-4 pb-6 sm:pb-8 overflow-hidden
                    ${activeCategory === category.id ? 'block' : 'hidden'}`}
                >
                  {category.images.map((image, index) => (
                    <div
                      key={index}
                      className="relative aspect-[3/4] rounded-lg overflow-hidden 
                        transform transition-all duration-500 hover:scale-[1.03]
                        shadow-lg hover:shadow-xl"
                    >
                      <img
                        src={image.src}
                        alt={`${category.title} ${index + 1}`}
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                      />
                      <div
                        className="absolute inset-0 bg-gradient-to-t 
                        from-black/80 via-black/30 to-transparent"
                      />
                      <div className="absolute bottom-0 left-0 right-0 p-3 text-white text-sm font-light opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                        <div className="text-xs uppercase tracking-wider mb-1 opacity-70">
                          Featured
                        </div>
                        <div className="text-base">
                          {category.title} Collection
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Desktop category images */}
      {!isMobile &&
        categories.map(category => (
          <div key={category.id}>
            {category.images.map((image, imageIndex) => (
              <div
                key={`${category.id}-${imageIndex}`}
                ref={el => {
                  if (el) {
                    const images = imagesRef.current.get(category.id) || [];
                    images[imageIndex] = el;
                    imagesRef.current.set(category.id, images);
                  }
                }}
                className="absolute w-[280px] sm:w-[320px] md:w-[360px] lg:w-[400px] 
                  h-[420px] sm:h-[480px] md:h-[540px] lg:h-[600px] 
                  rounded-lg overflow-hidden opacity-0 shadow-xl transform-gpu cursor-pointer
                  transition-all duration-500"
                style={
                  {
                    ...image.position,
                    top: `calc(${image.position.top} - 5%)`,
                  } as pos
                }
              >
                <div className="w-full h-full transform-gpu">
                  <img
                    src={image.src}
                    alt={`${category.title} ${imageIndex + 1}`}
                    className="w-full h-full object-cover scale-105 transition-transform duration-10000 ease-in-out"
                  />
                  <div className="image-overlay absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />

                  <div className="image-caption absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-10 opacity-0 transition-all duration-300">
                    <div className="text-xs uppercase tracking-widest mb-2 opacity-70">
                      Featured
                    </div>
                    <div className="text-xl font-light mb-1">
                      {category.title}
                    </div>
                    <div className="flex items-center mt-3">
                      <span className="text-sm font-light tracking-wider">
                        SHOP NOW
                      </span>
                      <span className="ml-2 text-xs">→</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}

      {/* Subtle floating elements for visual interest */}
      <div
        className={`absolute top-1/4 left-1/4 w-32 h-32 border border-white/5 rounded-full transition-opacity duration-1000 ${isHovering ? 'opacity-0' : 'opacity-30'}`}
      ></div>
      <div
        className={`absolute bottom-1/3 right-1/4 w-48 h-48 border border-white/5 rounded-full transition-opacity duration-1000 ${isHovering ? 'opacity-0' : 'opacity-20'}`}
      ></div>
    </div>
  );
};

export default CategoryShowcase;

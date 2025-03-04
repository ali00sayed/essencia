'use client';
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Card {
  id: number;
  image: string;
  title: string;
  price: number;
  discount?: string;
  alt: string;
}

interface ParallaxSectionProps {
  backgroundImage: string;
  cards: Card[];
  heading: string;
  subheading: string;
  backgroundColor?: string;
  textColor?: string;
  imageAlt?: string;
}

const ParallaxSection: React.FC<ParallaxSectionProps> = ({
  backgroundImage,
  cards,
  heading,
  subheading,
  backgroundColor = '#1C1C1C',
  textColor = 'white',
  imageAlt = 'Background Image',
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const autoPlayTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [autoPlayDelay] = useState(5000);
  const progressRef = useRef<HTMLDivElement>(null);
  const progressTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const userPausedRef = useRef(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const startAutoPlay = () => {
      autoPlayTimeoutRef.current = setTimeout(() => {
        if (!isTransitioning) {
          setIsTransitioning(true);
          setCurrentCardIndex(prev => (prev + 1) % cards.length);
          setTimeout(() => setIsTransitioning(false), 500);
        }
      }, 4000);
    };

    startAutoPlay();

    return () => {
      if (autoPlayTimeoutRef.current) {
        clearTimeout(autoPlayTimeoutRef.current);
      }
    };
  }, [isAutoPlaying, currentCardIndex, cards.length, isTransitioning]);

  const startProgressAnimation = () => {
    if (progressRef.current) {
      if (progressTimelineRef.current) {
        progressTimelineRef.current.kill();
      }

      progressTimelineRef.current = gsap.timeline({
        onComplete: () => {
          if (isAutoPlaying && !isTransitioning) {
            handleNextCard();
          }
        },
      });

      progressTimelineRef.current.fromTo(
        progressRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: autoPlayDelay / 1000,
          ease: 'none',
        }
      );
    }
  };

  useEffect(() => {
    if (!isAutoPlaying) {
      if (progressTimelineRef.current) {
        progressTimelineRef.current.pause();
      }
      return;
    }

    startProgressAnimation();

    return () => {
      if (progressTimelineRef.current) {
        progressTimelineRef.current.kill();
      }
    };
  }, [isAutoPlaying, currentCardIndex, autoPlayDelay]);

  const navigateToCard = (index: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentCardIndex(index);
    startProgressAnimation();
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const handlePrevCard = () => {
    if (isTransitioning) return;
    navigateToCard((currentCardIndex - 1 + cards.length) % cards.length);
  };

  const handleNextCard = () => {
    if (isTransitioning) return;
    navigateToCard((currentCardIndex + 1) % cards.length);
  };

  useEffect(() => {
    if (!sectionRef.current) return;

    const section = sectionRef.current;
    const background = backgroundRef.current;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top center',
        end: 'bottom center',
        scrub: true,
        anticipatePin: 1,
        onUpdate: self => {
          if (background) {
            gsap.to(background, {
              opacity:
                self.progress > 0.8 ? 1 - (self.progress - 0.8) / 0.2 : 1,
              duration: 0.1,
            });
          }
        },
      },
    });

    if (!isMobile && background) {
      tl.fromTo(background, { y: '-10%' }, { y: '10%', ease: 'none' });
    }

    return () => {
      tl.kill();
    };
  }, [isMobile]);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (!userPausedRef.current) {
      setIsAutoPlaying(true);
    }
  };

  const togglePlayPause = () => {
    userPausedRef.current = !isAutoPlaying;
    setIsAutoPlaying(!isAutoPlaying);
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full overflow-hidden isolate bg-black"
      style={{ backgroundColor }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="absolute inset-0 w-full h-full bg-black overflow-hidden">
        <div
          ref={backgroundRef}
          className="absolute inset-0 w-full h-[120%] -mt-[10%] transition-opacity duration-1000"
        >
          <Image
            src={backgroundImage}
            alt={imageAlt}
            fill
            className="object-cover object-center scale-80"
            priority
            sizes="100vw"
            quality={90}
          />
          <div
            className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/60"
            style={{ backdropFilter: 'blur(4px)' }}
          />
        </div>
      </div>

      <div
        ref={contentRef}
        className="relative z-10 min-h-screen flex flex-col items-center justify-center 
          px-4 sm:px-6 md:px-8 lg:px-20 py-16 md:py-24 bg-transparent"
      >
        <div
          ref={textRef}
          className="w-full max-w-4xl mx-auto text-center space-y-4 md:space-y-6 mb-12 md:mb-16"
        >
          <h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light 
              leading-tight md:leading-tight animate-fadeIn"
            style={{ color: textColor }}
          >
            {heading}
          </h2>
          <p
            className="text-base sm:text-lg md:text-xl opacity-80 max-w-2xl mx-auto
              animate-fadeInDelay"
            style={{ color: textColor }}
          >
            {subheading}
          </p>
        </div>

        <div
          ref={cardsContainerRef}
          className="w-full max-w-5xl mx-auto relative"
        >
          <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
            <button
              onClick={togglePlayPause}
              className={`p-2.5 rounded-full transition-all duration-300
                ${
                  isHovered
                    ? 'bg-white/10 hover:bg-white/20 text-white'
                    : 'bg-black/90 hover:bg-black text-white'
                } backdrop-blur-sm`}
              aria-label={isAutoPlaying ? 'Pause slideshow' : 'Play slideshow'}
            >
              {isAutoPlaying ? (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10 9v6m4-6v6"
                  />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                  />
                </svg>
              )}
            </button>
          </div>

          <div className="absolute top-0 left-0 right-0 h-1 bg-black/10 z-10">
            <div
              ref={progressRef}
              className={`h-full origin-left transform-gpu
                ${isHovered ? 'bg-white/30' : 'bg-black/30'}`}
            />
          </div>

          <button
            onClick={handlePrevCard}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 
              bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full p-2
              transition-all duration-300 text-white"
            aria-label="Previous card"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            onClick={handleNextCard}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 
              bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full p-2
              transition-all duration-300 text-white"
            aria-label="Next card"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          <div
            className="relative aspect-[4/3] sm:aspect-[16/10] md:aspect-[16/9] 
            overflow-hidden rounded-lg shadow-2xl"
          >
            {cards.map((card, index) => (
              <div
                key={card.id}
                className={`absolute inset-0 transition-all duration-500 transform
                  ${
                    index === currentCardIndex
                      ? 'opacity-100 translate-x-0 scale-100 z-10'
                      : index < currentCardIndex
                        ? 'opacity-0 -translate-x-full scale-95 z-0'
                        : 'opacity-0 translate-x-full scale-95 z-0'
                  }`}
              >
                <div className="relative w-full h-full group">
                  <Image
                    src={card.image}
                    alt={card.alt}
                    fill
                    className="object-cover object-center transition-transform duration-500 
                      group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 80vw"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t 
                    from-black/80 via-black/20 to-transparent"
                  >
                    <div
                      className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 
                      text-white transform transition-transform duration-300
                      translate-y-0 group-hover:-translate-y-2"
                    >
                      <h3 className="text-lg sm:text-xl font-medium mb-2">
                        {card.title}
                      </h3>
                      <div className="flex items-center gap-3">
                        <p className="text-base sm:text-lg font-semibold">
                          ₹{card.price.toFixed(2)}
                        </p>
                        {card.discount && (
                          <span
                            className="bg-red-500 text-white text-xs px-2 py-1 
                            rounded-full animate-pulse"
                          >
                            {card.discount}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center gap-2 mt-4">
            {cards.map((_, index) => (
              <button
                key={index}
                onClick={() => navigateToCard(index)}
                className={`group relative h-2 rounded-full transition-all duration-300
                  ${
                    index === currentCardIndex
                      ? 'w-8 bg-white'
                      : 'w-2 bg-white/50 hover:bg-white/70'
                  }`}
                aria-label={`Go to slide ${index + 1}`}
              >
                <span
                  className="absolute -top-8 left-1/2 -translate-x-1/2 
                  px-2 py-1 bg-white/10 backdrop-blur-sm rounded text-xs text-white
                  opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  {index + 1}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute inset-0 bg-black/20 pointer-events-none md:hidden" />
    </section>
  );
};

export default ParallaxSection;

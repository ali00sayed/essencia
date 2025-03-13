'use client';
import React, { useEffect } from 'react';
import HomeScreen from './home/page';

function Home() {
  function ScrollToTop() {
    useEffect(() => {
      window.scrollTo(0, 0);
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'manual';
      }
    }, []);

    return null;
  }
  return (
    <div className="w-full min-h-screen overflow-x-hidden">
      <ScrollToTop />
      <HomeScreen />
    </div>
  );
}

export default Home;

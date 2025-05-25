import React from 'react';
import Button from '../common/Button';

/**
 * HeroSection component displays a fullscreen hero banner with a background image,
 * a headline, and a call-to-action button linking to the venues page.
 *
 * @component
 * @returns {JSX.Element} Hero section with background image and CTA button
 */
const HeroSection = () => {
  return (
    <section className="relative h-[calc(100vh-80px)] max-h-[700px] min-h-[500px]">
      <div className="absolute inset-0">
        <img
          src="/images/lobby.jpg"
          alt="Luxury hotel lobby"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-end">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-light tracking-tight text-[#70533A] mb-8">
            Tailored Travel, Timeless Memories
          </h1>
          <Button
            variant="primary"
            to="/venues"
            size="lg"
            className="font-menu shadow-lg hover:shadow-xl transition-shadow duration-300 mb-8"
          >
            Browse Escapes
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

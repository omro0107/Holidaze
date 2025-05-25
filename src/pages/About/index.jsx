import React from 'react';

/**
 * About page component for Holidaze.
 * 
 * Displays the company mission, a welcome message, and key reasons to book with Holidaze.
 * 
 * Structure:
 * - Mission section with an image and mission statement.
 * - Welcome section with a cozy image and descriptive text about the platform.
 * - "Why Book" section highlighting curated stays, peace of mind, real human support, and trusted taste.
 * 
 * Uses Tailwind CSS for responsive layout and styling.
 * 
 * @component
 * @returns {JSX.Element} The About page content
 */
const About = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Mission Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
        <div className="relative h-[600px]">
          <img
            src="/images/campervan.jpg"
            alt="Campervan adventure"
            className="w-full h-full object-contain rounded-lg"
          />
        </div>
        <div>
          <h2 className="text-3xl font-heading font-bold text-[#70533A] mb-4">
            Our Mission
          </h2>
          <p className="text-xl text-[#70533A] font-body">
            To Make Travel Feel Personal Through Places with Soul.
          </p>
        </div>
      </div>

      {/* Welcome Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
        <div className="relative h-[600px] md:order-2">
          <img
            src="/images/chairs.jpg"
            alt="Cozy chairs"
            className="w-full h-full object-contain rounded-lg"
          />
        </div>
        <div className="md:order-1">
          <h2 className="text-3xl font-heading font-bold text-[#70533A] mb-6">
            Welcome to Holidaze – where thoughtful travel meets unforgettable places.
          </h2>
          <div className="space-y-4 text-[#70533A] font-body">
            <p>
              Whether you're dreaming of a beachside hideaway, a cabin in the mountains, or a stylish apartment in the heart of the city, you'll find stays that feel special here.
            </p>
            <p>
              We connect curious travelers with handpicked accommodations around the world – each with its own story, personality, and charm.
            </p>
            <p>
              Looking to host? We make it easy to share your space with like-minded guests who appreciate it as much as you do.
            </p>
          </div>
        </div>
      </div>

      {/* Why Book Section */}
      <div className="mb-24">
        <h2 className="text-4xl font-heading font-bold text-[#70533A] text-center mb-16">
          Why Book with Holidaze?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
          {/* Curated with Care */}
          <div>
            <h3 className="text-2xl font-heading font-bold text-[#70533A] mb-4">
              Curated with Care
            </h3>
            <p className="text-[#70533A] font-body">
              Guests who book with Holidaze are looking for more than just a place to sleep – they're drawn to unique spaces hosted by Every stay on Holidaze is handpicked for its character, charm, and thoughtful design. No copy-paste rentals here – just unique places that feel like someone put their heart into them.
            </p>
          </div>

          {/* Peace of Mind */}
          <div>
            <h3 className="text-2xl font-heading font-bold text-[#70533A] mb-4">
              Peace of Mind, Built In
            </h3>
            <p className="text-[#70533A] font-body">
              We work only with verified hosts, offer transparent pricing, clear cancellation policies, and guest support if something doesn't go as planned. What you see is what you get – or we'll help make it right.
            </p>
          </div>

          {/* Real People */}
          <div>
            <h3 className="text-2xl font-heading font-bold text-[#70533A] mb-4">
              Real People, Real Help
            </h3>
            <p className="text-[#70533A] font-body">
              Need advice or support? Our team of real, friendly humans is here for you – before, during, and after your stay. We know our properties, and we're happy to help you find the right fit.
            </p>
          </div>

          {/* Trust in Taste */}
          <div>
            <h3 className="text-2xl font-heading font-bold text-[#70533A] mb-4">
              Trust in Taste
            </h3>
            <p className="text-[#70533A] font-body">
              We've built a trusted collection of memorable homes and boutique stays in places worth exploring – from the well-known to the wonderfully offbeat. With Holidaze, you can book with confidence and look forward to something special.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

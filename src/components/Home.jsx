import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MagnifyingGlassIcon, MapPinIcon, CalendarIcon } from '@heroicons/react/24/outline';
import Button from './common/Button';
import Card from './common/Card';
import { venueService } from '../API';
import { useAuth } from '../hooks/useAuth';
import HeroSection from './HeroSection';

const Home = () => {
  const [topVenues, setTopVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchTopVenues = async () => {
      try {
        const allVenues = await venueService.getAll();
        console.log('venueService.getAll response:', allVenues);
        const venuesData = allVenues || [];
        const fiveStarVenues = venuesData
          .filter(venue => venue.rating === 5)
          .sort(() => Math.random() - 0.5)
          .slice(0, 3);
        setTopVenues(fiveStarVenues);
      } catch (error) {
        console.error('Failed to fetch venues:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopVenues();
  }, []);

  const features = [
    {
      name: 'Search Venues',
      description: 'Find the perfect venue for your next stay from our wide selection.',
      icon: MagnifyingGlassIcon,
    },
    {
      name: 'Explore Locations',
      description: 'Discover amazing venues in beautiful locations worldwide.',
      icon: MapPinIcon,
    },
    {
      name: 'Easy Booking',
      description: 'Book your stay with just a few clicks and instant confirmation.',
      icon: CalendarIcon,
    },
  ];

  return (
    <div className="relative">
      <HeroSection />

      {/* Top Rated Venues Section */}
      <div className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold text-text">
              What's hot right now?
            </h2>
            <p className="mt-4 text-lg text-secondary-600 font-body">
              Discover our highest-rated venues for an unforgettable stay
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center">
              <p className="text-text font-body">Loading top venues...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {topVenues.map((venue) => (
                <Card
                  key={venue.id}
                  id={venue.id}
                  title={venue.name}
                  description={venue.description}
                  media={venue.media}
                  price={venue.price}
                  rating={venue.rating}
                  location={venue.location?.city}
                  maxGuests={venue.maxGuests}
                  href={`/venues/${venue.id}`}
                  owner={venue.owner}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Share Your Home Section */}
      <div className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-w-16 aspect-h-9 md:aspect-h-16">
              <img
                src="/images/tranquil.jpg"
                alt="Tranquil venue"
                className="object-cover rounded-lg shadow-lg"
              />
            </div>
            <div>
              <h2 className="text-3xl font-heading font-bold text-text mb-6">
                We Choose with Care – and Heart
              </h2>
              <div className="space-y-4 font-body text-lg text-secondary-600">
                <p>
                  At Holidaze, we don't list just anything. We handpick unique places to stay that have soul, personality, and great style – whether it's a cozy lakeside cabin or a small design gem in the city.
                </p>
                <p>
                  We love places that stand out – the kind that make you feel like you've arrived, not just checked in.
                </p>
                <p>
                  Got a stay that helps people slow down and smile a little wider? We'd love to hear from you.
                </p>
              </div>
              <div className="mt-8">
                <Button
                  variant="primary"
                  to={user ? "/venues/create" : "/register"}
                  size="lg"
                  className="font-menu"
                >
                  Share your home
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-primary-600 font-menu font-semibold tracking-wide uppercase">
              How It Works
            </h2>
            <p className="mt-2 text-3xl font-heading leading-8 font-bold tracking-tight text-text sm:text-4xl">
              Everything you need for your perfect stay
            </p>
            <p className="mt-4 max-w-2xl text-xl text-secondary-600 lg:mx-auto font-body">
              Find, book, and enjoy your stay with our simple and secure platform.
            </p>
          </div>

          <div className="mt-10">
            <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
              {features.map((feature) => (
                <div key={feature.name} className="relative">
                  <dt>
                    <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white">
                      <feature.icon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <p className="ml-16 text-lg leading-6 font-heading font-medium text-text">
                      {feature.name}
                    </p>
                  </dt>
                  <dd className="mt-2 ml-16 text-base text-secondary-600 font-body">
                    {feature.description}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

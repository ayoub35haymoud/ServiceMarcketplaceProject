import React, { useState, useEffect, useRef } from 'react';
import ImageTes1 from '../../../public/image/ImageTes1.jpeg';
import ImageTes2 from '../../../public/image/ImageTes2.jpeg';
import ImageTes3 from '../../../public/image/ImageTes3.jpeg';
// ServiceCard component for individual service cards
const ServiceCard = ({ image, title, description }) => {
  return (
    <div className="flex-none w-64 mx-2 overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
      <div className="h-40 overflow-hidden">
        <img 
          src={image || "/api/placeholder/300/200"} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
        />
      </div>
      <div className="p-4 bg-white">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  );
};

// Main Services Section component
const ServicesSection = () => {
  // State for carousel handling
  const [currentSlide, setCurrentSlide] = useState(0);
  const carouselRef = useRef(null);
  
  // Services data with French titles translated to English
  const services = [
    {
      title: "Floor Tile Installation",
      description: "Professional installation of ceramic, porcelain, and natural stone floor tiles for any room.",
      image: "/api/placeholder/300/200"
    },
    {
      title: "Bathtub Installation",
      description: "Expert installation of various bathtub types including freestanding, alcove, and drop-in models.",
      image: "/api/placeholder/300/200"
    },
    {
      title: "Lawn Maintenance",
      description: "Complete lawn care services including mowing, fertilization, aeration, and seasonal cleanup.",
      image:ImageTes1
    },
    {
      title: "House Cleaning",
      description: "Thorough cleaning services for homes of all sizes, with eco-friendly options available.",
      image:ImageTes2
    },
    {
      title: "Pool Cleaning",
      description: "Regular maintenance and cleaning services to keep your pool crystal clear and properly balanced.",
      image:ImageTes3
    },
    {
      title: "Window Repair",
      description: "Window replacement, glass repair, frame restoration, and weatherproofing services.",
      image:ImageTes1
    },
    {
      title: "Gutter Repair",
      description: "Gutter cleaning, repair, replacement, and installation of gutter guards and downspouts.",
      image:ImageTes3
    },
    {
      title: "Garage Door Repair",
      description: "Repair and maintenance of garage doors, openers, springs, cables, and tracks.",
      image:ImageTes2
    },
    {
      title: "Termite Control",
      description: "Inspection, prevention, and treatment services to protect your home from termite damage.",
      image:ImageTes3
    },
    {
      title: "Insect Control",
      description: "Effective pest control solutions for ants, roaches, spiders, and other common household pests.",
      image:ImageTes1
    },
    {
      title: "Wildlife Removal",
      description: "Safe and humane removal of wildlife such as raccoons, squirrels, bats, and birds from your property.",
      image: "/api/placeholder/300/200"
    }
  ];

  // Number of visible cards based on screen size (to be used with responsive design)
  const getVisibleCards = () => {
    // This would typically use window width, but for simplicity we'll return a fixed number
    return 4;
  };

  // Handle arrow navigation for carousel
  const handleNext = () => {
    const maxSlides = services.length - getVisibleCards();
    setCurrentSlide(prevSlide => prevSlide >= maxSlides ? maxSlides : prevSlide + 1);
  };

  const handlePrev = () => {
    setCurrentSlide(prevSlide => prevSlide <= 0 ? 0 : prevSlide - 1);
  };

  // Auto-scroll effect (optional)
  useEffect(() => {
    const interval = setInterval(() => {
      const maxSlides = services.length - getVisibleCards();
      setCurrentSlide(prevSlide => {
        if (prevSlide >= maxSlides) {
          return 0; // Reset to beginning
        }
        return prevSlide + 1;
      });
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [services.length]);

  // Update carousel position when slide changes
  useEffect(() => {
    if (carouselRef.current) {
      const scrollAmount = currentSlide * (280); // Approximate width of card + margin
      carouselRef.current.scrollTo({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  }, [currentSlide]);

  // Handle dot navigation
  const handleDotClick = (index) => {
    setCurrentSlide(index);
  };

  return (
    <section className="py-12 px-4 bg-gray-50">
      <div className="container mx-auto">
        {/* Section Title */}
        <h2 className="text-3xl font-bold text-center mb-12">Our Top Categories</h2>
        
        {/* Carousel Container */}
        <div className="relative">
          {/* Previous Button */}
          <button 
            onClick={handlePrev}
            disabled={currentSlide === 0}
            className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md ${
              currentSlide === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'
            }`}
            aria-label="Previous services"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          {/* Services Cards */}
          <div 
            ref={carouselRef}
            className="flex overflow-x-hidden scroll-smooth py-4 px-8"
            aria-live="polite"
          >
            {services.map((service, index) => (
              <ServiceCard 
                key={index}
                title={service.title}
                description={service.description}
                image={service.image}
              />
            ))}
          </div>
          
          {/* Next Button */}
          <button 
            onClick={handleNext}
            disabled={currentSlide >= services.length - getVisibleCards()}
            className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md ${
              currentSlide >= services.length - getVisibleCards() ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'
            }`}
            aria-label="Next services"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        
        {/* Pagination Dots */}
        <div className="flex justify-center mt-6">
          {Array.from({ length: Math.ceil(services.length - getVisibleCards() + 1) }).map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`mx-1 w-3 h-3 rounded-full ${
                currentSlide === index ? 'bg-blue-500' : 'bg-gray-300'
              }`}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={currentSlide === index ? 'true' : 'false'}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
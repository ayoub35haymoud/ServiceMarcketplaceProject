import React, { useState, useEffect, useRef } from 'react';
import ImageTes1 from '../../../public/image/ImageTes1.jpeg';
import ImageTes2 from '../../../public/image/ImageTes2.jpeg';
import ImageTes3 from '../../../public/image/ImageTes3.jpeg';

// Static testimonial data with imported images
const testimonials = [
  {
    id: 1,
    name: 'Khadija',
    position: 'Professional Home Cleaner',
    quote: 'Joining this platform has been a game-changer for my business. I can easily connect with local clients who need my services, and the support team has been amazing.',
    image: ImageTes1,
  },
  {
    id: 2,
    name: 'Ahmed',
    position: 'Homeowner',
    quote: 'I was looking for a reliable handyman and found exactly what I needed through this platform. The process was seamless and efficient.',
    image: ImageTes2,
  },
  {
    id: 3,
    name: 'Jamal',
    position: 'Customer',
    quote: 'The platform has made it so much easier for both service providers and customers to find each other. It’s a one-stop-shop for all kinds of local services.',
    image: ImageTes3,
  },
];

const TestimonialSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const autoScrollRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-scrolling functionality
  useEffect(() => {
    if (!isPaused) {
      autoScrollRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      }, 3000);
    }
    return () => clearInterval(autoScrollRef.current);
  }, [isPaused]);

  const handleNext = () => {
    clearInterval(autoScrollRef.current);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrevious = () => {
    clearInterval(autoScrollRef.current);
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const nextIndex = (currentIndex + 1) % testimonials.length;
  const prevIndex = currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1;

  return (
    <section className="h-screen relative  from-indigo-50 to-blue-50 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute -top-16 -left-16 w-64 h-64 bg-blue-100 rounded-full opacity-60"></div>
        <div className="absolute bottom-24 -right-16 w-80 h-80 bg-indigo-100 rounded-full opacity-60"></div>
        <div className="absolute top-1/4 right-1/3 w-32 h-32 bg-purple-100 rounded-full opacity-40"></div>
      </div>

      <div className="relative h-full z-10 flex flex-col justify-center items-center px-4 py-6">
        <h2 className="text-4xl font-bold mb-6 text-gray-900 text-center">What Our Clients Say</h2>

        <div className="w-full max-w-6xl mx-auto h-full flex flex-col items-center justify-center">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 w-full items-center">
            {/* Left Side Image */}
            <div className="hidden md:block md:col-span-1">
              <div 
                className="rounded-2xl overflow-hidden h-56 w-full bg-gray-100 grayscale hover:grayscale-0 transition-all duration-500 shadow-md hover:shadow-xl cursor-pointer transform hover:scale-105"
                onClick={() => setCurrentIndex(prevIndex)}
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
              >
                <img 
                  src={testimonials[prevIndex].image} 
                  alt={testimonials[prevIndex].name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Center Content */}
            <div className="col-span-1 md:col-span-3 flex flex-col md:flex-row items-center gap-8">
              <div 
                className="relative z-10 transform transition-all duration-500"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
              >
                <div className="w-64 h-80 md:w-72 md:h-96 rounded-2xl overflow-hidden bg-white shadow-2xl ring-4 ring-white">
                  <img
                    src={testimonials[currentIndex].image}
                    alt={testimonials[currentIndex].name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <p className="text-white font-bold">{testimonials[currentIndex].name}</p>
                    <p className="text-white/80 text-sm">{testimonials[currentIndex].position}</p>
                  </div>
                </div>

                {/* Progress bar with key reset */}
                <div className="absolute -bottom-4 left-0 right-0 px-6">
                  <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div
                      key={currentIndex} // Reset animation on index change
                      className="h-full bg-blue-500 w-0"
                      style={{
                        animation: isPaused ? 'none' : 'progress 3s linear forwards',
                      }}
                    />
                  </div>
                </div>
              </div>
              
              <div 
                className="max-w-md bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
              >
                <div className="text-blue-600 mb-4">
                  <i className="fas fa-quote-left text-4xl"></i>
                </div>
                <p className="text-lg md:text-xl mb-6 text-gray-800 font-light italic leading-relaxed">
                  &ldquo;{testimonials[currentIndex].quote}&rdquo;
                </p>

                <div className="flex justify-between items-center">
                  <button 
                    onClick={handlePrevious}
                    className="p-2 rounded-full text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                  >
                    <i className="fas fa-chevron-left h-6 w-6"></i>
                  </button>

                  <div className="flex space-x-1">
                    {testimonials.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`h-2 rounded-full transition-all duration-300 ${
                          index === currentIndex ? 'w-6 bg-blue-500' : 'w-2 bg-gray-300'
                        }`}
                      />
                    ))}
                  </div>

                  <button 
                    onClick={handleNext}
                    className="p-2 rounded-full text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                  >
                    <i className="fas fa-chevron-right h-6 w-6"></i>
                  </button>
                </div>
              </div>
            </div>

            {/* Right Side Image */}
            <div className="hidden md:block md:col-span-1">
              <div 
                className="rounded-2xl overflow-hidden h-56 w-full bg-gray-100 grayscale hover:grayscale-0 transition-all duration-500 shadow-md hover:shadow-xl cursor-pointer transform hover:scale-105"
                onClick={() => setCurrentIndex(nextIndex)}
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
              >
                <img 
                  src={testimonials[nextIndex].image} 
                  alt={testimonials[nextIndex].name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add CSS animation for progress bar */}
      <style>{`
        @keyframes progress {
          from { width: 0; }
          to { width: 100%; }
        }
      `}</style>
    </section>
  );
};

export default TestimonialSection;
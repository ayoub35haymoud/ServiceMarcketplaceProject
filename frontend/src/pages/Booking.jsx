import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchServiceById } from '../features/servicesSlice';

const Booking = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const sliderRef = useRef(null);
  const [isBioExpanded, setIsBioExpanded] = useState(false);
  const [isDescExpanded, setIsDescExpanded] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(fetchServiceById(id));
    }
  }, [dispatch, id]);

  const { service, status, error } = useSelector((state) => state.services);

  // Slider navigation
  const slide = (direction) => {
    if (sliderRef.current) {
      const slider = sliderRef.current;
      const scrollAmount = slider.offsetWidth * direction;
      slider.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Text truncation with read more
  const truncateText = (text, length = 200) => {
    if (!text) return '';
    return text.length > length ? text.slice(0, length) + '... ' : text;
  };

  const needsTruncation = (text, length = 200) => text?.length > length;

  // Data parsing
  const parseBusinessHours = (hoursString) => {
    try { return JSON.parse(hoursString); } catch { return []; }
  };

  const parseSocialLinks = (linksString) => {
    try { return JSON.parse(linksString); } catch { return []; }
  };

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!service?.user?.profile) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  const businessHours = parseBusinessHours(service.user.profile.business_hours);
  const socialLinks = parseSocialLinks(service.user.profile.social_media_links);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-600 mb-6" aria-label="Breadcrumb">
        <ol className="flex flex-wrap">
          <li className="flex items-center">
            <Link to="/" className="hover:text-gray-900">Home</Link>
            <span className="mx-2">/</span>
          </li>
          <li className="flex items-center">
            <Link to="/search" className="hover:text-gray-900">Search</Link>
            <span className="mx-2">/</span>
          </li>
          <li className="text-gray-500">{service.title}</li>
        </ol>
      </nav>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Content */}
        <div className="flex-grow">
          {/* Profile Header */}
          <div className="flex flex-col md:flex-row gap-6 mb-8">
            <div className="w-32 h-32 rounded-full overflow-hidden shrink-0">
              <img 
                src={service.user.profile.profile_picture}
                alt={`${service.title} profile`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/placeholder-profile.jpg';
                }}
              />
            </div>
            
            <div className="flex-grow">
              <h1 className="text-2xl font-bold mb-2">{service.title}</h1>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-green-600 font-medium">Exceptional</span>
                <div className="flex text-yellow-400" aria-label="5 out of 5 stars">
                  {[...Array(5)].map((_, i) => (
                    <i key={i} className="fa-solid fa-star" />
                  ))}
                </div>
                <span className="text-gray-600">(5)</span>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                <button className="px-4 py-2 border rounded-md hover:bg-gray-50">
                  <i className="fa-solid fa-share-nodes mr-2"></i>
                  Share
                </button>
                {socialLinks.map((link, index) => (
                  <a 
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 border rounded-md hover:bg-gray-50"
                  >
                    <i className={`fa-brands fa-${link.platform.toLowerCase()}`}></i>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="mb-8 border-b">
            <ul className="flex flex-wrap gap-4 md:gap-8 text-gray-600">
              {['About', 'Photos', 'Services', 'Reviews', 'Credentials'].map((section) => (
                <li key={section}>
                  <button
                    onClick={() => document.getElementById(section.toLowerCase())?.scrollIntoView({ 
                      behavior: 'smooth', 
                      block: 'start' 
                    })}
                    className="pb-4 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {section}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Content Sections */}
          <div className="space-y-8">
            {/* About Section */}
            <section id="about" className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
              <h2 className="text-xl font-semibold mb-4">About</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold">Bio</h3>
                  <div className="relative">
                    <p className="text-gray-600">
                      {isBioExpanded 
                        ? service.user.profile.bio || 'No bio available.'
                        : truncateText(service.user.profile.bio)
                      }
                      {needsTruncation(service.user.profile.bio) && !isBioExpanded && (
                        <button
                          onClick={() => setIsBioExpanded(true)}
                          className="text-blue-600 hover:text-blue-800 text-sm ml-1"
                        >
                          Read more...
                        </button>
                      )}
                    </p>
                    {isBioExpanded && (
                      <button
                        onClick={() => setIsBioExpanded(false)}
                        className="text-blue-600 hover:text-blue-800 text-sm mt-1"
                      >
                        Read less
                      </button>
                    )}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Service Introduction</h3>
                  <div className="relative">
                    <p className="text-gray-600">
                      {isDescExpanded 
                        ? service.description || 'No service description available.'
                        : truncateText(service.description)
                      }
                      {needsTruncation(service.description) && !isDescExpanded && (
                        <button
                          onClick={() => setIsDescExpanded(true)}
                          className="text-blue-600 hover:text-blue-800 text-sm ml-1"
                        >
                          Read more...
                        </button>
                      )}
                    </p>
                    {isDescExpanded && (
                      <button
                        onClick={() => setIsDescExpanded(false)}
                        className="text-blue-600 hover:text-blue-800 text-sm mt-1"
                      >
                        Read less
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </section>

            {/* Featured Projects Section */}
            <section id="photos" className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
              <h2 className="text-xl font-semibold mb-6">Featured Projects</h2>
              <div className="relative group">
                <div 
                  ref={sliderRef}
                  className="grid grid-flow-col auto-cols-[80%] md:auto-cols-[32%] gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4"
                >
                  {(service?.featured_projects || []).map((imageUrl, index) => (
                    <div 
                      key={index}
                      className="relative aspect-square rounded-lg overflow-hidden shadow-md snap-start"
                    >
                      <a
                        href={imageUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full h-full"
                        aria-label={`View full size of project ${index + 1}`}
                      >
                        <img
                          src={imageUrl}
                          alt={`Featured project ${index + 1}`}
                          className="w-full h-full object-cover cursor-pointer hover:opacity-90 transition-opacity"
                          loading={index < 3 ? 'eager' : 'lazy'}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = '/placeholder-image.jpg';
                          }}
                        />
                      </a>
                      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                        <span className="text-white font-semibold">Project {index + 1}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {service?.featured_projects?.length > 3 && (
                  <>
                    <button
                      onClick={() => slide(-1)}
                      className="hidden md:block absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full shadow-lg"
                      aria-label="Previous projects"
                    >
                      <i className="fa-solid fa-chevron-left text-gray-700" />
                    </button>
                    <button
                      onClick={() => slide(1)}
                      className="hidden md:block absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full shadow-lg"
                      aria-label="Next projects"
                    >
                      <i className="fa-solid fa-chevron-right text-gray-700" />
                    </button>
                  </>
                )}

                {!service?.featured_projects?.length && (
                  <div className="w-full h-48 bg-gray-50 rounded-lg flex items-center justify-center">
                    <p className="text-gray-500">No featured projects available</p>
                  </div>
                )}
              </div>
            </section>

            {/* Details Grid */}
            <div className="grid md:grid-cols-2 gap-8">
              <section className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                <h2 className="text-lg font-semibold mb-4">Overview</h2>
                <ul className="space-y-4">
                  <li className="flex items-center gap-2">
                    <i className="fa-solid fa-trophy text-gray-600"></i>
                    <span>Top Rated Provider</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <i className="fa-solid fa-location-dot text-gray-600"></i>
                    <span>{service.user.profile.address}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <i className="fa-solid fa-shield-halved text-gray-600"></i>
                    <span>Background checked</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <i className="fa-solid fa-users text-gray-600"></i>
                    <span>{service.user.profile.employees_count} employees</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <i className="fa-solid fa-calendar text-gray-600"></i>
                    <span>Member since {new Date(service.user.created_at).toLocaleDateString()}</span>
                  </li>
                </ul>
              </section>

              <section className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                <h2 className="text-lg font-semibold mb-4">Business Hours</h2>
                <div className="space-y-2">
                  {businessHours.map((hours, index) => (
                    <div key={index} className="flex justify-between text-gray-600">
                      <span>{hours.day}</span>
                      <span>{hours.start} - {hours.end}</span>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Services Section */}
            <section id="services" className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
              <h2 className="text-xl font-semibold mb-4">Services</h2>
              <p className="text-gray-600">Service details coming soon</p>
            </section>

            {/* Reviews Section */}
            <section id="reviews" className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
              <h2 className="text-xl font-semibold mb-4">Reviews</h2>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <i key={i} className="fa-solid fa-star" />
                  ))}
                </div>
                <span className="text-gray-600">(5 reviews)</span>
              </div>
              <p className="text-gray-600">No reviews yet</p>
            </section>

            {/* Credentials Section */}
            <section id="credentials" className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
              <h2 className="text-xl font-semibold mb-4">Credentials</h2>
              <p className="text-gray-600">Verification and credentials information coming soon</p>
            </section>

            {/* Contact Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button className="w-full py-3 px-4 border rounded-md hover:bg-gray-50 flex items-center justify-center gap-2">
                <i className="fa-regular fa-message"></i>
                Message
              </button>
              {service.user.phone ? (
                <button className="w-full py-3 px-4 border rounded-md hover:bg-gray-50 flex items-center justify-center gap-2">
                  <i className="fa-solid fa-phone"></i>
                  Call {service.user.phone}
                </button>
              ) : (
                <button className="w-full py-3 px-4 border rounded-md hover:bg-gray-50 flex items-center justify-center gap-2">
                  <i className="fa-solid fa-phone"></i>
                  Request a call
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Right Sidebar - Fixed width */}
        <div className="w-full lg:w-80 lg:flex-shrink-0 space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border sticky top-4">
            <div className="mb-4">
              <span className="text-3xl font-bold">${service.price || '0'}</span>
              <p className="text-gray-600">Starting price</p>
            </div>
            <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors">
              Check availability
            </button>
            <div className="mt-4 flex items-center gap-2 text-gray-600">
              <i className="fa-regular fa-clock"></i>
              <span>Responds within a day</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-2 mb-2">
              <i className="fa-solid fa-shield-halved text-blue-600"></i>
              <h3 className="font-semibold">Service Guarantee</h3>
            </div>
            <p className="text-gray-600">
              Your booking is protected by our satisfaction guarantee.
              <a href="#" className="text-blue-600 hover:text-blue-700 ml-1">
                Learn more
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
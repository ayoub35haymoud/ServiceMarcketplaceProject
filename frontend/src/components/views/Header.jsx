import React, { useState, useEffect } from 'react';
import '../../styles/Header.css';
import Cleaning from '../../../public/image/cleaner.jpeg';
import Handyman from '../../../public/image/handyman.jpeg';
import Technician from '../../../public/image/technician.jpeg';
import SearchBar from '../../components/SearchBar';

const Header = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: Cleaning,
      title: 'Nettoyage et Organisation',
      subtitle: 'Un espace propre et bien organisé.',
    },
    {
      image: Handyman,
      title: 'Entretien et Réparation',
      subtitle: 'Nous réparons, vous profitez.',
    },
    {
      image: Technician,
      title: 'Ajouts et Installations',
      subtitle: 'Pour un espace fonctionnel et moderne.',
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };


  return (
    <div className="header-container my-4 mx-4">
      {/* srch bar Section */}
      {/* <SearchBar/>  */}
      {/* Header Slider Section */}
      <header className="header-section position-relative overflow-hidden ">
        <SearchBar/> 
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`slide-container position-absolute w-100 h-100 transition-all ${
              currentSlide === index ? 'active' : ''
            }`}
          >
            <div className="text-overlay position-absolute w-100 h-100 d-flex flex-column justify-content-center align-items-center">
              <h2 className="text-uppercase text-light mb-2">Avez-vous besoin :</h2>
              <h1 className="display-3 text-light m-3">{slide.title}</h1>
              <p className="lead text-light mb-4">{slide.subtitle}</p>
            </div>
            <img
              src={slide.image}
              alt={slide.title}
              className="slide-image w-100 h-100 object-fit-cover"
            />
          </div>
        ))}

        <button
          className="slider-nav-btn prev-btn"
          onClick={prevSlide}
          aria-label="Previous slide"
        >
          ❮
        </button>
        <button
          className="slider-nav-btn next-btn"
          onClick={nextSlide}
          aria-label="Next slide"
        >
          ❯
        </button>
      </header>
    </div>
  );
};

export default Header;
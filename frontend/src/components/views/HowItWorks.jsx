// src/components/HowItWorks.js
import React from 'react';
import workerImage from '../../../public/image/workerHP.png';

const HowItWorks = () => {
  const steps = [
    {
      number: 1,
      title: "Sign Up & Create an Account",
      content: "Customers and providers register on the platform. Providers set up their profiles and list their services.",
    },
    {
      number: 2,
      title: "Browse & Request Services",
      content: "Customers explore services, compare providers, and request the one that fits their needs.",
    },
    {
      number: 3,
      title: "Connect & Get the Job Done",
      content: "The provider accepts the request, and both parties communicate through the platform. The service is completed professionally.",
    },
    {
      number: 4,
      title: "Secure Payment & Review",
      content: "Customers make payments securely, and after the service, they leave a review to help others.",
    },
  ];

  return (
    <section className="relative py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Curved background element */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-blue-50 rounded-br-full -translate-x-1/3 -translate-y-1/3 z-0" />

      <div className="max-w-7xl mx-auto relative z-10">
        <h2 className="text-3xl font-bold text-center mb-12 font-sans">
          How Brikole Works
        </h2>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image Container */}
          <div className="relative md:min-h-[600px]">
            {/* White background with shadow */}
            <div className="absolute inset-0 bg-white rounded-3xl shadow-xl transform rotate-1 -translate-x-4">
              <div className="absolute top-0 left-0 w-32 h-32 bg-blue-50 rounded-br-3xl" />
            </div>

            {/* Worker Image with Hand Overflow */}
            <div className="relative z-10 transform -rotate-1 translate-x-8 translate-y-8">
              <img 
                src={workerImage} 
                alt="Professional worker" 
                className="w-full h-auto object-contain rounded-3xl"
                style={{ 
                  clipPath: 'polygon(0 0, 100% 0, 100% 90%, 90% 100%, 0 100%)',
                  transform: 'translateX(30px) translateY(-20px)'
                }}
              />
            </div>
          </div>

          {/* Steps Column */}
          <div className="space-y-8">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-start gap-6 group">
                {/* Step Number with Connector */}
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-blue-900 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                    {step.number}
                  </div>
                  {index !== steps.length - 1 && (
                    <div className="w-1 h-16 bg-gray-200 mt-2" />
                  )}
                </div>

                {/* Step Content */}
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
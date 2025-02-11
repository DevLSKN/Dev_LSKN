// components/ui/FAQ.js
import React, { useState } from 'react';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "¿Cuáles son los horarios de apertura?",
      answer: "Nuestro gimnasio está abierto de lunes a viernes de 7:00 a 22:00, sábados de 9:00 a 20:00 y domingos de 9:00 a 14:00."
    },
    {
      question: "¿Qué incluye la mensualidad?",
      answer: "La mensualidad incluye acceso ilimitado a todas nuestras instalaciones, incluyendo sala de musculación, área cardiovascular, clases dirigidas y zona de peso libre."
    },
    {
      question: "¿Hay compromiso de permanencia?",
      answer: "No, trabajamos con una política de flexibilidad total. Puedes darte de baja cuando quieras sin ningún tipo de penalización."
    }
  ];

  const handleQuestionClick = (e, index) => {
    e.stopPropagation();
    e.preventDefault();
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 relative z-50">
      {faqs.map((faq, index) => (
        <div 
          key={index}
          className="bg-black/50 rounded-lg overflow-hidden"
          style={{ cursor: 'pointer' }}
        >
          <div 
            role="button"
            tabIndex="0"
            className="p-6 flex justify-between items-center hover:bg-black/60 transition-colors"
            onClick={(e) => handleQuestionClick(e, index)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleQuestionClick(e, index);
              }
            }}
          >
            <h3 className="text-xl font-semibold text-white pr-8">{faq.question}</h3>
            <div className="text-white text-2xl flex-shrink-0 transition-transform duration-200">
              {activeIndex === index ? '−' : '+'}
            </div>
          </div>

          <div
            className="transition-all duration-300 ease-in-out"
            style={{
              maxHeight: activeIndex === index ? '500px' : '0',
              opacity: activeIndex === index ? 1 : 0,
              overflow: 'hidden'
            }}
          >
            <div className="p-6 pt-0 text-white text-lg">
              {faq.answer}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FAQ;
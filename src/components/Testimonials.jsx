import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { testimonials } from '../data/testimonials';
import AnimatedTitle from './AnimatedTitle';

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const goToTestimonial = (index) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <div className="w-full px-4 sm:px-6 md:px-10 lg:px-12 flex flex-col items-center justify-center py-10 overflow-hidden bg-lightGray">
        <div className="mb-20 text-center">
          <p className="mb-4 font-general text-xs uppercase tracking-widest text-mattBlack">
            What Our Clients Say?
          </p>
          <AnimatedTitle
            title="our <b>p</b>ricing <b>p</b>lans"
            className="special-font !text-4xl md:!text-6xl font-zentry font-black leading-[1]"
            textColor="text-mattBlack"
          />
        </div>

      {/* Navigation Arrows */}
      <div className="flex justify-center items-center mb-8 gap-4">
        <motion.button
          onClick={prevTestimonial}
          className="p-3 rounded-full bg-carbonBlack shadow-md border border-gray-300 text-white transition-all duration-300"
          whileHover={{ scale: 1.1, x: -2 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Previous Testimonial"
        >
          <ChevronLeft size={24} />
        </motion.button>

        <motion.button
          onClick={nextTestimonial}
          className="p-3 rounded-full bg-carbonBlack shadow-md border border-gray-300 text-white  transition-all duration-300"
          whileHover={{ scale: 1.1, x: 2 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Next Testimonial"
        >
          <ChevronRight size={24} />
        </motion.button>
      </div>

      {/* Testimonial Card */}
      <motion.div
        className="bg-carbonBlack text-lightGray w-full rounded-lg shadow-lg p-10 mb-12 relative overflow-hidden min-h-[600px] flex flex-col justify-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentTestimonial.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            className="relative z-10"
          >
            <blockquote className="text-center max-w-4xl mx-auto px-2 sm:px-4 text-black font-semibold leading-snug text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-10">
              &ldquo;{currentTestimonial.quote}{' '}
              <span className="relative inline-block">
                <span className="relative z-10 px-2 text-zoroRed font-bold">
                  {currentTestimonial.highlight}
                </span>
                <motion.div
                  className="absolute -top-1 -left-1 w-full h-full bg-lightGray opacity-30 rounded-lg blur-sm -z-10"
                  initial={{ scaleY: 0, opacity: 0 }}
                  animate={{ scaleY: 1, opacity: 0.3 }}
                  transition={{ delay: 0.8, duration: 0.8, ease: 'easeOut' }}
                  style={{ originY: 1 }}
                />
                <motion.div
                  className="absolute -top-0.5 -left-0.5 w-full h-full bg-gradient-to-r from-[#686767] to-beige opacity-50 rounded-lg blur-xs -z-10"
                  initial={{ scaleY: 0, opacity: 0 }}
                  animate={{ scaleY: 1, opacity: 0.5 }}
                  transition={{ delay: 1.2, duration: 0.6, ease: 'easeOut' }}
                  style={{ originY: 1 }}
                />
              </span>{' '}
              {currentTestimonial.suffix}&rdquo;
            </blockquote>

            {/* Author Info */}
            <div className="flex items-center justify-center">
              <div className="bg-white/30 backdrop-blur-md border border-white/40 rounded-xl p-6 flex items-center space-x-6 shadow-md transition-all duration-300">
                <motion.div
                  className="relative"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <img
                    src={currentTestimonial.avatar}
                    alt={currentTestimonial.author}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                </motion.div>
                <div className="text-left">
                  <h4 className="font-semibold text-lg text-black mb-1">
                    {currentTestimonial.author}
                  </h4>
                  <p className="text-gray-600 text-sm">{currentTestimonial.title}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Pagination Dots */}
      <div className="flex justify-center items-center space-x-3">
        {testimonials.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => goToTestimonial(index)}
            className={`relative overflow-hidden rounded-full transition-all duration-300 focus:outline-none ${
              index === currentIndex
                ? 'w-8 h-3 bg-black'
                : 'w-3 h-3 bg-gray-300 hover:bg-gray-400'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.9 }}
            aria-label={`Go to testimonial ${index + 1}`}
          >
            {index === currentIndex && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-red-400 to-zoroRed rounded-full"
                initial={{ x: '-100%' }}
                animate={{ x: '0%' }}
                transition={{ duration: 4, ease: 'linear', repeat: Infinity }}
              />
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;

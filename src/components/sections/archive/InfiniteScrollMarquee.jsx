import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const InfiniteScrollMarquee = () => {
  const topRowRef = useRef(null);
  const bottomRowRef = useRef(null);

  // Sample images data - you can replace these with your actual image URLs
  const images = [
    { id: 1, src: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop', alt: 'Team meeting' },
    { id: 2, src: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&h=300&fit=crop', alt: 'Office space' },
    { id: 3, src: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&h=300&fit=crop', alt: 'Team collaboration' },
    { id: 4, src: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=400&h=300&fit=crop', alt: 'Workplace' },
    { id: 5, src: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&h=300&fit=crop', alt: 'Team discussion' },
    { id: 6, src: 'https://images.unsplash.com/photo-1515378791036-0648a814c963?w=400&h=300&fit=crop', alt: 'Creative workspace' },
    { id: 7, src: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop', alt: 'Team building' },
    { id: 8, src: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&h=300&fit=crop', alt: 'Office culture' },
  ];

  useEffect(() => {
    // Create infinite scroll animation for top row (left direction)
    const topRowTimeline = gsap.timeline({ repeat: -1 });
    const topRowWidth = topRowRef.current.scrollWidth / 2;
    
    topRowTimeline.to(topRowRef.current, {
      x: -topRowWidth,
      duration: 20,
      ease: "none"
    });

    // Create infinite scroll animation for bottom row (right direction)
    const bottomRowTimeline = gsap.timeline({ repeat: -1 });
    const bottomRowWidth = bottomRowRef.current.scrollWidth / 2;
    
    // Start from left position for right scroll
    gsap.set(bottomRowRef.current, { x: -bottomRowWidth });
    
    bottomRowTimeline.to(bottomRowRef.current, {
      x: 0,
      duration: 20,
      ease: "none"
    });

    return () => {
      topRowTimeline.kill();
      bottomRowTimeline.kill();
    };
  }, []);

  const ImageCard = ({ src, alt }) => (
    <div className="flex-shrink-0 w-80 h-64 mx-4 rounded-2xl overflow-hidden shadow-lg bg-gray-100">
      <img 
        src={src} 
        alt={alt}
        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
      />
    </div>
  );

  return (
    <div className="w-full bg-black py-12 overflow-hidden">
      <div className="mb-8">
        <h2 className="text-4xl font-bold text-white text-center mb-4">
          Our Team in Action
        </h2>
        <p className="text-gray-300 text-center max-w-2xl mx-auto">
          Discover the moments that define our culture and showcase our collaborative spirit
        </p>
      </div>

      {/* Top Row - Scrolling Left */}
      <div className="relative overflow-hidden mb-8">
        <div 
          ref={topRowRef}
          className="flex items-center"
          style={{ width: 'calc(200%)' }}
        >
          {/* First set of images */}
          {images.map((image) => (
            <ImageCard key={`top-1-${image.id}`} src={image.src} alt={image.alt} />
          ))}
          {/* Duplicate set for seamless loop */}
          {images.map((image) => (
            <ImageCard key={`top-2-${image.id}`} src={image.src} alt={image.alt} />
          ))}
        </div>
      </div>

      {/* Bottom Row - Scrolling Right */}
      <div className="relative overflow-hidden">
        <div 
          ref={bottomRowRef}
          className="flex items-center"
          style={{ width: 'calc(200%)' }}
        >
          {/* First set of images */}
          {images.map((image) => (
            <ImageCard key={`bottom-1-${image.id}`} src={image.src} alt={image.alt} />
          ))}
          {/* Duplicate set for seamless loop */}
          {images.map((image) => (
            <ImageCard key={`bottom-2-${image.id}`} src={image.src} alt={image.alt} />
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center mt-12">
        <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105">
          <span className="flex items-center gap-2">
            Let's Talk
            <span className="text-xl">😊</span>
          </span>
        </button>
      </div>
    </div>
  );
};

export default InfiniteScrollMarquee;
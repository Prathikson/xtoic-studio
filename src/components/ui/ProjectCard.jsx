import React, { useState, useRef } from 'react';
import { ChevronRight } from 'lucide-react';

const ProjectCard = ({ project }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative w-full max-w-7xl h-28 md:h-32 rounded-2xl cursor-pointer transition-all duration-500 ease-out overflow-hidden ${
        isHovered ? 'bg-mattBlack' : 'bg-white'
      }`}
    >
      {/* Overlay */}
      <div
        className={`absolute inset-0 transition-opacity duration-500 ${
          isHovered ? 'opacity-100 bg-mattBlack' : 'opacity-0'
        }`}
      />

      {/* Content */}
      <div className="relative z-10 flex items-center justify-between h-full px-4 md:px-6">
        {/* Left Side */}
        <div className="flex items-center space-x-6 md:space-x-10">
          <span
            className={`text-sm font-medium transition-colors duration-300 ${
              isHovered ? 'text-white' : 'text-gray-600'
            }`}
          >
            {project.year}
          </span>
          <h3
            className={`text-lg md:text-xl font-semibold transition-colors duration-300 ${
              isHovered ? 'text-white' : 'text-gray-900'
            }`}
          >
            {project.title}
          </h3>
        </div>

        {/* Right Side */}
        <div className="flex items-center space-x-3 md:space-x-4">
          {/* Image thumbnails */}
          <div className="flex items-center space-x-1">
            {project.images.map((image, imgIndex) => (
              <div
                key={imgIndex}
                className={`overflow-hidden rounded-lg transition-all duration-500 ease-out ${
                  isHovered
                    ? 'w-16 h-12 opacity-100 scale-100'
                    : imgIndex === 0
                    ? 'w-12 h-8 opacity-70 scale-100'
                    : 'w-0 h-8 opacity-0 scale-95'
                }`}
                style={{ transitionDelay: `${imgIndex * 80}ms` }}
              >
                <img
                  src={image}
                  alt={`${project.title} preview ${imgIndex + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>

          {/* Arrow */}
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 overflow-hidden ${
              isHovered
                ? 'bg-white text-black scale-110'
                : 'bg-white text-gray-600 scale-100'
            }`}
          >
            <div
              className={`transition-transform duration-500 ease-out ${
                isHovered ? 'translate-x-0' : '-translate-x-1'
              }`}
            >
              <ChevronRight size={18} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;

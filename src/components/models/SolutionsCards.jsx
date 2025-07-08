import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, X } from 'lucide-react';

const SolutionsCards = ({ solutions = [] }) => {
  const [active, setActive] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);
  const videoRefs = useRef({});

  const handleMouseEnter = (id) => {
    setHoveredId(id);
    const video = videoRefs.current[id];
    if (video) {
      video.currentTime = 0;
      video.play().catch(() => {});
    }
  };

  const handleMouseLeave = (id) => {
    setHoveredId(null);
    const video = videoRefs.current[id];
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
  };

  const isSingle = solutions.length === 1;

  return (
    <div
      className={`w-full px-6 py-12 max-w-7xl mx-auto grid gap-8 ${
        isSingle ? 'grid-cols-1 place-items-center' : 'grid-cols-1 sm:grid-cols-2'
      }`}
    >
      {solutions.map((item) => (
        <motion.div
          key={item.id}
          className={`relative overflow-hidden group cursor-pointer ${
            isSingle ? 'rounded-3xl w-full h-[60vh]' : 'rounded-2xl h-[80vh] w-full'
          }`}
          onClick={() => setActive(item)}
          onMouseEnter={() => handleMouseEnter(item.id)}
          onMouseLeave={() => handleMouseLeave(item.id)}
        >
          {/* Background */}
          <div className="absolute inset-0 z-0">
            <img
              src={item.imageUrl}
              alt={item.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <motion.video
              ref={(el) => (videoRefs.current[item.id] = el)}
              className="absolute inset-0 w-full h-full object-cover"
              muted
              loop
              playsInline
              preload="metadata"
              initial={{ opacity: 0 }}
              animate={{ opacity: hoveredId === item.id ? 1 : 0 }}
              transition={{ duration: 0.4 }}
            >
              <source src={item.videoUrl} type="video/mp4" />
            </motion.video>
          </div>

          {/* Overlay content */}
          <div className="absolute bottom-6 left-6 z-10 flex flex-col items-start gap-4">
            <AnimatePresence>
              {hoveredId === item.id && (
                <motion.div
                  className="flex flex-wrap gap-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-black/70 text-white text-xs px-4 py-2 rounded-xl font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            <button className="bg-white text-black font-medium px-10 py-4 rounded-lg text-sm flex items-center gap-2 shadow-md hover:bg-black hover:text-white transition">
              {item.title}
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      ))}

      {/* Modal */}
      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 bg-white text-black z-50 overflow-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="p-6 md:p-12 max-w-6xl mx-auto relative">
              <button
                onClick={() => setActive(null)}
                className="absolute top-5 right-5 bg-gray-100 hover:bg-gray-200 p-2 rounded-full z-10"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-8">
                <div className="flex justify-between items-start flex-wrap gap-4">
                  <div>
                    <div className="uppercase text-xs font-mono text-gray-500 mb-2">
                      {active.tags.join(" / ")}
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold">{active.title}</h2>
                    <p className="text-sm text-gray-600 mt-2">{active.subtitle}</p>
                  </div>
                  <a
                    href={active.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-black text-white px-5 py-2 rounded-md font-medium text-sm hover:bg-neutral-900"
                  >
                    Learn more
                  </a>
                </div>
                <img
                  src={active.imageUrl}
                  alt={active.title}
                  className="rounded-xl w-full object-cover max-h-[70vh]"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SolutionsCards;

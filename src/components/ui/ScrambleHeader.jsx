import React, { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

const ScrambleHeader = ({ tagline, header, className = "" }) => {
  const containerRef = useRef(null);
  const taglineRef = useRef(null);
  const headerRef = useRef(null);

  const isInView = useInView(containerRef, { once: true, margin: "-20% 0px" });

  const scrambleText = (el, text, speed = 35, step = 1 / 3) => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
    let iteration = 0;

    const interval = setInterval(() => {
      el.innerText = text
        .split("")
        .map((char, i) => {
          if (i < iteration) return text[i];
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join("");

      if (iteration >= text.length) clearInterval(interval);
      iteration += step;
    }, speed);
  };

  useEffect(() => {
    if (isInView) {
      if (taglineRef.current) scrambleText(taglineRef.current, tagline);
      if (headerRef.current && header)
        scrambleText(headerRef.current, header, 30, 1 / 2.5);
    }
  }, [isInView, tagline, header]);

  const handleHover = () => {
    if (headerRef.current && header) {
      scrambleText(headerRef.current, header, 25, 1 / 2.2);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`text-center space-y-4 ${className}`}
    >
      {/* Tagline */}
      <motion.span
        ref={taglineRef}
        className="inline-flex items-center text-sm font-medium text-gray-600"
        initial={{ opacity: 0, y: -10 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <span className="w-2 h-2 bg-black rounded-full mr-2" />
        {tagline}
      </motion.span>

      {/* Optional Header */}
      {header && (
        <motion.h1
          ref={headerRef}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-extrabold uppercase text-gray-900 transition-all duration-300"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          onMouseEnter={handleHover}
        >
          {header}
        </motion.h1>
      )}
    </div>
  );
};

export default ScrambleHeader;

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import { TiLocationArrow } from "react-icons/ti";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import Button from "../ui/Button";

const navItems = [
  { name: "About", refId: "about" },
  { name: "Features", refId: "features" },
  { name: "Pricing", refId: "pricing" },
  { name: "Testimonials", refId: "testimonials" },
  { name: "Contact", refId: "contact" },
];

// SVG Path for animated hamburger to X morph
const Path = (props) => (
  <motion.path
    fill="transparent"
    strokeWidth="3"
    stroke="#f1f1f1"
    strokeLinecap="round"
    {...props}
  />
);

const MenuToggle = ({ toggle, isOpen }) => {
  return (
    <button
      onClick={toggle}
      aria-label="Toggle menu"
      className="w-10 h-10 flex items-center justify-center relative z-50 focus:outline-none"
    >
      <motion.svg width="24" height="24" viewBox="0 0 24 24">
        <Path
          animate={isOpen ? "open" : "closed"}
          initial={false}
          variants={{
            closed: { d: "M 3 7 L 21 7" },
            open: { d: "M 4 4 L 20 20" },
          }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        />
        <Path
          d="M 3 12 L 21 12"
          animate={isOpen ? "open" : "closed"}
          variants={{
            closed: { opacity: 1 },
            open: { opacity: 0 },
          }}
          transition={{ duration: 0.2 }}
        />
        <Path
          animate={isOpen ? "open" : "closed"}
          initial={false}
          variants={{
            closed: { d: "M 3 17 L 21 17" },
            open: { d: "M 4 20 L 20 4" },
          }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        />
      </motion.svg>
    </button>
  );
};

const NavBar = () => {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isIndicatorActive, setIsIndicatorActive] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const audioElementRef = useRef(null);
  const navContainerRef = useRef(null);

  // Scroll show/hide nav logic (your existing logic here)
  useEffect(() => {
    const onScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY === 0) {
        setIsNavVisible(true);
        navContainerRef.current.classList.remove("floating-nav");
      } else if (currentScrollY > lastScrollY) {
        setIsNavVisible(false);
        navContainerRef.current.classList.add("floating-nav");
      } else if (currentScrollY < lastScrollY) {
        setIsNavVisible(true);
        navContainerRef.current.classList.add("floating-nav");
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [lastScrollY]);

  // Animate nav up/down (your existing logic here)
  useEffect(() => {
    if (!navContainerRef.current) return;
    const nav = navContainerRef.current;
    nav.style.transition = "transform 0.25s ease, opacity 0.25s ease";
    nav.style.transform = isNavVisible ? "translateY(0)" : "translateY(-100%)";
    nav.style.opacity = isNavVisible ? "1" : "0";
  }, [isNavVisible]);

  // Audio toggle handler
  const toggleAudioIndicator = () => {
    setIsAudioPlaying((prev) => !prev);
    setIsIndicatorActive((prev) => !prev);
  };

  useEffect(() => {
    if (!audioElementRef.current) return;
    isAudioPlaying ? audioElementRef.current.play() : audioElementRef.current.pause();
  }, [isAudioPlaying]);

  // Close mobile menu on window resize (desktop breakpoint)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMobileMenuOpen]);

  // Scroll to section & close menu
  const handleScrollTo = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      <div
        ref={navContainerRef}
        className="fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6"
      >
        <header className="absolute top-1/2 w-full -translate-y-1/2">
          <nav className="flex size-full items-center justify-between px-4">
            {/* Logo + CTA */}
            <div className="flex items-center gap-6">
              <img src="/img/logox.svg" alt="logo" className="w-10" />

              <Button
                id="product-button"
                title="Let's Talk"
                rightIcon={<TiLocationArrow />}
                containerClass="bg-blue-50 hidden md:flex items-center justify-center gap-1"
                href="#contact"
              />
            </div>

            {/* Desktop Nav (unchanged) */}
            <div className="hidden md:flex items-center gap-4">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleScrollTo(item.refId)}
                  className="nav-hover-btn font-semibold text-mattBlack hover:text-red-600 transition"
                >
                  {item.name}
                </button>
              ))}

              {/* Audio Indicator */}
              <button onClick={toggleAudioIndicator} className="ml-6 flex">
                <audio
                  ref={audioElementRef}
                  className="hidden"
                  src="/audio/loop.mp3"
                  loop
                />
                {[1, 2, 3, 4].map((bar) => (
                  <div
                    key={bar}
                    className={clsx("indicator-line", {
                      active: isIndicatorActive,
                    })}
                    style={{ animationDelay: `${bar * 0.1}s` }}
                  />
                ))}
              </button>
            </div>

            {/* Mobile: Audio + Hamburger Toggle (UPDATED) */}
            <div className="md:hidden flex items-center gap-4">
              <button
                onClick={toggleAudioIndicator}
                className="flex items-center"
                aria-label="Toggle audio indicator"
              >
                {[1, 2, 3, 4].map((bar) => (
                  <div
                    key={bar}
                    className={clsx("indicator-line", {
                      active: isIndicatorActive,
                    })}
                    style={{ animationDelay: `${bar * 0.1}s` }}
                  />
                ))}
              </button>

              <MenuToggle
                toggle={() => setIsMobileMenuOpen((prev) => !prev)}
                isOpen={isMobileMenuOpen}
              />
            </div>
          </nav>
        </header>
      </div>

      {/* Mobile Menu Overlay (UPDATED) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ y: "-100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="fixed top-0 left-0 w-full h-screen bg-carbonBlack z-40 flex flex-col items-center justify-center gap-8 px-6 backdrop-blur-sm shadow-xl"
          >
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleScrollTo(item.refId)}
                className="text-xl font-medium text-lightGray hover:text-red-600 px-6 py-3 transition"
              >
                {item.name}
              </button>
            ))}

            <button
              onClick={() => handleScrollTo("contact")}
              className="w-full max-w-xs bg-mattBlack text-white font-medium text-lg px-6 py-4 rounded-full transition hover:bg-white hover:text-red-600 border"
            >
              Let’s Talk
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default NavBar;

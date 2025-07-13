import clsx from "clsx";
import gsap from "gsap";
import { useWindowScroll } from "react-use";
import { useEffect, useRef, useState } from "react";
import { TiLocationArrow } from "react-icons/ti";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineMenuAlt3, HiX } from "react-icons/hi";

import Button from "../ui/Button";

const navItems = [
  { name: "About", refId: "about" },
  { name: "Features", refId: "features" },
  { name: "Pricing", refId: "pricing" },
  { name: "Testimonials", refId: "testimonials" },
  { name: "Contact", refId: "contact" },
];

const NavBar = () => {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isIndicatorActive, setIsIndicatorActive] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const audioElementRef = useRef(null);
  const navContainerRef = useRef(null);
  const { y: currentScrollY } = useWindowScroll();

  // Scroll behavior
  useEffect(() => {
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
  }, [currentScrollY, lastScrollY]);

  // Animate nav up/down
  useEffect(() => {
    gsap.to(navContainerRef.current, {
      y: isNavVisible ? 0 : -100,
      opacity: isNavVisible ? 1 : 0,
      duration: 0.25,
    });
  }, [isNavVisible]);

  // Toggle audio
  const toggleAudioIndicator = () => {
    setIsAudioPlaying((prev) => !prev);
    setIsIndicatorActive((prev) => !prev);
  };

  useEffect(() => {
    isAudioPlaying
      ? audioElementRef.current.play()
      : audioElementRef.current.pause();
  }, [isAudioPlaying]);

  useEffect(() => {
  const handleResize = () => {
    if (window.innerWidth >= 768 && isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  };

  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
}, [isMobileMenuOpen]);

  // Scroll to section
  const handleScrollTo = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
      setIsMobileMenuOpen(false); // Close menu if mobile
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

            {/* Desktop Nav */}
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

            {/* Mobile: Hamburger Toggle */}
            <div className="md:hidden flex items-center gap-4">
              <button
                onClick={toggleAudioIndicator}
                className="flex items-center"
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

              <button
                onClick={() => setIsMobileMenuOpen((prev) => !prev)}
                className="text-mattBlack focus:outline-none"
              >
                {isMobileMenuOpen ? (
                  <HiX size={28} className="transition-transform duration-300" />
                ) : (
                  <HiOutlineMenuAlt3 size={28} className="transition-transform duration-300" />
                )}
              </button>
            </div>
          </nav>
        </header>
      </div>

     {/* Mobile Menu Overlay */}
<AnimatePresence>
  {isMobileMenuOpen && (
    <motion.div
      initial={{ y: "-100%", opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: "-100%", opacity: 0 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="fixed top-0 left-0 w-full h-screen bg-white z-40 flex flex-col items-center justify-center gap-8 px-6 backdrop-blur-sm shadow-xl"
    >
      {navItems.map((item) => (
        <button
          key={item.name}
          onClick={() => handleScrollTo(item.refId)}
          className="text-xl font-semibold text-mattBlack hover:bg-white hover:text-red-600 px-6 py-3 rounded transition"
        >
          {item.name}
        </button>
      ))}

      <button
        onClick={() => handleScrollTo("contact")}
        className="w-full max-w-xs bg-mattBlack text-white font-semibold text-lg px-6 py-4 rounded-2xl transition hover:bg-white hover:text-red-600 border"
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

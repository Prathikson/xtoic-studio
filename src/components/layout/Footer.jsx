import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TextModel from "../models/TextModel";
import TermsModal from "../models/TermsModal";
import { useCookieConsentContext } from "../CookieConsent/CookieProviderWrapper";
import {
  FaDiscord,
  FaTwitter,
  FaYoutube,
  FaMedium,
  FaEnvelope,
} from "react-icons/fa";
import LogoModel from "../models/LogoModel/LogoModel";

gsap.registerPlugin(ScrollTrigger);

const footerLinks = [
  { label: "About", href: "#about" },
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

const socialLinks = [
  { href: "https://discord.com", icon: <FaDiscord size={22} /> },
  { href: "https://twitter.com", icon: <FaTwitter size={22} /> },
  { href: "https://youtube.com", icon: <FaYoutube size={22} /> },
  { href: "https://medium.com", icon: <FaMedium size={22} /> },
  { href: "mailto:prathiksonj@gmail.com", icon: <FaEnvelope size={22} /> },
];

const getResponsiveFontSize = () => {
  const width = typeof window !== "undefined" ? window.innerWidth : 1280;
  if (width >= 1280) return 520;
  if (width >= 1024) return 400;
  if (width >= 640) return 220;
  return 220;
};

const Footer = () => {
  const [showTermsModal, setShowTermsModal] = useState(false);
  const { setShowModal: setCookieModalVisible } = useCookieConsentContext();
  const [fontSize, setFontSize] = useState(getResponsiveFontSize());
  const footerRef = useRef(null);

  useEffect(() => {
    const updateFontSize = () => setFontSize(getResponsiveFontSize());
    updateFontSize();
    window.addEventListener("resize", updateFontSize);
    return () => window.removeEventListener("resize", updateFontSize);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        footerRef.current,
        { opacity: 0, y: 80, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <footer
        ref={footerRef}
        className="bg-carbonBlack text-lightGray w-full select-none pt-20 px-6 sm:px-10 lg:px-24"
      >
        {/* Layout */}
        <div className="max-w-screen-xl mx-auto flex flex-col gap-16">
          {/* Logo */}
          {/* <div className="flex justify-center lg:justify-start"> */}
            {/* <div className="w-40 h-16 bg-mattBlack rounded-lg" /> */}
            {/* <LogoModel
              logoPath="/logox.svg"
              logoSize={100}
              logoFillColor="#de0f3f"
              particleColor={[0, 0, 0, 1]}
              distortionRadius={20}
              forceStrength={0.5}
              returnForce={0.15}
            />
          </div> */}

          {/* Mobile-friendly stack */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 text-center sm:text-left">
            {/* Nav Links */}
            <div className="space-y-3">
              <h4 className="text-lg font-semibold">Navigation</h4>
              <ul className="space-y-1 text-sm">
                {footerLinks.map(({ label, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      className="hover:text-zoroRed transition-colors"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Socials */}
            <div className="space-y-3">
              <h4 className="text-lg font-semibold">Follow Us</h4>
              <div className="flex justify-center sm:justify-start flex-wrap gap-4">
                {socialLinks.map((link, i) => (
                  <a
                    key={i}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-zoroRed transition-colors"
                  >
                    {link.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Contact & Legal */}
            <div className="space-y-4">
              <div>
                <h4 className="text-lg font-semibold">Contact</h4>
                <a
                  href="mailto:youremail@example.com"
                  className="underline hover:text-zoroRed text-sm"
                >
                  prathiksonj@gmail.com
                </a>
              </div>

              <div className="pt-4 border-t border-mattBlack">
                <div className="flex flex-col sm:items-start items-center gap-2 mt-4">
                  <button
                    onClick={() => setShowTermsModal(true)}
                    className="underline text-sm hover:text-zoroRed"
                  >
                    Terms & Conditions
                  </button>
                  <button
                    onClick={() => setCookieModalVisible(true)}
                    className="underline text-sm hover:text-zoroRed"
                  >
                    Cookie Preferences
                  </button>
                </div>
              </div>

              <p className="text-xs text-lightGray/60 pt-4 text-center sm:text-left">
                &copy; {new Date().getFullYear()} XTOIC Studio. All rights reserved.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom TextModel */}
        {/* <div className="w-full mt-20 pb-16 flex justify-center items-center overflow-hidden">
          <div className="w-full max-w-[1600px] h-[280px] sm:h-[320px] md:h-[400px] lg:h-[440px]">
            <TextModel
              text="XTOIC"
              fontSize={fontSize}
              textColor="#f1f1f1"
              distortionRadius={80}
              forceStrength={0.45}
              returnForce={0.18}
            />
          </div>
        </div> */}
      </footer>

      {showTermsModal && <TermsModal onClose={() => setShowTermsModal(false)} />}
    </>
  );
};

export default Footer;

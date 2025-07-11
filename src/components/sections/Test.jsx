import React, { useEffect, useState } from "react";
import LogoModel from "../../components/models/LogoModel/LogoModel";
import ScrambleHeader from "../ui/ScrambleHeader";
import AnimatedTitle from "../ui/AnimatedTitle";

const Test = () => {
  const [logoSize, setLogoSize] = useState(600);

  useEffect(() => {
    const updateSize = () => {
      const width = window.innerWidth;

      if (width < 480) {
        setLogoSize(280); // mobile
      } else if (width < 768) {
        setLogoSize(400); // tablets
      } else if (width < 1024) {
        setLogoSize(550); // small laptops
      } else {
        setLogoSize(700); // desktops
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <section className="w-full min-h-screen bg-black flex flex-col items-center justify-start py-16 px-6 sm:px-10 md:px-20">
      {/* Header */}
      <div className="relative mb-8 mt-20 flex flex-col items-center gap-5 max-w-7xl mx-auto px-4 sm:px-0">
        <ScrambleHeader tagline="Why Choose Us?" />
        <AnimatedTitle
          title="Why XTOIC Studio"
          className="special-font !text-4xl md:!text-6xl font-zentry font-black leading-[1]"
            textColor="text-mattBlack"
        />
      </div>

      {/* Fullscreen Logo Container */}
      <div className="relative bg-[#121212] rounded-2xl shadow-xl w-full h-[600px] sm:h-[700px] md:h-[800px] lg:h-[90vh] overflow-hidden">
        {/* Top-left wording */}
        <div className="absolute top-6 left-6 max-w-xs sm:max-w-sm e z-10">
          <h3 className="font-bold text-lg sm:text-xl md:text-2xl mb-2 text-zoroRed">Why choose us?</h3>
          <p className="font-light text-sm sm:text-base leading-relaxed text-white">
            Innovative design meets cutting-edge technology. We create solutions that empower your brand and captivate your audience.
          </p>
        </div>

        {/* Bottom-right wording */}
        <div className="absolute bottom-6 right-6 max-w-xs sm:max-w-sm text-right italic z-10">
          <h3 className="font-semibold text-base sm:text-lg mb-1 text-zoroRed">Our Commitment</h3>
          <p className="font-light text-xs sm:text-sm leading-relaxed text-lightGray">
            Crafted with passion & precision to deliver outstanding digital experiences tailored to your needs.
          </p>
        </div>

        {/* LogoModel - Responsive */}
        <div className="absolute inset-0 flex items-center justify-center z-0">
          <div className="w-full h-full">
            <LogoModel
              logoPath="/logox.svg"
              logoSize={logoSize}
              logoFillColor="#de0f3f"
              particleColor={[0, 0, 0, 1]}
              distortionRadius={150}
              forceStrength={0.5}
              returnForce={0.15}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Test;

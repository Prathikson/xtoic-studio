import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

import AnimatedTitle from "./AnimatedTitle";
import HeroTriangle from "./models/HeroTriangle";
import ScrambleHeader from "./ui/ScrambleHeader";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  useGSAP(() => {
    const clipAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: "#clip",
        start: "center center",
        end: "+=800 center",
        scrub: 0.5,
        pin: true,
        pinSpacing: true,
      },
    });

    clipAnimation.to(".mask-clip-path", {
      width: "100vw",
      height: "100vh",
      borderRadius: 0,
    });
  });

  return (
    <div id="about" className="min-h-screen w-screen">
      <div className="relative mb-8 mt-36 flex flex-col items-center gap-5">
        <ScrambleHeader tagline="Welcome to XTOIC studio"/>

        <AnimatedTitle
          title="Disc<b>o</b>ver the Best <br /> Web Development <b>St</b>udio"
          containerClass="mt-5 text-center text-black"
        />

        <div className="about-subtext">
          <p>Delivering Digital Experience to Companies</p>
          <p className="text-mattBlack">
            XTOIC is a studio created on the core value of transforming comapnies into a Brand with amazing digital experiences
          </p>
        </div>
      </div>

      <div className="h-dvh w-screen" id="clip">
        <div className="mask-clip-path about-image">
          <img
            src="img/about.webp"
            alt="Background"
            className="absolute left-0 top-0 size-full object-cover"
          />
          <HeroTriangle size={600} videoSrc="/videos/hero-3.mp4" fillColor="#ffffff"/>
        </div>
      </div>
    </div>
  );
};

export default About;

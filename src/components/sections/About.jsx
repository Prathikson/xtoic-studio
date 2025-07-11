import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

import AnimatedTitle from "../ui/AnimatedTitle";
import HeroTriangle from "../models/HeroTriangle";
import ScrambleHeader from "../ui/ScrambleHeader";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const starRef = useRef(null);
  const clipRef = useRef(null);

  useGSAP(() => {
    if (!clipRef.current || !starRef.current) return;

    clipRef.current.style.height = "120vh";

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: clipRef.current,
        start: "top top",
        end: "+=100%",
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      },
    });

    tl.to(starRef.current, {
      scale: 1.3,
      ease: "power1.out",
      transformOrigin: "center center",
    });

    return () => {
      if (tl.scrollTrigger) tl.scrollTrigger.kill();
      tl.kill();
    };
  });

  useEffect(() => {
    if (!starRef.current) return;

    const el = starRef.current;

    function onMove(e) {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left; // mouse X inside element
      const y = e.clientY - rect.top;  // mouse Y inside element

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * 10; // max 10 deg rotation
      const rotateY = ((x - centerX) / centerX) * -10;

      gsap.to(el, {
        rotationX: rotateX,
        rotationY: rotateY,
        transformPerspective: 600,
        transformOrigin: "center center",
        ease: "power3.out",
        duration: 0.3,
      });
    }

    function onLeave() {
      gsap.to(el, {
        rotationX: 0,
        rotationY: 0,
        ease: "power3.out",
        duration: 0.6,
      });
    }

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);

    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div id="about" className="min-h-screen w-screen bg-black">
      <div className="relative mb-8 mt-36 flex flex-col items-center gap-5">
        <ScrambleHeader tagline="Welcome to XTOIC studio" />

        <AnimatedTitle
          title="Disc<b>o</b>ver the Best <br /> Web Development <b>St</b>udio"
          containerClass="mt-5 text-center text-white"
        />
      </div>

      <div
        id="clip"
        ref={clipRef}
        className="w-screen flex justify-center items-center relative overflow-visible"
        style={{ height: "120vh" }}
      >
        <div
          ref={starRef}
          className="mask-clip-path rounded-2xl cursor-pointer"
          style={{
            width: 600,
            height: 600,
            transformOrigin: "center center",
            willChange: "transform",
          }}
        >
          <HeroTriangle
            size={600}
            videoSrc="/videos/hero-3.mp4"
            fillColor="#ffffff"
          />
        </div>
      </div>
    </div>
  );
};

export default About;

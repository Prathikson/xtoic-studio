import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import AnimatedTitle from "../ui/AnimatedTitle";
import HeroTriangle from "../models/HeroTriangle";
import ScrambleHeader from "../ui/ScrambleHeader";
import ScrollReveal from "../ui/ScrollReveal"; // Import your reusable ScrollReveal

gsap.registerPlugin(ScrollTrigger);

const storyParagraphs = [
  {
    id: "p1",
    text: `In the heart of innovation lies XTOIC Studio — a place where creativity meets technology in perfect harmony. Our journey began with a simple belief: that great web development is about storytelling, not just code.`,
    img: "/img/entrance.webp",
  },
  {
    id: "p2",
    text: `Each line of code we write is a stroke in the larger canvas of your brand's vision. We blend art and engineering to create digital experiences that captivate and convert.`,
    img: "/img/contact-2.webp",
  },
  {
    id: "p3",
    text: `Our team thrives on pushing boundaries — using cutting-edge tech to craft websites that feel alive, engaging, and effortlessly intuitive.`,
    img: "/img/contact-1.webp",
  },
];

const About = () => {
  const starRef = useRef(null);

  // Tilt effect only on desktop for HeroTriangle
  useEffect(() => {
    if (!starRef.current || window.innerWidth < 768) return;

    const el = starRef.current;
    let rafId = null;

    const onMove = (e) => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const rotationX = ((y - rect.height / 2) / rect.height) * 20;
        const rotationY = ((x - rect.width / 2) / rect.width) * -20;
        gsap.to(el, {
          rotationX,
          rotationY,
          transformPerspective: 800,
          transformOrigin: "center center",
          ease: "power2.out",
          duration: 0.4,
        });
      });
    };

    const onLeave = () => {
      gsap.to(el, {
        rotationX: 0,
        rotationY: 0,
        ease: "power2.out",
        duration: 0.6,
      });
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);

    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <section
      id="about"
      className="min-h-screen w-full bg-black px-6 md:px-20 lg:px-40 py-28 font-general"
    >
      <div className="relative mb-12 flex flex-col items-center gap-6 max-w-7xl mx-auto">
        <ScrambleHeader tagline="Welcome to XTOIC studio" />
        <AnimatedTitle
          title="Discover XTOIC STUDIO"
          className="special-font !text-4xl md:!text-6xl font-zentry font-black leading-[1]"
          textColor="text-mattBlack"
        />
      </div>

<div className="max-w-7xl mx-auto flex flex-col gap-20">
  {storyParagraphs.map(({ id, text, img }, i) => (
    <ScrollReveal
      key={id}
      text={text}
      imageSrc={img}
      reverse={i % 2 === 1}
      initialTextColor="#666666"
      revealTextColor="#000000"
    />
  ))}
</div>


      <div
        className="w-full flex justify-center items-center relative overflow-visible mt-40"
        style={{ height: 600 }}
      >
        <div
          ref={starRef}
          className="mask-clip-path cursor-pointer"
          style={{
            width: 600,
            height: 600,
            transformOrigin: "center center",
            willChange: "transform",
          }}
        >
          <HeroTriangle size={600} videoSrc="" fillColor="#de0f3f" />
        </div>
      </div>
    </section>
  );
};

export default About;

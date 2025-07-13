import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

import AnimatedTitle from "../ui/AnimatedTitle";
import HeroTriangle from "../models/HeroTriangle";
import ScrambleHeader from "../ui/ScrambleHeader";

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
  const paragraphsRef = useRef([]);
  const scrollTriggersRef = useRef([]);

  // Remove scroll pin & scale animation from 3D hero model — just keep tilt
  useEffect(() => {
    if (!starRef.current) return;

    const el = starRef.current;
    let isAnimating = false;

    function onMove(e) {
      if (isAnimating) return;

      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * 10;
      const rotateY = ((x - centerX) / centerX) * -10;

      isAnimating = true;
      gsap.to(el, {
        rotationX: rotateX,
        rotationY: rotateY,
        transformPerspective: 600,
        transformOrigin: "center center",
        ease: "power3.out",
        duration: 0.3,
        onComplete: () => {
          isAnimating = false;
        },
      });
    }

    function onLeave() {
      isAnimating = true;
      gsap.to(el, {
        rotationX: 0,
        rotationY: 0,
        ease: "power3.out",
        duration: 0.6,
        onComplete: () => {
          isAnimating = false;
        },
      });
    }

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);

    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  // Story paragraphs animation + pinning + color fill
  useEffect(() => {
  if (!paragraphsRef.current.length) return;

  scrollTriggersRef.current.forEach((t) => t && t.kill());
  scrollTriggersRef.current = [];

  const mm = gsap.matchMedia();

  mm.add(
    {
      isDesktop: "(min-width: 768px)",
      isMobile: "(max-width: 767px)",
    },
    (context) => {
      const { isDesktop, isMobile } = context.conditions;

      paragraphsRef.current.forEach((section, i) => {
        if (!section) return;

        const textWrapper = section.querySelector(".text-wrapper");
        const image = section.querySelector(".image");

        if (!textWrapper || !image) return;

        if (isDesktop) {
          const pinTrigger = ScrollTrigger.create({
            trigger: section,
            start: "top center",
            end: "bottom center",
            pin: textWrapper,
            pinSpacing: true,
            scrub: true,
            anticipatePin: 1,
            markers: false,
            invalidateOnRefresh: true,
          });

          gsap.to(textWrapper, {
            color: "#121212",
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top center",
              end: "bottom center",
              scrub: true,
              markers: false,
            },
          });

          gsap.fromTo(
            image,
            {
              opacity: 0,
              x: i % 2 === 0 ? 80 : -80,
            },
            {
              opacity: 1,
              x: 0,
              duration: 1.3,
              ease: "power3.out",
              scrollTrigger: {
                trigger: section,
                start: "top 80%",
                end: "top 50%",
                toggleActions: "play none none reverse",
                markers: false,
              },
            }
          );

          scrollTriggersRef.current.push(pinTrigger);
        }

        if (isMobile) {
          gsap.set(textWrapper, { color: "#999999" });

          gsap.fromTo(
            textWrapper,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: section,
                start: "top 90%",
                toggleActions: "play none none reverse",
                markers: false,
              },
            }
          );

          gsap.fromTo(
            image,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              delay: 0.2,
              ease: "power3.out",
              scrollTrigger: {
                trigger: section,
                start: "top 90%",
                toggleActions: "play none none reverse",
                markers: false,
              },
            }
          );
        }
      });
    }
  );

  return () => {
    mm.revert();
    scrollTriggersRef.current.forEach((t) => t && t.kill());
    scrollTriggersRef.current = [];
  };
}, []);
  // Refresh ScrollTrigger on resize
  useEffect(() => {
    const onResize = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <section
      id="about"
      className="min-h-screen w-screen bg-black px-6 md:px-20 lg:px-40 py-28 font-general"
    >
      <div className="relative mb-16 flex flex-col items-center gap-6 max-w-7xl mx-auto">
        <ScrambleHeader tagline="Welcome to XTOIC studio" />
        <AnimatedTitle
          title="Discover the Best Web Development Studio"
          containerClass="mt-5 text-center text-white text-2xl md:text-7xl font-semibold leading-tight"
        />
      </div>

      <div className="max-w-6xl mx-auto flex flex-col gap-40">
        {storyParagraphs.map(({ id, text, img }, i) => (
          <article
            key={id}
            ref={(el) => (paragraphsRef.current[i] = el)}
            className={`flex flex-col md:flex-row items-center gap-16 ${
              i % 2 === 1 ? "md:flex-row-reverse" : ""
            }`}
          >
            {/* Wrap text in a container for pinning */}
            <div className="text-wrapper md:w-1/2 relative">
              <p className="text-3xl leading-relaxed font-general text-gray-400 md:text-gray-400 text-shadow-lg">
                {text}
              </p>
            </div>

            {/* Image */}
            <img
              src={img}
              alt={`Story image ${i + 1}`}
              className="rounded-3xl shadow-2xl md:w-1/2 object-cover image"
              loading="lazy"
            />
          </article>
        ))}
      </div>

      {/* 3D video model static, with mouse tilt only */}
      <div
        id="clip"
        className="w-full flex justify-center items-center relative overflow-visible mt-40"
        style={{ height: 600, zIndex: 10 }}
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
          <HeroTriangle size={600} videoSrc="/videos/hero-3.mp4" fillColor="#ffffff" />
        </div>
      </div>
    </section>
  );
};

export default About;

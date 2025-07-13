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

  // Function to wrap each word in a span
  const wrapWords = (text) => {
    return text.split(' ').map((word, index) => (
      `<span class="word" data-index="${index}">${word}</span>`
    )).join(' ');
  };

  // Tilt effect only on desktop
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

  // Scroll-triggered animations
  useEffect(() => {
    const mm = gsap.matchMedia();

    // Clean up previous triggers
    scrollTriggersRef.current.forEach((t) => t.kill());
    scrollTriggersRef.current = [];

    mm.add(
      {
        isDesktop: "(min-width: 768px)",
        isMobile: "(max-width: 767px)",
      },
      (context) => {
        const { isDesktop, isMobile } = context.conditions;

        paragraphsRef.current.forEach((section, i) => {
          const textWrapper = section.querySelector(".text-wrapper");
          const textElement = section.querySelector(".text-content");
          const image = section.querySelector(".image");

          if (!textWrapper || !textElement || !image) return;

          // Wrap words in spans for word-by-word animation
          textElement.innerHTML = wrapWords(storyParagraphs[i].text);
          const words = textElement.querySelectorAll('.word');

          // Set up will-change for performance
          textWrapper.style.willChange = "opacity, transform";
          image.style.willChange = "opacity, transform";

          if (isDesktop) {
            // Initial state - all words are gray
            gsap.set(words, { 
              color: "#666666",
              opacity: 0.4
            });
            
            // Initial image state
            gsap.set(image, { 
              y: 200, 
              opacity: 0.3 
            });

            // Create the main pin animation
            const pinTrigger = ScrollTrigger.create({
  trigger: section,
  start: "center center", // ⬅️ this is the key fix
  end: "bottom+=200% center",
  pin: true,
  pinSpacing: true,
  anticipatePin: 1,
  invalidateOnRefresh: true,
  onUpdate: (self) => {
    const progress = self.progress;

    const totalWords = words.length;
    const wordsToHighlight = Math.floor(progress * totalWords);

    words.forEach((word, index) => {
      if (index < wordsToHighlight) {
        gsap.set(word, {
          color: "#000000",
          opacity: 1,
        });
      } else if (index === wordsToHighlight) {
        const wordProgress = (progress * totalWords) - index;
        const color = gsap.utils.interpolate("#666666", "#000000", wordProgress); // ⬅️ animate to black
        const opacity = gsap.utils.interpolate(0.4, 1, wordProgress);
        gsap.set(word, {
          color,
          opacity,
        });
      } else {
        gsap.set(word, {
          color: "#666666",
          opacity: 0.4,
        });
      }
    });

    // Smooth image animation
    const imageY = gsap.utils.interpolate(200, 0, progress);
    const imageOpacity = gsap.utils.interpolate(0.3, 1, progress);
    gsap.set(image, {
      y: imageY,
      opacity: imageOpacity,
    });
  },
});

            scrollTriggersRef.current.push(pinTrigger);
          }

          if (isMobile) {
            // Set initial state for mobile
            gsap.set(words, { 
              color: "#000000",
              opacity: 0.4,
              y: 30
            });
            gsap.set(image, { 
              opacity: 0, 
              y: 100 
            });

            // Text animation for mobile - word by word reveal
            const textTimeline = gsap.timeline({
              scrollTrigger: {
                trigger: section,
                start: "top 85%",
                end: "top 30%",
                scrub: 1,
                onUpdate: (self) => {
                  const progress = self.progress;
                  const totalWords = words.length;
                  const wordsToShow = Math.floor(progress * totalWords);
                  
                  words.forEach((word, index) => {
                    if (index <= wordsToShow) {
                      gsap.set(word, { 
                        color: "#ffffff",
                        opacity: 1,
                        y: 0
                      });
                    }
                  });
                }
              }
            });

            // Image animation for mobile
            const imgAnim = gsap.to(image, {
              opacity: 1,
              y: 0,
              duration: 1.2,
              ease: "power3.out",
              scrollTrigger: {
                trigger: section,
                start: "top 75%",
                end: "top 40%",
                toggleActions: "play none none reverse",
              },
            });

            scrollTriggersRef.current.push(textTimeline.scrollTrigger, imgAnim.scrollTrigger);
          }
        });
      }
    );

    return () => {
      mm.revert();
      scrollTriggersRef.current.forEach((t) => t.kill());
      scrollTriggersRef.current = [];
    };
  }, []);

  // Handle resize
  useEffect(() => {
    let timeout;
    const onResize = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 200);
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

      <div className="max-w-6xl mx-auto flex flex-col gap-20">
        {storyParagraphs.map(({ id, text, img }, i) => (
          <article
            key={id}
            ref={(el) => (paragraphsRef.current[i] = el)}
            className={`flex flex-col md:flex-row items-center gap-12 md:gap-24 min-h-screen ${
              i % 2 === 1 ? "md:flex-row-reverse" : ""
            }`}
          >
            <div className="text-wrapper md:w-1/2 z-10">
<p
  className="text-content text-2xl md:text-4xl lg:text-5xl leading-relaxed font-medium"
  dangerouslySetInnerHTML={{ __html: storyParagraphs[i].text }}
/>
            </div>

            <div className="md:w-1/2 w-full relative">
              <img
                src={img}
                alt={`Story image ${i + 1}`}
                className="image w-full h-[400px] md:h-[500px] lg:h-[600px] rounded-3xl shadow-2xl object-cover"
                loading="lazy"
              />
            </div>
          </article>
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
          <HeroTriangle size={600} videoSrc="/videos/hero-3.mp4" fillColor="#ffffff" />
        </div>
      </div>

      <style jsx>{`
        .word {
          transition: color 0.3s ease, opacity 0.3s ease;
          display: inline-block;
          margin-right: 0.25em;
        }
      `}</style>
    </section>
  );
};

export default About;
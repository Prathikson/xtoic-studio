import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ScrollReveal = ({
  text,
  imageSrc,
  reverse = false,
  initialTextColor = "#666666",
  revealTextColor = "#000000",
  wordRevealRatio = 1,
  backgroundColor = "transparent",
}) => {
  const containerRef = useRef(null);

  const wrapWords = (txt) =>
    txt
      .split(" ")
      .map((word, i) => `<span class="word" data-index="${i}">${word}</span>`)
      .join(" ");

  useEffect(() => {
    if (!containerRef.current) return;

    const section = containerRef.current;
    const textWrapper = section.querySelector(".text-wrapper");
    const textElement = section.querySelector(".text-content");
    const image = section.querySelector(".image");

    if (!textWrapper || !textElement || !image) return;

    textElement.innerHTML = wrapWords(text);

    const words = textElement.querySelectorAll(".word");

    gsap.set(words, {
      color: initialTextColor,
      opacity: 0.4,
      display: "inline-block",
      marginRight: "0.25em",
      userSelect: "none",
      transition: "color 0.3s ease, opacity 0.3s ease",
    });

    gsap.set(image, {
      y: 150,
      opacity: 0.3,
    });

    ScrollTrigger.getAll().forEach((st) => {
      if (st.trigger === section) st.kill();
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top center",
        end: "bottom center",
        scrub: true,
      },
    });

    tl.to(words, {
      color: revealTextColor,
      opacity: 1,
      ease: "none",
      stagger: {
        each: 0.05 / wordRevealRatio,
        from: "start",
      },
    });

    tl.to(
      image,
      {
        y: 0,
        opacity: 1,
        ease: "power3.out",
      },
      0
    );

    return () => {
      if (tl.scrollTrigger) tl.scrollTrigger.kill();
      tl.kill();
    };
  }, [text, imageSrc, initialTextColor, revealTextColor, wordRevealRatio]);

  return (
    <article
      ref={containerRef}
      className={`flex flex-col md:flex-row items-center gap-12 md:gap-24 min-h-screen ${
        reverse ? "md:flex-row-reverse" : ""
      }`}
      style={{ backgroundColor }}
    >
      <div className="text-wrapper md:w-1/2 z-10">
        <p
          className="text-content text-2xl md:text-4xl lg:text-5xl leading-relaxed font-medium"
          // note: .word spans get style from GSAP inline styles
        />
      </div>

      <div className="md:w-1/2 w-full relative">
        <img
          src={imageSrc}
          alt="Story image"
          className="image w-full h-[400px] md:h-[500px] lg:h-[600px] rounded-3xl shadow-2xl object-cover"
          loading="lazy"
          draggable={false}
        />
      </div>
    </article>
  );
};

export default ScrollReveal;

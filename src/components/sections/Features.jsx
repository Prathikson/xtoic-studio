import { useState, useRef, useEffect } from "react";
import { TiLocationArrow } from "react-icons/ti";

export const BentoTilt = ({ children, className = "" }) => {
  const [transformStyle, setTransformStyle] = useState("");
  const itemRef = useRef(null);

  const handleMouseMove = (event) => {
    if (!itemRef.current) return;

    const { left, top, width, height } = itemRef.current.getBoundingClientRect();

    const relativeX = (event.clientX - left) / width;
    const relativeY = (event.clientY - top) / height;

    const tiltX = (relativeY - 0.5) * 5;
    const tiltY = (relativeX - 0.5) * -5;

    const newTransform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(.95, .95, .95)`;
    setTransformStyle(newTransform);
  };

  const handleMouseLeave = () => {
    setTransformStyle("");
  };

  return (
    <div
      ref={itemRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform: transformStyle }}
    >
      {children}
    </div>
  );
};

export const BentoCard = ({ src, title, description, isComingSoon }) => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [hoverOpacity, setHoverOpacity] = useState(0);
  const hoverButtonRef = useRef(null);

  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [shouldPlay, setShouldPlay] = useState(false);

  // Detect if device is mobile (to disable autoplay on mobile)
  const isMobile =
    typeof window !== "undefined" &&
    window.matchMedia("(hover: none) and (pointer: coarse)").matches;

  const handleMouseMove = (event) => {
    if (!hoverButtonRef.current) return;
    const rect = hoverButtonRef.current.getBoundingClientRect();

    setCursorPosition({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
  };

  const handleMouseEnter = () => setHoverOpacity(1);
  const handleMouseLeave = () => setHoverOpacity(0);

  // Lazy play video only on desktop
  useEffect(() => {
    if (isMobile) {
      if (videoRef.current) videoRef.current.pause();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShouldPlay(entry.isIntersecting);
      },
      { threshold: 0.4 }
    );

    if (containerRef.current) observer.observe(containerRef.current);

    return () => {
      if (containerRef.current) observer.unobserve(containerRef.current);
    };
  }, [isMobile]);

  useEffect(() => {
    if (!videoRef.current) return;
    if (shouldPlay) {
      videoRef.current.play().catch(() => {});
    } else {
      videoRef.current.pause();
    }
  }, [shouldPlay]);

  return (
    <div
      id="features"
      ref={containerRef}
      className="relative w-full h-full overflow-hidden rounded-md"
    >
      <video
        ref={videoRef}
        src={src}
        loop
        muted
        playsInline
        autoPlay={!isMobile}
        className="absolute left-0 top-0 w-full h-full object-cover object-center"
      />
      <div className="relative z-10 flex flex-col justify-between h-full p-5 text-lightGray bg-black bg-opacity-50">
        <div>
          <h1 className="bento-title special-font">{title}</h1>
          {description && (
            <p className="mt-3 max-w-full text-xs md:text-base">{description}</p>
          )}
        </div>

        {isComingSoon && (
          <div
            ref={hoverButtonRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="border-hsla relative flex w-fit cursor-pointer items-center gap-1 overflow-hidden rounded-full bg-black px-5 py-2 text-xs uppercase text-white/70"
          >
            <div
              className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
              style={{
                opacity: hoverOpacity,
                background: `radial-gradient(100px circle at ${cursorPosition.x}px ${cursorPosition.y}px, #de0f3f, #1b1b1b)`,
              }}
            />
            <TiLocationArrow className="relative z-20" />
            <p className="relative z-20">Get One for Yourself</p>
          </div>
        )}
      </div>
    </div>
  );
};

const Features = () => (
  <section className="bg-black pb-52">
    <div className="container mx-auto px-3 md:px-10">
      <div className="px-5 py-32">
        <p className="font-circular-web text-lg text-zoroRed">
          Designs that slap. Code that flies. Interactions that make you go “woah“
        </p>
        <p className="max-w-md font-circular-web text-lg text-carbonBlack opacity-50">
          At XTOIC Studio, we blend tech, art, and a bit of madness to build digital experiences that actually stand out.
        </p>
      </div>

      <BentoTilt className="border-hsla relative mb-7 h-64 w-full overflow-hidden rounded-md md:h-[65vh]">
        <BentoCard
          src="videos/feature-1.mp4"
          title={
            <>
              <b>Li</b>ght<b>ni</b>ng-<b>Fa</b>st <b>Bu</b>il<b>ds</b>
            </>
          }
          description="We don’t do “slow and steady.” XTOIC delivers blazing-fast web experiences that load before you blink. Blink twice and you’re already there."
          isComingSoon
        />
      </BentoTilt>

      {/* Grid: 1 col on mobile, 2 cols on md+, auto rows */}
      <div className="grid grid-cols-1 gap-7 md:grid-cols-2 md:grid-rows-3 md:h-[135vh] w-full">
        <BentoTilt className="bento-tilt_1 row-span-1 md:col-span-1 md:row-span-2">
          <BentoCard
            src="videos/feature-2.mp4"
            title={
              <>
                <b>Pi</b>xel<b>-</b>Per<b>fe</b>ct <b>De</b>si<b>gn</b>
              </>
            }
            description="Our pixels don’t miss. We craft sleek, stunning visuals that grab eyeballs and never let go — making your brand impossible to ignore."
            isComingSoon
          />
        </BentoTilt>

        <BentoTilt className="bento-tilt_1 row-span-1 md:col-span-1">
          <BentoCard
            src="videos/feature-3.mp4"
            title={
              <>
                <b>In</b>ter<b>ac</b>tiv<b>e</b> <b>Ma</b>gi<b>c✨</b>
              </>
            }
            description="Buttons that beg to be clicked, animations that dance with you, and UI so smooth it feels like butter. Welcome to the future of engagement."
            isComingSoon
          />
        </BentoTilt>

        <BentoTilt className="bento-tilt_1 row-span-1 md:col-span-1">
          <BentoCard
            src="videos/feature-4.mp4"
            title={
              <>
                <b>Mo</b>bi<b>le</b>-<b>Re</b>ady <b>Al</b>wa<b>ys</b>
              </>
            }
            description="From giant desktops to pocket-sized phones, XTOIC creates websites that look flawless on every screen. Because everyone deserves a perfect view."
            isComingSoon
          />
        </BentoTilt>

        <BentoTilt className="bento-tilt_2">
          <div className="flex flex-col justify-between bg-carbonBlack p-5 h-full">
            <h1 className="bento-title special-font max-w-96 text-beige">
              S<b>E</b>O S<b>or</b>ce<b>ry🧙‍♂️</b>
            </h1>
            <p className="text-beige">
              We don’t just build sites, we conjure traffic. Our SEO spells put you right where the world can find you — front and center.
            </p>

            <TiLocationArrow className="m-5 scale-[5] self-end fill-beige" />
          </div>
        </BentoTilt>

        <BentoTilt className="bento-tilt_2">
          <video
            src="videos/feature-5.mp4"
            loop
            muted
            autoPlay={false} // autoplay disabled on mobile by BentoCard logic
            className="w-full h-full object-cover object-center"
          />
        </BentoTilt>
      </div>
    </div>
  </section>
);

export default Features;

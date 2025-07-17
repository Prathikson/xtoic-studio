import { useState, useRef, useEffect } from "react";
import { TiLocationArrow } from "react-icons/ti";

const isTouchDevice = () =>
  typeof window !== "undefined" &&
  ("ontouchstart" in window || navigator.maxTouchPoints > 0);

// Tilt effect wrapper - only active on non-touch devices
export const BentoTilt = ({ children, className = "" }) => {
  const [transformStyle, setTransformStyle] = useState("");
  const itemRef = useRef(null);

  // Only attach tilt handlers on desktop (no touch)
  const handleMouseMove = (event) => {
    if (isTouchDevice()) return;
    if (!itemRef.current) return;

    const { left, top, width, height } = itemRef.current.getBoundingClientRect();
    const relativeX = (event.clientX - left) / width;
    const relativeY = (event.clientY - top) / height;
    const tiltX = (relativeY - 0.5) * 5;
    const tiltY = (relativeX - 0.5) * -5;
    const newTransform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(0.95, 0.95, 0.95)`;
    setTransformStyle(newTransform);
  };

  const handleMouseLeave = () => {
    if (isTouchDevice()) return;
    setTransformStyle("");
  };

  return (
    <div
      ref={itemRef}
      className={`${className} transition-transform duration-200 ease-out`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform: transformStyle }}
    >
      {children}
    </div>
  );
};

// Card Component
export const BentoCard = ({ src, title, description, isComingSoon }) => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [hoverOpacity, setHoverOpacity] = useState(0);
  const hoverButtonRef = useRef(null);
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(isTouchDevice());
  }, []);

  // Video click handler for mobile to toggle play/pause
  const handleVideoClick = () => {
    if (!videoRef.current) return;

    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

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

  return (
    <div id="features" className="relative size-full">
      <video
        ref={videoRef}
        src={src}
        loop
        muted
        autoPlay={!isMobile}
        controls={isMobile}
        playsInline
        className="absolute left-0 top-0 size-full object-cover object-center"
        onClick={isMobile ? handleVideoClick : undefined}
        style={{ pointerEvents: isMobile ? "auto" : "none" }}
      />
      {isMobile && !isPlaying && (
        <button
          onClick={handleVideoClick}
          className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black bg-opacity-60 px-6 py-3 text-white"
          aria-label="Play video"
        >
          ▶ Play
        </button>
      )}
      <div className="relative z-10 flex size-full flex-col justify-between p-5 text-lightGray">
        <div>
          <h1 className="bento-title special-font">{title}</h1>
          {description && (
            <p className="mt-3 max-w-64 text-xs md:text-base">{description}</p>
          )}
        </div>

        {isComingSoon && (
          <div
            ref={hoverButtonRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="relative flex w-fit cursor-pointer items-center gap-1 overflow-hidden rounded-full bg-black px-5 py-2 text-xs uppercase text-white/70 border border-white/10"
          >
            <div
              className="pointer-events-none absolute -inset-px transition duration-300"
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

// Features Grid
const Features = () => (
  <section className="bg-black pb-52">
    <div className="container mx-auto px-3 md:px-10">
      <div className="px-5 py-32">
<p className="font-circular-web text-3xl font-semibold text-zoroRed">
  Born to bend pixels. Wired for wonder. Known to leave jaws on the floor.
</p>
<p className="max-w-md font-circular-web text-xl text-carbonBlack opacity-80">
  XTOIC Studio isn’t just building websites it’s crafting digital rituals. Every project? A mix of code, chaos, and pure creative fire.
</p>
      </div>

      <BentoTilt className="border-hsla relative mb-7 h-96 w-full overflow-hidden rounded-md md:h-[65vh]">
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

      <div className="grid grid-cols-1 gap-7 md:grid-cols-2 md:grid-rows-3 h-auto md:h-[135vh] w-full">
        <BentoTilt className="row-span-1 md:row-span-2">
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

        <BentoTilt className="row-span-1">
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

        <BentoTilt className="row-span-1">
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

        <BentoTilt className="row-span-1">
          <div className="flex size-full flex-col justify-between bg-carbonBlack p-5">
            <h1 className="bento-title special-font max-w-96 text-beige">
              S<b>E</b>O S<b>or</b>ce<b>ry🧙‍♂️</b>
            </h1>
            <p className="text-beige">
              We don’t just build sites, we conjure traffic. Our SEO spells put you right where the world can find you — front and center.
            </p>
            <TiLocationArrow className="m-5 scale-[5] self-end fill-beige" />
          </div>
        </BentoTilt>

        <BentoTilt className="row-span-1">
          <video
            src="videos/feature-5.mp4"
            loop
            muted
            autoPlay={!isTouchDevice()}
            controls={isTouchDevice()}
            playsInline
            className="size-full object-cover object-center"
            style={{ pointerEvents: isTouchDevice() ? "auto" : "none" }}
            onClick={isTouchDevice() ? (e) => {
              const vid = e.currentTarget;
              if (vid.paused) {
                vid.play();
              } else {
                vid.pause();
              }
            } : undefined}
          />
        </BentoTilt>
      </div>
    </div>
  </section>
);

export default Features;

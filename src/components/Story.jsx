import gsap from "gsap";
import { useRef } from "react";

import Button from "./Button";
import AnimatedTitle from "./AnimatedTitle";
import ScrambleHeader from "./ui/ScrambleHeader";
import SolutionsCards from "./models/SolutionsCards";


const solutions = [
  {
    id: 1,
    title: "Homerun",
    subtitle: "Creative Things",
    tags: ["3D", "Website"],
    imageUrl: "/img/gallery-2.webp",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-person-typing-on-a-laptop-computer-4904-large.mp4",
    websiteUrl: "#"
  },
  {
    id: 2,
    title: "Boa Concept",
    subtitle: "Logistics Solutions",
    tags: ["Branding", "Website"],
    imageUrl: "/img/gallery-3.webp",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-industrial-conveyor-belt-system-4892-large.mp4",
    websiteUrl: "#"
  },
  {
    id: 1,
    title: "Homerun",
    subtitle: "Creative Things",
    tags: ["3D", "Website"],
    imageUrl: "/img/gallery-2.webp",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-person-typing-on-a-laptop-computer-4904-large.mp4",
    websiteUrl: "#"
  },
  {
    id: 2,
    title: "Boa Concept",
    subtitle: "Logistics Solutions",
    tags: ["Branding", "Website"],
    imageUrl: "/img/gallery-3.webp",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-industrial-conveyor-belt-system-4892-large.mp4",
    websiteUrl: "#"
  },
];

const FloatingImage = () => {
  const frameRef = useRef(null);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const element = frameRef.current;

    if (!element) return;

    const rect = element.getBoundingClientRect();
    const xPos = clientX - rect.left;
    const yPos = clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((yPos - centerY) / centerY) * -10;
    const rotateY = ((xPos - centerX) / centerX) * 10;

    gsap.to(element, {
      duration: 0.3,
      rotateX,
      rotateY,
      transformPerspective: 500,
      ease: "power1.inOut",
    });
  };

  const handleMouseLeave = () => {
    const element = frameRef.current;

    if (element) {
      gsap.to(element, {
        duration: 0.3,
        rotateX: 0,
        rotateY: 0,
        ease: "power1.inOut",
      });
    }
  };

  return (
    <div id="story" className="min-h-dvh w-screen bg-black text-mattBlack">
      <div className="flex size-full flex-col items-center py-10 pb-24">
        <ScrambleHeader tagline="The World of Digital Experience"/>

        <div className="relative size-full">
          <AnimatedTitle
            title="the st<b>o</b>ry of <br /> a hidden real<b>m</b>"
            containerClass="mt-5 pointer-events-none mix-blend-difference relative z-10"
            textColor="text-white"
          />

          <div className="story-img-container">
            <div className="story-img-mask">
              <div className="story-img-content">
                <img
                  ref={frameRef}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  onMouseUp={handleMouseLeave}
                  onMouseEnter={handleMouseLeave}
                  src="/img/entrance.webp"
                  alt="entrance.webp"
                  className="object-contain"
                />
              </div>
            </div>


            {/* for the rounded corner */}
            <svg
              className="invisible absolute size-0"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <filter id="flt_tag">
                  <feGaussianBlur
                    in="SourceGraphic"
                    stdDeviation="8"
                    result="blur"
                  />
                  <feColorMatrix
                    in="blur"
                    mode="matrix"
                    values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
                    result="flt_tag"
                  />
                  <feComposite
                    in="SourceGraphic"
                    in2="flt_tag"
                    operator="atop"
                  />
                </filter>
              </defs>
            </svg>
          </div>
        </div>

        <div className="-mt-80 flex w-full justify-center md:-mt-64 md:me-44 md:justify-end">
          <div className="flex h-full w-fit flex-col items-center md:items-start">
            <p className="mt-3 max-w-sm text-center font-circular-web text-mattBlack md:text-start">
              XTOIC Studio blends bold design with cutting-edge tech to craft unforgettable digital experiences.
We don’t just build websites we create an experience, movement, and magic on every scroll.
            </p>

            <Button
              id="realm-btn"
              title="Let's talk"
              containerClass="mt-5"
            />
          </div>
        </div>

          <SolutionsCards solutions={solutions} />

      </div>
    </div>
  );
};

export default FloatingImage;

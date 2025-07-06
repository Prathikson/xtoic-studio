import React, { useState, useEffect, useRef } from "react";

interface PreloaderProps {
  onComplete?: () => void;
}

const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(() => {
    if (typeof window !== "undefined") {
      return !sessionStorage.getItem("hasVisited");
    }
    return true;
  });

  const [progress, setProgress] = useState(0);
  const [waveOffset, setWaveOffset] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Smooth progress animation using easing
  useEffect(() => {
    if (!isVisible) {
      onComplete?.();
      return;
    }

    const duration = 8000; // 8 sec total
    const startTime = performance.now();

    const easeOutQuad = (t: number) => t * (2 - t);

    const animateProgress = (time: number) => {
      const elapsed = time - startTime;
      const linearProgress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutQuad(linearProgress);
      setProgress(easedProgress * 100);

      if (linearProgress < 1) {
        requestAnimationFrame(animateProgress);
      } else {
        setTimeout(() => {
          setIsVisible(false);
          sessionStorage.setItem("hasVisited", "true");
          onComplete?.();
        }, 700);
      }
    };
    requestAnimationFrame(animateProgress);

    // Wave animation
    let waveAnimId: number;
    const animateWave = () => {
      setWaveOffset((prev) => (prev + 1.8) % 360);
      waveAnimId = requestAnimationFrame(animateWave);
    };
    animateWave();

    return () => {
      cancelAnimationFrame(waveAnimId);
    };
  }, [isVisible, onComplete]);

  if (!isVisible) return null;

  // Wave path generator for smooth sine wave
  const wavePath = () => {
    const waveWidth = 375;
    const waveHeight = 25;
    const amplitude = 8;
    const frequency = 0.015;
    const points = [];

    for (let x = 0; x <= waveWidth; x += 5) {
      const y =
        amplitude *
          Math.sin(
            ((x + waveOffset) * frequency * 2 * Math.PI)
          ) +
        waveHeight;
      points.push(`${x},${y}`);
    }

    return (
      "M0," +
      waveHeight * 2 +
      " L" +
      points.join(" ") +
      ` L${waveWidth},${waveHeight * 2} Z`
    );
  };

  const waveVerticalOffset = 375 - (progress / 100) * 375;

  const whiteStars = Array.from({ length: 25 }).map((_, i) => ({
    cx: Math.random() * 320 + 25,
    cy: Math.random() * 320 + 25,
    r: Math.random() * 2 + 0.7,
    key: i,
  }));

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-white"
      style={{
        perspective: 800,
        overflow: "visible",
        willChange: "transform",
        animation: "zoomOutFade 1s ease forwards",
        animationDelay: "7.5s", // start zoom fade near the end
      }}
    >
      <style>
        {`
          @keyframes zoomOutFade {
            0% {
              opacity: 1;
              transform: scale(1);
            }
            100% {
              opacity: 0;
              transform: scale(1.2);
            }
          }
          .loading-text {
            animation: pulse 2s ease-in-out infinite;
          }
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }
          svg {
            filter:
              drop-shadow(0 0 6px rgba(0, 0, 0, 0.15))
              drop-shadow(0 0 8px rgba(0,0,0,0.2));
            transform-origin: center;
            width: 420px;
            height: 420px;
          }
          .star-outline path {
            filter: drop-shadow(0 0 6px rgba(255, 255, 255, 0.8));
          }
        `}
      </style>

      <svg
        width={375}
        height={375}
        viewBox="0 0 375 375"
        className="drop-shadow-md"
        style={{ filter: "drop-shadow(0 0 10px rgba(0,0,0,0.1))" }}
      >
        <defs>
          <clipPath id="starClip">
            <path d="M 12.898 296.613 L 76.016 187.484 L 12.898 78.355 L 79.902 78.355 L 143.023 187.484 L 79.902 296.613 Z
                     M 362.023 78.355 L 298.902 187.484 L 362.023 296.613 L 295.016 296.613 L 231.898 187.484 L 295.016 78.355 Z
                     M 296.59 362.047 L 187.461 298.926 L 78.332 362.047 L 78.332 295.039 L 187.461 231.922 L 296.59 295.039 Z
                     M 78.332 12.922 L 187.461 76.039 L 296.59 12.922 L 296.59 79.926 L 187.461 143.047 L 78.332 79.926 Z" />
          </clipPath>

          <mask id="waveMask">
            <rect width="375" height="375" fill="white" />
            <path
              d={wavePath()}
              fill="black"
              transform={`translate(0, ${waveVerticalOffset})`}
            />
          </mask>
        </defs>

        {/* Fully black star fill */}
        <rect width="375" height="375" fill="#000" clipPath="url(#starClip)" />

        {/* Wave masked fill */}
        <rect
          width="375"
          height="375"
          fill="#000"
          clipPath="url(#starClip)"
          mask="url(#waveMask)"
        />

        {/* White star outline with subtle glow */}
        <g
          className="star-outline"
          stroke="white"
          strokeWidth={3}
          fill="none"
          clipPath="url(#starClip)"
          opacity={0.9}
        >
          <path d="M 12.898 296.613 L 76.016 187.484 L 12.898 78.355 L 79.902 78.355 L 143.023 187.484 L 79.902 296.613 Z" />
          <path d="M 362.023 78.355 L 298.902 187.484 L 362.023 296.613 L 295.016 296.613 L 231.898 187.484 L 295.016 78.355 Z" />
          <path d="M 296.59 362.047 L 187.461 298.926 L 78.332 362.047 L 78.332 295.039 L 187.461 231.922 L 296.59 295.039 Z" />
          <path d="M 78.332 12.922 L 187.461 76.039 L 296.59 12.922 L 296.59 79.926 L 187.461 143.047 L 78.332 79.926 Z" />
        </g>

        {/* White stars scattered inside */}
        <g clipPath="url(#starClip)">
          {whiteStars.map(({ cx, cy, r, key }) => (
            <circle key={key} cx={cx} cy={cy} r={r} fill="white" opacity={0.9} />
          ))}
        </g>
      </svg>

      {/* Progress Text */}
      <div className="absolute bottom-20 text-center w-full px-4 select-none">
        <div
          className="text-black font-bold tracking-wide"
          style={{ fontSize: "6rem", lineHeight: 1 }}
        >
          {Math.round(progress)}%
        </div>
        <div
          className="text-gray-700 font-light tracking-widest mt-6 loading-text"
          style={{ fontSize: "1.25rem" }}
        >
          LOADING
        </div>
      </div>
    </div>
  );
};

export default Preloader;

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";

const ScratchReveal = ({ imageSrc }) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const revealPromptRef = useRef(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isInteracted, setIsInteracted] = useState(false);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [canvasVisible, setCanvasVisible] = useState(true);

  const brushRadius = 60;

  useEffect(() => {
    if (!canvasVisible) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const container = containerRef.current;

    const width = canvas.width = container.offsetWidth;
    const height = canvas.height = container.offsetHeight;

    // Fill the canvas with a mask
    ctx.fillStyle = "#2a2a2a";
    ctx.fillRect(0, 0, width, height);
    ctx.globalCompositeOperation = "destination-out";

    let isDrawing = false;

    const draw = (x, y) => {
      ctx.beginPath();
      ctx.arc(x, y, brushRadius, 0, Math.PI * 2);
      ctx.fill();
    };

    const getOffset = (e) => {
      const rect = canvas.getBoundingClientRect();
      return {
        x: (e.touches ? e.touches[0].clientX : e.clientX) - rect.left,
        y: (e.touches ? e.touches[0].clientY : e.clientY) - rect.top,
      };
    };

    const handleStart = (e) => {
      isDrawing = true;
      setIsInteracted(true);
      gsap.to(revealPromptRef.current, {
        opacity: 0,
        scale: 0.8,
        duration: 0.5,
        ease: "power2.out",
      });
      const { x, y } = getOffset(e);
      draw(x, y);
    };

    const handleMove = (e) => {
      const { x, y } = getOffset(e);
      setCursor({ x, y });
      if (isDrawing) draw(x, y);
    };

    const handleEnd = () => {
      isDrawing = false;

      const imageData = ctx.getImageData(0, 0, width, height);
      const pixels = imageData.data;
      let transparentPixels = 0;

      for (let i = 3; i < pixels.length; i += 4) {
        if (pixels[i] < 128) transparentPixels++;
      }

      const percent = transparentPixels / (pixels.length / 4);
      if (percent > 0.4 && !isRevealed) {
        setIsRevealed(true);
        gsap.to(canvas, { opacity: 0, duration: 1, onComplete: () => setCanvasVisible(false) });
      }
    };

    // Events
    canvas.addEventListener("mousedown", handleStart);
    canvas.addEventListener("mousemove", handleMove);
    canvas.addEventListener("mouseup", handleEnd);
    canvas.addEventListener("mouseleave", handleEnd);
    canvas.addEventListener("touchstart", handleStart);
    canvas.addEventListener("touchmove", handleMove);
    canvas.addEventListener("touchend", handleEnd);

    return () => {
      canvas.removeEventListener("mousedown", handleStart);
      canvas.removeEventListener("mousemove", handleMove);
      canvas.removeEventListener("mouseup", handleEnd);
      canvas.removeEventListener("mouseleave", handleEnd);
      canvas.removeEventListener("touchstart", handleStart);
      canvas.removeEventListener("touchmove", handleMove);
      canvas.removeEventListener("touchend", handleEnd);
    };
  }, [isRevealed, canvasVisible]);

  const handleReset = () => {
    setIsRevealed(false);
    setIsInteracted(false);
    setCanvasVisible(true);
    setTimeout(() => {
      if (canvasRef.current) {
        canvasRef.current.style.opacity = 1;
      }
    }, 50);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full rounded-3xl overflow-hidden bg-[#1b1b1b] flex items-center justify-center group"
    >
      {/* Background Logo */}
      <img
        src={imageSrc}
        alt="Reveal Logo"
        className="max-w-[80%] max-h-[80%] z-10 pointer-events-none"
      />

      {/* Scratch Canvas */}
      {canvasVisible && (
        <canvas
          ref={canvasRef}
          className="absolute top-0 left-0 w-full h-full z-20 touch-none"
        />
      )}

      {/* Cursor Shader Circle (X-ray style) */}
      {!isRevealed && (
        <div
          style={{
            left: cursor.x - 30,
            top: cursor.y - 30,
          }}
          className="hidden group-hover:block pointer-events-none absolute w-[60px] h-[60px] rounded-full border-2 border-white/30 bg-white/10 z-30 transition-all duration-75"
        />
      )}

      {/* Ping-style Drag Prompt */}
      {!isInteracted && (
        <div
          ref={revealPromptRef}
          className="absolute z-40 flex items-center justify-center"
        >
          <div className="relative w-28 h-28">
            {/* Ping animation */}
            <div className="absolute inset-0 rounded-full bg-white/20 animate-ping" />
            {/* Circle with text */}
            <div className="w-full h-full rounded-full bg-white/10 border border-white/30 flex items-center justify-center text-white text-sm font-medium backdrop-blur-md shadow-md">
              Drag Me
            </div>
          </div>
        </div>
      )}

      {/* Reset Button */}
      {isRevealed && (
        <button
          onClick={handleReset}
          className="absolute bottom-4 right-4 z-40 bg-white text-black px-4 py-2 rounded-full text-sm shadow-lg hover:bg-gray-100 transition"
        >
          Reset
        </button>
      )}
    </div>
  );
};

export default ScratchReveal;

// File: components/LogoModel.jsx
import React, { useRef, useEffect } from "react";
import vertexShaderSrc from "../shaders/vertex.glsl";
import fragmentShaderSrc from "../shaders/fragment.glsl";

const defaultConfig = {
  logoPath: "/logox.svg",
  logoSize: 512,
  logoColor: "#de0f3f",
  distortionRadius: 180,
  forceStrength: 0.35,
  returnForce: 0.15,
};

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16) / 255,
        g: parseInt(result[2], 16) / 255,
        b: parseInt(result[3], 16) / 255,
      }
    : { r: 1, g: 1, b: 1 };
}

// Simple heuristic for weak devices: less than 4 logical cores
function isLowEndDevice() {
  if (typeof navigator !== "undefined" && navigator.hardwareConcurrency) {
    return navigator.hardwareConcurrency < 4;
  }
  return false;
}

const LogoModel = ({
  logoPath = defaultConfig.logoPath,
  logoSize = defaultConfig.logoSize,
  logoColor = defaultConfig.logoColor,
  distortionRadius = defaultConfig.distortionRadius,
  forceStrength = defaultConfig.forceStrength,
  returnForce = defaultConfig.returnForce,
}) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });
  let positions = [];
  let originalPositions = [];
  let velocities = [];

  useEffect(() => {
    const lowEnd = isLowEndDevice();

    // Adjust config for low-end devices
    const samplingStep = lowEnd ? 8 : 4; // bigger step = fewer particles
    const adjustedDistortionRadius = lowEnd ? distortionRadius * 0.6 : distortionRadius;
    const adjustedForceStrength = lowEnd ? forceStrength * 0.6 : forceStrength;
    const adjustedReturnForce = lowEnd ? returnForce * 0.6 : returnForce;
    const targetFPS = lowEnd ? 30 : 60;

    const canvas = canvasRef.current;
    const gl = canvas.getContext("webgl", {
      alpha: true,
      antialias: !lowEnd, // disable antialias on weak devices
      powerPreference: lowEnd ? "low-power" : "high-performance",
      premultipliedAlpha: false,
    });
    if (!gl) {
      console.error("WebGL not supported.");
      return;
    }

    const dpr = window.devicePixelRatio || 1;
    canvas.width = canvas.clientWidth * dpr;
    canvas.height = canvas.clientHeight * dpr;
    gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);

    const vertexShader = compileShader(gl, gl.VERTEX_SHADER, vertexShaderSrc);
    const fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSrc);

    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Could not link WebGL program", gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);
    gl.clearColor(0, 0, 0, 0);

    const positionLocation = gl.getAttribLocation(program, "a_position");
    const colorLocation = gl.getAttribLocation(program, "a_color");
    const resolutionLocation = gl.getUniformLocation(program, "u_resolution");

    const positionBuffer = gl.createBuffer();
    const colorBuffer = gl.createBuffer();

    const rgb = hexToRgb(logoColor);

    const image = new Image();
    image.crossOrigin = "anonymous";
    image.onload = () => {
      const tempCanvas = document.createElement("canvas");
      tempCanvas.width = logoSize;
      tempCanvas.height = logoSize;
      const ctx = tempCanvas.getContext("2d");
      ctx.fillStyle = logoColor;
      ctx.fillRect(0, 0, logoSize, logoSize);
      ctx.globalCompositeOperation = "destination-in";
      ctx.drawImage(image, 0, 0, logoSize, logoSize);

      const imgData = ctx.getImageData(0, 0, logoSize, logoSize);
      const pixels = imgData.data;

      const canvasCenterX = canvas.width / 2 - logoSize / 2;
      const canvasCenterY = canvas.height / 2 - logoSize / 2;

      positions = [];
      originalPositions = [];
      velocities = [];

      for (let y = 0; y < logoSize; y += samplingStep) {
        for (let x = 0; x < logoSize; x += samplingStep) {
          const index = (y * logoSize + x) * 4;
          const alpha = pixels[index + 3];
          if (alpha > 128) {
            const px = x + canvasCenterX;
            const py = y + canvasCenterY;
            positions.push(px, py);
            originalPositions.push(px, py);
            velocities.push(0, 0);
          }
        }
      }

      const colors = new Float32Array(
        new Array(positions.length / 2).fill().flatMap(() => [rgb.r, rgb.g, rgb.b, 1])
      );

      gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, colors, gl.STATIC_DRAW);

      gl.enableVertexAttribArray(colorLocation);
      gl.vertexAttribPointer(colorLocation, 4, gl.FLOAT, false, 0, 0);

      gl.uniform2f(resolutionLocation, canvas.width, canvas.height);

      let lastFrameTime = 0;
      const render = (time) => {
        if (time - lastFrameTime < 1000 / targetFPS) {
          animationRef.current = requestAnimationFrame(render);
          return;
        }
        lastFrameTime = time;

        for (let i = 0; i < positions.length; i += 2) {
          const dx = positions[i] - mouse.current.x;
          const dy = positions[i + 1] - mouse.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          const origX = originalPositions[i];
          const origY = originalPositions[i + 1];

          if (dist < adjustedDistortionRadius) {
            const force = adjustedForceStrength * (1 - dist / adjustedDistortionRadius);
            velocities[i] += dx * force;
            velocities[i + 1] += dy * force;
          }

          const returnDx = origX - positions[i];
          const returnDy = origY - positions[i + 1];

          velocities[i] += returnDx * adjustedReturnForce;
          velocities[i + 1] += returnDy * adjustedReturnForce;

          velocities[i] *= 0.9;
          velocities[i + 1] *= 0.9;

          positions[i] += velocities[i];
          positions[i + 1] += velocities[i + 1];
        }

        const posArray = new Float32Array(positions);
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, posArray, gl.DYNAMIC_DRAW);

        gl.enableVertexAttribArray(positionLocation);
        gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.drawArrays(gl.POINTS, 0, positions.length / 2);
        animationRef.current = requestAnimationFrame(render);
      };
      render();
    };
    image.src = logoPath;

    const handleResize = () => resizeCanvas(canvas, gl);
    window.addEventListener("resize", handleResize);

    // Throttle mousemove to ~60fps max
    let lastMouseMove = 0;
    const onMouseMove = (e) => {
      const now = performance.now();
      if (now - lastMouseMove < 16) return;
      lastMouseMove = now;

      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      mouse.current.x = (e.clientX - rect.left) * scaleX;
      mouse.current.y = (e.clientY - rect.top) * scaleY;
    };
    canvas.addEventListener("mousemove", onMouseMove);

    return () => {
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(animationRef.current);
    };
  }, [logoPath, logoSize, logoColor, distortionRadius, forceStrength, returnForce]);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: "100%", height: "100%", display: "block", background: "transparent" }}
    />
  );
};

export default LogoModel;

function compileShader(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error("Shader compile error:", gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function resizeCanvas(canvas, gl) {
  const dpr = window.devicePixelRatio || 1;
  canvas.width = canvas.clientWidth * dpr;
  canvas.height = canvas.clientHeight * dpr;
  gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
}

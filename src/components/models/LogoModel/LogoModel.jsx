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
  let positions = [], originalPositions = [], velocities = [];

  useEffect(() => {
    const canvas = canvasRef.current;
    const gl = canvas.getContext("webgl", {
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
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
    gl.clearColor(0, 0, 0, 0); // Transparent background

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
      ctx.fillRect(0, 0, logoSize, logoSize); // Fill background to match logoColor
      ctx.globalCompositeOperation = "destination-in";
      ctx.drawImage(image, 0, 0, logoSize, logoSize);

      const imgData = ctx.getImageData(0, 0, logoSize, logoSize);
      const pixels = imgData.data;

      const canvasCenterX = canvas.width / 2 - logoSize / 2;
      const canvasCenterY = canvas.height / 2 - logoSize / 2;

      for (let y = 0; y < logoSize; y++) {
        for (let x = 0; x < logoSize; x++) {
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

      const colors = new Float32Array(new Array(positions.length / 2).fill().flatMap(() => [rgb.r, rgb.g, rgb.b, 1]));

      gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, colors, gl.STATIC_DRAW);

      gl.enableVertexAttribArray(colorLocation);
      gl.vertexAttribPointer(colorLocation, 4, gl.FLOAT, false, 0, 0);

      gl.uniform2f(resolutionLocation, canvas.width, canvas.height);

      const render = () => {
        for (let i = 0; i < positions.length; i += 2) {
          const dx = positions[i] - mouse.current.x;
          const dy = positions[i + 1] - mouse.current.y;
          const distSq = dx * dx + dy * dy;
          const dist = Math.sqrt(distSq);

          const origX = originalPositions[i];
          const origY = originalPositions[i + 1];

          if (dist < distortionRadius) {
            const force = forceStrength * (1 - dist / distortionRadius);
            velocities[i] += dx * force;
            velocities[i + 1] += dy * force;
          }

          const returnDx = origX - positions[i];
          const returnDy = origY - positions[i + 1];

          velocities[i] += returnDx * returnForce;
          velocities[i + 1] += returnDy * returnForce;

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
    canvas.addEventListener("mousemove", (e) => {
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      mouse.current.x = (e.clientX - rect.left) * scaleX;
      mouse.current.y = (e.clientY - rect.top) * scaleY;
    });

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationRef.current);
    };
  }, [logoPath, logoSize, logoColor, distortionRadius, forceStrength, returnForce]);

  return <canvas ref={canvasRef} style={{ width: "100%", height: "100%", display: "block", background: "transparent" }} />;
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
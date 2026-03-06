import { useEffect, useRef } from "react";

const CHARS = "01";

const MatrixRain = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let columns: number[] = [];
    let fontSize = 12;
    let colCount = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      colCount = Math.floor(canvas.offsetWidth / fontSize);
      columns = new Array(colCount).fill(0).map(() => Math.random() * -50);
    };

    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      ctx.fillStyle = "rgba(8, 8, 8, 0.08)";
      ctx.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      for (let i = 0; i < colCount; i++) {
        const char = CHARS[Math.floor(Math.random() * CHARS.length)];
        const x = i * fontSize;
        const y = columns[i] * fontSize;

        ctx.fillStyle = "rgba(201, 152, 46, 0.15)";
        ctx.font = `${fontSize}px monospace`;
        ctx.fillText(char, x, y);

        if (y > canvas.offsetHeight / window.devicePixelRatio && Math.random() > 0.98) {
          columns[i] = 0;
        }
        columns[i] += 0.3 + Math.random() * 0.3;
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();
    return () => { cancelAnimationFrame(animationId); window.removeEventListener("resize", resize); };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.15 }}
    />
  );
};

export default MatrixRain;

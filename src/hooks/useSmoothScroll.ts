import { useEffect, useRef } from "react";
import Lenis from "lenis";

const useSmoothScroll = () => {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Patch anchor scrollTo for Lenis
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a[href^='#'], button");
      if (!anchor) return;
    };
    document.addEventListener("click", handleClick);

    return () => {
      lenis.destroy();
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return lenisRef;
};

export default useSmoothScroll;

/** Custom animated cursor (hidden on touch devices) */
import { useEffect, useRef } from "react";

export default function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    // Skip on touch-only devices
    if (typeof window === "undefined" || window.matchMedia("(pointer: coarse)").matches) return;

    let mouseX = -100, mouseY = -100;
    let ringX = -100, ringY = -100;
    let raf;

    const onMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const tick = () => {
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;
      }
      // Smooth ring follows with lag
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringX - 20}px, ${ringY - 20}px)`;
      }
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(tick);

    // Hover enlargement
    const grow = () => ringRef.current?.classList.add("scale-[2.5]", "opacity-30");
    const shrink = () => ringRef.current?.classList.remove("scale-[2.5]", "opacity-30");

    document.querySelectorAll("a, button, [data-cursor]").forEach((el) => {
      el.addEventListener("mouseenter", grow);
      el.addEventListener("mouseleave", shrink);
    });

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-blue-300 z-[999] pointer-events-none hidden lg:block transition-transform duration-75"
        style={{ willChange: "transform" }}
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-10 h-10 rounded-full border border-blue-300/40 z-[999] pointer-events-none hidden lg:block transition-all duration-200"
        style={{ willChange: "transform" }}
      />
    </>
  );
}



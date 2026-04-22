import { useEffect, useRef } from "react";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(hover: none)").matches) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;

    const onMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const isHoverable = (el: Element | null) => {
      while (el) {
        const tag = el.tagName;
        if (tag === "A" || tag === "BUTTON") return true;
        if (el.getAttribute && el.getAttribute("data-hoverable") === "true") return true;
        el = el.parentElement;
      }
      return false;
    };

    const onOver = (e: MouseEvent) => {
      if (isHoverable(e.target as Element)) cursor.classList.add("is-hover");
      else cursor.classList.remove("is-hover");
    };

    let raf = 0;
    const tick = () => {
      currentX += (targetX - currentX) * 0.18;
      currentY += (targetY - currentY) * 0.18;
      cursor.style.transform = `translate(${currentX}px, ${currentY}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
    };
  }, []);

  return <div ref={cursorRef} className="nc-cursor" aria-hidden="true" />;
}
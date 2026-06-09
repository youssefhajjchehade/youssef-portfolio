import { useEffect, useRef } from "react";

const interactiveSelector = [
  "a",
  "button",
  ".primary-btn",
  ".secondary-btn",
  ".nav-cta",
  ".project-card",
  ".magnetic-target",
  "[role='button']",
].join(",");

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const frameRef = useRef(null);
  const targetRef = useRef({ x: -100, y: -100 });
  const dotRefPosition = useRef({ x: -100, y: -100 });
  const ringRefPosition = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const canUseCursor =
      window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!canUseCursor) {
      return undefined;
    }

    const cursor = cursorRef.current;
    const dot = dotRef.current;
    const ring = ringRef.current;

    if (!cursor || !dot || !ring) {
      return undefined;
    }

    document.documentElement.classList.add("custom-cursor-enabled");

    const render = () => {
      dotRefPosition.current.x += (targetRef.current.x - dotRefPosition.current.x) * 0.78;
      dotRefPosition.current.y += (targetRef.current.y - dotRefPosition.current.y) * 0.78;
      ringRefPosition.current.x += (targetRef.current.x - ringRefPosition.current.x) * 0.18;
      ringRefPosition.current.y += (targetRef.current.y - ringRefPosition.current.y) * 0.18;

      dot.style.transform = `translate3d(${dotRefPosition.current.x}px, ${dotRefPosition.current.y}px, 0) translate(-50%, -50%)`;
      ring.style.transform = `translate3d(${ringRefPosition.current.x}px, ${ringRefPosition.current.y}px, 0) translate(-50%, -50%)`;

      frameRef.current = requestAnimationFrame(render);
    };

    const handleMove = (event) => {
      targetRef.current.x = event.clientX;
      targetRef.current.y = event.clientY;
      cursor.classList.add("is-visible");
      cursor.classList.toggle("is-hovering", Boolean(event.target.closest(interactiveSelector)));
    };

    const handleEnter = () => cursor.classList.add("is-visible");
    const handleLeave = () => {
      cursor.classList.remove("is-visible");
      cursor.classList.remove("is-hovering");
    };

    frameRef.current = requestAnimationFrame(render);
    window.addEventListener("pointermove", handleMove, { passive: true });
    document.addEventListener("pointerenter", handleEnter);
    document.addEventListener("pointerleave", handleLeave);

    return () => {
      document.documentElement.classList.remove("custom-cursor-enabled");
      window.removeEventListener("pointermove", handleMove);
      document.removeEventListener("pointerenter", handleEnter);
      document.removeEventListener("pointerleave", handleLeave);

      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  return (
    <div className="custom-cursor" ref={cursorRef} aria-hidden="true">
      <span className="custom-cursor-ring" ref={ringRef} />
      <span className="custom-cursor-dot" ref={dotRef} />
    </div>
  );
};

export default CustomCursor;

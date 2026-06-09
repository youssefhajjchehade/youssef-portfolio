import { useRef } from "react";

const canUseMagnetic = () => {
  if (typeof window === "undefined") {
    return false;
  }

  return (
    window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
};

const Magnetic = ({ children, strength = 7 }) => {
  const frame = useRef(null);

  const handleMove = (event) => {
    if (!canUseMagnetic()) {
      return;
    }

    const node = event.currentTarget;
    const rect = node.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * strength;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * strength;

    if (frame.current) {
      cancelAnimationFrame(frame.current);
    }

    frame.current = requestAnimationFrame(() => {
      node.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    });
  };

  const handleLeave = (event) => {
    if (frame.current) {
      cancelAnimationFrame(frame.current);
    }

    event.currentTarget.style.transform = "";
  };

  return (
    <span
      className="magnetic-target"
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {children}
    </span>
  );
};

export default Magnetic;

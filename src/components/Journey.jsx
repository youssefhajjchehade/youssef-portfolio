import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useLayoutEffect, useRef, useState } from "react";
import { journey } from "../data/journey";
import Reveal from "./Reveal";

const TimelineNode = ({ index, thresholds, progress }) => {
  const tolerance = 0.005;
  const threshold = thresholds[index] ?? 0;
  const nextThreshold = thresholds[index + 1] ?? 1;

  const rawGlow = useTransform(progress, (value) => {
    const isPassed = value + tolerance >= threshold;
    const isCurrent =
      isPassed && (index === thresholds.length - 1 || value < nextThreshold - tolerance);
    const passedGlow = isPassed ? 0.58 : 0;
    const activeGlow = isCurrent ? 1 : 0;

    return Math.max(passedGlow, activeGlow);
  });
  const glow = useSpring(rawGlow, { stiffness: 130, damping: 24, mass: 0.35 });

  const opacity = useTransform(glow, [0, 0.58, 1], [0.34, 0.78, 1]);
  const scale = useTransform(glow, [0, 1], [0.86, 1.08]);
  const background = useTransform(
    glow,
    [0, 0.58, 1],
    [
      "rgba(5, 12, 24, 0.96)",
      "rgba(34, 211, 238, 0.66)",
      "rgba(155, 236, 255, 0.98)",
    ],
  );
  const borderColor = useTransform(
    glow,
    [0, 0.58, 1],
    [
      "rgba(148, 163, 184, 0.22)",
      "rgba(34, 211, 238, 0.54)",
      "rgba(196, 181, 253, 0.78)",
    ],
  );
  const boxShadow = useTransform(
    glow,
    [0, 0.58, 1],
    [
      "0 0 0 0 rgba(34, 211, 238, 0)",
      "0 0 0 7px rgba(34, 211, 238, 0.08), 0 0 18px rgba(34, 211, 238, 0.32)",
      "0 0 0 9px rgba(139, 92, 246, 0.13), 0 0 30px rgba(34, 211, 238, 0.72)",
    ],
  );

  return (
    <motion.div
      className="journey-dot"
      aria-hidden="true"
      style={{ opacity, scale, background, borderColor, boxShadow }}
    />
  );
};

const Journey = () => {
  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const lineRef = useRef(null);
  const itemRefs = useRef([]);
  const [thresholds, setThresholds] = useState(() =>
    journey.map((_, index) => (journey.length <= 1 ? 0 : index / journey.length)),
  );
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 72%", "end 44%"],
  });
  const progressScale = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const progressGlow = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [
      "0 0 16px rgba(34, 211, 238, 0.35)",
      "0 0 28px rgba(139, 92, 246, 0.55)",
      "0 0 34px rgba(34, 211, 238, 0.7)",
    ],
  );

  useLayoutEffect(() => {
    const calculateThresholds = () => {
      const stage = stageRef.current;
      const line = lineRef.current;

      if (!stage || !line) {
        return;
      }

      const lineTop = line.offsetTop;
      const lineHeight = line.offsetHeight || 1;
      const nextThresholds = itemRefs.current.map((item) => {
        if (!item) {
          return 0;
        }

        const itemCenter = item.offsetTop + item.offsetHeight / 2;
        return Math.min(1, Math.max(0, (itemCenter - lineTop) / lineHeight));
      });

      setThresholds(nextThresholds);
    };

    calculateThresholds();

    const resizeObserver =
      typeof ResizeObserver !== "undefined" ? new ResizeObserver(calculateThresholds) : null;

    if (resizeObserver) {
      resizeObserver.observe(stageRef.current);
    }

    window.addEventListener("resize", calculateThresholds);

    return () => {
      resizeObserver?.disconnect();
      window.removeEventListener("resize", calculateThresholds);
    };
  }, []);

  return (
    <section className="section journey" id="journey" ref={sectionRef}>
      <Reveal className="section-heading centered">
        <p className="eyebrow">Journey</p>
        <h2>A scroll story from engineering student to product builder.</h2>
        <p>
          The through-line is simple: learn the engineering fundamentals, build
          useful AI features, and package them into full-stack products that can
          be used outside a classroom.
        </p>
      </Reveal>

      <div className="journey-stage" ref={stageRef}>
        <div className="timeline-rail" aria-hidden="true" ref={lineRef}>
          <motion.span
            className="timeline-progress"
            style={{ scaleY: progressScale, boxShadow: progressGlow }}
          />
        </div>

        <div className="journey-list">
          {journey.map((item, index) => (
            <motion.div
              className={`journey-item ${index % 2 === 0 ? "left" : "right"}`}
              key={item.title}
              ref={(node) => {
                itemRefs.current[index] = node;
              }}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.24 }}
              transition={{
                duration: 0.65,
                ease: [0.22, 1, 0.36, 1],
                delay: index * 0.06,
              }}
            >
              <TimelineNode index={index} thresholds={thresholds} progress={scrollYProgress} />
              <div className="glass-card journey-card">
                <span>{item.year}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Journey;

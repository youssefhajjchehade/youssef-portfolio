import { motion } from "framer-motion";

const sparks = Array.from({ length: 16 }, (_, index) => ({
  id: index,
  left: `${8 + ((index * 23) % 86)}%`,
  top: `${10 + ((index * 31) % 78)}%`,
  delay: index * 0.35,
  duration: 7 + (index % 5),
}));

const AmbientBackground = () => {
  return (
    <div className="ambient-bg" aria-hidden="true">
      <div className="ambient-grid" />
      <motion.div
        className="ambient-orb orb-cyan"
        animate={{ x: [0, 28, -16, 0], y: [0, -18, 24, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="ambient-orb orb-violet"
        animate={{ x: [0, -24, 18, 0], y: [0, 22, -14, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="ambient-orb orb-soft"
        animate={{ x: [0, 18, -22, 0], y: [0, 16, -20, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
      />

      {sparks.map((spark) => (
        <motion.span
          className="ambient-spark"
          key={spark.id}
          style={{ left: spark.left, top: spark.top }}
          animate={{ opacity: [0.08, 0.55, 0.08], y: [0, -16, 0] }}
          transition={{
            duration: spark.duration,
            delay: spark.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

export default AmbientBackground;

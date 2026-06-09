import { motion } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import { HiArrowRight, HiOutlineSparkles } from "react-icons/hi";
import Magnetic from "./Magnetic";

const Hero = () => {
  return (
    <section className="hero section" id="home">
      <motion.div
        className="hero-content"
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="eyebrow">Computer Engineering Student &middot; AI & Full-Stack Developer</p>

        <h1>Building AI products with full-stack depth.</h1>

        <p className="hero-description">
          I am Youssef Al Hajj Chehade, a Computer Engineering student at
          Lebanese American University focused on machine learning tools,
          backend APIs, and deployed web products built for real users.
        </p>

        <div className="hero-actions">
          <Magnetic>
            <a href="#projects" className="primary-btn">
              View Projects <HiArrowRight />
            </a>
          </Magnetic>
          <Magnetic>
            <a href="#contact" className="secondary-btn">
              Contact Me
            </a>
          </Magnetic>
        </div>

        <div className="hero-links">
          <Magnetic strength={5}>
            <a
              href="https://github.com/youssefhajjchehade"
              target="_blank"
              rel="noreferrer"
            >
              <FaGithub /> GitHub
            </a>
          </Magnetic>
        </div>
      </motion.div>

      <motion.div
        className="hero-card glass-card"
        initial={{ opacity: 0, y: 32, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.75, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="card-orbit" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <p className="card-label">
          <HiOutlineSparkles /> Currently focused on
        </p>
        <h2>Remote-ready AI and full-stack portfolio work</h2>
        <p>
          React, Node.js, MongoDB, FastAPI, Keras, and TensorFlow projects with
          clear interfaces, real data flow, and deployment in mind.
        </p>

        <div className="mini-stats">
          <div>
            <strong>4+</strong>
            <span>Projects</span>
          </div>
          <div>
            <strong>LAU</strong>
            <span>University</span>
          </div>
          <div>
            <strong>Remote</strong>
            <span>Goal</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;

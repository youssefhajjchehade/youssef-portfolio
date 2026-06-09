import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { FaGithub } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import { projects } from "../data/projects";
import Magnetic from "./Magnetic";
import Reveal from "./Reveal";

const projectVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.09,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 26 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

const ProjectPreview = ({ project }) => {
  const [hasImage, setHasImage] = useState(Boolean(project.image));

  return (
    <div className="project-preview">
      <div className="browser-bar" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>

      {hasImage ? (
        <img
          src={project.image}
          alt={`${project.title} preview`}
          loading="lazy"
          onError={() => setHasImage(false)}
        />
      ) : (
        <div className="project-image-fallback">
          <span>{project.title}</span>
        </div>
      )}
    </div>
  );
};

const canTiltCard = () => {
  if (typeof window === "undefined") {
    return false;
  }

  return (
    window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
};

const ProjectCard = ({ project }) => {
  const cardRef = useRef(null);
  const frameRef = useRef(null);

  const handleMove = (event) => {
    if (!canTiltCard()) {
      return;
    }

    const card = cardRef.current;
    if (!card) {
      return;
    }

    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const rotateY = ((x / rect.width) - 0.5) * 5;
    const rotateX = -(((y / rect.height) - 0.5) * 4);

    if (frameRef.current) {
      cancelAnimationFrame(frameRef.current);
    }

    frameRef.current = requestAnimationFrame(() => {
      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });
  };

  const handleLeave = () => {
    const card = cardRef.current;
    if (frameRef.current) {
      cancelAnimationFrame(frameRef.current);
    }

    if (card) {
      card.style.transform = "";
    }
  };

  return (
    <div
      className={`glass-card project-card ${project.featured ? "featured" : ""}`}
      ref={cardRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      <ProjectPreview project={project} />

      <div className="project-top">
        <p>{project.category}</p>
        {project.featured && <span>Featured</span>}
      </div>

      <h3>{project.title}</h3>
      <p className="project-description">{project.description}</p>

      <div className="project-tech">
        {project.tech.map((tech) => (
          <span key={tech}>{tech}</span>
        ))}
      </div>

      <div className="project-links">
        {project.live && (
          <Magnetic strength={5}>
            <a href={project.live} target="_blank" rel="noreferrer">
              <FiExternalLink /> Live Demo
            </a>
          </Magnetic>
        )}

        {project.github && (
          <Magnetic strength={5}>
            <a href={project.github} target="_blank" rel="noreferrer">
              <FaGithub /> GitHub
            </a>
          </Magnetic>
        )}
      </div>
    </div>
  );
};

const Projects = () => {
  return (
    <section className="section projects" id="projects">
      <Reveal className="section-heading">
        <p className="eyebrow">Projects</p>
        <h2>Featured products and engineering experiments.</h2>
        <p>
          A compact set of projects showing AI integrations, NLP model work,
          responsive sites, and full-stack application structure.
        </p>
      </Reveal>

      <motion.div
        className="projects-grid"
        variants={projectVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.16 }}
      >
        {projects.map((project) => (
          <motion.article
            className="project-card-shell"
            key={project.title}
            variants={cardVariants}
          >
            <ProjectCard project={project} />
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
};

export default Projects;

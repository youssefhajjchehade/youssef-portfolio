import { FiCpu, FiDatabase, FiLayers, FiZap } from "react-icons/fi";
import Reveal from "./Reveal";

const buildItems = [
  {
    icon: <FiZap />,
    title: "AI-powered web apps",
    text: "Product interfaces with AI features that analyze inputs, generate recommendations, or speed up user workflows.",
  },
  {
    icon: <FiCpu />,
    title: "Machine learning tools",
    text: "NLP and deep learning experiments shaped into usable tools with APIs, model outputs, and clear user flows.",
  },
  {
    icon: <FiDatabase />,
    title: "Backend APIs",
    text: "Express and FastAPI services with authentication, database models, protected routes, and clean request handling.",
  },
  {
    icon: <FiLayers />,
    title: "Deployed full-stack products",
    text: "React frontends connected to real data, polished for responsive use, and prepared for public portfolio deployment.",
  },
];

const BuildFocus = () => {
  return (
    <section className="section build" id="build">
      <Reveal className="section-heading">
        <p className="eyebrow">What I Build</p>
        <h2>Practical systems with a product finish.</h2>
        <p>
          My best projects sit between AI engineering and full-stack development:
          models, APIs, dashboards, and interfaces that feel complete.
        </p>
      </Reveal>

      <div className="build-grid">
        {buildItems.map((item, index) => (
          <Reveal className="glass-card build-card" key={item.title} delay={index * 0.05}>
            <div className="icon-box">{item.icon}</div>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
};

export default BuildFocus;

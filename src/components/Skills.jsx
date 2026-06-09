import Reveal from "./Reveal";

const skills = [
  {
    title: "Frontend",
    items: ["React", "Vite", "JavaScript", "HTML", "CSS", "Responsive Design"],
  },
  {
    title: "Backend",
    items: ["Node.js", "Express", "FastAPI", "REST APIs", "JWT Auth"],
  },
  {
    title: "Databases",
    items: ["MongoDB", "MySQL"],
  },
  {
    title: "AI / Machine Learning",
    items: ["Python", "TensorFlow", "Keras", "NLP", "Deep Learning"],
  },
  {
    title: "Tools",
    items: ["Git", "GitHub", "Postman", "Netlify", "Render"],
  },
];

const Skills = () => {
  return (
    <section className="section skills" id="skills">
      <Reveal className="section-heading centered">
        <p className="eyebrow">Skills / Stack</p>
        <h2>The tools behind the work.</h2>
        <p>
          A stack shaped around React interfaces, API development, databases,
          and AI workflows.
        </p>
      </Reveal>

      <div className="skills-grid">
        {skills.map((group, index) => (
          <Reveal className="glass-card skill-card" key={group.title} delay={index * 0.04}>
            <h3>{group.title}</h3>
            <div className="skill-tags">
              {group.items.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
};

export default Skills;

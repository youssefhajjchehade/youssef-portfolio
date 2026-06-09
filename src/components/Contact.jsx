import { FaGithub } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import Magnetic from "./Magnetic";
import Reveal from "./Reveal";

const email = "youssef.hajjchehade18@gmail.com";

const Contact = () => {
  return (
    <section className="section contact" id="contact">
      <Reveal className="glass-card contact-card">
        <p className="eyebrow">Contact</p>
        <h2>Open to AI engineering and full-stack opportunities.</h2>

        <p>
          I am looking for remote opportunities where I can keep building
          practical AI products, reliable APIs, and polished web experiences.
        </p>

        <div className="contact-links">
          <Magnetic strength={5}>
            <a href={`mailto:${email}`}>
              <MdEmail /> {email}
            </a>
          </Magnetic>

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
      </Reveal>
    </section>
  );
};

export default Contact;

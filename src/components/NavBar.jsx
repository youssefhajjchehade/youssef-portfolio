import Magnetic from "./Magnetic";

const Navbar = () => {
  return (
    <header className="navbar">
      <a href="#home" className="logo">
        Youssef<span>.dev</span>
      </a>

      <nav>
        <a href="#journey">Journey</a>
        <a href="#build">Build</a>
        <a href="#projects">Projects</a>
        <a href="#skills">Skills</a>
        <Magnetic strength={5}>
          <a href="#contact" className="nav-cta">Contact</a>
        </Magnetic>
      </nav>
    </header>
  );
};

export default Navbar;

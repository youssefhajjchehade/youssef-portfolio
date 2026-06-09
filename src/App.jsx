import Navbar from "./components/NavBar";
import Hero from "./components/Hero";
import Journey from "./components/Journey";
import BuildFocus from "./components/BuildFocus";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import AmbientBackground from "./components/AmbientBackground";
import CustomCursor from "./components/CustomCursor";
import "./App.css";

function App() {
  return (
    <div className="app">
      <AmbientBackground />
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <Journey />
        <BuildFocus />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;

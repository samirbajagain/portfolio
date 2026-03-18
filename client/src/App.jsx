import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import TravelAdventure from "./components/TravelAdventure";
import Gallery from "./components/Gallery";
import Services from "./components/Services";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ChatWidget from "./components/ChatWidget";
import Cursor from "./components/Cursor";
import Preloader from "./components/Preloader";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 2200);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <Cursor />
      {loading && <Preloader />}
      <div className={`transition-opacity duration-700 ${loading ? "opacity-0" : "opacity-100"}`}>
        <Navbar />
        <main>
          <section id="home"><Hero /></section>
          <section id="about"><About /></section>
          <section id="skills"><Skills /></section>
          <section id="projects"><Projects /></section>
          <section id="experience"><Experience /></section>
          <section id="journeys"><TravelAdventure /></section>
          <section id="gallery"><Gallery /></section>
          <section id="services"><Services /></section>
          <section id="testimonials"><Testimonials /></section>
          <section id="contact"><Contact /></section>
        </main>
        <Footer />
        <ChatWidget />
      </div>
    </>
  );
}

export default App;

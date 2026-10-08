import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  return <><a className="skip-link" href="#main-content">Skip to content</a><Navbar /><main id="main-content" tabIndex={-1}><Hero /><Experience /><Skills /><Projects /><Education /><Contact /></main><Footer /></>;
}

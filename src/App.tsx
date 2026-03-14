import './styles/global.css'
import { useLenis } from './hooks/useLenis'
import BlobCursor from './components/BlobCursor'
import Noise from './components/Noise'
import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Portfolio from './components/Portfolio'
import Contact from './components/Contact'
import Footer from './components/Footer'

// Import React Bits CSS
import './components/BlobCursor.css'
import './components/Noise.css'

function App() {
  useLenis()
  return (
    <div className="App">
      <BlobCursor />
      <Noise />
      <Nav />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Portfolio />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App

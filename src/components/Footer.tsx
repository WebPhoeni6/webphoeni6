import CircularText from './CircularText'
import { personal } from '../data'
import '../styles/Footer.css'

export default function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__center">
          <div className="footer__circular" onClick={scrollTop} title="Back to top">
            <CircularText
              text="WEB PHOENIX • FULL STACK DEV • "
              spinDuration={20}
              onHover="speedUp"
            />
            <span className="footer__icon">&lt;/&gt;</span>
          </div>
        </div>
        <div className="footer__socials">
          <a href={personal.linkedin} target="_blank" rel="noreferrer" className="footer__social">LinkedIn</a>
          <a href={personal.github} target="_blank" rel="noreferrer" className="footer__social">GitHub</a>
          <a href={`mailto:${personal.email}`} className="footer__social">Email</a>
        </div>
        <p className="footer__copy">© {new Date().getFullYear()} {personal.name}. Built with passion.</p>
        <button className="footer__top" onClick={scrollTop}>↑ Back to Top</button>
      </div>
    </footer>
  )
}

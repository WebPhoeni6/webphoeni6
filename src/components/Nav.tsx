import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import '../styles/Nav.css'

gsap.registerPlugin(ScrollTrigger)

const links = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Contact', href: '#contact' },
]

export default function Nav() {
  const navRef = useRef<HTMLElement>(null)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const nav = navRef.current
    if (!nav) return
    // Entrance animation
    gsap.fromTo(nav, { autoAlpha: 0, y: -20 }, { autoAlpha: 1, y: 0, duration: 0.6, ease: 'power2.out', delay: 0.3 })
    // Hide on scroll down, show on scroll up
    let lastY = 0
    const onScroll = () => {
      const y = window.scrollY
      if (y > lastY && y > 80) gsap.to(nav, { y: -100, duration: 0.3, ease: 'power2.in' })
      else gsap.to(nav, { y: 0, duration: 0.3, ease: 'power2.out' })
      lastY = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleLink = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setMenuOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav className="nav" ref={navRef}>
      <div className="nav__pill">
        <a href="#hero" className="nav__logo" onClick={(e) => handleLink(e, '#hero')}>WP</a>
        <ul className="nav__links">
          {links.map(({ label, href }) => (
            <li key={label}>
              <a href={href} className="nav__link" onClick={(e) => handleLink(e, href)}>
                <span className="nav__link-text">{label}</span>
                <span className="nav__link-hover" aria-hidden>{label}</span>
              </a>
            </li>
          ))}
        </ul>
        <button className={`nav__burger ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(!menuOpen)} aria-label="menu">
          <span /><span /><span />
        </button>
      </div>
      {menuOpen && (
        <div className="nav__mobile">
          {links.map(({ label, href }) => (
            <a key={label} href={href} className="nav__mobile-link" onClick={(e) => handleLink(e, href)}>{label}</a>
          ))}
        </div>
      )}
    </nav>
  )
}

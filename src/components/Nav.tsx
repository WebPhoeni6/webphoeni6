import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import '../styles/Nav.css'

const links = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Contact', href: '#contact' },
]

export default function Nav() {
  const navRef = useRef<HTMLElement>(null)
  const mobileRef = useRef<HTMLDivElement>(null)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const nav = navRef.current
    if (!nav) return
    gsap.fromTo(nav, { autoAlpha: 0, y: -20 }, { autoAlpha: 1, y: 0, duration: 0.6, ease: 'power2.out', delay: 0.3 })

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

  // Animate mobile menu in/out
  useEffect(() => {
    const el = mobileRef.current
    if (!el) return
    if (menuOpen) {
      el.style.display = 'flex'
      gsap.fromTo(el, { autoAlpha: 0, y: -12 }, { autoAlpha: 1, y: 0, duration: 0.25, ease: 'power2.out' })
    } else {
      gsap.to(el, { autoAlpha: 0, y: -12, duration: 0.2, ease: 'power2.in', onComplete: () => { el.style.display = 'none' } })
    }
  }, [menuOpen])

  // Close on outside click
  useEffect(() => {
    if (!menuOpen) return
    const close = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setMenuOpen(false)
    }
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [menuOpen])

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
        <button
          className={`nav__burger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span /><span /><span />
        </button>
      </div>

      {/* Dropdown — rendered inside pill container so it aligns correctly */}
      <div ref={mobileRef} className="nav__dropdown" style={{ display: 'none' }}>
        {links.map(({ label, href }) => (
          <a key={label} href={href} className="nav__dropdown-link" onClick={(e) => handleLink(e, href)}>
            {label}
          </a>
        ))}
      </div>
    </nav>
  )
}

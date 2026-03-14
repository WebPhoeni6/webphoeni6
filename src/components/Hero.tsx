import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import DarkVeil from './DarkVeil';
import SplitText from './SplitText';
import GradientText from './GradientText';
import ProfileCard from './ProfileCard';
import { personal } from '../data/index';
import '../styles/Hero.css';

const GitHubIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

export default function Hero() {
  const greetingRef = useRef<HTMLParagraphElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (greetingRef.current) {
        gsap.fromTo(
          greetingRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, delay: 0.2, ease: 'power3.out' }
        );
      }
      if (rightRef.current) {
        gsap.fromTo(
          rightRef.current,
          { opacity: 0, x: 40 },
          { opacity: 1, x: 0, duration: 0.9, delay: 0.6, ease: 'power3.out' }
        );
      }
    });
    return () => ctx.revert();
  }, []);

  const handleCtaClick = () => {
    const portfolio = document.getElementById('portfolio');
    if (portfolio) {
      portfolio.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero" id="hero">
      <div className="hero__bg">
        <DarkVeil
          hueShift={180}
          noiseIntensity={0.04}
          scanlineIntensity={0.1}
          scanlineFrequency={80}
          warpAmount={0.3}
          speed={0.4}
        />
      </div>

      <div className="hero__content">
        <div className="hero__left">
          <p ref={greetingRef} className="hero__greeting">
            Hello, I'm
          </p>

          <div className="hero__name">
            <SplitText
              text={personal.name}
              tag="h1"
              className="hero__name-text"
              splitType="chars"
              delay={40}
              duration={1}
              ease="power3.out"
              from={{ opacity: 0, y: 30 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0}
              rootMargin="0px"
              textAlign="left"
            />
          </div>

          <div className="hero__title">
            <GradientText
              colors={['#00d4ff', '#0099bb', '#00d4ff', '#00eeff', '#00d4ff']}
              animationSpeed={6}
              direction="horizontal"
            >
              {personal.title}
            </GradientText>
          </div>

          <div className="hero__socials">
            <a
              href={personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hero__social"
              aria-label="GitHub profile"
            >
              <GitHubIcon />
              GitHub
            </a>
            <a
              href={personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hero__social"
              aria-label="LinkedIn profile"
            >
              <LinkedInIcon />
              LinkedIn
            </a>
          </div>

          <button className="hero__cta" onClick={handleCtaClick} type="button">
            View My Work
            <ArrowIcon />
          </button>
        </div>

        <div ref={rightRef} className="hero__right">
          <ProfileCard
            avatarUrl="/images/me.png"
            name={personal.name}
            title={personal.title}
            handle="webphoeni6"
            status="Available for hire"
            contactText="Contact"
            onContactClick={() => {
              const contact = document.getElementById('contact');
              if (contact) contact.scrollIntoView({ behavior: 'smooth' });
            }}
          />
        </div>
      </div>
    </section>
  );
}

import AnimatedContent from './AnimatedContent'
import { personal } from '../data/index'
import '../styles/About.css'

const cards = [
  { icon: '⚡', title: 'Frontend', desc: 'React, TypeScript, modern CSS — pixel-perfect UIs with smooth animations.' },
  { icon: '🔧', title: 'Backend', desc: 'Node.js, Express, REST & GraphQL APIs built for scale.' },
  { icon: '🗄️', title: 'Database', desc: 'PostgreSQL, MongoDB, Redis — data modelling and query optimisation.' },
]

export default function About() {
  return (
    <section className="about" id="about">
      <div className="about__inner">
        {/* Bio */}
        <AnimatedContent direction="vertical" delay={0} threshold={0.1}>
          <div className="about__bio">
            <h2 className="about__heading">About <span className="about__accent">Me</span></h2>
            <p className="about__text">{personal.bio}</p>
            <a href={personal.resumeUrl} target="_blank" rel="noreferrer" className="about__resume">
              View Resume ↗
            </a>
          </div>
        </AnimatedContent>

        {/* Expertise cards */}
        <div className="about__cards">
          {cards.map((card, i) => (
            <AnimatedContent key={card.title} direction="vertical" delay={i * 0.15} threshold={0.1}>
              <div className="about__card">
                <span className="about__card-icon">{card.icon}</span>
                <h3 className="about__card-title">{card.title}</h3>
                <p className="about__card-desc">{card.desc}</p>
              </div>
            </AnimatedContent>
          ))}
        </div>
      </div>
    </section>
  )
}

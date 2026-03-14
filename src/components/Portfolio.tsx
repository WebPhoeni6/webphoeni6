import AnimatedContent from './AnimatedContent'
import { projects } from '../data'
import '../styles/Portfolio.css'

export default function Portfolio() {
  return (
    <section className="portfolio" id="portfolio">
      <div className="portfolio__inner">
        <AnimatedContent>
          <div className="portfolio__header">
            <h2 className="portfolio__heading">Featured <span className="portfolio__accent">Projects</span></h2>
            <p className="portfolio__subtitle">A selection of work I'm proud of</p>
          </div>
        </AnimatedContent>
        <AnimatedContent delay={0.2}>
          <div className="portfolio__grid">
            {projects.map((project, i) => (
              <div key={i} className={`portfolio__card portfolio__card--${i}`}>
                <div
                  className="portfolio__card-bg"
                  style={{ backgroundImage: `url(${project.image})` }}
                />
                <div className="portfolio__card-overlay" />
                <div className="portfolio__card-content">
                  <span className="portfolio__card-tag">{project.tag}</span>
                  <h3 className="portfolio__card-title">{project.title}</h3>
                  <p className="portfolio__card-desc">{project.description}</p>
                  <a href={project.liveUrl} target="_blank" rel="noreferrer" className="portfolio__card-link">
                    Live Preview ↗
                  </a>
                </div>
              </div>
            ))}
          </div>
        </AnimatedContent>
      </div>
    </section>
  )
}

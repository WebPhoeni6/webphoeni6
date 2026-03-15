import { useRef, useEffect } from 'react'
import AnimatedContent from './AnimatedContent'
import { projects } from '../data'
import '../styles/Portfolio.css'

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const card = cardRef.current
    if (!card) return

    let bounds: DOMRect

    const refresh = () => { bounds = card.getBoundingClientRect() }
    refresh()

    const onMove = (e: MouseEvent) => {
      if (!bounds) return
      const x = e.clientX - bounds.left
      const y = e.clientY - bounds.top
      const cx = bounds.width / 2
      const cy = bounds.height / 2
      const rotX = ((y - cy) / cy) * -8
      const rotY = ((x - cx) / cx) * 8
      card.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.02,1.02,1.02)`
    }

    const onLeave = () => {
      card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)'
    }

    const onEnter = () => { bounds = card.getBoundingClientRect() }

    card.addEventListener('mouseenter', onEnter)
    card.addEventListener('mousemove', onMove)
    card.addEventListener('mouseleave', onLeave)
    window.addEventListener('resize', refresh)

    return () => {
      card.removeEventListener('mouseenter', onEnter)
      card.removeEventListener('mousemove', onMove)
      card.removeEventListener('mouseleave', onLeave)
      window.removeEventListener('resize', refresh)
    }
  }, [])

  return (
    <div ref={cardRef} className={`portfolio__card portfolio__card--${index}`}>
      <div className="portfolio__card-bg" style={{ backgroundImage: `url(${project.image})` }} />
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
  )
}

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
              <ProjectCard key={i} project={project} index={i} />
            ))}
          </div>
        </AnimatedContent>
      </div>
    </section>
  )
}

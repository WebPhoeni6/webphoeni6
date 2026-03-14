import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import AnimatedContent from './AnimatedContent'
import { experiences } from '../data'
import '../styles/Experience.css'

gsap.registerPlugin(ScrollTrigger)

export default function Experience() {
  const lineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const line = lineRef.current
    if (!line) return
    gsap.fromTo(line,
      { scaleY: 0, transformOrigin: 'top center' },
      {
        scaleY: 1,
        scrollTrigger: {
          trigger: line,
          start: 'top 80%',
          end: 'bottom 20%',
          scrub: 1,
          invalidateOnRefresh: true,
        }
      }
    )
  }, [])

  return (
    <section className="experience" id="experience">
      <div className="experience__inner">
        <div className="experience__header">
          <AnimatedContent>
            <h2 className="experience__heading">Work <span className="experience__accent">Experience</span></h2>
          </AnimatedContent>
        </div>
        <div className="experience__timeline">
          <div className="experience__line" ref={lineRef} />
          {experiences.map((exp, i) => (
            <div key={i} className={`experience__item ${i % 2 === 0 ? 'left' : 'right'}`}>
              <div className="experience__dot" />
              <AnimatedContent direction="horizontal" reverse={i % 2 !== 0}>
                <div className="experience__card">
                  <span className="experience__date">{exp.date}</span>
                  <h3 className="experience__title">{exp.title}</h3>
                  <span className="experience__company">{exp.company}</span>
                  <p className="experience__desc">{exp.description}</p>
                </div>
              </AnimatedContent>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

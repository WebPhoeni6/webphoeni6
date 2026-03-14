import React from 'react';
import AnimatedContent from './AnimatedContent';
import ScrollVelocity from './ScrollVelocity';
import MagicBento from './MagicBento';
import { skills } from '../data/index';
import '../styles/Skills.css';

const Skills: React.FC = () => {
  // Build a single marquee string: "SKILL1 • SKILL2 • SKILL3 • ..."
  const marqueeText = skills.map(s => s.name).join(' • ');

  return (
    <section className="skills" id="skills">
      <div className="skills__inner">
        {/* Section Header */}
        <div className="skills__header">
          <AnimatedContent distance={40} duration={0.7} delay={0}>
            <h2 className="skills__heading">
              My <span className="skills__accent">Skills</span>
            </h2>
          </AnimatedContent>
          <AnimatedContent distance={30} duration={0.7} delay={0.15}>
            <p className="skills__subtitle">
              Technologies and tools I work with every day
            </p>
          </AnimatedContent>
        </div>

        {/* Marquee */}
        <div className="skills__marquee">
          <ScrollVelocity
            texts={[marqueeText, marqueeText]}
            velocity={80}
          />
        </div>

        {/* Bento Grid */}
        <div className="skills__bento">
          <MagicBento
            enableStars
            enableSpotlight
            enableBorderGlow
            clickEffect
            enableMagnetism
          />
        </div>
      </div>
    </section>
  );
};

export default Skills;

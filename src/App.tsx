import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section");
      let current = "home";

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 100) {
          current = section.getAttribute("id") || "home";
        }
      });

      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      // Using FormSpree - replace with your FormSpree endpoint
      const response = await fetch("https://formspree.io/f/xrbrdeab", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        setShowModal(true);
        form.reset();
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const skills = [
    { name: "HTML5", icon: "fab fa-html5" },
    { name: "CSS3", icon: "fab fa-css3-alt" },
    { name: "JAVASCRIPT", icon: "fab fa-js" },
    { name: "ANGULAR", icon: "fab fa-angular" },
    { name: "REACT", icon: "fab fa-react" },
    { name: "BOOTSTRAP", icon: "fab fa-bootstrap" },
    { name: "TAILWIND", icon: "fas fa-wind" },
    { name: "PYTHON", icon: "fab fa-python" },
    { name: "NODEJS", icon: "fab fa-node-js" },
    { name: "DJANGO", icon: "fas fa-code" },
    { name: "POSTGRESQL", icon: "fas fa-database" },
    { name: "AWS", icon: "fab fa-aws" },
    { name: "DOCKER", icon: "fab fa-docker" },
    { name: "GIT", icon: "fab fa-git-alt" },
  ];

  const projects = [
    {
      title: "Bistropulse",
      description: "Restaurant Management SaaS",
      image: "images/bistropulse.png",
      tag: "Full Stack",
      link: "https://bistropulse.vercel.app/",
    },
    {
      title: "Afrophuket",
      description: "Event Ticketing & Management Platform",
      image: "images/afrophuket.png",
      tag: "Full Stack",
      link: "https://afrophuket.vercel.app/",
    },
    {
      title: "Pulsecore",
      description: "Inventory Management Dashboard",
      image: "images/pulsecore.png",
      tag: "Full Stack",
      link: "http://pulsecore-inventory.vercel.app/home",
    },
    {
      title: "AbJotters",
      description: "Notebook Ecommerce App",
      image: "images/abjoters.png",
      tag: "Full Stack",
      link: "https://abifortune-jotters.vercel.app/",
    },
    {
      title: "Nest Food",
      description: "Ecommerce App",
      image: "images/nest.png",
      tag: "Full Stack",
      link: "https://nest-roan.vercel.app/home",
    },
    {
      title: "More Projects",
      description: "Explore my work",
      image:
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=400&fit=crop",
      tag: "Various",
      link: "https://github.com/WebPhoeni6",
    },
  ];

  const experiences = [
    {
      date: "November 2024 - Present",
      title: "Frontend Developer",
      company: "Earlybena Inc",
      description:
        "Designed and implemented responsive, accessible UI components with React. Optimized performance and bundle size, collaborated with designers and backend engineers to integrate APIs, and improved user experience through usability testing and analytics.",
    },
    {
      date: "May 2024 - November 2024",
      title: "Full Stack Developer",
      company: "Charis BI",
      description:
        "Built marketing-focused web applications and campaign landing pages, integrated analytics and tracking, collaborated with designers and marketers to optimize conversion funnels, and implemented CMS and automation integrations to support campaign workflows.",
    },
    {
      date: "March 2023 - February 2024",
      title: "Frontend Developer",
      company: "Expintek LTD",
      description:
        "Built and maintained the frontend of an HR system, implementing responsive interfaces, complex form workflows, employee dashboards, and integrations with HR APIs and authentication. Focused on performance, accessibility, and close collaboration with backend and QA teams to deliver production-ready features.",
    },
  ];

  return (
    <div className="App">
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="logo">
            <i className="fas fa-code"></i>
          </div>
          <button
            className={`hamburger ${menuOpen ? "active" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
          <ul className={`nav-menu ${menuOpen ? "active" : ""}`}>
            <li>
              <a
                href="#home"
                className={activeSection === "home" ? "active" : ""}
                onClick={() => setMenuOpen(false)}
              >
                About Me
              </a>
            </li>
            <li>
              <a
                href="#skills"
                className={activeSection === "skills" ? "active" : ""}
                onClick={() => setMenuOpen(false)}
              >
                Skills
              </a>
            </li>
            <li>
              <a
                href="#portfolio"
                className={activeSection === "portfolio" ? "active" : ""}
                onClick={() => setMenuOpen(false)}
              >
                Portfolio
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className="nav-contact-btn"
                onClick={() => setMenuOpen(false)}
              >
                Contact Me
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-content">
          <div className="hero-text">
            <p className="greeting">Hi, I am</p>
            <h1 className="name">Samuel Emeka</h1>
            <p className="title">a Full Stack Developer</p>
            <div className="social-links">
              <a
                href="www.linkedin.com/in/samuelemekawp"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
              >
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a
                href="https://github.com/WebPhoeni6"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
              >
                <i className="fab fa-github"></i>
              </a>
              <a href="mailto:devsamuel0611@gmail.com" className="social-icon">
                <i className="fas fa-envelope"></i>
              </a>
            </div>
          </div>
          <div className="hero-image">
            <div className="blob-wrapper">
              <svg
                className="blob-container"
                viewBox="0 0 500 500"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <clipPath id="blobClip">
                    <path d="M428.5,307.5Q392,365,339,396Q286,427,228.5,433.5Q171,440,131,398Q91,356,65.5,303Q40,250,61,194Q82,138,129.5,104.5Q177,71,233,65.5Q289,60,334,93.5Q379,127,412,188.5Q445,250,428.5,307.5Z" />
                  </clipPath>
                </defs>
                {/* Ripple effects */}
                <g className="ripple-1">
                  <path
                    d="M428.5,307.5Q392,365,339,396Q286,427,228.5,433.5Q171,440,131,398Q91,356,65.5,303Q40,250,61,194Q82,138,129.5,104.5Q177,71,233,65.5Q289,60,334,93.5Q379,127,412,188.5Q445,250,428.5,307.5Z"
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth="3"
                  />
                </g>
                <g className="ripple-2">
                  <path
                    d="M428.5,307.5Q392,365,339,396Q286,427,228.5,433.5Q171,440,131,398Q91,356,65.5,303Q40,250,61,194Q82,138,129.5,104.5Q177,71,233,65.5Q289,60,334,93.5Q379,127,412,188.5Q445,250,428.5,307.5Z"
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth="3"
                  />
                </g>
                {/* White background blob */}
                <path
                  d="M428.5,307.5Q392,365,339,396Q286,427,228.5,433.5Q171,440,131,398Q91,356,65.5,303Q40,250,61,194Q82,138,129.5,104.5Q177,71,233,65.5Q289,60,334,93.5Q379,127,412,188.5Q445,250,428.5,307.5Z"
                  fill="#ffffff"
                />
                {/* Image clipped to blob shape */}
                <image
                  href="images/me.png"
                  x="0"
                  y="0"
                  width="500"
                  height="500"
                  clipPath="url(#blobClip)"
                  preserveAspectRatio="xMidYMid slice"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="hero-info">
          <h3>WEB PHOENIX</h3>
          <p>
            I'm a passionate Full Stack Developer with expertise in building
            scalable web applications. I specialize in modern frameworks and
            technologies, creating seamless user experiences from front-end to
            back-end. With a strong foundation in both client and server-side
            development, I bring ideas to life through clean, efficient code.
          </p>
          <button className="read-more-btn">Read More</button>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about">
        <div className="section-header">
          <h2>ABOUT ME</h2>
        </div>
        <div className="about-content">
          <p>
            I'm a Full Stack Developer who loves creating robust and scalable
            web applications. I have experience working with various
            technologies and frameworks, and I'm always eager to learn new
            things. My journey in web development has been filled with exciting
            challenges and continuous growth.
          </p>
          <button className="resume-btn">RESUME</button>
        </div>

        <div className="expertise-grid">
          <div className="expertise-item">
            <h3>DESIGN</h3>
            <p>
              I create clean, modern, and responsive user interfaces that
              provide excellent user experiences. I focus on aesthetics,
              usability, and accessibility to ensure every project looks great
              and functions perfectly across all devices.
            </p>
          </div>
          <div className="expertise-item">
            <h3>DEVELOPMENT</h3>
            <p>
              I build full-stack applications using modern frameworks and best
              practices. From front-end interfaces to back-end APIs and
              databases, I handle the entire development lifecycle with
              precision and attention to detail.
            </p>
          </div>
          <div className="expertise-item">
            <h3>MAINTENANCE</h3>
            <p>
              I ensure applications run smoothly through continuous monitoring,
              updates, and optimization. I believe in writing maintainable code
              and implementing robust testing to prevent issues and ensure
              long-term reliability.
            </p>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="skills">
        <div className="section-header">
          <h2>SKILLS</h2>
        </div>

        <div className="skills-category">
          <h3>USING NOW:</h3>
          <div className="skills-grid">
            {skills.map((skill, index) => (
              <div key={index} className="skill-item">
                <i className={skill.icon}></i>
                <p>{skill.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="experience">
        <div className="section-header">
          <h2>EXPERIENCE</h2>
        </div>

        <div className="experience-timeline">
          {experiences.map((exp, index) => (
            <div key={index} className="experience-item">
              <div className="experience-date">{exp.date}</div>
              <div className="experience-content">
                <h3>{exp.title}</h3>
                <h4>{exp.company}</h4>
                <p>{exp.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="portfolio">
        <div className="portfolio-header">
          <div className="section-header">
            <h2>PORTFOLIO</h2>
          </div>
        </div>
        <div className="portfolio-grid">
          {projects.map((project, index) => (
            <div key={index} className="portfolio-item">
              <img
                src={project.image}
                alt={project.title}
                loading="lazy"
                decoding="async"
              />
              <div className="portfolio-overlay">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="actions">
                  <span className="tech-tag">{project.tag}</span>
                  <a className="tech-tag" href={project.link} target="_blank">
                    Live Preview
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact">
        <div className="section-header">
          <h2>CONTACT</h2>
        </div>
        <div className="contact-content">
          <p>
            I would love to hear from you! Whether you have a project in mind,
            want to collaborate, or just want to say hello, feel free to reach
            out. I'll get back to you as soon as possible.
          </p>
          <form className="contact-form" onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Name" required />
            <input type="email" name="email" placeholder="Email" required />
            <textarea
              name="message"
              placeholder="Message"
              rows={6}
              required
            ></textarea>
            <button
              type="submit"
              className="submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? "SENDING..." : "SUBMIT"}
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <p
            className="footer-title"
            onClick={scrollToTop}
            style={{ cursor: "pointer" }}
          >
            BACK TO TOP
          </p>
          <div className="footer-social">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-icon"
            >
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-icon"
            >
              <i className="fab fa-github"></i>
            </a>
            <a href="mailto:your.email@example.com" className="footer-icon">
              <i className="fas fa-envelope"></i>
            </a>
          </div>
          <p className="copyright">
            © 2025 Samuel Emeka | Web Phoenix | All rights reserved.
          </p>
        </div>
      </footer>

      {/* Font Awesome */}
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
      />

      {/* Success Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-icon">
              <i className="fas fa-check-circle"></i>
            </div>
            <h2>Message Sent!</h2>
            <p>
              Thank you for reaching out! I will get back to you as soon as
              possible.
            </p>
            <button className="modal-btn" onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

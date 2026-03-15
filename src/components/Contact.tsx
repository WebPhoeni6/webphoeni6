import { useState } from "react";
import AnimatedContent from "./AnimatedContent";
import { personal } from "../data";
import "../styles/Contact.css";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("https://formspree.io/f/xrbrdeab", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setStatus("sent");
        setFormData({ name: "", email: "", message: "" });
      } else setStatus("error");
    } catch (_e) {
      setStatus("error");
    }
  };

  return (
    <section className="contact" id="contact">
      <div className="contact__orb contact__orb--1" />
      <div className="contact__orb contact__orb--2" />
      <div className="contact__inner">
        <AnimatedContent>
          <div className="contact__header">
            <h2 className="contact__heading">
              Get In <span className="contact__accent">Touch</span>
            </h2>
            <p className="contact__subtitle">
              Have a project in mind? Let's build something great together.
            </p>
          </div>
        </AnimatedContent>
        <div className="contact__layout">
          {/* Form */}
          <AnimatedContent direction="horizontal">
            <div className="contact__form-wrap">
              {status === "sent" ? (
                <div className="contact__success">
                  <span className="contact__success-icon">✓</span>
                  <h3>Message sent!</h3>
                  <p>I'll get back to you within 24 hours.</p>
                  <button
                    className="contact__reset"
                    onClick={() => setStatus("idle")}
                  >
                    Send another
                  </button>
                </div>
              ) : (
                <form className="contact__form" onSubmit={handleSubmit}>
                  <div className="contact__field">
                    <label className="contact__label">Name</label>
                    <input
                      className="contact__input"
                      name="name"
                      type="text"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="contact__field">
                    <label className="contact__label">Email</label>
                    <input
                      className="contact__input"
                      name="email"
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="contact__field">
                    <label className="contact__label">Message</label>
                    <textarea
                      className="contact__textarea"
                      name="message"
                      placeholder="Tell me about your project..."
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  {status === "error" && (
                    <p className="contact__error">
                      Something went wrong. Please try again.
                    </p>
                  )}
                  <button
                    className="contact__submit"
                    type="submit"
                    disabled={status === "sending"}
                  >
                    {status === "sending"
                      ? "Sending..."
                      : "Send Message \u2192"}
                  </button>
                </form>
              )}
            </div>
          </AnimatedContent>
          {/* Info cards */}
          <AnimatedContent direction="horizontal" reverse>
            <div className="contact__info">
              <a
                href={`mailto:${personal.email}`}
                className="contact__info-card"
              >
                <span className="contact__info-icon">&#9993;</span>
                <div>
                  <span className="contact__info-label">Email</span>
                  <span className="contact__info-value">{personal.email}</span>
                </div>
              </a>
              <a
                href={personal.linkedin}
                target="_blank"
                rel="noreferrer"
                className="contact__info-card"
              >
                <span className="contact__info-icon">in</span>
                <div>
                  <span className="contact__info-label">LinkedIn</span>
                  <span className="contact__info-value">Connect with me</span>
                </div>
              </a>
              <a
                href={personal.github}
                target="_blank"
                rel="noreferrer"
                className="contact__info-card"
              >
                <span className="contact__info-icon">&lt;/&gt;</span>
                <div>
                  <span className="contact__info-label">GitHub</span>
                  <span className="contact__info-value">See my code</span>
                </div>
              </a>
            </div>
          </AnimatedContent>
        </div>
      </div>
    </section>
  );
}

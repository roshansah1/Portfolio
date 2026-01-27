export default function About() {
    return (
        <section id="about" className="page-section">
            <div className="container">
                <h1 className="page-title">About Me</h1>
                <p className="page-description">
                    Passionate Front-End Developer
                </p>

                <div className="about-content-modern">
                    <div className="about-hero">
                        <div className="about-intro">
                            <div className="experience-badge">
                                <span className="badge-number">2.5+</span>
                                <span className="badge-label">Years Experience</span>
                            </div>
                            <h2>Hi, I'm Roshan Sah 👋</h2>
                            <p className="intro-text">
                                I'm a passionate front-end developer creating beautiful and functional 
                                web experiences. I specialize in modern web technologies and have a strong 
                                foundation in building scalable, user-friendly applications.
                            </p>
                            <p className="intro-text">
                                Currently working as a front-end developer, I'm actively seeking opportunities 
                                that offer professional growth, challenging projects, and the chance to work 
                                with cutting-edge technologies. I'm excited to contribute my skills to a dynamic 
                                team where I can continue to learn and make a meaningful impact.
                            </p>
                        </div>
                    </div>

                    <div className="skills-section">
                        <h3 className="section-title">
                            <span className="title-icon">⚡</span>
                            Technical Skills
                        </h3>
                        <div className="skills-grid">
                            <div className="skill-card">
                                <div className="skill-icon">🎨</div>
                                <h4>HTML & CSS</h4>
                                <p>Modern, responsive design</p>
                            </div>
                            <div className="skill-card">
                                <div className="skill-icon">⚙️</div>
                                <h4>JavaScript & TypeScript</h4>
                                <p>ES6+ & Type-safe code</p>
                            </div>
                            <div className="skill-card">
                                <div className="skill-icon">⚛️</div>
                                <h4>React & Next.js</h4>
                                <p>Component-based apps</p>
                            </div>
                            <div className="skill-card">
                                <div className="skill-icon">🔧</div>
                                <h4>Git & GitHub</h4>
                                <p>Version control & collaboration</p>
                            </div>
                            <div className="skill-card">
                                <div className="skill-icon">🧪</div>
                                <h4>Jest & Testing Library</h4>
                                <p>Quality assurance</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

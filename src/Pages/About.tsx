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

                    <div className="experience-section">
                        <h3 className="section-title">
                            <span className="title-icon">💼</span>
                            Work Experience
                        </h3>
                        <div className="experience-timeline">
                            <div className="experience-card">
                                <div className="experience-header">
                                    <div>
                                        <h4 className="company-name">
                                            <a href="https://www.radiansys.com/" target="_blank" rel="noopener noreferrer">
                                                Radiansys - AI, Cloud & Software Development Company
                                            </a>
                                        </h4>
                                        <p className="job-title">Front-End Developer</p>
                                    </div>
                                    <span className="duration">May 2023 - Feb 2026</span>
                                </div>
                                <div className="experience-description">
                                    <p className="exp-intro">
                                        Progressed from UI development to leading projects and handling complex frontend architecture, 
                                        demonstrating strong technical growth and leadership skills.
                                    </p>
                                    
                                    <div className="exp-phase">
                                        <h5 className="phase-title">Early Phase (2023)</h5>
                                        <ul className="exp-list">
                                            <li>Developed pixel-perfect UI components from Figma designs using React and JSX</li>
                                            <li>Implemented responsive layouts and custom styling to match design specifications</li>
                                            <li>Transitioned to full-stack frontend development with API integration</li>
                                            <li>Mastered modern tools including React Hook Form, Tailwind CSS, and Material UI</li>
                                        </ul>
                                    </div>

                                    <div className="exp-phase">
                                        <h5 className="phase-title">Project Lead & Advanced Development (2024)</h5>
                                        <ul className="exp-list">
                                            <li>Led a project team, gaining valuable leadership and project management experience</li>
                                            <li>Achieved 100% test coverage by writing comprehensive test cases using modern testing frameworks</li>
                                            <li>Built complex features including:
                                                <ul className="nested-list">
                                                    <li>Advanced permission integration system</li>
                                                    <li>Dynamic React Table implementations</li>
                                                    <li>Interactive ticket dashboard with drag-and-drop column functionality</li>
                                                </ul>
                                            </li>
                                            <li>Developed expertise in writing complex frontend logic and state management</li>
                                        </ul>
                                    </div>

                                    <div className="exp-phase">
                                        <h5 className="phase-title">Simpplr Contract Project (2025-2026)</h5>
                                        <ul className="exp-list">
                                            <li>Contributed to Simpplr's Content and Sites team on a contract basis</li>
                                            <li>Resolved 200+ bugs with contributions tracked on GitHub</li>
                                            <li>Developed and implemented auto-save feature for content management</li>
                                            <li>Enhanced application stability and user experience through systematic bug fixes</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="education-section">
                        <h3 className="section-title">
                            <span className="title-icon">🎓</span>
                            Education
                        </h3>
                        <div className="education-timeline">
                            <div className="education-card">
                                <div className="education-header">
                                    <div>
                                        <h4 className="institution-name">
                                            <a href="https://www.dituniversity.edu.in/" target="_blank" rel="noopener noreferrer">
                                                DIT University, Dehradun, Uttarakhand
                                            </a>
                                        </h4>
                                        <p className="degree">Bachelor of Technology (B.Tech) in Computer Science & Engineering</p>
                                    </div>
                                    <span className="duration">2019 - 2022</span>
                                </div>
                            </div>
                            <div className="education-card">
                                <div className="education-header">
                                    <div>
                                        <h4 className="institution-name">
                                            <a href="https://www.geekster.in/" target="_blank" rel="noopener noreferrer">
                                                Geekster - Online Tech Education Platform
                                            </a>
                                        </h4>
                                        <p className="degree">Full Stack Web Development Program (MERN Stack) - Online</p>
                                    </div>
                                    <span className="duration">2022 - 2023</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

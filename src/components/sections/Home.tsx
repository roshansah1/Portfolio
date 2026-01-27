import { Link } from 'react-router-dom';
import { useBalloon } from '../../contexts/BalloonContext';

export default function Home() {
    const { isHovered, setIsHovered } = useBalloon();

    return (
        <section id="home" className="hero-section">
            <div className="hero-content">
                <h1 className="hero-title">
                    Hey, I'm{' '}
                    <span
                        className={`outlined-text ${isHovered ? 'hovered' : ''}`}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        Roshan Sah
                        <svg className="name-underline" viewBox="0 0 740 70" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M 10 35 Q 90 18, 165 38 Q 245 52, 325 32 Q 405 15, 485 40 Q 565 56, 645 34 Q 690 24, 730 38"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                fill="none"
                                strokeLinecap="round"
                            />
                        </svg>
                    </span>
                </h1>

                <p className="hero-description">
                    I'm a front-end developer
                </p>
                <div className="hero-links">
                    <Link to="/work" className="hero-link">→ see my projects</Link>
                    <Link to="/about" className="hero-link">→ more about me</Link>
                </div>
            </div>
        </section>
    );
}

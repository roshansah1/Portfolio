import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ThemeToggle } from '../ThemeToggle';

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        if (menuOpen) {
            document.body.classList.add('menu-open');
        } else {
            document.body.classList.remove('menu-open');
        }
    }, [menuOpen]);

    return (
        <>
            <header className="site-header">
                <div className="header-content">
                    <Link to="/" className="logo">
                        <span className="logo-wrapper">
                            <span className="logo-letter">R</span>
                            <span className="logo-letter">S</span>
                            <svg className="logo-underline-svg" viewBox="0 0 60 8" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M 2 4 Q 15 2, 30 4 T 58 4"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    fill="none"
                                    strokeLinecap="round"
                                />
                            </svg>
                        </span>
                    </Link>

                    <nav className={`main-nav ${menuOpen ? 'active' : ''}`}>
                        <NavLink to="/" onClick={() => setMenuOpen(false)} end>Home</NavLink>
                        <NavLink to="/work" onClick={() => setMenuOpen(false)}>Work</NavLink>
                        <NavLink to="/about" onClick={() => setMenuOpen(false)}>About</NavLink>
                        <NavLink to="/contact" onClick={() => setMenuOpen(false)}>Contact</NavLink>
                    </nav>

                    <div className="header-actions">
                        <ThemeToggle />
                        <button
                            className={`hamburger-menu ${menuOpen ? 'active' : ''}`}
                            onClick={() => setMenuOpen(!menuOpen)}
                            aria-label="Toggle menu"
                        >
                            <span className="hamburger-line"></span>
                            <span className="hamburger-line"></span>
                            <span className="hamburger-line"></span>
                        </button>
                    </div>
                </div>
            </header>

        </>
    );
}

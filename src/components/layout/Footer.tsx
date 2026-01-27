export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="site-footer">
            <div className="footer-content">
                <div className="social-links">
                    <a href="https://github.com/roshansah1" target="_blank" rel="noopener noreferrer">
                        ↗ GitHub
                    </a>
                    <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer">
                        ↗ LinkedIn
                    </a>
                    <a href="https://twitter.com/yourprofile" target="_blank" rel="noopener noreferrer">
                        ↗ Twitter
                    </a>
                </div>
                <p className="copyright">
                    Designed and coded by Roshan Sah © {currentYear}
                </p>
            </div>
        </footer>
    );
}

import '../styles/Nav.css';

const Nav = () => { 
    return (
        <nav>
            <div><a id="lilurl" href="/">lilurl</a></div>
            <button className="mobile-nav-toggle" aria-label="Toggle navigation">
                <span className="open">☰</span>
                <span className="close" style={{ display: 'none' }}>✕</span>
            </button>
            <div className="nav-links">
                <ul>
                    <li><a href="">Product</a></li>
                    <li><a href="">API</a></li>
                    <li><a href="">Analytics</a></li>
                    <li><a id="getStarted" href="">Get Started</a></li>
                    <li><a href="">Sign Up Free</a></li>
                </ul>
            </div>
        </nav>
    );
}

export default Nav;

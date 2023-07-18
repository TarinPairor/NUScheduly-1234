import { useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

function Navbar() {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
            NUSCHEDULY
            <i className="fab fa-accusoft" />
          </Link>
          <div className="menu-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"} />
          </div>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/flashcards"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Flashcards
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/flashcardlist"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Flashcards List
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/collab"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Collaborate
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/inbox" className="nav-links" onClick={closeMobileMenu}>
                Inbox
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/members"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Members
              </Link>
            </li>
            {/* Example usage: Display user's name */}
            <li className="nav-item">
              {/*<span className="nav-links">Welcome, {user.displayName}</span>*/}
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;

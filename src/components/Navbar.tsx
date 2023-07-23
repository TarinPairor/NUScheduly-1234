import { useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

function Navbar() {
  // State variable to manage the state of the mobile menu (collapsed or expanded)
  const [click, setClick] = useState(false);

  // Function to handle the click event of the menu icon, toggles the mobile menu
  const handleClick = () => setClick(!click);

  // Function to close the mobile menu when a menu item is clicked
  const closeMobileMenu = () => setClick(false);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          {/* Logo and link to the home page */}
          <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
            NUSCHEDULY
            <i className="fab fa-accusoft" />
          </Link>

          {/* Mobile menu icon */}
          <div className="menu-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"} />
          </div>

          {/* Navigation menu */}
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            {/* Menu items with links to different pages */}
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
                to="/calendar"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Calendar
              </Link>
            </li>
            <li className="nav-item"></li>
            {/* Example usage: Display user's name */}
            <li className="nav-item">
              {/* Uncomment the following line to display the user's name */}
              {/*<span className="nav-links">Welcome, {user.displayName}</span>*/}
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;

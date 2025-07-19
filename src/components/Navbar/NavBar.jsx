import "./NavBar.css";
import React, { useEffect, useRef, useState, useCallback } from "react";
import logo from "../../assets/logo.png";
import search_icon from "../../assets/search_icon.svg";
import bell_icon from "../../assets/bell_icon.svg";
import profile_img from "../../assets/profile_img.png";
import caret_icon from "../../assets/caret_icon.svg";
import { logout } from "../../firebase";

const NavBar = () => {
  const navRef = useRef();
  const searchInputRef = useRef();
  const dropdownRef = useRef();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeNavItem, setActiveNavItem] = useState("Home");
  const [notificationCount, setNotificationCount] = useState(3);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "TV Shows", path: "/tv-shows" },
    { name: "Movies", path: "/movies" },
    { name: "Originals", path: "/originals" },
    { name: "My List", path: "/my-list" },
  ];

  const dropdownItems = [
    { text: "Manage Profiles", action: () => console.log("Manage Profiles") },
    { text: "Account", action: () => console.log("Account") },
    { text: "Help Center", action: () => console.log("Help Center") },
    { text: "Sign Out of Netflix", action: handleLogout },
  ];

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (!navRef.current) return;

      if (window.scrollY >= 80) {
        navRef.current.classList.add("nav-dark");
      } else {
        navRef.current.classList.remove("nav-dark");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }

      if (
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target) &&
        !event.target.closest(".search-container")
      ) {
        setIsSearchOpen(false);
        setSearchQuery("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsDropdownOpen(false);
        setIsMobileMenuOpen(false);
        setIsSearchOpen(false);
        setSearchQuery("");
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  const handleNavItemClick = useCallback((item) => {
    setActiveNavItem(item.name);
    setIsMobileMenuOpen(false);
    // In a real app, you would handle routing here
    console.log(`Navigating to ${item.name} - ${item.path}`);
  }, []);

  const handleSearchToggle = useCallback(() => {
    setIsSearchOpen((prev) => {
      const newState = !prev;
      if (newState && searchInputRef.current) {
        // Focus the input after a brief delay to ensure it's visible
        setTimeout(() => searchInputRef.current.focus(), 100);
      }
      return newState;
    });
  }, []);

  const handleSearchChange = useCallback((e) => {
    setSearchQuery(e.target.value);
    // In a real app, you might want to debounce this and call a search API
    if (e.target.value.length > 2) {
      console.log(`Searching for: ${e.target.value}`);
    }
  }, []);

  const handleSearchSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (searchQuery.trim()) {
        console.log(`Search submitted: ${searchQuery}`);
        // Handle search submission here
        setIsSearchOpen(false);
        setSearchQuery("");
      }
    },
    [searchQuery]
  );

  function handleLogout() {
    try {
      logout();
      setIsDropdownOpen(false);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }

  const handleProfileClick = useCallback((e) => {
    e.stopPropagation();
    setIsDropdownOpen((prev) => !prev);
  }, []);

  const handleDropdownItemClick = useCallback((item) => {
    item.action();
    setIsDropdownOpen(false);
  }, []);

  const handleNotificationClick = useCallback(() => {
    console.log("Notifications clicked");
    // In a real app, this would open a notifications panel
    setNotificationCount(0); // Clear notifications
  }, []);

  const handleChildrenClick = useCallback(() => {
    console.log("Children profile clicked");
    // In a real app, this would switch to children profile
  }, []);

  return (
    <nav
      ref={navRef}
      className="navbar"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="nav-left">
        <img
          src={logo}
          alt="Netflix Logo"
          className="nav-logo"
          onClick={() => handleNavItemClick({ name: "Home", path: "/" })}
        />

        <ul className={`nav-menu ${isMobileMenuOpen ? "mobile-open" : ""}`}>
          {navItems.map((item, index) => (
            <li key={index}>
              <button
                className={`nav-menu-item ${
                  activeNavItem === item.name ? "active" : ""
                }`}
                onClick={() => handleNavItemClick(item)}
                aria-label={`Go to ${item.name}`}
                type="button"
              >
                {item.name}
              </button>
            </li>
          ))}
        </ul>

        <button
          className={`mobile-menu-toggle ${isMobileMenuOpen ? "open" : ""}`}
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          aria-label="Toggle mobile menu"
          aria-expanded={isMobileMenuOpen}
          type="button"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      <div className="nav-right">
        <div className="search-container">
          <button
            onClick={handleSearchToggle}
            aria-label="Toggle search"
            type="button"
            className="nav-icons"
          >
            <img src={search_icon} alt="Search" className="nav-icon" />
          </button>
          <form onSubmit={handleSearchSubmit}>
            <input
              ref={searchInputRef}
              type="text"
              className={`search-input ${isSearchOpen ? "active" : ""}`}
              placeholder="Search movies, TV shows..."
              value={searchQuery}
              onChange={handleSearchChange}
              aria-label="Search content"
            />
          </form>
        </div>

        <button
          className="children-label"
          onClick={handleChildrenClick}
          aria-label="Switch to children profile"
          type="button"
        >
          Children
        </button>

        <div className="notification-wrapper">
          <button
            className="nav-icons"
            onClick={handleNotificationClick}
            aria-label={`Notifications ${
              notificationCount > 0 ? `(${notificationCount} new)` : ""
            }`}
            type="button"
          >
            <img src={bell_icon} alt="Notifications" className="nav-icon" />
          </button>
          {notificationCount > 0 && (
            <span className="notification-badge" aria-hidden="true">
              {notificationCount > 9 ? "9+" : notificationCount}
            </span>
          )}
        </div>

        <div className="nav-profile" ref={dropdownRef}>
          <img
            src={profile_img}
            alt="Profile"
            className="profile-img"
            onClick={handleProfileClick}
          />
          <button
            onClick={handleProfileClick}
            aria-label="Profile menu"
            aria-expanded={isDropdownOpen}
            type="button"
            style={{ background: "none", border: "none", padding: 0 }}
          >
            <img
              src={caret_icon}
              alt=""
              className={`caret-icon ${isDropdownOpen ? "open" : ""}`}
              aria-hidden="true"
            />
          </button>

          <div className={`dropdown ${isDropdownOpen ? "open" : ""}`}>
            {dropdownItems.map((item, index) => (
              <button
                key={index}
                className="dropdown-item"
                onClick={() => handleDropdownItemClick(item)}
                type="button"
              >
                {item.text}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

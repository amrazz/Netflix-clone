import "./Footer.css";
import React, { useState } from "react";
import youtube_icon from "../../assets/youtube_icon.png";
import facebook_icon from "../../assets/facebook_icon.png";
import instagram_icon from "../../assets/instagram_icon.png";
import twitter_icon from "../../assets/twitter_icon.png";

function Footer() {
  const [serviceCode] = useState("Service Code");

  const socialLinks = [
    {
      icon: facebook_icon,
      name: "Facebook",
      url: "https://facebook.com/netflix",
      ariaLabel: "Visit Netflix on Facebook",
    },
    {
      icon: instagram_icon,
      name: "Instagram",
      url: "https://instagram.com/netflix",
      ariaLabel: "Visit Netflix on Instagram",
    },
    {
      icon: twitter_icon,
      name: "Twitter",
      url: "https://twitter.com/netflix",
      ariaLabel: "Visit Netflix on Twitter",
    },
    {
      icon: youtube_icon,
      name: "YouTube",
      url: "https://youtube.com/netflix",
      ariaLabel: "Visit Netflix on YouTube",
    },
  ];

  const footerLinks = [
    { text: "Audio Description", category: "accessibility" },
    { text: "Help Centre", category: "support" },
    { text: "Gift Cards", category: "services" },
    { text: "Media Centre", category: "corporate" },
    { text: "Investor Relations", category: "corporate" },
    { text: "Jobs", category: "corporate" },
    { text: "Terms of Use", category: "legal" },
    { text: "Privacy", category: "legal" },
    { text: "Legal Notices", category: "legal" },
    { text: "Cookie Preferences", category: "legal" },
    { text: "Corporate Information", category: "corporate" },
    { text: "Contact Us", category: "support" },
  ];

  const handleSocialClick = (url, platform) => {
    // In a real app, you might want to track analytics here
    console.log(`Navigating to ${platform}`);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleLinkClick = (linkText, category) => {
    // In a real app, this would navigate to the appropriate page
    console.log(`Clicked ${linkText} in ${category} category`);
    // You could implement navigation logic here based on your routing setup
  };

  const handleServiceCodeClick = () => {
    // In a real Netflix app, this would open a service code dialog
    console.log("Service code clicked");
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer" role="contentinfo" aria-label="Site footer">
      <div className="footer-content">
        {/* Social Media Links */}
        <div
          className="footer-social"
          role="navigation"
          aria-label="Social media links"
        >
          {socialLinks.map((social, index) => (
            <button
              key={index}
              className="social-icon"
              onClick={() => handleSocialClick(social.url, social.name)}
              aria-label={social.ariaLabel}
              type="button"
            >
              <img
                src={social.icon}
                alt={`${social.name} icon`}
                loading="lazy"
              />
            </button>
          ))}
        </div>

        {/* Footer Links */}
        <nav aria-label="Footer navigation">
          <ul className="footer-links">
            {footerLinks.map((link, index) => (
              <li key={index}>
                <button
                  className="footer-link"
                  onClick={() => handleLinkClick(link.text, link.category)}
                  type="button"
                  aria-label={`Go to ${link.text}`}
                >
                  {link.text}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="footer-divider" aria-hidden="true"></div>

        {/* Footer Bottom */}

        <p className="copyright-text">© 1997-{currentYear} Netflix, Inc.</p>
      </div>
    </footer>
  );
}

export default Footer;

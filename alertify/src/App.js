import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import HelpButton from "./components/HelpButton";
import EmergencyContacts from "./components/EmergencyContacts";
import TrustedContacts from "./components/TrustedContacts";
import ViewContacts from "./components/ViewContacts";
import YourNumberModal from "./components/YourNumberModal";
import LoginPage from "./components/LoginPage";
import SignUp from "./components/SignUp";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [homeOpen, setHomeOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [showTrustedContacts, setShowTrustedContacts] = useState(false);
  const [viewContactsOpen, setViewContactsOpen] = useState(false);
  const [showYourNumber, setShowYourNumber] = useState(false);
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);

  const dropdownRef = useRef(null);
  const trustedRef = useRef(null);
  const viewRef = useRef(null);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) setIsLoggedIn(true);
  }, []);

  const handleLogin = () => {
    localStorage.setItem("loggedInUser", "true");
    setIsLoggedIn(true);
  };

  const handleSignUp = () => {
    setShowSignUp(false);
    alert("Account created successfully! Please log in.");
  };

const handleLogout = () => {
  const confirmLogout = window.confirm("Are you sure you want to logout?");
  if (!confirmLogout) return; // Cancel logout

  localStorage.clear();
  setIsLoggedIn(false);
  setShowSignUp(false);
};


  const toggleHomeDropdown = () => {
    setHomeOpen(!homeOpen);
    setAboutOpen(false);
  };

  const toggleAboutDropdown = () => {
    setAboutOpen(!aboutOpen);
    setHomeOpen(false);
  };

  const handleShowTrustedContacts = () => {
    setShowTrustedContacts(true);
    setHomeOpen(false);
  };

  const handleViewContacts = () => {
    setViewContactsOpen(true);
    setHomeOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        (!trustedRef.current || !trustedRef.current.contains(event.target)) &&
        (!viewRef.current || !viewRef.current.contains(event.target))
      ) {
        setHomeOpen(false);
        setAboutOpen(false);
        setShowTrustedContacts(false);
        setViewContactsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!isLoggedIn) {
    return showSignUp ? (
      <SignUp
        onSignUp={handleSignUp}
        onSwitchToLogin={() => setShowSignUp(false)}
      />
    ) : (
      <LoginPage
        onLogin={handleLogin}
        onSwitchToSignUp={() => setShowSignUp(true)}
      />
    );
  }

  return (
    <div>
      <header>
        <h2>Alertify 🚨</h2>

        <nav className="nav-links">
          {/* contacts */}
          <div className="dropdown" ref={dropdownRef}>
            <button className="dropbtn" onClick={toggleHomeDropdown}>
              Contacts
            </button>
            <div className={`dropdown-content ${homeOpen ? "show" : ""}`}>
              <a href="#add" onClick={handleShowTrustedContacts}>
                Add Trusted Contacts
              </a>
              <a href="#view" onClick={handleViewContacts}>
                View Saved Contacts
              </a>
              <a href="#number" onClick={() => setShowYourNumber(true)}>
                Your Number
              </a>
            </div>
          </div>

          {/* ABOUT */}
          <div className="dropdown">
            <button className="dropbtn" onClick={toggleAboutDropdown}>
              About
            </button>
            <div className={`dropdown-content ${aboutOpen ? "show" : ""}`}>
              <p style={{ margin: "10px", color: "#00ffff" }}>
                Alertify is a smart safety app that instantly shares your live
                location with trusted contacts via WhatsApp.
              </p>
            </div>
          </div>

          {/* LOGOUT BUTTON */}
          <button className="logout-header-btn" onClick={handleLogout}>
            Logout
          </button>
        </nav>
      </header>

      <div className="App">
        <h1 className="typewriter">Welcome to Alertify</h1>
        <p>Smart Safety Web App</p>

        <HelpButton />
        <EmergencyContacts />

        {showTrustedContacts && (
          <div ref={trustedRef}>
            <TrustedContacts onClose={() => setShowTrustedContacts(false)} />
          </div>
        )}

        {viewContactsOpen && (
          <div ref={viewRef}>
            <ViewContacts onClose={() => setViewContactsOpen(false)} />
          </div>
        )}

        {showYourNumber && (
          <YourNumberModal onClose={() => setShowYourNumber(false)} />
        )}

        {showPrivacyPolicy && (
          <div className="modal-overlay">
            <div className="modal">
              <h2>Privacy Policy</h2>
              <p>
                Alertify stores data locally in your browser and never shares
                it.
              </p>
              <button
                className="close-btn"
                onClick={() => setShowPrivacyPolicy(false)}
              >
                Close
              </button>
            </div>
          </div>
        )}

        <footer>
          © 2025 Alertify •{" "}
          <span onClick={() => setShowPrivacyPolicy(true)}>
            Privacy Policy
          </span>
        </footer>
      </div>
    </div>
  );
}

export default App;

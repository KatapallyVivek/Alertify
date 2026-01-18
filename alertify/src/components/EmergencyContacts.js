import React from "react";
import "./EmergencyContacts.css";

function EmergencyContacts() {
  const contacts = [
    { name: "Police", number: "100", icon: "🚓" },
    { name: "Ambulance", number: "108", icon: "🚑" },
    { name: "Fire", number: "101", icon: "🔥" },
  ];

  return (
    <section className="emergency-section">
      <h2>Emergency Contacts</h2>

      <div className="emergency-grid">
        {contacts.map((c, index) => (
          <div key={index} className="emergency-card">
            <div className="icon">{c.icon}</div>
            <h3>{c.name}</h3>
            <p>{c.number}</p>
            <a href={`tel:${c.number}`} className="call-btn">
              Call Now
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}

export default EmergencyContacts;

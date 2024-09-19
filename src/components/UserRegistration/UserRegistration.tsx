import React, { FormEvent, useState } from "react";
import "./UserRegistration.css";
import md5 from "md5";
import { getFromLocalStorage, addToLocalStorage } from "../../lib/localStorage";
import { GameData } from "../../type/users"; // Import your GameData type

// Generate a short, unique hash from the name and email (if provided)
function generateUUID(name: string, email: string | undefined) {
  const hash = md5(name.toLowerCase() + (email?.toLowerCase() || ""));
  return hash.substring(0, 10);
}

const config = getFromLocalStorage("admin");

const UserRegistration: React.FC<{
  onRegistrationComplete: (userData: GameData) => void;
}> = ({ onRegistrationComplete }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState(""); // Added state for email

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!name) return;

    // Create the user object
    const userData: GameData = {
      name,
      email: email || "", // Use email if provided, otherwise empty string
      score: 0, // Initial score is 0
    };

    // Store the user data in local storage using a unique ID
    addToLocalStorage("user", {
      [generateUUID(name, email)]: userData,
    });

    // Pass the userData object back to the parent component (Game.tsx)
    onRegistrationComplete(userData);
  };

return (
  <div className="user-registration-formContainer">
    <form className="user-registration-signupForm" onSubmit={handleSubmit}>
      <label
        htmlFor="name"
        className="user-registration-label user-registration-nameLabel"
      >
        Spiller Navn
      </label>
      <input
        type="text"
        id="name"
        className="user-registration-input user-registration-name"
        name="name"
        minLength={3}
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      {config && config.getEmail == true && (
        <>
          <label
            htmlFor="email"
            className="user-registration-label user-registration-emailLabel"
          >
            Email
          </label>
          <input
            type="text"
            id="email"
            className="user-registration-input user-registration-email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </>
      )}

      <button
        type="submit"
        className="user-registration-button user-registration-startButton"
      >
        START
      </button>
    </form>
  </div>
);

};

export default UserRegistration;

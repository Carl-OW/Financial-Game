import React, { FormEvent, useState } from "react";
import "./UserRegistration.css";
import { getFromLocalStorage, addToLocalStorage } from "../../lib/localStorage";
import { GameData } from "../../type/users"; // Import your GameData type

// Generate a short, unique ID using current time and random string
function generateUUID() {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

const config = getFromLocalStorage("admin");

const UserRegistration: React.FC<{
  onRegistrationComplete: (userData: GameData, userId: string) => void;
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

    // Generate the unique ID for this user
    const userId = generateUUID();

    // Store the user data in local storage using the unique ID
    addToLocalStorage("user", {
      [userId]: userData,
    });

    // Pass the userData object and userId back to the parent component (Game.tsx)
    onRegistrationComplete(userData, userId); // Now passing both userData and userId
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

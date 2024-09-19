import React, { FormEvent, useState } from "react";
import "./UserRegistration.css";
import md5 from "md5";
import { addToLocalStorage } from "../../lib/localStorage";
import { GameData } from "../../type/users"; // Import your GameData type

// Generate a short, unique hash from the name
function generateUUID(name: string) {
  const hash = md5(name.toLowerCase());
  return hash.substring(0, 10);
}

const UserRegistration: React.FC<{ onRegistrationComplete: () => void }> = ({
  onRegistrationComplete,
}) => {
  const [name, setName] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!name) return;

    // Create the user object
    const userData: GameData = {
      name,
      email: "", // Email is not required
      score: 0, // Initial score is 0
    };

    // Store the user data in local storage using a unique ID
    addToLocalStorage("user", {
      [generateUUID(name)]: userData,
    });

    // Trigger game start after registration is complete
    onRegistrationComplete();
  };

  return (
    <div className="formContainer">
      <form id="signupForm" onSubmit={handleSubmit}>
        <label htmlFor="name" className="nameLabel">
          Skriv Navn
        </label>
        <input
          type="text"
          id="name"
          name="name"
          minLength={3}
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <button type="submit">START</button>
      </form>
    </div>
  );
};

export default UserRegistration;

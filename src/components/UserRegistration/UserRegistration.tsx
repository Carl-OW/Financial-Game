import React, { FormEvent } from 'react';
import './UserRegistration.css';
import md5 from 'md5';
import { addToLocalStorage, getFromLocalStorage } from '../../lib/localStorage';

// Generate a short, unique hash from combination of email and name
function generateUUID(name: string, email: string | undefined) {
  const hash = md5(name + email);
  return hash.substring(0, 8);
}

const config = getFromLocalStorage('admin');

function handleSubmit(event: FormEvent<HTMLFormElement>) {
  event.preventDefault();

  const formData: EventTarget = event.target;

  addToLocalStorage('quiz', {
    [generateUUID(
      formData.elements.name.value,
      formData.elements.email?.value
    )]: {
      name: formData.elements.name.value,
      email: formData.elements.email?.value,
      score: formData.elements.score.value,
    },
  });
}

const UserRegistration: React.FC = () => {
  return (
    <div className="formContainer">
      <form id="signupForm" onSubmit={handleSubmit}>
        <label htmlFor="name" className="nameLabel">
          Hva heter du?
        </label>
        <input type="text" id="name" name="name" minLength={3}></input>
        {config && config.getEmail == true && (
          <>
            <label htmlFor="email" className="emailLabel">
              Kan vi få mailen din?
            </label>
            <input type="text" id="email" name="email"></input>
          </>
        )}

        <label htmlFor="score" className="scoreLabel">
          Hvor mange poeng fikk du i dag?
        </label>
        <input type="number" id="score" name="score"></input>
        <button>START</button>
      </form>
    </div>
  );
};

export default UserRegistration;

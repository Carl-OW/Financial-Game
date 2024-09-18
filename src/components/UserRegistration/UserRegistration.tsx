import React, { FormEvent } from 'react';
import './UserRegistration.css';
import { addToLocalStorage } from '../../lib/localStorage';

function handleSubmit(event: FormEvent<HTMLFormElement>) {
  event.preventDefault();

  const formData: EventTarget = event.target;

  addToLocalStorage('quiz', {
    [formData.elements.email.value]: {
      name: formData.elements.name.value,
      email: formData.elements.email.value,
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
        <input type="text" id="name" name="name"></input>
        <label htmlFor="email" className="emailLabel">
          Kan vi få mailen din?
        </label>
        <input type="text" id="email" name="email"></input>
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

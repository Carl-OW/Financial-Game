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
      score: 9000,
    },
  });
}

const UserRegistration: React.FC = () => {
  return (
    <div className="formContainer">
      <form id="signupForm" onSubmit={handleSubmit}>
        <input type="text" id="name" name="name"></input>
        <input type="email" id="email" name="email"></input>
        <input type="number" id="score" name="score"></input>
        <button>HELO</button>
      </form>
    </div>
  );
};

export default UserRegistration;

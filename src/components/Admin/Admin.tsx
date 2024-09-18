import React, { FormEvent } from 'react';
import './Admin.css';
import {
  addToLocalStorage,
  clearAllLocalStorage,
  getFromLocalStorage,
} from '../../lib/localStorage';
import { Config } from '../../type/config';

const config = getFromLocalStorage('admin');

function saveOptions(event: FormEvent<HTMLFormElement>) {
  event.preventDefault();
  const formData: EventTarget = event.target;

  const newConfig: Config = {
    getEmail: formData.elements?.getEmail?.value === 'true' ? true : false,
  };

  console.log(newConfig);

  addToLocalStorage('admin', newConfig);
}

function resetGame() {
  clearAllLocalStorage();
}

const Admin: React.FC = () => {
  return (
    <div className="adminWrapper">
      <h2>Innstillinger</h2>
      {JSON.stringify(config, null, 2)}
      <form onSubmit={saveOptions}>
        <label htmlFor="getEmail">Samle Inn Epost</label>
        <input type="checkbox" id="getEmail" name="getEmail" value={'true'} />
        <button>Lagre</button>
      </form>
      <h2>Verktøy</h2>
      <p>
        <button onClick={resetGame}>Fjern Alle Innsamlede Data!</button>
      </p>
    </div>
  );
};

export default Admin;

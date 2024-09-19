import React, { useState, useEffect } from 'react';
import { saveAs } from 'file-saver';
import './Admin.css';
import {
  addToLocalStorage,
  clearAllLocalStorage,
  getFromLocalStorage,
} from '../../lib/localStorage';
import { Config } from '../../type/config';

const config: Config = getFromLocalStorage('admin') as Config;
const leaderboard = getFromLocalStorage('quiz');

function saveOptions(config: Config) {
  console.log(config);

  addToLocalStorage('admin', config);
}

function resetGame() {
  clearAllLocalStorage();
}

const Admin: React.FC = () => {
  const [options, setOptions] = useState(config || {});

  return (
    <div className="adminWrapper">
      <h2>Innstillinger</h2>
      {JSON.stringify(options, null, 2)}

      <p>
        <label htmlFor="getEmail">Samle Inn Epost</label>
        <input
          type="checkbox"
          id="getEmail"
          name="getEmail"
          checked={options.getEmail}
          value={options.getEmail ? 'true' : 'false'}
          onChange={() =>
            setOptions({ ...options, getEmail: !options.getEmail })
          }
        />
        <p>
          <button onClick={() => saveOptions(options)}>Lagre</button>
        </p>
      </p>
      <h2>Verktøy</h2>
      <p>
        <button onClick={resetGame}>Fjern Alle Innsamlede Data!</button>
      </p>
      <p>
        <button
          onClick={() => {
            const blob = new Blob([JSON.stringify(leaderboard, null, 2)], {
              type: 'text/plain;charset=utf-8',
            });
            saveAs(blob, 'Resultater.json');
          }}
        >
          LASTE NEEEED
        </button>
      </p>
    </div>
  );
};

export default Admin;

import React from 'react';
import './Leaderboard.css';
import { getFromLocalStorage } from '../../lib/localStorage';

const Leaderboard: React.FC = () => {
  const users = Object.entries(getFromLocalStorage('quiz'));

  return (
    <div>
      <table className="scoreTable">
        <thead className="scoreTableHeader">
          <tr>
            <th className="nameHeader">Navn</th>
            <th className="emailHeader">Mail</th>
            <th className="scoreHeader">Poeng</th>
          </tr>
        </thead>
        <tbody>
          {users
            .sort((a, b) => Number(b[1].score) - Number(a[1].score))
            .map((user) => {
              return (
                <tr className="userLine" key={user[0]}>
                  <td className="userName">{user[1].name} </td>
                  <td className="userEmail">{user[1].email}</td>
                  <td className="userScore">{user[1].score}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;

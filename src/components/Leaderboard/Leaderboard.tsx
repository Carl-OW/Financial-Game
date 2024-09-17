import React from 'react';
import { getFromLocalStorage } from '../../lib/localStorage';

const Leaderboard: React.FC = () => {
  const users = Object.entries(getFromLocalStorage('quiz'));
  console.log(users);

  return (
    <div>
      <ol>
        {users.map((user) => {
          return (
            <li>
              Name: {user[1].name} - Score: {user[1].score}
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export default Leaderboard;

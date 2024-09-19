import React from "react";
import "./Leaderboard.css";
import { getFromLocalStorage } from "../../lib/localStorage";

const Leaderboard: React.FC = () => {
  // Fetch user data from the correct key in localStorage ('user' instead of 'quiz')
  const users = Object.entries(getFromLocalStorage("user"));

  return (
    <div>
      <h2 className="leaderboardTitle">Leaderboard</h2>
      <table className="scoreTable">
        <thead className="scoreTableHeader">
          <tr>
            <th className="nameHeader">Navn</th>
            <th className="scoreHeader">Poeng</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users
              .sort((a, b) => Number(b[1].score) - Number(a[1].score)) // Sort users by score
              .map((user) => (
                <tr className="userLine" key={user[0]}>
                  <td className="userName">{user[1].name}</td>
                  <td className="userScore">{user[1].score}</td>
                </tr>
              ))
          ) : (
            <tr>
              <td colSpan={2} style={{ textAlign: "center" }}>
                No users found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;

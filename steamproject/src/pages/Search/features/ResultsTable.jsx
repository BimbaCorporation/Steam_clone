import React from 'react';
import { Link } from 'react-router-dom';

const ResultsTable = React.memo(({ results }) => {
  return (
    <table
      border="1"
      style={{
        width: '100%',
        marginTop: '20px',
        borderCollapse: 'collapse',
      }}
    >
      <thead>
        <tr>
          <th>Назва</th>
          <th>Ціна ($)</th>
          <th>Знижка (%)</th>
          <th>Зображення</th>
          <th>Посилання</th>
        </tr>
      </thead>
      <tbody>
        {results.map((game) => (
          <tr key={game.dealID}>
            <td>{game.title}</td>
            <td>{game.normalPrice} $</td>
            <td>{Math.round(game.savings)} %</td>
            <td>
              <img
                src={game.thumb}
                alt={game.title}
                style={{ maxWidth: '100px' }}
              />
            </td>
            <td>
              {game.steamAppID ? (
                <Link
                  to={`https://store.steampowered.com/app/${game.steamAppID}`}
                  target="_blank"
                  className="link-button"
                >
                  Відкрити гру
                </Link>
              ) : (
                <Link
                  to={`https://www.metacritic.com${game.metacriticLink}`}
                  target="_blank"
                  className="link-button"
                >
                  Відкрити гру
                </Link>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
});

export default ResultsTable;

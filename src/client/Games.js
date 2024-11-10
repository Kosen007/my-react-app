import React, { useState } from 'react';
import games from "../json/Games.json";
import "../css/styles.css";

const Games = () => {
  const defaultGame = games.find((game) => game.id === 1);
  const [selectedGame, setSelectedGame] = useState(defaultGame);
  
  const handleGameClick = (game) => {
    setSelectedGame(game);
  };
  
  return (
    <>
      <div className="flex-space-between game-links">
        {games.map((game) => (
          <a key={game.id} onClick={() => handleGameClick(game)} className="game-link">
            <img src={game.picture} alt={game.name} />
          </a>
        ))}
      </div>

      {selectedGame && ( // 只在有选中游戏时渲染下方的 div
          <div className="game-detail">
            <div className="game-image">
              <img src={selectedGame.picture} alt={selectedGame.name} />
            </div>
            <div className="game-info">
              <h2 className="game-name">{selectedGame.name}</h2>
              <p className="game-details">Detail: {selectedGame.detail}</p>
              <p className="game-details">Sales Volume: {selectedGame.salesVolume}</p>
              <p className="game-details">Score: {selectedGame.score}</p>
            </div>
          </div>
      )}
    </>
  );
};

export default Games;
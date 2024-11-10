import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
// import gamesData from '../json/Games.json';
import "../css/styles.css";
import axios from "axios";

const GameInquiry = () => {
  
  const [games, setGames] = useState([]);
  
  useEffect(() => {
    // 从后端获取游戏数据
    axios.get("http://localhost:8080/games/get/allgames")
      .then((response) => {
        if (response.data.status === "SUCCESS") {
          setGames(response.data.response);
        } else {
          console.error("Failed to fetch games data:", response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching games data:", error);
      });
  }, []);
  
    return (
    <>
      <div>
        <h1>GameInquiry Page</h1>
        <div className="games-grid">
        {games.map((game) => (
          <div key={game.id} className="game-card">
            <img src={game.picture} alt={game.name} className="game-image" />
            <h3>{game.name}</h3>
              <p>{game.detail}</p>
            <Link to={`/admin/game-edit/${game.id}`}>
              <button className="edit-button">Edit</button>
            </Link>
          </div>
        ))}
        </div>
      </div>
    </>
  );
};

export default GameInquiry;
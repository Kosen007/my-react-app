import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale } from "chart.js";
import content from "../json/Summary.json";
import games from "../json/Games.json";
import "../css/styles.css";

{/* 页面显示用游戏情报 */}
interface Game {
  id: number;
  name: string;
  picture: string;
  detail: string;
}

{/* 图形 */}
ChartJS.register(BarElement, CategoryScale, LinearScale);

{/* 取的json定义的所有游戏情报 */}
const gameData: Game[] = games;

const HomePage = () => {
  {/* 取的id为1的游戏情报 */}
  const game = gameData.find((g: Game) => g.id === 1);
  const [currentView, setCurrentView] = useState("sales");
  if (!game) {
    return <div>No Games</div>;
  }

  const showSalesChart = () => {
    setCurrentView("sales");
  };

  const showScoreChart = () => {
    setCurrentView("score");
  };

  const gameLabels = games.map((game) => game.name);
  const salesData = games.map((game) => game.salesVolume);
  const scoreData = games.map((game) => parseFloat(game.score));

  {/* 确定要显示的数据 */}
  const chartData = {
    labels: gameLabels,
    datasets: [
      {
        label: currentView === "sales" ? "Sales Volume" : "Score",
        data: currentView === "sales" ? salesData : scoreData,
        backgroundColor: currentView === "sales" ? "rgba(75, 192, 192, 0.6)" : "rgba(255, 159, 64, 0.6)",
        borderColor: currentView === "sales" ? "rgba(75, 192, 192, 1)" : "rgba(255, 159, 64, 1)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <>
{/* 显示title */}
      <div className="text-block">
        <h1 className="title">{content.title}</h1>
        <p className="body">{content.body}</p>
      </div>
    
{/* 显示最新游戏 */}
      <div className="newest-game-banner">Newest Game</div>
      <div className="game-detail">
        <div className="game-image">
          <img src={game.picture} alt={game.name} />
        </div>
        <div className="game-info">
          <h2 className="game-name">{game.name}</h2>
          <p className="game-detail">{game.detail}</p>
        </div>
      </div>

{/* 显示各个游戏对比图 */}
      <div className="home-container">
        <div className="newest-game-banner">Games Comparation</div>
        <h1>{currentView === "sales" ? "Game Sales Volume" : "Game Scores"}</h1>

        {/* 图形显示 */}
        <Bar data={chartData} options={chartOptions} />

        {/* 按钮切换显示 */}
        <div className="button-container">
          <button onClick={showSalesChart}>
            Compare Sales Volume
          </button>
          <button onClick={showScoreChart}>
            Compare Scores
          </button>
        </div>
      <br />
      </div>
    </>
  );
};

export default HomePage;
